import CollectionForm from "@/components/CollectionForm";
import { createCollectionAction } from "@/actions/collections";

export default async function NewCollectionPage({
  searchParams,
}: {
  searchParams: Promise<{ welcome?: string }>;
}) {
  const { welcome } = await searchParams;
  return (
    <div className="max-w-2xl">
      {welcome && (
        <div className="mb-6 rounded-2xl bg-green-50 p-4 text-sm text-green-900 ring-1 ring-green-200">
          <p className="font-semibold">Welcome aboard!</p>
          <p className="mt-1">One last step: list your first collection. Add a photo, price per piece and your MOQ. Our team reviews it, usually quickly, and then retailers can order.</p>
        </div>
      )}
      <h2 className="text-lg font-semibold text-ink">List a collection</h2>
      <p className="mt-1 text-sm text-slate-600">
        Submitted collections go to GarmentBazaar for review before appearing
        for retailers to order.
      </p>
      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
        <CollectionForm action={createCollectionAction} submitLabel="Submit for review" />
      </div>
    </div>
  );
}
