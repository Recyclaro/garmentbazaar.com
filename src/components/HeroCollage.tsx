import { IconCheck } from "./Icons";

export default function HeroCollage() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-4">
        <div
          className="h-64 rounded-3xl shadow-sm"
          style={{
            background:
              "repeating-linear-gradient(125deg, #0f766e 0px, #0f766e 26px, #134e4a 26px, #134e4a 52px, #f4d9b0 52px, #f4d9b0 78px, #be123c 78px, #be123c 104px, #3f3630 104px, #3f3630 130px)",
          }}
        />
        <div className="relative h-40 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-300 to-slate-500 shadow-sm">
          <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-white/95 p-3 shadow-md backdrop-blur">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-accent-600">
              <IconCheck className="h-3.5 w-3.5" />
              AI-Verified Manufacturer
            </div>
            <p className="mt-1 text-sm font-semibold text-ink">Shree Textile Mills</p>
            <p className="text-xs text-slate-500">Tiruppur, India</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 pt-8">
        <div className="h-40 rounded-3xl bg-gradient-to-br from-indigo-950 via-accent-700 to-accent-400 shadow-sm" />
        <div
          className="h-64 rounded-3xl shadow-sm"
          style={{
            background:
              "repeating-linear-gradient(115deg, #fde8d2 0px, #fde8d2 24px, #f4a988 24px, #f4a988 48px, #c96a4d 48px, #c96a4d 72px)",
          }}
        />
      </div>
    </div>
  );
}
