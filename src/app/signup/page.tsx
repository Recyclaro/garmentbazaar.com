import type { Metadata } from "next";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import SignupForm from "@/components/SignupForm";

export const metadata: Metadata = {
  title: "Sign Up",
  description:
    "Create a GarmentBazaar account as a brand, manufacturer, or retailer.",
};

export default function SignupPage() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container className="max-w-md">
        <div className="text-center">
          <Eyebrow>Get Started</Eyebrow>
          <h1 className="text-balance mt-4 font-serif text-3xl font-semibold tracking-tight text-ink">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Join as a brand, manufacturer, or retailer.
          </p>
        </div>
        <div className="mt-10 rounded-3xl border border-slate-200 bg-background p-6 sm:p-10">
          <SignupForm />
        </div>
      </Container>
    </section>
  );
}
