import type { ReactNode } from "react";

// Cards in a swipeable row on phones, a normal grid from sm up. Each child
// is wrapped so phone cards peek at the next one, hinting that you can swipe.
export default function CardRail({
  children,
  cols = "lg:grid-cols-4",
}: {
  children: ReactNode[];
  cols?: string;
}) {
  return (
    <div
      className={`-mx-6 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 sm:mx-0 sm:mt-10 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 ${cols}`}
    >
      {children.map((child, i) => (
        <div key={i} className="w-[78%] shrink-0 snap-start sm:w-auto">
          {child}
        </div>
      ))}
    </div>
  );
}
