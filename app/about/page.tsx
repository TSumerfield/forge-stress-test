import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Forge",
  description: "Forge helps sports and athletics leaders in international schools see how their operations really work and decide what to strengthen next.",
};

const ForgeMark = ({ className = "" }: { className?: string }) => (
  <img src="/forge-mark.png" alt="" className={className} aria-hidden="true" />
);


const systems = [
  "People and leadership",
  "Opportunities and priorities",
  "Systems and workflows",
  "Communication and coordination",
  "Performance, participation and student experience",
  "Capacity, risk and resilience",
];

const method = [
  ["01", "Measure", "Make the invisible visible."],
  ["02", "Understand", "Find the constraint beneath the symptom."],
  ["03", "Improve", "Strengthen the system, then measure again."],
];

export default function AboutPage() {
  return (
    <main className="forge-light overflow-hidden">
      <header className="relative z-20 border-b forge-border">
        <div className="forge-container flex h-[76px] items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="Forge home">
            <ForgeMark className="h-9 w-9" />
            <span className="text-sm font-semibold tracking-[0.2em]">FORGE</span>
          </Link>
          <nav className="hidden items-center gap-9 text-[11px] font-semibold uppercase tracking-[0.14em] lg:flex">
            <Link href="/#diagnostic" className="transition-colors hover:text-[var(--forge-bronze)]">Stress Test</Link>
            <Link href="/#method" className="transition-colors hover:text-[var(--forge-bronze)]">Method</Link>
            <Link href="/#intelligence" className="transition-colors hover:text-[var(--forge-bronze)]">Intelligence</Link>
            <Link href="/about" aria-current="page" className="text-[var(--forge-bronze)]">About</Link>
          </nav>
          <Link href="/stress-test" className="forge-button forge-button-primary">Start the test</Link>
        </div>
      </header>

      <section className="border-b forge-border">
        <div className="forge-container grid min-h-[680px] lg:grid-cols-12">
          <div className="flex flex-col justify-between py-20 lg:col-span-8 lg:border-r lg:pr-16 forge-border xl:py-28">
            <div>
              <div className="mb-12 flex items-center gap-4"><span className="forge-rule" /><p className="forge-eyebrow">About Forge</p></div>
              <h1 className="forge-display max-w-4xl text-[clamp(4rem,7vw,7.5rem)] text-[var(--forge-forest-deep)]">A clearer view of how school sports leadership really works.</h1>
            </div>
            <p className="mt-16 max-w-3xl border-t pt-8 text-xl leading-9 text-[rgba(17,19,17,0.7)] forge-border md:text-2xl">
              Forge helps Directors of Sport, Athletic Directors, Heads of Sport and other international-school sports leaders see what is really happening in their operations, understand the systems and constraints beneath the visible results, and decide what to improve next.
            </p>
          </div>
          <aside className="flex flex-col justify-between py-20 lg:col-span-4 lg:pl-12 xl:py-28 xl:pl-16">
            <div className="relative mx-auto aspect-square w-full max-w-[290px]">
              <div className="absolute inset-0 rotate-45 border border-[rgba(185,134,74,0.4)]" />
              <div className="absolute inset-[18%] rotate-45 bg-[var(--forge-forest)]" />
              <ForgeMark className="absolute inset-[36%] h-[28%] w-[28%] object-contain" />
            </div>
            <div className="mt-16 border-t pt-6 forge-border"><p className="forge-eyebrow">Independent intelligence</p><p className="mt-3 text-sm leading-6 text-[rgba(17,19,17,0.58)]">Built for sports leadership in international schools. Designed to reveal systems, not judge people.</p></div>
          </aside>
        </div>
      </section>

      <section className="forge-dark forge-section border-b border-[rgba(185,134,74,0.35)]">
        <div className="forge-container grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4"><p className="forge-eyebrow">Why Forge exists</p></div>
          <div className="lg:col-span-8">
            <h2 className="forge-heading max-w-4xl text-5xl md:text-7xl">The visible problem is often only the symptom.</h2>
            <div className="mt-12 grid gap-8 border-t border-[rgba(185,134,74,0.35)] pt-8 md:grid-cols-2">
              <p className="text-lg leading-8 text-[rgba(246,244,238,0.72)]">School sports and athletics operations are often held together by good intentions, individual effort and inherited habits. Delivery continues, so fragility can remain hidden.</p>
              <p className="text-lg leading-8 text-[rgba(246,244,238,0.72)]">Leaders rarely have the time or distance to see the whole system. Forge creates a structured view of what is working, where risk is building and what deserves attention first.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="forge-section border-b forge-border">
        <div className="forge-container grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4"><p className="forge-eyebrow">What Forge examines</p><p className="mt-6 max-w-sm text-base leading-7 text-[rgba(17,19,17,0.62)]">Not isolated activities, but the way the parts of a sports operation interact under real-world pressure.</p></div>
          <div className="lg:col-span-8">
            <h2 className="forge-heading max-w-3xl text-5xl text-[var(--forge-forest-deep)] md:text-7xl">The system behind the offering.</h2>
            <div className="mt-12 grid border-l border-t forge-border md:grid-cols-2">
              {systems.map((item, index) => (
                <div key={item} className="min-h-[150px] border-b border-r p-7 forge-border">
                  <span className="forge-eyebrow">{String(index + 1).padStart(2, "0")}</span>
                  <p className="forge-heading mt-8 text-2xl">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="forge-forest forge-section border-b border-[rgba(185,134,74,0.35)]">
        <div className="forge-container grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4"><p className="forge-eyebrow">How it works</p></div>
          <div className="lg:col-span-8">
            <h2 className="forge-heading max-w-3xl text-5xl md:text-7xl">Measure. Understand. Improve.</h2>
            <div className="mt-14 border-t border-[rgba(185,134,74,0.35)]">
              {method.map(([number, title, text]) => (
                <div key={number} className="grid gap-4 border-b border-[rgba(185,134,74,0.35)] py-7 md:grid-cols-[64px_180px_1fr] md:items-center">
                  <span className="forge-eyebrow">{number}</span><h3 className="text-xs font-semibold uppercase tracking-[0.15em]">{title}</h3><p className="text-lg text-[rgba(246,244,238,0.68)]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="forge-section border-b forge-border">
        <div className="forge-container grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4"><p className="forge-eyebrow">Quiet by design</p></div>
          <div className="lg:col-span-8">
            <h2 className="forge-heading max-w-3xl text-5xl text-[var(--forge-forest-deep)] md:text-7xl">Learn from the field without exposing it.</h2>
            <div className="mt-10 max-w-3xl space-y-6 text-lg leading-8 text-[rgba(17,19,17,0.68)]">
              <p>Forge is being built independently and deliberately. It is not a public ranking or a vehicle for spotlighting individual schools and leaders.</p>
              <p>Diagnostic responses are treated as confidential. Learning shared by Forge will focus on aggregated or anonymous patterns, so the field can gain useful intelligence without identifying participating schools.</p>
              <p>The first tool is the free School Sports Systems Stress Test: a focused diagnostic across six dimensions, designed to give leaders a clearer operating profile and one useful next action.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="forge-dark forge-section">
        <div className="forge-container grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8"><p className="forge-eyebrow">Start with the diagnostic</p><h2 className="forge-heading mt-8 max-w-4xl text-5xl md:text-7xl">See the operation more clearly.</h2></div>
          <div className="lg:col-span-4 lg:text-right"><Link href="/stress-test" className="forge-button forge-button-primary">Take the free stress test</Link><p className="mt-5 text-xs uppercase tracking-[0.13em] text-[rgba(246,244,238,0.5)]">24 questions · Confidential · Free</p></div>
        </div>
      </section>

      <footer className="forge-dark border-t border-[rgba(185,134,74,0.35)]">
        <div className="forge-container flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="flex items-center gap-3"><ForgeMark className="h-8 w-8" /><span className="text-xs font-semibold tracking-[0.2em]">FORGE</span></Link>
          <p className="text-xs tracking-[0.1em] text-[rgba(246,244,238,0.45)]">© 2026 FORGE · INDEPENDENT INTELLIGENCE FOR SCHOOL SPORTS LEADERSHIP</p>
        </div>
      </footer>
    </main>
  );
}
