"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import type { AiDemoData, DemoItem } from "@/lib/aiDemo";
import { formatPaise } from "@/lib/currency";
import { IconArrowRight, IconSearch, IconSparkles, IconTarget } from "./Icons";

// Auto-playing walk-through of the three tools: types an example request,
// "thinks", then reveals a result built from the live catalogue. Cycles
// through the tabs while on screen; a tab click jumps to it. People who
// prefer reduced motion see each result straight away.

type Key = "ask" | "plan" | "wa";
type Phase = "typing" | "thinking" | "done";

const tabMeta: Record<Key, { label: string; icon: typeof IconSearch; href: string; cta: string }> = {
  ask: { label: "Ask & find", icon: IconSearch, href: "/ask", cta: "Try Ask & find" },
  plan: { label: "Stock plan", icon: IconTarget, href: "/stock-advisor", cta: "Plan my stock" },
  wa: { label: "WhatsApp writer", icon: IconSparkles, href: "/whatsapp-writer", cta: "Write my messages" },
};

const splitColours = ["bg-[#b0164f]", "bg-[#0f766e]", "bg-[#16335e]", "bg-amber-400", "bg-accent-500"];

export default function AiDemo({ data }: { data: AiDemoData }) {
  const tabs = (["ask", "plan", "wa"] as Key[]).filter((k) => data[k]);
  const [active, setActive] = useState<Key>(tabs[0] ?? "ask");
  const [rawPhase, setPhase] = useState<Phase>("typing");
  const [rawTyped, setTyped] = useState(0);
  const [visible, setVisible] = useState(false);
  const reduced = useSyncExternalStore(subscribeMotion, prefersReduced, () => false);
  const boxRef = useRef<HTMLDivElement>(null);

  const prompt =
    active === "ask" ? data.ask?.query ?? "" : active === "plan" ? data.plan?.prompt ?? "" : data.wa?.prompt ?? "";

  // Reduced motion: no typing or cycling, just the finished result.
  const phase: Phase = reduced ? "done" : rawPhase;
  const typed = reduced ? prompt.length : rawTyped;

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Typing → thinking → done → next tab.
  useEffect(() => {
    if (reduced || !visible) return;
    let t: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      if (typed < prompt.length) t = setTimeout(() => setTyped((n) => n + 1), 38);
      else t = setTimeout(() => setPhase("thinking"), 350);
    } else if (phase === "thinking") {
      t = setTimeout(() => setPhase("done"), 1100);
    } else {
      t = setTimeout(() => {
        const next = tabs[(tabs.indexOf(active) + 1) % tabs.length];
        go(next);
      }, 6500);
    }
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, typed, visible, reduced, active, prompt]);

  function go(k: Key) {
    setActive(k);
    setTyped(0);
    setPhase("typing");
  }

  if (tabs.length === 0) return null;
  const meta = tabMeta[active];

  return (
    <div ref={boxRef} className="overflow-hidden rounded-[2rem] bg-[#0d1b36] text-white shadow-2xl shadow-slate-900/20 ring-1 ring-white/10">
      {/* Window bar + tabs */}
      <div className="flex flex-col gap-3 border-b border-white/10 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </span>
          <span className="rounded-full bg-amber-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink">Live demo</span>
          <span className="hidden text-xs text-white/50 sm:inline">Example run on today&apos;s catalogue</span>
        </div>
        <div role="tablist" aria-label="Demo tools" className="-mx-1 flex gap-1 overflow-x-auto px-1">
          {tabs.map((k, i) => {
            const T = tabMeta[k];
            const on = k === active;
            return (
              <button
                key={k}
                role="tab"
                type="button"
                aria-selected={on}
                onClick={() => go(k)}
                className={`relative flex shrink-0 items-center gap-1.5 overflow-hidden rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                  on ? "bg-white text-ink" : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className={`flex h-4 w-4 items-center justify-center rounded-full text-[10px] ${on ? "bg-ink text-white" : "bg-white/15"}`}>{i + 1}</span>
                {T.label}
                {on && phase === "done" && !reduced && (
                  <span key={active} className="demo-progress absolute inset-x-0 bottom-0 h-0.5 origin-left bg-[#b0164f]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid min-h-[30rem] grid-cols-1 lg:grid-cols-12">
        {/* Request */}
        <div className="border-b border-white/10 p-5 sm:p-7 lg:col-span-4 lg:border-b-0 lg:border-r">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-200">Shop owner asks</p>
          <div className="mt-3 rounded-2xl rounded-tr-sm bg-white px-4 py-3 text-[15px] leading-6 text-ink shadow-lg">
            {prompt.slice(0, typed)}
            {phase === "typing" && <span className="demo-caret ml-0.5 inline-block h-4 w-0.5 translate-y-0.5 bg-[#b0164f]" />}
          </div>
          {phase !== "typing" && (
            <p className="demo-in mt-4 flex items-center gap-2 text-sm text-white/70">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#b0164f]">
                <IconSparkles className="h-3.5 w-3.5 text-white" />
              </span>
              {phase === "thinking" ? (
                <span className="flex items-center gap-1">
                  Reading the live catalogue
                  <span className="demo-dots" aria-hidden>
                    <i />
                    <i />
                    <i />
                  </span>
                </span>
              ) : (
                <span>Done. Here&apos;s what fits.</span>
              )}
            </p>
          )}
          <Link
            href={meta.href}
            className="mt-6 hidden w-fit items-center gap-2 rounded-full bg-amber-300 px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-amber-200 lg:inline-flex"
          >
            {meta.cta}
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Result */}
        <div className="relative bg-[#f6f5fb] p-5 text-ink sm:p-7 lg:col-span-8" aria-live="polite">
          {phase !== "done" ? (
            <div className="space-y-3" aria-hidden>
              <div className={`h-12 rounded-2xl bg-white ring-1 ring-slate-200 ${phase === "thinking" ? "animate-pulse" : "opacity-40"}`} />
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className={`h-40 rounded-2xl sm:h-56 bg-white ring-1 ring-slate-200 ${phase === "thinking" ? "animate-pulse" : "opacity-40"}`} />
                ))}
              </div>
            </div>
          ) : active === "ask" && data.ask ? (
            <div>
              <p className="demo-in rounded-2xl bg-white px-4 py-3 text-sm ring-1 ring-slate-200">{data.ask.reply}</p>
              <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
                {data.ask.items.map((it, i) => (
                  <ProductCard key={it.slug} item={it} delay={i * 140} />
                ))}
              </div>
            </div>
          ) : active === "plan" && data.plan ? (
            <div>
              <div className="demo-in grid grid-cols-3 gap-2">
                {[
                  ["Plan total", formatPaise(data.plan.totalPaise)],
                  ["Budget", formatPaise(data.plan.budgetPaise)],
                  ["Styles", String(data.plan.styles)],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-2xl bg-[#12264a] px-3 py-2.5 text-white">
                    <p className="text-[11px] text-white/60">{k}</p>
                    <p className="font-serif text-lg font-semibold sm:text-xl">{v}</p>
                  </div>
                ))}
              </div>
              <div className="demo-in mt-4 rounded-2xl bg-white p-4 ring-1 ring-slate-200" style={{ animationDelay: "120ms" }}>
                <p className="text-sm font-semibold">Budget split</p>
                <div className="mt-2 flex h-2.5 overflow-hidden rounded-full bg-slate-100">
                  {data.plan.split.map((s, i) => (
                    <span key={s.category} className={`demo-grow ${splitColours[i % splitColours.length]}`} style={{ width: `${s.percent}%`, animationDelay: `${200 + i * 120}ms` }} />
                  ))}
                </div>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
                  {data.plan.split.map((s, i) => (
                    <span key={s.category} className="flex items-center gap-1.5">
                      <span className={`h-2 w-2 rounded-full ${splitColours[i % splitColours.length]}`} />
                      {s.category} {s.percent}%
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
                {data.plan.picks.map((it, i) => (
                  <ProductCard key={it.slug} item={it} delay={300 + i * 140} line={`${it.units} pcs = ${formatPaise(it.totalPaise)}`} />
                ))}
              </div>
            </div>
          ) : active === "wa" && data.wa ? (
            <div className="flex h-full items-start justify-center">
              <div className="w-full max-w-md rounded-[1.75rem] bg-[#e5ddd5] p-4 shadow-inner">
                <div className="flex items-center gap-2 rounded-xl bg-[#075e54] px-3 py-2 text-white">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-xs font-bold">SF</span>
                  <span className="text-sm font-semibold">Sharma Fashion · Broadcast</span>
                </div>
                <p className="demo-in mt-4 ml-auto w-fit max-w-[90%] whitespace-pre-line rounded-2xl rounded-tr-sm bg-[#dcf8c6] px-4 py-3 text-[14px] leading-6 text-ink shadow-sm">
                  {data.wa.text}
                  <span className="mt-1 block text-right text-[10px] text-slate-500">10:42 ✓✓</span>
                </p>
              </div>
            </div>
          ) : null}
          <Link
            href={meta.href}
            className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-[#b0164f] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#c81d5c] lg:hidden"
          >
            {meta.cta}
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

const MOTION = "(prefers-reduced-motion: reduce)";
function subscribeMotion(cb: () => void) {
  const mq = window.matchMedia(MOTION);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
function prefersReduced() {
  return window.matchMedia(MOTION).matches;
}

function ProductCard({ item, delay, line }: { item: DemoItem; delay: number; line?: string }) {
  return (
    <Link
      href={`/collections/${encodeURIComponent(item.slug)}`}
      className="demo-in group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 transition hover:shadow-lg"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="relative block h-24 bg-[#f1efeb] sm:h-36">
        {item.imagePath && (
          <Image
            src={item.imagePath}
            alt={item.name}
            fill
            unoptimized
            sizes="(min-width: 1024px) 18vw, 45vw"
            className={item.imagePath.startsWith("/images/products/") ? "object-contain" : "object-cover"}
          />
        )}
        <span className="absolute left-1.5 top-1.5 rounded-full bg-success-600 px-1.5 py-0.5 text-[9px] font-bold text-white sm:left-2 sm:top-2 sm:px-2 sm:text-[10px]">MOQ {item.moq}</span>
      </span>
      <span className="p-2 sm:p-3">
        <span className="line-clamp-2 text-xs font-semibold leading-4 sm:truncate sm:text-sm">{item.name}</span>
        <span className="hidden truncate text-[10px] font-medium uppercase tracking-wide text-rose-600 sm:block">{item.brand}</span>
        <span className="mt-1 block text-xs font-semibold sm:text-sm">
          {formatPaise(item.pricePaise)}
          <span className="text-[10px] font-normal text-slate-500 sm:text-xs"> /pc</span>
        </span>
        {line && <span className="mt-0.5 block text-[10px] font-semibold text-[#0f766e] sm:text-xs">{line}</span>}
      </span>
    </Link>
  );
}
