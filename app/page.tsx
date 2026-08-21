import Link from "next/link";

const ForgeMark = ({ className = "" }: { className?: string }) => (
  <img src="/forge-mark.png" alt="" className={className} aria-hidden="true" />
);
const Arrow = () => <span aria-hidden="true">↗</span>;

const dimensions = [
  ["01", "Leadership dependency", "Can the department operate without one person holding it together?"],
  ["02", "Operational clarity", "Are routines, responsibilities and standards explicit?"],
  ["03", "Ownership", "Do the right decisions sit with the right people?"],
  ["04", "Coaching consistency", "Does quality survive different teams, coaches and seasons?"],
  ["05", "Knowledge resilience", "Is critical knowledge captured, accessible and transferable?"],
  ["06", "Capacity to improve", "Is there space to build the future while delivering today?"],
];

const method = [
  ["01", "Measure", "Make the invisible visible."],
  ["02", "Understand", "Find the constraint beneath the symptom."],
  ["03", "Improve", "Strengthen the system, then measure again."],
];

const ecosystem = [
  ["01", "Diagnostics", "Measure the systems behind your department and identify where attention is most valuable.", "/stress-test", "Start with the Stress Test"],
  ["02", "Insights", "Use field observations, emerging research and operating patterns to see familiar problems differently.", "/insights", "Explore insights"],
  ["03", "Systems", "Practical frameworks and protocols built around recurring department problems, not generic templates.", "/systems", "Explore systems"],
  ["04", "Benchmarking", "A developing evidence base for comparing departments with relevant peers while protecting confidentiality.", "/benchmarking", "See the direction"],
];

