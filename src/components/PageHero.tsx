import Image from "next/image";
import type { ReactNode } from "react";
import Container from "./Container";
import { IconCheck } from "./Icons";

// Colour-banded hero with a staggered product-photo collage, shared by the
// public pages. Every tone is dark enough for white text (4.5:1+).
export type HeroTone = "navy" | "rose" | "teal" | "violet" | "brown" | "red";

const tones: Record<HeroTone, { bg: string; eyebrow: string; dots: string }> = {
  navy: { bg: "bg-[#16335e]", eyebrow: "text-amber-300", dots: "rgba(255,255,255,0.09)" },
  rose: { bg: "bg-[#a3134b]", eyebrow: "text-rose-100", dots: "rgba(255,255,255,0.1)" },
  teal: { bg: "bg-[#0f5f5c]", eyebrow: "text-teal-100", dots: "rgba(255,255,255,0.09)" },
  violet: { bg: "bg-accent-700", eyebrow: "text-accent-100", dots: "rgba(255,255,255,0.1)" },
  brown: { bg: "bg-[#6b3f1d]", eyebrow: "text-amber-200", dots: "rgba(255,255,255,0.09)" },
  red: { bg: "bg-[#9f1d2d]", eyebrow: "text-amber-200", dots: "rgba(255,255,255,0.1)" },
};

export interface HeroPhoto {
  file: string;
  alt: string;
}

export default function PageHero({
  tone,
  eyebrow,
  title,
  subtitle,
  photos,
  badges = [],
  children,
}: {
  tone: HeroTone;
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  /** Up to four photos from public/images/products. */
  photos: HeroPhoto[];
  /** Up to two short chips floated over the collage. */
  badges?: string[];
  /** Buttons or other actions under the subtitle. */
  children?: ReactNode;
}) {
  const t = tones[tone];
  const [p1, p2, p3, p4] = photos;

  return (
    <section className="bg-background pt-6 sm:pt-8">
      <Container>
        <div
          className={`relative overflow-hidden rounded-[2rem] ${t.bg} px-6 py-12 sm:px-12 sm:py-16`}
          style={{
            backgroundImage: `radial-gradient(${t.dots} 1.5px, transparent 1.5px)`,
            backgroundSize: "22px 22px",
          }}
        >
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <p
                className={`text-xs font-bold uppercase tracking-[0.16em] ${t.eyebrow}`}
              >
                {eyebrow}
              </p>
              <h1 className="text-balance mt-5 font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl">
                {title}
              </h1>
              {subtitle && (
                <p className="text-balance mt-6 max-w-xl text-lg leading-8 text-white/85">
                  {subtitle}
                </p>
              )}
              {children && (
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  {children}
                </div>
              )}
            </div>

            <div className="relative lg:col-span-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-4">
                  {p1 && <Tile photo={p1} tall />}
                  {p3 && <Tile photo={p3} />}
                </div>
                <div className="flex flex-col gap-4 pt-10">
                  {p2 && <Tile photo={p2} />}
                  {p4 && <Tile photo={p4} tall />}
                </div>
              </div>
              {badges[0] && (
                <Badge text={badges[0]} className="left-2 top-6 sm:-left-4" />
              )}
              {badges[1] && (
                <Badge text={badges[1]} className="bottom-6 right-2 sm:-right-4" />
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Tile({ photo, tall = false }: { photo: HeroPhoto; tall?: boolean }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-white shadow-lg shadow-black/20 ${
        tall ? "h-56 sm:h-64" : "h-40 sm:h-44"
      }`}
    >
      <Image
        src={`/images/products/${photo.file}.jpg`}
        alt={photo.alt}
        fill
        unoptimized
        sizes="(min-width: 1024px) 22vw, 45vw"
        priority
        className="object-contain"
      />
    </div>
  );
}

function Badge({ text, className }: { text: string; className: string }) {
  return (
    <span
      className={`absolute inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-ink shadow-lg shadow-black/20 ${className}`}
    >
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success-600">
        <IconCheck className="h-3 w-3 text-white" />
      </span>
      {text}
    </span>
  );
}
