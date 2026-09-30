import Image from "next/image";
import type { ReactNode } from "react";
import Container from "./Container";
import { IconCheck } from "./Icons";

// Two-column layout for login and signup: the form on the left, a colour
// panel with product photos and reasons to join on the right.
export default function AuthShell({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  const perks = [
    "Buy branded stock direct, at the brand's MOQ",
    "List collections or factory capacity for free",
    "Every listing reviewed before it goes live",
  ];
  const photos = ["hero-women", "men-polo", "shoes-sports", "ethnic-lehenga"];

  return (
    <section className="bg-background py-10 sm:py-16">
      <Container>
        <div className="grid grid-cols-1 overflow-hidden rounded-[2rem] bg-white ring-1 ring-slate-200 lg:grid-cols-2">
          <div className="px-6 py-10 sm:px-12 sm:py-14">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-600">
              {eyebrow}
            </p>
            <h1 className="text-balance mt-3 font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {title}
            </h1>
            {subtitle && <p className="mt-2 text-sm text-slate-600">{subtitle}</p>}
            <div className="mt-8">{children}</div>
          </div>

          <div
            className="relative hidden bg-[#16335e] p-10 lg:block"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.09) 1.5px, transparent 1.5px)",
              backgroundSize: "22px 22px",
            }}
          >
            <div className="grid grid-cols-2 gap-4">
              {photos.map((f, i) => (
                <div
                  key={f}
                  className={`relative overflow-hidden rounded-2xl bg-white shadow-lg shadow-black/25 ${
                    i === 0 || i === 3 ? "h-52" : "h-40"
                  } ${i % 2 === 1 ? "mt-8" : ""}`}
                >
                  <Image
                    src={`/images/products/${f}.jpg`}
                    alt=""
                    fill
                    unoptimized
                    sizes="20vw"
                    priority
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
            <p className="mt-10 font-serif text-2xl font-semibold text-white">
              From fabric to shelf. One network.
            </p>
            <ul className="mt-5 space-y-3">
              {perks.map((p) => (
                <li key={p} className="flex gap-3 text-sm text-white/85">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-300">
                    <IconCheck className="h-3 w-3 text-ink" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