export default function Home() {
  return (
    <main className="forge-light overflow-hidden">
      <header className="relative z-20 border-b forge-border">
        <div className="forge-container flex h-[76px] items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="Forge home">
            <ForgeMark className="h-9 w-9" />
            <span className="text-sm font-semibold tracking-[0.2em]">FORGE</span>
          </Link>
          <nav className="hidden items-center gap-8 text-[11px] font-semibold uppercase tracking-[0.14em] lg:flex">
            <Link href="/stress-test" className="transition-colors hover:text-[var(--forge-bronze)]">Stress Test</Link>
            <Link href="/readiness-check" className="transition-colors hover:text-[var(--forge-bronze)]">Readiness Check</Link>
            <Link href="/insights" className="transition-colors hover:text-[var(--forge-bronze)]">Insights</Link>
            <Link href="/systems" className="transition-colors hover:text-[var(--forge-bronze)]">Systems</Link>
            <Link href="/benchmarking" className="transition-colors hover:text-[var(--forge-bronze)]">Benchmarking</Link>
            <Link href="/about" className="transition-colors hover:text-[var(--forge-bronze)]">About</Link>
          </nav>
          <Link href="/stress-test" className="forge-button forge-button-primary">Start the test <Arrow /></Link>
        </div>
      </header>

      <section className="relative border-b forge-border">
        <div className="forge-container grid min-h-[calc(100vh-76px)] items-stretch lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_430px]">
          <div className="flex flex-col justify-between py-16 lg:py-20 xl:py-24">
            <div>
              <div className="mb-12 flex items-center gap-4"><span className="forge-rule" /><p className="forge-eyebrow">Independent intelligence for school sport</p></div>
              <h1 className="forge-display max-w-[920px] text-[clamp(4.2rem,8.1vw,8.2rem)] text-[var(--forge-forest-deep)]">Better sport is built on better systems.</h1>
            </div>
            <div className="mt-16 grid max-w-[920px] gap-8 border-t pt-8 forge-border md:grid-cols-[1fr_auto] md:items-end">
              <p className="max-w-xl text-lg leading-8 text-[rgba(17,19,17,0.72)] xl:text-xl">Forge helps school sports leaders measure their department, understand the systems beneath performance and strengthen what matters most.</p>
              <Link href="/stress-test" className="forge-button forge-button-primary w-fit">Take the free stress test <Arrow /></Link>
            </div>
          </div>
          <aside className="relative hidden border-l forge-border lg:flex lg:flex-col lg:justify-between lg:py-20 lg:pl-12 xl:py-24 xl:pl-16">
            <div className="relative aspect-square w-full max-w-[330px]">
              <div className="absolute inset-0 rotate-45 border border-[rgba(185,134,74,0.4)]" />
              <div className="absolute inset-[15%] rotate-45 border border-[rgba(185,134,74,0.28)]" />
              <div className="absolute inset-[30%] rotate-45 bg-[var(--forge-forest)]" />
              <ForgeMark className="absolute inset-[36%] h-[28%] w-[28%] object-contain" />
              <span className="absolute left-0 top-1/2 h-px w-full bg-[rgba(185,134,74,0.25)]" />
              <span className="absolute left-1/2 top-0 h-full w-px bg-[rgba(185,134,74,0.25)]" />
            </div>
            <div className="border-t pt-6 forge-border"><p className="forge-eyebrow">Measure · Understand · Improve</p><p className="mt-3 max-w-[280px] text-sm leading-6 text-[rgba(17,19,17,0.58)]">Diagnostics, intelligence and practical systems for stronger departments.</p></div>
          </aside>
        </div>
      </section>

      <section className="forge-dark border-b border-[rgba(185,134,74,0.35)]">
        <div className="forge-container grid gap-12 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-4"><p className="forge-eyebrow">The hidden risk</p></div>
          <div className="lg:col-span-8">
            <h2 className="forge-heading max-w-4xl text-4xl md:text-6xl">A busy department can look successful while becoming increasingly fragile.</h2>
            <div className="mt-12 grid gap-8 border-t border-[rgba(185,134,74,0.35)] pt-8 md:grid-cols-2"><p className="text-lg leading-8 text-[rgba(246,244,238,0.72)]">Fixtures happen. Teams compete. Trips run. Parents get informed. Delivery continues.</p><p className="text-lg leading-8 text-[rgba(246,244,238,0.72)]">Yet knowledge stays in people&apos;s heads, leaders become bottlenecks and constant delivery leaves no capacity to improve.</p></div>
          </div>
        </div>
      </section>

      <section className="forge-dark border-b border-[rgba(185,134,74,0.35)]">
        <div className="forge-container grid lg:grid-cols-12">
          <figure className="relative min-h-[430px] overflow-hidden lg:col-span-8 lg:min-h-[620px]"><img src="/forge-track.jpg" alt="Empty athletics track and stadium at first light" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,26,22,0.78)] via-transparent to-transparent" /><figcaption className="absolute bottom-8 left-8 forge-eyebrow text-[var(--forge-ivory)] md:bottom-10 md:left-10">The system behind the performance</figcaption></figure>
          <div className="flex flex-col justify-between border-t border-[rgba(185,134,74,0.35)] px-8 py-10 lg:col-span-4 lg:border-l lg:border-t-0 lg:p-12"><p className="forge-eyebrow">Visible outcomes</p><p className="forge-heading mt-24 text-3xl lg:text-4xl">Performance is what people see. Systems are what make it repeatable.</p></div>
        </div>
      </section>

      <section id="diagnostic" className="forge-section border-b forge-border">
        <div className="forge-container">
          <div className="grid gap-10 lg:grid-cols-12"><div className="lg:col-span-4"><p className="forge-eyebrow">Forge diagnostics</p><p className="mt-6 max-w-sm text-sm leading-6 text-[rgba(17,19,17,0.6)]">Two confidential ways to identify what deserves attention.</p></div><div className="lg:col-span-8"><h2 className="forge-heading text-5xl text-[var(--forge-forest-deep)] md:text-7xl">Understand the system. Prepare for what is next.</h2><p className="mt-8 max-w-2xl text-xl leading-8 text-[rgba(17,19,17,0.68)]">Use the deeper Stress Test to expose structural fragility, or the five-minute Readiness Check to find immediate launch risks.</p></div></div>
          <div className="mt-16 grid border-l border-t forge-border md:grid-cols-2">
            <article className="flex min-h-[360px] flex-col justify-between border-b border-r p-8 forge-border lg:p-10"><div><p className="forge-eyebrow">Diagnostic 001 · Approx. 10 minutes</p><h3 className="forge-heading mt-10 text-4xl text-[var(--forge-forest-deep)] md:text-5xl">Sport Department Stress Test</h3><p className="mt-6 max-w-xl text-base leading-7 text-[rgba(17,19,17,0.64)]">Measure the structural strength and resilience of the systems beneath your department.</p></div><Link href="/stress-test" className="forge-button forge-button-primary mt-10 w-fit">Stress test your department <Arrow /></Link></article>
            <article className="flex min-h-[360px] flex-col justify-between border-b border-r bg-[var(--forge-forest)] p-8 text-[var(--forge-ivory)] forge-border lg:p-10"><div><p className="forge-eyebrow">Diagnostic 002 · Approx. 5 minutes</p><h3 className="forge-heading mt-10 text-4xl md:text-5xl">Sport Year Readiness Check</h3><p className="mt-6 max-w-xl text-base leading-7 text-[rgba(246,244,238,0.68)]">Find the unresolved operational risks most likely to disrupt your opening weeks.</p></div><Link href="/readiness-check" className="forge-button mt-10 w-fit">Check your readiness <Arrow /></Link></article>
          </div>
          <div className="mt-20 grid gap-10 lg:grid-cols-12"><div className="lg:col-span-4"><p className="forge-eyebrow">Inside diagnostic 001</p><p className="mt-6 max-w-sm text-sm leading-6 text-[rgba(17,19,17,0.6)]">6 systems · Confidential · Immediate result</p></div><div className="lg:col-span-8"><h2 className="forge-heading text-4xl text-[var(--forge-forest-deep)] md:text-6xl">The six systems behind departmental strength.</h2></div></div>
          <div className="mt-16 grid border-l border-t forge-border md:grid-cols-2 lg:grid-cols-3">{dimensions.map(([number,title,description]) => <article key={number} className="group min-h-[250px] border-b border-r p-7 forge-border transition-colors hover:bg-[var(--forge-forest)] hover:text-[var(--forge-ivory)] lg:p-9"><div className="flex items-center justify-between"><span className="forge-eyebrow">{number}</span><span className="h-2 w-2 rotate-45 bg-[var(--forge-bronze)]" /></div><h3 className="forge-heading mt-14 text-2xl">{title}</h3><p className="mt-4 text-sm leading-6 text-[rgba(17,19,17,0.6)] group-hover:text-[rgba(246,244,238,0.68)]">{description}</p></article>)}</div>
          <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between"><p className="text-sm leading-6 text-[rgba(17,19,17,0.6)]">Receive your departmental profile and one high-leverage action.</p><Link href="/stress-test" className="forge-button forge-button-primary w-fit">See where you are exposed <Arrow /></Link></div>
        </div>
      </section>

      <section id="method" className="forge-forest forge-section border-b border-[rgba(185,134,74,0.35)]">
        <div className="forge-container grid gap-12 lg:grid-cols-12"><div className="lg:col-span-4"><p className="forge-eyebrow">The Forge method</p></div><div className="lg:col-span-8"><h2 className="forge-heading max-w-3xl text-5xl md:text-7xl">Do not treat the symptom. Find the system causing it.</h2><div className="mt-16 border-t border-[rgba(185,134,74,0.35)]">{method.map(([number,title,text]) => <div key={number} className="grid gap-4 border-b border-[rgba(185,134,74,0.35)] py-7 md:grid-cols-[64px_180px_1fr] md:items-center"><span className="forge-eyebrow">{number}</span><h3 className="text-xs font-semibold uppercase tracking-[0.15em]">{title}</h3><p className="text-base text-[rgba(246,244,238,0.66)] md:text-lg">{text}</p></div>)}</div></div></div>
      </section>

      <section className="forge-section border-b forge-border">
        <div className="forge-container">
          <div className="grid gap-10 lg:grid-cols-12"><div className="lg:col-span-4"><p className="forge-eyebrow">The Forge ecosystem</p></div><div className="lg:col-span-8"><h2 className="forge-heading max-w-4xl text-5xl text-[var(--forge-forest-deep)] md:text-7xl">Measure the department. Build the knowledge. Strengthen the system.</h2><p className="mt-8 max-w-3xl text-lg leading-8 text-[rgba(17,19,17,0.66)]">The Stress Test is the starting point, not the destination. Forge is developing an evidence-led body of diagnostics, intelligence and practical operating systems for international-school sport.</p></div></div>
          <div className="mt-16 grid border-l border-t forge-border md:grid-cols-2">{ecosystem.map(([number,title,text,href,cta]) => <article key={number} className="flex min-h-[310px] flex-col justify-between border-b border-r p-8 forge-border lg:p-10"><div><span className="forge-eyebrow">{number}</span><h3 className="forge-heading mt-12 text-4xl text-[var(--forge-forest-deep)]">{title}</h3><p className="mt-5 max-w-lg text-sm leading-7 text-[rgba(17,19,17,0.62)]">{text}</p></div><Link href={href} className="mt-10 text-xs font-semibold uppercase tracking-[0.13em] text-[var(--forge-bronze)]">{cta} <Arrow /></Link></article>)}</div>
        </div>
      </section>

      <section className="forge-section border-b forge-border">
        <div className="forge-container">
          <div className="grid gap-10 lg:grid-cols-12"><div className="lg:col-span-4"><p className="forge-eyebrow">From Forge / Published now</p></div><div className="lg:col-span-8"><h2 className="forge-heading max-w-4xl text-5xl text-[var(--forge-forest-deep)] md:text-7xl">Thinking you can use, not content for content&apos;s sake.</h2><p className="mt-8 max-w-3xl text-lg leading-8 text-[rgba(17,19,17,0.66)]">The first Forge assets focus on leadership dependency: understanding the pattern, then removing one recurring dependency from the system.</p></div></div>
          <div className="mt-16 grid border-l border-t forge-border lg:grid-cols-2">
            <Link href="/insights/leadership-dependency" className="group flex min-h-[430px] flex-col justify-between border-b border-r p-8 forge-border transition-colors hover:bg-[var(--forge-forest)] hover:text-[var(--forge-ivory)] lg:p-10">
              <div><div className="flex items-center justify-between"><span className="forge-eyebrow">Insight 001</span><span className="h-2 w-2 rotate-45 bg-[var(--forge-bronze)]" /></div><h3 className="forge-heading mt-16 max-w-xl text-4xl md:text-5xl">When one capable leader becomes the operating system.</h3><p className="mt-7 max-w-xl text-base leading-8 text-[rgba(17,19,17,0.62)] group-hover:text-[rgba(246,244,238,0.7)]">Why successful departments can quietly become dependent on the person running them, and the signals that reveal it.</p></div><span className="mt-10 text-xs font-semibold uppercase tracking-[0.13em] text-[var(--forge-bronze)]">Read the insight <Arrow /></span>
            </Link>
            <Link href="/systems/dependency-audit" className="group flex min-h-[430px] flex-col justify-between border-b border-r p-8 forge-border transition-colors hover:bg-[var(--forge-forest)] hover:text-[var(--forge-ivory)] lg:p-10">
              <div><div className="flex items-center justify-between"><span className="forge-eyebrow">System 001 / Free protocol</span><span className="h-2 w-2 rotate-45 bg-[var(--forge-bronze)]" /></div><h3 className="forge-heading mt-16 max-w-xl text-4xl md:text-5xl">Dependency Audit.</h3><p className="mt-7 max-w-xl text-base leading-8 text-[rgba(17,19,17,0.62)] group-hover:text-[rgba(246,244,238,0.7)]">A five-day protocol for finding where your department depends on people when it should depend on systems.</p></div><span className="mt-10 text-xs font-semibold uppercase tracking-[0.13em] text-[var(--forge-bronze)]">Use the protocol <Arrow /></span>
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-4"><Link href="/insights" className="forge-button text-[var(--forge-forest-deep)]">Explore all insights <Arrow /></Link><Link href="/systems" className="forge-button text-[var(--forge-forest-deep)]">Explore all systems <Arrow /></Link></div>
        </div>
      </section>

      <section id="intelligence" className="forge-section border-b forge-border">
        <div className="forge-container grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"><div><p className="forge-eyebrow">What Forge is building</p><h2 className="forge-heading mt-8 max-w-3xl text-5xl text-[var(--forge-forest-deep)] md:text-7xl">The intelligence layer for school sport.</h2><p className="mt-8 max-w-2xl text-lg leading-8 text-[rgba(17,19,17,0.68)]">Forge is building toward clearer diagnostics, stronger operating patterns, useful benchmarks and practical systems that become more valuable as the evidence grows.</p><div className="mt-10 flex flex-wrap gap-4"><Link href="/insights" className="forge-button text-[var(--forge-forest-deep)]">Explore insights <Arrow /></Link><Link href="/benchmarking" className="forge-button text-[var(--forge-forest-deep)]">Benchmarking <Arrow /></Link></div></div><figure className="relative min-h-[440px] overflow-hidden border forge-border"><img src="/forge-facility.jpg" alt="Architectural view through a modern indoor sports facility" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,26,22,0.8)] via-transparent to-transparent" /><figcaption className="absolute bottom-7 left-7 right-7 flex items-end justify-between"><span className="forge-eyebrow text-[var(--forge-ivory)]">Diagnostics · Patterns · Benchmarks</span><ForgeMark className="h-12 w-12" /></figcaption></figure></div>
      </section>

      <section className="forge-dark forge-section"><div className="forge-container grid gap-12 lg:grid-cols-12 lg:items-end"><div className="lg:col-span-8"><p className="forge-eyebrow">Start here</p><h2 className="forge-heading mt-8 text-5xl md:text-7xl">Know where your department is exposed.</h2></div><div className="lg:col-span-4 lg:text-right"><Link href="/stress-test" className="forge-button forge-button-primary">Take the free stress test <Arrow /></Link><p className="mt-5 text-xs uppercase tracking-[0.13em] text-[rgba(246,244,238,0.5)]">6 systems · Confidential · Immediate result</p></div></div></section>

      <footer className="forge-dark border-t border-[rgba(185,134,74,0.35)]"><div className="forge-container flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between"><div className="flex items-center gap-3"><ForgeMark className="h-8 w-8" /><span className="text-xs font-semibold tracking-[0.2em]">FORGE</span></div><div className="flex flex-wrap gap-6 text-[10px] font-semibold uppercase tracking-[0.12em] text-[rgba(246,244,238,0.55)]"><Link href="/insights">Insights</Link><Link href="/systems">Systems</Link><Link href="/benchmarking">Benchmarking</Link><Link href="/about">About</Link></div></div></footer>
    </main>
  );
}
