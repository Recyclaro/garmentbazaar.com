import "server-only";
import { Resend } from "resend";

// Without a RESEND_API_KEY configured (e.g. in this sandbox, or before the
// founder has set up the Resend account), email sending is a no-op that
// logs to the server console instead of throwing — a missing notification
// email should never be the reason a quote request fails to save.
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const FROM_ADDRESS = process.env.RESEND_FROM_EMAIL || "GarmentBazaar <onboarding@resend.dev>";

export async function sendRfqNotificationEmail(params: {
  to: string;
  supplierName: string;
  fromName: string;
  fromCompany: string;
  fromEmail: string;
  message: string;
}): Promise<void> {
  if (!resend) {
    console.warn(
      `[email] RESEND_API_KEY not set — skipping RFQ notification to ${params.to}.`,
    );
    return;
  }

  try {
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: params.to,
      replyTo: params.fromEmail,
      subject: `New quote request for ${params.supplierName}`,
      text:
        `${params.fromName} from ${params.fromCompany} requested a quote ` +
        `on GarmentBazaar:\n\n"${params.message}"\n\n` +
        `Reply to this email to respond directly to ${params.fromName}.`,
    });
  } catch (error) {
    // Log and swallow — a failed notification email is not a reason to
    // fail the RFQ submission itself; the request is already saved.
    console.error("[email] Failed to send RFQ notification:", error);
  }
}
