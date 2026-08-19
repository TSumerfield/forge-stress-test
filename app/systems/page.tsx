import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Systems | Forge",
  description: "Practical operating frameworks for stronger school sport departments.",
};

const ForgeMark = ({ className = "" }: { className?: string }) => (
  <img src="/forge-mark.png" alt="" className={className} aria-hidden="true" />
);

const Arrow = () => <span aria-hidden="true">↗</span>;

const systems = [
  ["01", "Leadership & ownership", "Decision rights, priorities, role clarity and accountability."],
  ["02", "Coaching standards", "Shared expectations that protect programme quality across teams and coaches."],
  ["03", "Operations", "Repeatable workflows for fixtures, events, communication and delivery."],
  ["04", "Knowledge & handover", "Ways to capture critical knowledge so continuity does not depend on memory."],
  ["05", "Review & improvement", "Simple review rhythms that turn experience into better future decisions."],
  ["06", "Capacity & resilience", "Protocols that reduce bottlenecks and protect the department under pressure."],
];

export default function SystemsPage() {
  return (
    <main className="forge-light overflow-hidden">
      <header className="border-b forge-border">
        <div className="forge-container flex h-[76px] items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <ForgeMark className="h-9 w-9" />
            <span className="text-sm font-semibold tracking-[0.2em]">FORGE</span>
          </Link>
          <nav className="hidden items-center gap-8 text-[11px] font-semibold uppercase tracking-[0.14em] lg:flex">
            <Link href="/stress-test">Stress Test</Link>
            <Link href="/insights">Insights</Link>
            <Link href="/systems" className="text-[var(--forge-bronze)]">Systems</Link>
            <Link href="/benchmarking">Benchmarking</Link>
            <Link href="/about">About</Link>
          </nav>
          <Link href="/stress-test" className="forge-button forge-button-primary">
            Start the test <Arrow />
          </Link>
        </div>
      </header>

      <section className="border-b forge-border">
        <div className="forge-container grid min-h-[620px] gap-12 py-20 lg:grid-cols-12 lg:items-end lg:py-28">
          <div className="lg:col-span-4 lg:self-start">
            <p className="forge-eyebrow">Forge systems</p>
            <p className="mt-6 max-w-xs text-sm leading-6 text-[rgba(17,19,17,0.58)]">
              Practical operating IP for recurring department problems.
            </p>
          </div>
          <div className="lg:col-span-8">
            <h1 className="forge-display max-w-4xl text-[clamp(4rem,7vw,7.4rem)] text-[var(--forge-forest-deep)]">
              Useful systems beat heroic effort.
            </h1>
            <p className="mt-10 max-w-2xl text-xl leading-9 text-[rgba(17,19,17,0.68)]">
              Forge is building practical frameworks, protocols and tools that make strong practice easier to repeat and less dependent on individual memory.
            </p>
          </div>
        </div>
      </section>

      <section className="forge-section border-b forge-border">
        <div className="forge-container">
          <div className="mb-12 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="forge-eyebrow">Available now</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:col-span-8">
              <Link
                href="/systems/dependency-audit"
                className="block border forge-border p-8 transition-colors hover:bg-white/40 md:p-9"
              >
                <p className="forge-eyebrow">System 001 / Free protocol</p>
                <h2 className="forge-heading mt-8 text-4xl text-[var(--forge-forest-deep)]">Dependency Audit</h2>
                <p className="mt-6 text-sm leading-7 text-[rgba(17,19,17,0.62)]">
                  A five-day protocol for finding where delivery depends on a person when it should depend on a system.
                </p>
                <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--forge-bronze)]">
                  Use the protocol ↗
                </p>
              </Link>

              <Link
                href="/systems/coaching-baseline"
                className="block border forge-border p-8 transition-colors hover:bg-white/40 md:p-9"
              >
                <p className="forge-eyebrow">System 002 / Free protocol</p>
                <h2 className="forge-heading mt-8 text-4xl text-[var(--forge-forest-deep)]">Coaching Baseline</h2>
                <p className="mt-6 text-sm leading-7 text-[rgba(17,19,17,0.62)]">
                  A practical protocol for making minimum coaching standards visible, observable and coachable across different sports.
                </p>
                <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--forge-bronze)]">
                  Use the protocol ↗
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="forge-section border-b forge-border">
        <div className="forge-container">
          <div className="mb-10">
            <p className="forge-eyebrow">System map / development areas</p>
          </div>
          <div className="grid border-l border-t forge-border md:grid-cols-2 lg:grid-cols-3">
            {systems.map(([number, title, text]) => (
              <article key={number} className="min-h-[270px] border-b border-r p-8 forge-border">
                <span className="forge-eyebrow">{number}</span>
                <h2 className="forge-heading mt-14 text-3xl text-[var(--forge-forest-deep)]">{title}</h2>
                <p className="mt-5 text-sm leading-7 text-[rgba(17,19,17,0.62)]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="forge-dark forge-section border-b border-[rgba(185,134,74,0.35)]">
        <div className="forge-container grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="forge-eyebrow">Build rule</p>
          </div>
          <div className="lg:col-span-8">
            <h2 className="forge-heading max-w-4xl text-5xl md:text-7xl">Forge will not build a library nobody needs.</h2>
            <div className="mt-10 grid gap-8 border-t border-[rgba(185,134,74,0.35)] pt-8 md:grid-cols-2">
              <p className="text-lg leading-8 text-[rgba(246,244,238,0.7)]">
                New systems will be developed around recurring problems identified through diagnostics and field evidence.
              </p>
              <p className="text-lg leading-8 text-[rgba(246,244,238,0.7)]">
                The aim is a small collection of unusually useful tools, improved through use, rather than a large archive of generic templates.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="forge-section border-b forge-border">
        <div className="forge-container grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="forge-eyebrow">What comes first</p>
          </div>
          <div className="lg:col-span-8">
            <h2 className="forge-heading text-5xl text-[var(--forge-forest-deep)] md:text-7xl">Diagnose before prescribing.</h2>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-[rgba(17,19,17,0.66)]">
              The Stress Test is the current starting point. It helps identify which operating problem deserves attention before Forge creates or recommends a solution.
            </p>
            <Link href="/stress-test" className="forge-button forge-button-primary mt-10">
              Take the stress test <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
