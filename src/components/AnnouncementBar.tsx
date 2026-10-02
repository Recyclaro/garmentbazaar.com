import Link from "next/link";
import { listApprovedCollections } from "@/lib/db";

// Thin strip above the header. The count is read live, so it never
// overstates what's on the shelf.
export default function AnnouncementBar() {
  const count = listApprovedCollections().length;
  if (count === 0) return null;
  return (
    <div className="bg-ink text-white">
      <Link
        href="/collections"
        className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-6 py-2 text-center text-xs font-medium sm:text-sm"
      >
        <span className="rounded-full bg-amber-300 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-ink">
          Live
        </span>
        <span>
          {count} wholesale collections from reviewed brands.{" "}
          <span className="font-semibold text-amber-300 underline-offset-4 hover:underline">
            Start buying →
          </span>
        </span>
      </Link>
    </div>
  );
}
