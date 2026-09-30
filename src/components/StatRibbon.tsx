import { collectionCategories } from "@/data/collections";
import { listApprovedCollections, listApprovedSuppliers } from "@/lib/db";

// Counts read live from the database, so the ribbon never shows a number
// the site can't back up.
export default function StatRibbon() {
  const collections = listApprovedCollections().length;
  const suppliers = listApprovedSuppliers();
  const cities = new Set(suppliers.map((s) => s.city.trim().toLowerCase())).size;
  const departments = collectionCategories.length;

  const stats = [
    { value: collections, label: "Collections listed", tone: "text-amber-300" },
    { value: suppliers.length, label: "Suppliers in the marketplace", tone: "text-rose-300" },
    { value: departments, label: "Departments", tone: "text-teal-300" },
    { value: cities, label: "Supplier cities", tone: "text-accent-300" },
  ];

  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10 lg:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="bg-ink px-6 py-7">
          <p className={`font-serif text-4xl font-semibold ${s.tone}`}>
            {s.value.toLocaleString("en-IN")}
          </p>
          <p className="mt-1 text-sm text-slate-300">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
