import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Container from "@/components/Container";
import OnboardingWizard from "@/components/OnboardingWizard";
import { getCurrentUser } from "@/lib/dal";
import { categories as supplierCategories } from "@/data/suppliers";

export const metadata: Metadata = {
  title: "Set up your account",
  robots: { index: false, follow: false },
};

export default async function OnboardingPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.role === "admin") redirect("/dashboard");

  return (
    <section className="bg-background py-8 sm:py-14">
      <Container className="max-w-2xl">
        <div className="rounded-[2rem] bg-white p-6 ring-1 ring-slate-200 sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#b0164f]">
            Account created
          </p>
          <h1 className="mt-2 font-serif text-3xl font-semibold text-ink">Let&apos;s set you up</h1>
          <div className="mt-6">
            <OnboardingWizard
              role={user.role as "retailer" | "brand" | "manufacturer"}
              name={user.name}
              supplierCategories={[...supplierCategories]}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
