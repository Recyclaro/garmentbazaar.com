import { redirect } from "next/navigation";
import { verifySession } from "@/lib/dal";

export default async function DashboardIndexPage() {
  const session = await verifySession();

  switch (session.role) {
    case "manufacturer":
      redirect("/dashboard/manufacturer");
    case "brand":
      redirect("/dashboard/brand");
    case "admin":
      redirect("/dashboard/admin");
    default:
      redirect("/dashboard/buyer");
  }
}
