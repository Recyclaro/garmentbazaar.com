export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg viewBox="0 0 44 32" className="h-7 w-9 shrink-0" fill="none">
        <defs>
          <linearGradient id="gb-peak-pink" x1="2" y1="30" x2="18" y2="2" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#db2777" />
            <stop offset="1" stopColor="#f472b6" />
          </linearGradient>
          <linearGradient id="gb-peak-purple" x1="22" y1="30" x2="40" y2="2" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#4c1d95" />
            <stop offset="1" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
        {/* Left peak, "G" notch cut from the base */}
        <path
          d="M9 1.5 20 30H10.5L9 25.5 6 30H0L9 1.5z"
          fill="url(#gb-peak-pink)"
        />
        {/* Right peak, triangular window cut from the middle */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M33 1.5 44 30H22L33 1.5zm0 12L28.5 25h9L33 13.5z"
          fill="url(#gb-peak-purple)"
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-sans text-lg font-extrabold uppercase tracking-tight">
          <span className="bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
            Garment
          </span>
          <span className="bg-gradient-to-r from-violet-700 to-indigo-600 bg-clip-text text-transparent">
            Bazaar
          </span>
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
