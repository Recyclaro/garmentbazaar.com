export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5 font-semibold tracking-tight">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-600 text-sm font-bold text-white shadow-sm">
        G
      </span>
      <span className={`text-lg ${dark ? "text-white" : "text-slate-900"}`}>
        Garment<span className="text-amber-500">Bazaar</span>
      </span>
    </span>
  );
}
