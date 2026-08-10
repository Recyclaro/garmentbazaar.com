"use server";

import { z } from "zod";
import { requireRole, verifySession } from "@/lib/dal";
import {
  getCollectionBySlug,
  createOrder,
  getOrderById,
  setOrderPaymentResult,
} from "@/lib/db";
import {
  createRazorpayOrder,
  getRazorpayKeyId,
  isRazorpayConfigured,
  verifyRazorpaySignature,
} from "@/lib/razorpay";

const StartOrderSchema = z.object({
  quantity: z.coerce.number().int().positive("Enter a valid quantity."),
});

export interface StartOrderState {
  errors?: Record<string, string[]>;
  message?: string;
  checkout?: {
    localOrderId: number;
    razorpayOrderId: string;
    amountPaise: number;
    keyId: string;
    collectionName: string;
    retailerName: string;
  };
}

export async function startOrderAction(
  collectionSlug: string,
  _prevState: StartOrderState | undefined,
  formData: FormData,
): Promise<StartOrderState> {
  const session = await requireRole("retailer");

  const validated = StartOrderSchema.safeParse({
    quantity: formData.get("quantity"),
  });
  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }
  const { quantity } = validated.data;

  const collection = getCollectionBySlug(collectionSlug);
  if (!collection || collection.status !== "approved") {
    return { message: "This collection isn't available." };
  }
  if (quantity < collection.moq) {
    return {
      errors: { quantity: [`Minimum order quantity is ${collection.moq} units.`] },
    };
  }

  if (!isRazorpayConfigured()) {
    return {
      message:
        "Payments aren't set up yet on GarmentBazaar. The brand has been notified " +
        "you're interested — check back soon, or contact them directly.",
    };
  }

  const totalAmountPaise = quantity * collection.price_paise;

  let razorpayOrderId: string;
  try {
    const rpOrder = await createRazorpayOrder({
      amountPaise: totalAmountPaise,
      receipt: `${collection.slug}-${session.userId}-${Date.now()}`,
    });
    razorpayOrderId = rpOrder.id;
  } catch (err) {
    console.error("[orders] Razorpay order creation failed:", err);
    return { message: "Couldn't start checkout right now. Please try again shortly." };
  }

  const localOrderId = createOrder({
    collectionId: collection.id,
    retailerUserId: session.userId,
    quantity,
    unitPricePaise: collection.price_paise,
    totalAmountPaise,
    razorpayOrderId,
  });

  const keyId = getRazorpayKeyId();
  if (!keyId) {
    return { message: "Payments aren't configured correctly. Please try again shortly." };
  }

  return {
    checkout: {
      localOrderId,
      razorpayOrderId,
      amountPaise: totalAmountPaise,
      keyId,
      collectionName: collection.name,
      retailerName: session.name,
    },
  };
}

export async function verifyOrderPaymentAction(input: {
  localOrderId: number;
  razorpayPaymentId: string;
  razorpaySignature: string;
}): Promise<{ success: boolean; message?: string }> {
  const session = await verifySession();

  const order = getOrderById(input.localOrderId);
  if (!order || order.retailer_user_id !== session.userId) {
    return { success: false, message: "Order not found." };
  }
  if (!order.razorpay_order_id) {
    return { success: false, message: "Order wasn't set up for payment." };
  }
  if (order.status === "paid") {
    return { success: true };
  }

  const valid = verifyRazorpaySignature({
    orderId: order.razorpay_order_id,
    paymentId: input.razorpayPaymentId,
    signature: input.razorpaySignature,
  });

  if (!valid) {
    setOrderPaymentResult(order.id, "failed", input.razorpayPaymentId);
    return { success: false, message: "Payment verification failed." };
  }

  setOrderPaymentResult(order.id, "paid", input.razorpayPaymentId);
  return { success: true };
}
