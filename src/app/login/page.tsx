import type { Metadata } from "next";
import AuthShell from "@/components/AuthShell";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Log In",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: true },
  description: "Log in to your GarmentBazaar account.",
};

export default function LoginPage() {
  return (
    <AuthShell eyebrow="Welcome back" title="Log in to GarmentBazaar">
      <LoginForm />
    </AuthShell>
  );
}
