import Container from "./Container";
import Eyebrow from "./Eyebrow";
import CTASection from "./CTASection";
import { IconCheck, type IconComponent } from "./Icons";

export interface SolutionFeature {
  icon: IconComponent;
  title: string;
  desc: string;
}

export interface SolutionPageProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  painPoints: string[];
  solutionPoints: string[];
  features: SolutionFeature[];
  ctaTitle: string;
  ctaSubtitle: string;
}

export default function SolutionPage({
  eyebrow,
  title,
  subtitle,
  painPoints,
  solutionPoints,
  features,
  ctaTitle,
  ctaSubtitle,
}: SolutionPageProps) {
  return (
    <>
      <section className="relative overflow-hidden bg-background">
        <Container className="relative py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="text-balance mt-6 font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              {title}
            </h1>
            <p className="text-balance mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              {subtitle}
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div>
              <Eyebrow>The challenge</Eyebrow>
              <h2 className="mt-4 font-serif text-2xl font-semibold tracking-tight text-ink">
                What slows you down today
              </h2>
              <ul className="mt-8 space-y-4">
                {painPoints.map((item) => (
                  <li key={item} className="flex gap-3 text-slate-600">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                    <span className="leading-7">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Eyebrow>With GarmentBazaar</Eyebrow>
              <h2 className="mt-4 font-serif text-2xl font-semibold tracking-tight text-ink">
                What changes
              </h2>
              <ul className="mt-8 space-y-4">
                {solutionPoints.map((item) => (
                  <li key={item} className="flex gap-3 text-slate-700">
                    <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent-600" />
                    <span className="leading-7">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-background py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Relevant capabilities</Eyebrow>
            <h2 className="text-balance mt-4 font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Built for how you work
            </h2>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-slate-200 bg-white p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink">
                  <f.icon className="h-5 w-5 text-accent-300" />
                </div>
                <h3 className="mt-5 text-base font-semibold text-ink">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTASection title={ctaTitle} subtitle={ctaSubtitle} />
    </>
  );
}
