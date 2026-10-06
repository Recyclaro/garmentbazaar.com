import CopyButton from "@/components/CopyButton";

// A badge brands and manufacturers can put on their own website. Each one is
// a link back to their page here: it sends them buyers and gives
// GarmentBazaar a backlink from a relevant site.
export default function LinkBadge({
  href,
  variant,
}: {
  /** Absolute URL of the member's public page on GarmentBazaar. */
  href: string;
  variant: "available" | "find-us";
}) {
  const file = variant === "available" ? "available-on-garmentbazaar" : "find-us-on-garmentbazaar";
  const alt = variant === "available" ? "Available wholesale on GarmentBazaar" : "Find us on GarmentBazaar";
  const img = `https://garmentbazaar.com/badges/${file}.svg`;
  const snippet = `<a href="${href}" target="_blank" rel="noopener" title="${alt}"><img src="${img}" alt="${alt}" width="220" height="60"></a>`;

  return (
    <section className="rounded-3xl bg-white p-6 ring-1 ring-slate-200">
      <div className="flex flex-col gap-5 md:flex-row md:items-center">
        <div className="flex-1">
          <h2 className="font-serif text-2xl font-semibold text-ink">Add our badge to your website</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Retailers who visit your site can order wholesale from you in one tap, and every badge helps your
            GarmentBazaar page show up higher on Google. Paste this code into your site&apos;s footer or
            &ldquo;Where to buy&rdquo; page.
          </p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/badges/${file}.svg`} alt={alt} width={220} height={60} className="shrink-0" />
      </div>
      <div className="mt-4 flex items-start gap-3">
        <code className="block min-w-0 flex-1 overflow-x-auto whitespace-nowrap rounded-xl bg-slate-50 p-3 text-xs text-slate-700 ring-1 ring-slate-200">
          {snippet}
        </code>
        <CopyButton text={snippet} />
      </div>
    </section>
  );
}
