export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg viewBox="0 0 40 40" className="h-8 w-8 shrink-0" fill="none">
        <defs>
          <linearGradient
            id="gb-logo-grad"
            x1="4"
            y1="6"
            x2="34"
            y2="34"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#ec4899" />
            <stop offset="1" stopColor="#9333ea" />
          </linearGradient>
        </defs>
        <path
          d="M4 26L20 8v9.5L36 8 20 32v-9.5L4 26z"
          fill="url(#gb-logo-grad)"
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-sans text-lg font-extrabold uppercase tracking-tight">
          <span className={dark ? "text-white" : "text-ink"}>Garment</span>
          <span className="text-pink-600">Bazaar</span>
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
