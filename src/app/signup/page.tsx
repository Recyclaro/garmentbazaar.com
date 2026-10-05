import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import AuthShell from "@/components/AuthShell";
import SignupForm from "@/components/SignupForm";

export const metadata: Metadata = pageMeta({
  title: "Join Free: Retailer, Brand or Manufacturer Account",
  description:
    "Create a free GarmentBazaar account in under a minute. Retailers buy branded wholesale stock direct from brands; brands and manufacturers list and sell.",
  path: "/signup",
});

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
