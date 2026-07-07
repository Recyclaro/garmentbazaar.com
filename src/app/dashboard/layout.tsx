import { redirect } from "next/navigation";
import Container from "@/components/Container";
import { getCurrentUser } from "@/lib/dal";
import { logout } from "@/actions/auth";

const roleLabels: Record<string, string> = {
  brand: "Brand",
  manufacturer: "Manufacturer / Factory",
  retailer: "Retailer",
  admin: "Admin",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="bg-background py-10 sm:py-14">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-accent-600">
              {roleLabels[user.role] ?? user.role}
            </p>
            <h1 className="mt-1 font-serif text-2xl font-semibold text-ink">
              Welcome, {user.name}
            </h1>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:bg-slate-50"
            >
              Log out
            </button>
          </form>
        </div>
        <div className="mt-8">{children}</div>
      </Container>
    </div>
  );
}
