import ListingForm from "@/components/ListingForm";
import { createListingAction } from "@/actions/listings";

export default function NewListingPage() {
  return (
    <div className="max-w-2xl">
      <h2 className="text-lg font-semibold text-ink">List your factory</h2>
      <p className="mt-1 text-sm text-slate-600">
        Submitted listings go to GarmentBazaar for review before appearing on
        the marketplace.
      </p>
      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
        <ListingForm action={createListingAction} submitLabel="Submit for review" />
      </div>
    </div>
  );
}
