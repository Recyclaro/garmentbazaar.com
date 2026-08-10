"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { startOrderAction, verifyOrderPaymentAction, type StartOrderState } from "@/actions/orders";
import { formatPaise } from "@/lib/currency";
import { IconCheck } from "./Icons";

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayCheckoutOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: { name?: string };
  theme?: { color?: string };
  modal?: { ondismiss?: () => void };
}

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayCheckoutOptions) => { open: () => void };
  }
}

const RAZORPAY_SCRIPT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const existing = document.querySelector(`script[src="${RAZORPAY_SCRIPT_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve(true));
      existing.addEventListener("error", () => resolve(false));
      return;
    }
    const script = document.createElement("script");
    script.src = RAZORPAY_SCRIPT_SRC;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function OrderForm({
  collectionSlug,
  moq,
  unitPricePaise,
  paymentsConfigured,
}: {
  collectionSlug: string;
  moq: number;
  unitPricePaise: number;
  paymentsConfigured: boolean;
}) {
  const [state, formAction, pending] = useActionState<StartOrderState | undefined, FormData>(
    startOrderAction.bind(null, collectionSlug),
    undefined,
  );
  const [quantity, setQuantity] = useState(moq);
  const [checkoutStatus, setCheckoutStatus] = useState<
    "idle" | "opening" | "success" | "error"
  >("idle");
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const handledCheckoutFor = useRef<number | null>(null);

  useEffect(() => {
    if (!state?.checkout) return;
    if (handledCheckoutFor.current === state.checkout.localOrderId) return;
    handledCheckoutFor.current = state.checkout.localOrderId;

    const checkout = state.checkout;
    setCheckoutStatus("opening");

    loadRazorpayScript().then((loaded) => {
      if (!loaded || !window.Razorpay) {
        setCheckoutStatus("error");
        setCheckoutError("Couldn't load the payment window. Please try again.");
        return;
      }

      const razorpay = new window.Razorpay({
        key: checkout.keyId,
        amount: checkout.amountPaise,
        currency: "INR",
        name: "GarmentBazaar",
        description: checkout.collectionName,
        order_id: checkout.razorpayOrderId,
        prefill: { name: checkout.retailerName },
        theme: { color: "#e11d48" },
        modal: {
          ondismiss: () => setCheckoutStatus("idle"),
        },
        handler: async (response) => {
          const result = await verifyOrderPaymentAction({
            localOrderId: checkout.localOrderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          });
          if (result.success) {
            setCheckoutStatus("success");
          } else {
            setCheckoutStatus("error");
            setCheckoutError(result.message ?? "Payment could not be verified.");
          }
        },
      });
      razorpay.open();
    });
  }, [state]);

  if (checkoutStatus === "success") {
    return (
      <div className="flex items-start gap-3 rounded-xl bg-success-50 p-4 text-sm text-success-700">
        <IconCheck className="mt-0.5 h-5 w-5 shrink-0" />
        <div>
          <p className="font-semibold">Order placed and paid.</p>
          <p className="mt-1 text-success-700/80">
            The brand has been notified — check your dashboard for order status.
          </p>
        </div>
      </div>
    );
  }

  const total = quantity * unitPricePaise;

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-ink">
          Quantity
        </label>
        <input
          id="quantity"
          name="quantity"
          type="number"
          min={moq}
          step={1}
          value={quantity}
          onChange={(e) => setQuantity(Math.max(0, Number(e.target.value)))}
          className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink shadow-sm outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
        />
        <p className="mt-1 text-xs text-slate-500">Minimum {moq} units.</p>
        {state?.errors?.quantity && (
          <p className="mt-1 text-xs text-red-600">{state.errors.quantity[0]}</p>
        )}
      </div>

      <div className="flex items-center justify-between rounded-lg bg-background px-3.5 py-2.5 text-sm">
        <span className="text-slate-500">Order total</span>
        <span className="font-semibold text-ink">{formatPaise(total)}</span>
      </div>

      {state?.message && (
        <p className="rounded-lg bg-amber-50 px-3.5 py-2.5 text-sm text-amber-800">
          {state.message}
        </p>
      )}
      {checkoutError && (
        <p className="rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
          {checkoutError}
        </p>
      )}
      {!paymentsConfigured && (
        <p className="text-xs text-slate-400">
          Payments aren&apos;t live yet on GarmentBazaar — submitting registers your
          interest with the brand.
        </p>
      )}

      <button
        type="submit"
        disabled={pending || checkoutStatus === "opening"}
        className="inline-flex w-full items-center justify-center rounded-full bg-rose-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-700 disabled:opacity-60"
      >
        {pending || checkoutStatus === "opening" ? "Processing..." : "Order Now"}
      </button>
    </form>
  );
}
