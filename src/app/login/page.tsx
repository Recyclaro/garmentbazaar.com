import type { Metadata } from "next";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Log In",
  description: "Log in to your GarmentBazaar account.",
};

export default function LoginPage() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container className="max-w-md">
        <div className="text-center">
          <Eyebrow>Welcome Back</Eyebrow>
          <h1 className="text-balance mt-4 font-serif text-3xl font-semibold tracking-tight text-ink">
            Log in to GarmentBazaar
          </h1>
        </div>
        <div className="mt-10 rounded-3xl border border-slate-200 bg-background p-6 sm:p-10">
          <LoginForm />
        </div>
      </Container>
    </section>
  );
}
