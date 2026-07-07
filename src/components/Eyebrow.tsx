export default function Eyebrow({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
        light
          ? "border-white/20 bg-white/10 text-amber-300"
          : "border-amber-200 bg-amber-50 text-amber-700"
      }`}
    >
      {children}
    </span>
  );
}
