import Image from "next/image";

// A row of product photos from public/images/products, used to give the
// solution pages a glimpse of the catalogue. `names` are file stems.
export default function PhotoStrip({
  names,
  className = "",
}: {
  names: { file: string; label: string }[];
  className?: string;
}) {
  return (
    <div
      className={`grid grid-cols-3 gap-3 sm:grid-cols-6 ${className}`}
    >
      {names.map((n) => (
        <figure key={n.file} className="m-0">
          <div className="relative h-36 overflow-hidden rounded-2xl bg-[#f1efeb] sm:h-44">
            <Image
              src={`/images/products/${n.file}.jpg`}
              alt={n.label}
              fill
              unoptimized
              sizes="(min-width: 640px) 16vw, 33vw"
              className="object-contain"
            />
          </div>
          <figcaption className="mt-2 text-xs font-medium text-slate-600">
            {n.label}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
