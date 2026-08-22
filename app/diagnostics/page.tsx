import Link from "next/link";

const ForgeMark = ({ className = "" }: { className?: string }) => <img src="/forge-mark.png" alt="" className={className} aria-hidden="true" />;

const diagnostics = [
  {
    eyebrow: "Department · Approx. 10 minutes",
    title: "School Sports Systems Stress Test",
    text: "Measure the structural strength and resilience of the systems behind your sports and athletics operation.",
    href: "/stress-test",
    cta: "Start the Stress Test",
  },
  {
    eyebrow: "Department · Approx. 5 minutes",
    title: "School Sports Readiness Check",
    text: "Identify unresolved operational risks most likely to disrupt the start of your year or season.",
    href: "/readiness-check",
    cta: "Start the Readiness Check",
  },
  {
    eyebrow: "Association · Approx. 8 minutes",
    title: "Association Health Check",
    text: "Assess governance, member value, competition quality, risk, operations, data and long-term resilience across your association.",
    href: "/association-health-check",
    cta: "Start the Association Health Check",
  },
];

export default function DiagnosticsPage() {
  return (
    <main className="forge-light min-h-screen">
      <header className="border-b forge-border">
        <div className="forge-container flex h-[76px] items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="Forge home"><ForgeMark className="h-9 w-9" /><span className="text-sm font-semibold tracking-[0.2em]">FORGE</span></Link>
          <Link href="/" className="forge-button">Back to Forge</Link>
        </div>
      </header>

      <section className="forge-dark border-b border-[rgba(185,134,74,0.35)]">
        <div className="forge-container grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-4"><p className="forge-eyebrow">Forge diagnostics</p></div>
          <div className="lg:col-span-8"><h1 className="forge-display max-w-5xl text-[clamp(4rem,7.2vw,7.8rem)]">Start with the question you need answered.</h1><p className="mt-8 max-w-3xl text-lg leading-8 text-white/65 md:text-xl">Choose the diagnostic that best matches your current responsibility. Each one is confidential, practical and designed to reveal where attention is most valuable.</p></div>
        </div>
      </section>

      <section className="forge-section">
        <div className="forge-container">
          <div className="grid border-l border-t forge-border md:grid-cols-2 lg:grid-cols-3">
            {diagnostics.map((item, index) => (
              <article key={item.title} className={`flex min-h-[360px] flex-col justify-between border-b border-r p-8 forge-border lg:p-10 ${index === 2 ? "bg-[var(--forge-forest)] text-[var(--forge-ivory)]" : ""}`}>
                <div><p className="forge-eyebrow">{item.eyebrow}</p><h2 className="forge-heading mt-10 text-4xl md:text-5xl">{item.title}</h2><p className={`mt-6 text-base leading-7 ${index === 2 ? "text-white/65" : "text-[rgba(17,19,17,0.64)]"}`}>{item.text}</p></div>
                <Link href={item.href} className={`mt-10 w-fit text-xs font-semibold uppercase tracking-[0.13em] underline underline-offset-8 ${index === 2 ? "text-[var(--forge-bronze)]" : "text-[var(--forge-bronze)]"}`}>{item.cta}</Link>
              </article>
            ))}
          </div>
          <div className="mt-12 border-t forge-border pt-8"><p className="max-w-2xl text-sm leading-7 text-[rgba(17,19,17,0.58)]">Department diagnostics assess the operating system of a school sports programme. The Association Health Check assesses the organisation coordinating multiple member schools. Benchmarking is a separate annual evidence product, not a diagnostic.</p></div>
        </div>
      </section>
    </main>
  );
}
