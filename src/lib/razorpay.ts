import "server-only";
import crypto from "node:crypto";

// Payments are optional at the code level — without real keys configured,
// callers get a clear "not configured" error rather than a confusing crash,
// so the rest of the app (browsing collections, everything else) keeps
// working while a founder is still setting up their Razorpay account.
function getCredentials(): { keyId: string; keySecret: string } | null {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) return null;
  return { keyId, keySecret };
}

export function isRazorpayConfigured(): boolean {
  return getCredentials() !== null;
}

export interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
}

/**
 * Creates an order on Razorpay's side before the client opens the checkout
 * modal — this is Razorpay's documented flow: an order must exist server-side
 * first, and its id is what ties the eventual payment back to a specific
 * amount you set, not whatever the client claims.
 */
export async function createRazorpayOrder(params: {
  amountPaise: number;
  receipt: string;
}): Promise<RazorpayOrder> {
  const creds = getCredentials();
  if (!creds) {
    throw new Error(
      "Payments aren't configured yet — RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET " +
        "need to be set (see .env.example) before orders can be placed.",
    );
  }

  const auth = Buffer.from(`${creds.keyId}:${creds.keySecret}`).toString("base64");
  const res = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: params.amountPaise,
      currency: "INR",
      receipt: params.receipt,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Razorpay order creation failed (${res.status}): ${body}`);
  }

  const data = (await res.json()) as RazorpayOrder;
  return data;
}

/**
 * Verifies that a payment success callback actually came from Razorpay and
 * matches the order we created, per Razorpay's documented signature scheme:
 * HMAC-SHA256("<order_id>|<payment_id>", key_secret) must equal the
 * signature Razorpay sent. Never mark an order paid without this check —
 * the client-side "payment succeeded" event is not proof of payment on its
 * own, since anyone could forge that request.
 */
export function verifyRazorpaySignature(params: {
  orderId: string;
  paymentId: string;
  signature: string;
}): boolean {
  const creds = getCredentials();
  if (!creds) return false;

  const expected = crypto
    .createHmac("sha256", creds.keySecret)
    .update(`${params.orderId}|${params.paymentId}`)
    .digest("hex");

  const expectedBuf = Buffer.from(expected, "hex");
  const actualBuf = Buffer.from(params.signature, "hex");
  if (expectedBuf.length !== actualBuf.length) return false;
  return crypto.timingSafeEqual(expectedBuf, actualBuf);
}

export function getRazorpayKeyId(): string | null {
  return getCredentials()?.keyId ?? null;
}
