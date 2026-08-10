import CollectionForm from "@/components/CollectionForm";
import { createCollectionAction } from "@/actions/collections";

export default function NewCollectionPage() {
  return (
    <div className="max-w-2xl">
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
