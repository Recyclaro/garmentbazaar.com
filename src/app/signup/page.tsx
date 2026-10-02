import type { Metadata } from "next";
import AuthShell from "@/components/AuthShell";
import SignupForm from "@/components/SignupForm";

export const metadata: Metadata = {
  title: "Create a Free Buyer or Seller Account",
  alternates: { canonical: "/signup" },
  description:
    "Join GarmentBazaar free as a retailer, brand or manufacturer. Takes under a minute: pick your role, add your mobile and city, and start buying or selling wholesale.",
};

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const { role } = await searchParams;
  const initialRole =
    role === "retailer" || role === "brand" || role === "manufacturer" ? role : undefined;

  return (
    <AuthShell
      eyebrow="Join free in 1 minute"
      title="Create your account"
      subtitle="Pick who you are, add a few details, and you're in."
    >
      <SignupForm initialRole={initialRole} />
    </AuthShell>
  );
}
