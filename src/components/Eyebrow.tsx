export default function Eyebrow({
  children,
  light = false,
  className,
}: {
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] ${
        className ?? (light ? "text-accent-300" : "text-accent-600")
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
        <path d="M12 2l1.6 5.6L19 9l-5.4 1.4L12 16l-1.6-5.6L5 9l5.4-1.4L12 2zM19 14l.8 2.7L22.5 17.5l-2.7.8L19 21l-.8-2.7-2.7-.8 2.7-.8L19 14z" />
      </svg>
      {children}
    </span>
  );
}
