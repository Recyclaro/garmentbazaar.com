import ListingForm from "@/components/ListingForm";
import { createListingAction } from "@/actions/listings";

export default async function NewListingPage({
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
          <p className="mt-1">One last step: create your factory listing so brands can find you and send quote requests.</p>
        </div>
      )}
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
