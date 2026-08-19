import Link from "next/link";

const Keystone = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
    <path d="M16 8H48L56 24L32 56L8 24L16 8Z" stroke="currentColor" strokeWidth="2" />
    <path d="M16 8L32 56L48 8" stroke="currentColor" strokeWidth="2" />
    <path d="M8 24H56" stroke="currentColor" strokeWidth="2" />
  </svg>
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

export default function Home() {
  return (
    <main className="forge-light overflow-hidden">
      <header className="relative z-20 border-b forge-border">
        <div className="forge-container flex h-[76px] items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="Forge home">
            <Keystone className="h-8 w-8 text-[var(--forge-bronze)]" />
            <span className="text-sm font-semibold tracking-[0.2em]">FORGE</span>
          </Link>
          <nav className="hidden items-center gap-9 text-[11px] font-semibold uppercase tracking-[0.14em] lg:flex">
            <a href="#diagnostic" className="transition-colors hover:text-[var(--forge-bronze)]">Stress Test</a>
            <a href="#method" className="transition-colors hover:text-[var(--forge-bronze)]">Method</a>
            <a href="#intelligence" className="transition-colors hover:text-[var(--forge-bronze)]">Intelligence</a>
          </nav>
          <Link href="/stress-test" className="forge-button forge-button-primary">Start the test <Arrow /></Link>
        </div>
      </header>

      <section className="relative border-b forge-border">
        <div className="pointer-events-none absolute inset-y-0 left-[calc(50%+270px)] hidden w-px bg-[rgba(185,134,74,0.22)] xl:block" />
        <div className="forge-container grid min-h-[calc(100vh-76px)] items-stretch lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_430px]">
          <div className="flex flex-col justify-between py-16 lg:py-20 xl:py-24">
            <div>
              <div className="mb-12 flex items-center gap-4"><span className="forge-rule" /><p className="forge-eyebrow">Independent intelligence for school sport</p></div>
              <h1 className="forge-display max-w-[920px] text-[clamp(4.2rem,8.1vw,8.2rem)] text-[var(--forge-forest-deep)]">Better sport is built on better systems.</h1>
            </div>
            <div className="mt-16 grid max-w-[920px] gap-8 border-t pt-8 forge-border md:grid-cols-[1fr_auto] md:items-end">
              <p className="max-w-xl text-lg leading-8 text-[rgba(17,19,17,0.72)] xl:text-xl">Forge helps school sports leaders see where their department is strong, where it is exposed and what to strengthen first.</p>
              <Link href="/stress-test" className="forge-button forge-button-primary w-fit">Take the free stress test <Arrow /></Link>
            </div>
          </div>
          <aside className="relative hidden border-l forge-border lg:flex lg:flex-col lg:justify-between lg:py-20 lg:pl-12 xl:py-24 xl:pl-16">
            <div className="relative aspect-square w-full max-w-[330px]">
              <div className="absolute inset-0 rotate-45 border border-[rgba(185,134,74,0.4)]" />
              <div className="absolute inset-[15%] rotate-45 border border-[rgba(185,134,74,0.28)]" />
              <div className="absolute inset-[30%] rotate-45 bg-[var(--forge-forest)]" />
              <Keystone className="absolute inset-[35%] h-[30%] w-[30%] text-[var(--forge-bronze)]" />
              <span className="absolute left-0 top-1/2 h-px w-full bg-[rgba(185,134,74,0.25)]" />
              <span className="absolute left-1/2 top-0 h-full w-px bg-[rgba(185,134,74,0.25)]" />
            </div>
            <div className="border-t pt-6 forge-border"><p className="forge-eyebrow">Measure · Understand · Improve</p><p className="mt-3 max-w-[280px] text-sm leading-6 text-[rgba(17,19,17,0.58)]">A clearer view of the systems behind your programme.</p></div>
          </aside>
        </div>
      </section>

      <section className="forge-dark border-b border-[rgba(185,134,74,0.35)]">
        <div className="forge-container grid gap-12 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-4"><p className="forge-eyebrow">The hidden risk</p></div>
          <div className="lg:col-span-8">
            <h2 className="forge-heading max-w-4xl text-4xl md:text-6xl">A busy department can look successful while becoming increasingly fragile.</h2>
            <div className="mt-12 grid gap-8 border-t border-[rgba(185,134,74,0.35)] pt-8 md:grid-cols-2">
              <p className="text-lg leading-8 text-[rgba(246,244,238,0.72)]">Fixtures happen. Teams compete. Trips run. Parents get informed. Delivery continues.</p>
              <p className="text-lg leading-8 text-[rgba(246,244,238,0.72)]">Yet knowledge stays in people&apos;s heads, leaders become bottlenecks and constant delivery leaves no capacity to improve.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="diagnostic" className="forge-section border-b forge-border">
        <div className="forge-container">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4"><p className="forge-eyebrow">Forge diagnostic / 001</p><p className="mt-6 max-w-sm text-sm leading-6 text-[rgba(17,19,17,0.6)]">Free · Confidential · Approximately 10 minutes</p></div>
            <div className="lg:col-span-8"><h2 className="forge-heading text-5xl text-[var(--forge-forest-deep)] md:text-7xl">The Sport Department Stress Test</h2><p className="mt-8 max-w-2xl text-xl leading-8 text-[rgba(17,19,17,0.68)]">Assess the six conditions that determine whether your department is resilient or merely coping.</p></div>
          </div>
          <div className="mt-16 grid border-l border-t forge-border md:grid-cols-2 lg:grid-cols-3">
            {dimensions.map(([number, title, description]) => (
              <article key={number} className="group min-h-[250px] border-b border-r p-7 forge-border transition-colors hover:bg-[var(--forge-forest)] hover:text-[var(--forge-ivory)] lg:p-9">
                <div className="flex items-center justify-between"><span className="forge-eyebrow">{number}</span><span className="h-2 w-2 rotate-45 bg-[var(--forge-bronze)]" /></div>
                <h3 className="forge-heading mt-14 text-2xl">{title}</h3>
                <p className="mt-4 text-sm leading-6 text-[rgba(17,19,17,0.6)] group-hover:text-[rgba(246,244,238,0.68)]">{description}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <p className="text-sm leading-6 text-[rgba(17,19,17,0.6)]">Receive your departmental profile and one high-leverage action.</p>
            <Link href="/stress-test" className="forge-button forge-button-primary w-fit">See where you are exposed <Arrow /></Link>
          </div>
        </div>
      </section>

      <section id="method" className="forge-forest forge-section border-b border-[rgba(185,134,74,0.35)]">
        <div className="forge-container grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4"><p className="forge-eyebrow">The Forge method</p></div>
          <div className="lg:col-span-8">
            <h2 className="forge-heading max-w-3xl text-5xl md:text-7xl">Do not treat the symptom. Find the system causing it.</h2>
            <div className="mt-16 border-t border-[rgba(185,134,74,0.35)]">
              {method.map(([number, title, text]) => (
                <div key={number} className="grid gap-4 border-b border-[rgba(185,134,74,0.35)] py-7 md:grid-cols-[64px_180px_1fr] md:items-center">
                  <span className="forge-eyebrow">{number}</span><h3 className="text-xs font-semibold uppercase tracking-[0.15em]">{title}</h3><p className="text-base text-[rgba(246,244,238,0.66)] md:text-lg">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="intelligence" className="forge-section border-b forge-border">
        <div className="forge-container grid gap-16 lg:grid-cols-[1fr_0.85fr] lg:items-end">
          <div><p className="forge-eyebrow">What Forge is building</p><h2 className="forge-heading mt-8 max-w-3xl text-5xl text-[var(--forge-forest-deep)] md:text-7xl">The intelligence layer for school sport.</h2><p className="mt-8 max-w-2xl text-lg leading-8 text-[rgba(17,19,17,0.68)]">Forge turns operational experience into shared intelligence: clearer diagnostics, useful benchmarks and practical systems that compound over time.</p></div>
          <div className="grid grid-cols-2 border-l border-t forge-border">
            {["Diagnostics", "Patterns", "Benchmarks", "Better systems"].map((item, index) => <div key={item} className="aspect-square border-b border-r p-6 forge-border"><span className="forge-eyebrow">0{index + 1}</span><p className="forge-heading mt-12 text-xl">{item}</p></div>)}
          </div>
        </div>
      </section>

      <section className="forge-dark forge-section">
        <div className="forge-container grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8"><p className="forge-eyebrow">Start here</p><h2 className="forge-heading mt-8 text-5xl md:text-7xl">Know where your department is exposed.</h2></div>
          <div className="lg:col-span-4 lg:text-right"><Link href="/stress-test" className="forge-button forge-button-primary">Take the free stress test <Arrow /></Link><p className="mt-5 text-xs uppercase tracking-[0.13em] text-[rgba(246,244,238,0.5)]">24 questions · Confidential · Free</p></div>
        </div>
      </section>

      <footer className="forge-dark border-t border-[rgba(185,134,74,0.35)]">
        <div className="forge-container flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3"><Keystone className="h-7 w-7 text-[var(--forge-bronze)]" /><span className="text-xs font-semibold tracking-[0.2em]">FORGE</span></div>
          <p className="text-xs tracking-[0.1em] text-[rgba(246,244,238,0.45)]">© 2026 FORGE · INDEPENDENT INTELLIGENCE FOR SCHOOL SPORT</p>
        </div>
      </footer>
    </main>
  );
}
