import { redirect } from "next/navigation";
import Container from "@/components/Container";
import { getCurrentUser } from "@/lib/dal";
import { logout } from "@/actions/auth";

const roles: Record<string, { label: string; band: string; eyebrow: string }> = {
  brand: { label: "Brand", band: "bg-accent-700", eyebrow: "text-accent-100" },
  manufacturer: {
    label: "Manufacturer / Factory",
    band: "bg-[#0f766e]",
    eyebrow: "text-teal-100",
  },
  retailer: { label: "Retailer", band: "bg-[#b0164f]", eyebrow: "text-rose-100" },
  admin: { label: "Admin", band: "bg-ink", eyebrow: "text-slate-300" },
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
  const r = roles[user.role] ?? roles.retailer;
  const first = user.name.trim().split(/\s+/)[0] || user.name;

  return (
    <div className="bg-background pb-14 pt-4 sm:pt-8">
      <Container>
        <div
          className={`flex items-start justify-between gap-4 rounded-3xl ${r.band} px-5 py-6 sm:items-center sm:px-8 sm:py-8`}
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.1) 1.5px, transparent 1.5px)",
            backgroundSize: "22px 22px",
          }}
        >
          <div className="min-w-0">
            <p className={`text-xs font-bold uppercase tracking-[0.14em] ${r.eyebrow}`}>
              {r.label} dashboard
            </p>
            <h1 className="mt-1 truncate font-serif text-2xl font-semibold text-white sm:text-3xl">
              Hi {first}
            </h1>
            {user.companyName && (
              <p className="mt-0.5 truncate text-sm text-white/80">{user.companyName}</p>
            )}
          </div>
          <form action={logout} className="shrink-0">
            <button
              type="submit"
              className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Log out
            </button>
          </form>
        </div>
        <div className="mt-6 sm:mt-8">{children}</div>
      </Container>
    </div>
  );
}
