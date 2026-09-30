import { departments } from "@/data/departments";

// A slow ribbon of department names. The list is rendered twice so the
// loop is seamless; motion stops for people who prefer reduced motion
// (see .marquee-track in globals.css).
export default function DeptMarquee() {
  const items = departments.map((d) => ({ label: d.label, band: d.band }));
  return (
    <div
      className="overflow-hidden border-y border-slate-200 bg-white py-4"
      aria-label="Departments"
    >
      <div className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            className="flex shrink-0 items-center gap-10 pr-10"
            aria-hidden={copy === 1}
          >
            {items.map((it) => (
              <li
                key={it.label}
                className="flex items-center gap-3 whitespace-nowrap font-serif text-lg font-semibold text-ink"
              >
                <span className={`h-3 w-3 rounded-full ${it.band}`} />
                {it.label}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
