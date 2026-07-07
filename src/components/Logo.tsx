export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none">
          <path
            d="M4 4h6.5v6.5H4V4zm9.5 0H20v6.5h-6.5V4zM4 13.5h6.5V20H4v-6.5zm9.5 0H20V20h-6.5v-6.5z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-serif text-lg font-semibold tracking-tight ${dark ? "text-white" : "text-ink"}`}
        >
          Garment<span className="text-accent-600">Bazaar</span>
          <span className={dark ? "text-slate-500" : "text-slate-400"}>.com</span>
        </span>
        <span
          className={`mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] ${dark ? "text-slate-400" : "text-slate-500"}`}
        >
          AI-First Sourcing
        </span>
      </span>
    </span>
  );
}
