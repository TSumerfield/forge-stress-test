import Link from "next/link";

const ForgeMark = ({ className = "" }: { className?: string }) => <img src="/forge-mark.png" alt="" className={className} aria-hidden="true" />;

const products = [
  ["01", "Systems Stress Test", "Measure structural strength across leadership dependency, operational clarity, ownership, coaching consistency, knowledge resilience and capacity to improve.", "/stress-test", "Take the Stress Test"],
  ["02", "Readiness Check", "Find unresolved operational risks most likely to disrupt the start of a year or season.", "/readiness-check", "Check readiness"],
  ["03", "Department Benchmarking", "A developing confidential evidence base for comparing school sports operations with relevant peers.", "/benchmarking", "Explore benchmarking"],
];

export default function DepartmentsPage() {
  return (
    <main className="forge-light overflow-hidden">
      <header className="border-b forge-border"><div className="forge-container flex h-[76px] items-center justify-between"><Link href="/" className="flex items-center gap-3" aria-label="Forge home"><ForgeMark className="h-9 w-9" /><span className="text-sm font-semibold tracking-[0.2em]">FORGE</span></Link><nav className="hidden items-center gap-8 text-[11px] font-semibold uppercase tracking-[0.14em] lg:flex"><Link href="/departments" className="text-[var(--forge-bronze)]">Departments</Link><Link href="/associations">Associations</Link><Link href="/benchmarking">Benchmarking</Link><Link href="/about">About</Link></nav><Link href="/stress-test" className="forge-button forge-button-primary">Stress test</Link></div></header>

      <section className="forge-dark border-b border-[rgba(185,134,74,0.35)]"><div className="forge-container grid min-h-[700px] gap-14 py-20 lg:grid-cols-12 lg:items-end lg:py-28"><div className="lg:col-span-4 lg:self-start"><p className="forge-eyebrow">Forge for departments</p></div><div className="lg:col-span-8"><h1 className="forge-display max-w-5xl text-[clamp(4rem,7.2vw,7.8rem)]">Strengthen the systems behind school sport.</h1><p className="mt-10 max-w-3xl text-xl leading-9 text-[rgba(246,244,238,0.7)]">Forge helps Directors of Sport, Athletic Directors and school sports leaders measure operational strength, expose hidden fragility and focus improvement where it matters most.</p><div className="mt-10 flex flex-wrap gap-4"><Link href="/stress-test" className="forge-button forge-button-primary">Take the Stress Test</Link><Link href="/readiness-check" className="forge-button">Check readiness</Link></div></div></div></section>

      <section className="forge-section border-b forge-border"><div className="forge-container grid gap-12 lg:grid-cols-12"><div className="lg:col-span-4"><p className="forge-eyebrow">Department intelligence</p></div><div className="lg:col-span-8"><h2 className="forge-heading max-w-4xl text-5xl text-[var(--forge-forest-deep)] md:text-7xl">Measure what sits beneath performance.</h2><p className="mt-8 max-w-3xl text-lg leading-8 text-[rgba(17,19,17,0.66)]">A strong sports programme is not just a busy calendar or successful team. It is an operation that can repeat quality, absorb pressure, retain knowledge and improve without depending on heroic effort.</p></div></div>
        <div className="mt-16 grid border-l border-t forge-border lg:grid-cols-3">{products.map(([number,title,text,href,cta]) => <article key={number} className="flex min-h-[340px] flex-col justify-between border-b border-r p-8 forge-border"><div><span className="forge-eyebrow">{number}</span><h3 className="forge-heading mt-12 text-4xl text-[var(--forge-forest-deep)]">{title}</h3><p className="mt-6 text-sm leading-7 text-[rgba(17,19,17,0.62)]">{text}</p></div><Link href={href} className="mt-10 w-fit text-xs font-semibold uppercase tracking-[0.13em] text-[var(--forge-bronze)] underline underline-offset-8">{cta}</Link></article>)}</div>
      </section>

      <section className="forge-forest forge-section border-b border-[rgba(185,134,74,0.35)]"><div className="forge-container grid gap-12 lg:grid-cols-12"><div className="lg:col-span-4"><p className="forge-eyebrow">Shared intelligence</p></div><div className="lg:col-span-8"><h2 className="forge-heading max-w-4xl text-5xl md:text-7xl">From one department to a stronger evidence base.</h2><p className="mt-8 max-w-3xl text-lg leading-8 text-[rgba(246,244,238,0.7)]">Every valid diagnostic response helps Forge understand which operating patterns recur across international-school sport. Benchmark claims will only be published when the evidence is strong enough to support them.</p><Link href="/benchmarking" className="mt-10 inline-block text-xs font-semibold uppercase tracking-[0.14em] text-[var(--forge-bronze)] underline underline-offset-8">Explore Forge Benchmarking</Link></div></div></section>

      <section className="forge-section"><div className="forge-container grid gap-12 lg:grid-cols-12 lg:items-end"><div className="lg:col-span-8"><p className="forge-eyebrow">Start here</p><h2 className="forge-heading mt-8 max-w-4xl text-5xl text-[var(--forge-forest-deep)] md:text-7xl">Find the weakest part of the system before adding more activity.</h2></div><div className="lg:col-span-4 lg:text-right"><Link href="/stress-test" className="forge-button forge-button-primary">Take the free Stress Test</Link></div></div></section>
    </main>
  );
}
