import { notFound } from "next/navigation";
import ListingForm from "@/components/ListingForm";
import { updateListingAction, deleteListingAction } from "@/actions/listings";
import { requireRole } from "@/lib/dal";
import { getSupplierBySlug, supplierRowToSupplier } from "@/lib/db";

export default async function EditListingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await requireRole("manufacturer");
  const { slug } = await params;
  const row = await getSupplierBySlug(slug);

  if (!row || row.owner_user_id !== session.userId) {
    notFound();
  }

  const boundUpdate = updateListingAction.bind(null, slug);
  const boundDelete = deleteListingAction.bind(null, slug);

  return (
    <div className="max-w-2xl">
      <h2 className="text-lg font-semibold text-ink">Edit listing</h2>
      <p className="mt-1 text-sm text-slate-600">
        Changes are re-submitted for review before going live again.
      </p>
      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
        <ListingForm
          action={boundUpdate}
          initial={supplierRowToSupplier(row)}
          submitLabel="Save changes"
        />
      </div>
      <form action={boundDelete} className="mt-4">
        <button
          type="submit"
          className="text-sm font-medium text-red-600 hover:text-red-700"
        >
          Delete this listing
        </button>
      </form>
    </div>
  );
}
