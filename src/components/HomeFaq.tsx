import JsonLd from "./JsonLd";

// Retailer FAQ on the homepage, also published as FAQPage structured data.
// Answers stick to how the platform works today.
const faqs = [
  {
    q: "What is MOQ and how small can my order be?",
    a: "MOQ is the minimum order quantity the brand sets for a collection, shown on every listing. You can order any amount at or above it, so you can start small and reorder what sells.",
  },
  {
    q: "Can shops in Tier 2, 3 and 4 towns buy on GarmentBazaar?",
    a: "Yes. You browse and order online from anywhere in India, and the wholesale price per piece is the same for every buyer, wherever your shop is.",
  },
  {
    q: "Are the brands on GarmentBazaar verified?",
    a: "Every brand and listing is reviewed by our team before it goes live, so you only see collections that have passed that check.",
  },
  {
    q: "How do I pay for an order?",
    a: "You place the order from the collection page. Where online payment is switched on, you pay securely at checkout; otherwise your order request goes straight to the brand to confirm.",
  },
  {
    q: "Do you offer credit or pay-later?",
    a: "GB Credit, with 30 to 90 day terms through lending partners, is coming soon. You can ask to be told when it launches.",
  },
  {
    q: "Is it free to join as a retailer?",
    a: "Yes. Creating a buyer account is free, and you can see every wholesale price before you sign up.",
  },
];

export default function HomeFaq() {
  return (
    <section id="faq" className="bg-white py-16 sm:py-20">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <div className="mx-auto w-full max-w-3xl px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#b0164f]">
          Retailer questions
        </p>
        <h2 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Good to know
        </h2>
        <div className="mt-8 divide-y divide-slate-200 rounded-3xl bg-background ring-1 ring-slate-200">
          {faqs.map((f) => (
            <details key={f.q} className="group p-5 sm:p-6">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-semibold text-ink">
                {f.q}
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-lg leading-none text-[#b0164f] ring-1 ring-slate-200 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-6 text-slate-600">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
