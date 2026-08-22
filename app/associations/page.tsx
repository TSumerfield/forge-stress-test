import Link from "next/link";

const ForgeMark = ({ className = "" }: { className?: string }) => <img src="/forge-mark.png" alt="" className={className} aria-hidden="true" />;

const stack = [
  ["01", "Diagnose", "Use the Association Health Check to identify structural strengths, weak points and hidden dependency."],
  ["02", "Collect", "Gather a focused annual data return from member schools across participation, programme, resources, operations and student experience."],
  ["03", "Benchmark", "Compare each school confidentially against relevant association peers and track the association as a whole."],
  ["04", "Interpret", "Turn data into practical questions, priorities and evidence for boards, committees and member schools."],
  ["05", "Improve", "Repeat the cycle annually so the dataset, benchmark and association decisions become stronger over time."],
];

const benchmarkAreas = [
  ["Participation", "Students participating, teams per student population, gender participation and competitive opportunities."],
  ["Programme", "Sports offered, seasons, fixtures, tournaments and age groups."],
  ["Resources", "Staffing, coaches, facilities, budgets and transportation."],
  ["Operations", "Cancellations, coach-to-athlete ratios, fixture volume and travel burden."],
  ["Student experience", "Participation, retention, competitive balance and pathways."],
];

export default function AssociationsPage() {
  return (
    <main className="forge-light overflow-hidden">
      <header className="border-b forge-border">
        <div className="forge-container flex h-[76px] items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="Forge home"><ForgeMark className="h-9 w-9" /><span className="text-sm font-semibold tracking-[0.2em]">FORGE</span></Link>
          <nav className="hidden items-center gap-8 text-[11px] font-semibold uppercase tracking-[0.14em] lg:flex">
            <Link href="/stress-test">Departments</Link>
            <Link href="/associations" className="text-[var(--forge-bronze)]">Associations</Link>
            <Link href="/benchmarking">Benchmarking</Link>
            <Link href="/about">About</Link>
          </nav>
          <Link href="/association-health-check" className="forge-button forge-button-primary">Health check</Link>
        </div>
      </header>

      <section className="forge-dark border-b border-[rgba(185,134,74,0.35)]">
        <div className="forge-container grid min-h-[720px] gap-14 py-20 lg:grid-cols-12 lg:items-end lg:py-28">
          <div className="lg:col-span-4 lg:self-start"><p className="forge-eyebrow">Forge for associations</p></div>
          <div className="lg:col-span-8"><h1 className="forge-display max-w-5xl text-[clamp(4rem,7.2vw,7.8rem)]">Understand the system behind the competition.</h1><p className="mt-10 max-w-3xl text-xl leading-9 text-[rgba(246,244,238,0.7)]">Forge helps school-sports associations diagnose their operating health, understand member value and build a confidential evidence base across member schools.</p><div className="mt-10 flex flex-wrap gap-4"><Link href="/association-health-check" className="forge-button forge-button-primary">Take the health check</Link><Link href="/benchmarking" className="forge-button">Explore benchmarking</Link></div></div>
        </div>
      </section>

      <section className="forge-section border-b forge-border">
        <div className="forge-container grid gap-12 lg:grid-cols-12"><div className="lg:col-span-4"><p className="forge-eyebrow">Association intelligence</p></div><div className="lg:col-span-8"><h2 className="forge-heading max-w-4xl text-5xl text-[var(--forge-forest-deep)] md:text-7xl">Diagnose. Collect. Benchmark. Interpret. Improve.</h2><p className="mt-8 max-w-3xl text-lg leading-8 text-[rgba(17,19,17,0.66)]">Forge is not another competition-management platform. It is the intelligence layer that helps an association understand whether its systems, member experience and wider sports ecosystem are actually improving.</p></div></div>
        <div className="mt-16 border-t forge-border">{stack.map(([number,title,text]) => <div key={number} className="grid gap-4 border-b py-7 forge-border md:grid-cols-[70px_220px_1fr] md:items-center"><span className="forge-eyebrow">{number}</span><h3 className="text-sm font-semibold uppercase tracking-[0.12em]">{title}</h3><p className="max-w-3xl text-base leading-7 text-[rgba(17,19,17,0.64)]">{text}</p></div>)}</div>
      </section>

      <section className="forge-forest forge-section border-b border-[rgba(185,134,74,0.35)]">
        <div className="forge-container grid gap-12 lg:grid-cols-12"><div className="lg:col-span-4"><p className="forge-eyebrow">Product 001</p></div><div className="lg:col-span-8"><h2 className="forge-heading max-w-4xl text-5xl md:text-7xl">Association Health Check</h2><p className="mt-8 max-w-3xl text-lg leading-8 text-[rgba(246,244,238,0.7)]">A confidential assessment across governance, member value, competition quality, risk and safeguarding, operations, data and intelligence, and resilience and strategy.</p><Link href="/association-health-check" className="mt-10 inline-block text-xs font-semibold uppercase tracking-[0.14em] text-[var(--forge-bronze)] underline underline-offset-8">Start the Association Health Check</Link></div></div>
      </section>

      <section className="forge-section border-b forge-border">
        <div className="forge-container grid gap-12 lg:grid-cols-12"><div className="lg:col-span-4"><p className="forge-eyebrow">Product 002 / validation</p></div><div className="lg:col-span-8"><h2 className="forge-heading max-w-4xl text-5xl text-[var(--forge-forest-deep)] md:text-7xl">Forge Association Benchmark</h2><p className="mt-8 max-w-3xl text-lg leading-8 text-[rgba(17,19,17,0.66)]">A structured annual return that gives member schools confidential peer context and gives the association a clearer picture of school sport across its network.</p></div></div>
        <div className="mt-16 grid border-l border-t forge-border md:grid-cols-2 lg:grid-cols-3">{benchmarkAreas.map(([title,text]) => <article key={title} className="min-h-[250px] border-b border-r p-8 forge-border"><h3 className="forge-heading text-3xl text-[var(--forge-forest-deep)]">{title}</h3><p className="mt-5 text-sm leading-7 text-[rgba(17,19,17,0.62)]">{text}</p></article>)}</div>
      </section>

      <section className="forge-dark forge-section border-b border-[rgba(185,134,74,0.35)]">
        <div className="forge-container grid gap-12 lg:grid-cols-12"><div className="lg:col-span-4"><p className="forge-eyebrow">Two outputs</p></div><div className="lg:col-span-8 grid gap-8 md:grid-cols-2"><article className="border border-white/15 p-8"><p className="forge-eyebrow">For each member school</p><h3 className="forge-heading mt-8 text-4xl">Your School vs Association Median</h3><p className="mt-6 text-base leading-7 text-white/60">Confidential peer comparison, meaningful context and practical questions for leadership attention.</p></article><article className="border border-white/15 p-8"><p className="forge-eyebrow">For the association</p><h3 className="forge-heading mt-8 text-4xl">State of School Sport</h3><p className="mt-6 text-base leading-7 text-white/60">An annual evidence base showing participation, programme patterns, resource pressures, operational trends and emerging priorities.</p></article></div></div>
      </section>

      <section className="forge-section"><div className="forge-container grid gap-12 lg:grid-cols-12 lg:items-end"><div className="lg:col-span-8"><p className="forge-eyebrow">Start with evidence</p><h2 className="forge-heading mt-8 max-w-4xl text-5xl text-[var(--forge-forest-deep)] md:text-7xl">Measure association health before building more infrastructure.</h2></div><div className="lg:col-span-4 lg:text-right"><Link href="/association-health-check" className="forge-button forge-button-primary">Take the health check</Link></div></div></section>
    </main>
  );
}
