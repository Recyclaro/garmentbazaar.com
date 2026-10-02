import type { Metadata } from "next";
import AuthShell from "@/components/AuthShell";
import SignupForm from "@/components/SignupForm";

export const metadata: Metadata = {
  title: "Create a Free Buyer or Seller Account",
  alternates: { canonical: "/signup" },
  description:
    "Create a GarmentBazaar account as a brand, manufacturer, or retailer.",
};

export default function SignupPage() {
  return (
    <AuthShell
      eyebrow="Get started"
      title="Create your account"
      subtitle="Join as a brand, manufacturer or retailer. It's free."
    >
      <SignupForm />
    </AuthShell>
  );
}
