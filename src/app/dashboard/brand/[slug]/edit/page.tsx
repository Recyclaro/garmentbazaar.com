import { notFound } from "next/navigation";
import CollectionForm from "@/components/CollectionForm";
import { updateCollectionAction, deleteCollectionAction } from "@/actions/collections";
import { requireRole } from "@/lib/dal";
import { getCollectionBySlug, collectionRowToCollection } from "@/lib/db";

export default async function EditCollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await requireRole("brand");
  const { slug } = await params;
  const row = getCollectionBySlug(slug);

  if (!row || row.owner_user_id !== session.userId) {
    notFound();
  }

  const boundUpdate = updateCollectionAction.bind(null, slug);
  const boundDelete = deleteCollectionAction.bind(null, slug);

  return (
    <div className="max-w-2xl">
      <h2 className="text-lg font-semibold text-ink">Edit collection</h2>
      <p className="mt-1 text-sm text-slate-600">
        Changes are re-submitted for review before going live again.
      </p>
      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
        <CollectionForm
          action={boundUpdate}
          initial={collectionRowToCollection(row)}
          submitLabel="Save changes"
        />
      </div>
      <form action={boundDelete} className="mt-4">
        <button
          type="submit"
          className="text-sm font-medium text-red-600 hover:text-red-700"
        >
          Delete this collection
        </button>
      </form>
    </div>
  );
}
