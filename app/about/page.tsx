import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Forge",
  description: "Forge develops practical diagnostics, research and benchmarking for sports leadership in international schools.",
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
  ["01", "Measure", "Establish what is happening now."],
  ["02", "Understand", "Identify the main constraint or weakness."],
  ["03", "Improve", "Take a practical next step and review the result."],
];

export default function AboutPage() {
  return (
    <main className="forge-light overflow-hidden">
      <header className="relative z-20 border-b forge-border">
        <div className="forge-container flex h-[76px] items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="Forge home"><ForgeMark className="h-9 w-9" /><span className="text-sm font-semibold tracking-[0.2em]">FORGE</span></Link>
          <nav className="hidden items-center gap-9 text-[11px] font-semibold uppercase tracking-[0.14em] lg:flex"><Link href="/diagnostics">Diagnostics</Link><Link href="/insights">Insights</Link><Link href="/benchmarking">Benchmarking</Link><Link href="/about" aria-current="page" className="text-[var(--forge-bronze)]">About</Link></nav>
          <Link href="/diagnostics" className="forge-button forge-button-primary">Start a diagnostic</Link>
        </div>
      </header>

      <section className="border-b forge-border"><div className="forge-container grid min-h-[680px] lg:grid-cols-12"><div className="flex flex-col justify-between py-20 lg:col-span-8 lg:border-r lg:pr-16 forge-border xl:py-28"><div><div className="mb-12 flex items-center gap-4"><span className="forge-rule" /><p className="forge-eyebrow">About Forge</p></div><h1 className="forge-display max-w-4xl text-[clamp(4rem,7vw,7.5rem)] text-[var(--forge-forest-deep)]">Practical research for school sports leadership.</h1></div><p className="mt-16 max-w-3xl border-t pt-8 text-xl leading-9 text-[rgba(17,19,17,0.7)] forge-border md:text-2xl">Forge develops diagnostics, research and benchmarking to help sports leaders understand their operations and make better-informed decisions.</p></div><aside className="flex flex-col justify-between py-20 lg:col-span-4 lg:pl-12 xl:py-28 xl:pl-16"><div className="relative mx-auto aspect-square w-full max-w-[290px]"><div className="absolute inset-0 rotate-45 border border-[rgba(185,134,74,0.4)]" /><div className="absolute inset-[18%] rotate-45 bg-[var(--forge-forest)]" /><ForgeMark className="absolute inset-[36%] h-[28%] w-[28%] object-contain" /></div><div className="mt-16 border-t pt-6 forge-border"><p className="forge-eyebrow">Focus</p><p className="mt-3 text-sm leading-6 text-[rgba(17,19,17,0.58)]">Sports leadership in international schools and school-sports associations.</p></div></aside></div></section>

      <section className="forge-dark forge-section border-b border-[rgba(185,134,74,0.35)]"><div className="forge-container grid gap-12 lg:grid-cols-12"><div className="lg:col-span-4"><p className="forge-eyebrow">Why Forge exists</p></div><div className="lg:col-span-8"><h2 className="forge-heading max-w-4xl text-5xl md:text-7xl">Busy departments can still have weak systems.</h2><div className="mt-12 grid gap-8 border-t border-[rgba(185,134,74,0.35)] pt-8 md:grid-cols-2"><p className="text-lg leading-8 text-[rgba(246,244,238,0.72)]">Sport programmes rely on people, calendars, communication, facilities, coaching and repeated operational processes.</p><p className="text-lg leading-8 text-[rgba(246,244,238,0.72)]">Forge provides structured ways to examine those areas, identify recurring issues and build a more useful evidence base over time.</p></div></div></div></section>

      <section className="forge-section border-b forge-border"><div className="forge-container grid gap-12 lg:grid-cols-12"><div className="lg:col-span-4"><p className="forge-eyebrow">What Forge examines</p><p className="mt-6 max-w-sm text-base leading-7 text-[rgba(17,19,17,0.62)]">The operational areas that shape how a sports programme works day to day.</p></div><div className="lg:col-span-8"><h2 className="forge-heading max-w-3xl text-5xl text-[var(--forge-forest-deep)] md:text-7xl">The systems behind school sport.</h2><div className="mt-12 grid border-l border-t forge-border md:grid-cols-2">{systems.map((item,index)=><div key={item} className="min-h-[150px] border-b border-r p-7 forge-border"><span className="forge-eyebrow">{String(index+1).padStart(2,"0")}</span><p className="forge-heading mt-8 text-2xl">{item}</p></div>)}</div></div></div></section>

      <section className="forge-forest forge-section border-b border-[rgba(185,134,74,0.35)]"><div className="forge-container grid gap-12 lg:grid-cols-12"><div className="lg:col-span-4"><p className="forge-eyebrow">Method</p></div><div className="lg:col-span-8"><h2 className="forge-heading max-w-3xl text-5xl md:text-7xl">Measure. Understand. Improve.</h2><div className="mt-14 border-t border-[rgba(185,134,74,0.35)]">{method.map(([number,title,text])=><div key={number} className="grid gap-4 border-b border-[rgba(185,134,74,0.35)] py-7 md:grid-cols-[64px_180px_1fr] md:items-center"><span className="forge-eyebrow">{number}</span><h3 className="text-xs font-semibold uppercase tracking-[0.15em]">{title}</h3><p className="text-lg text-[rgba(246,244,238,0.68)]">{text}</p></div>)}</div></div></div></section>

      <section className="forge-section border-b forge-border"><div className="forge-container grid gap-12 lg:grid-cols-12"><div className="lg:col-span-4"><p className="forge-eyebrow">Confidentiality</p></div><div className="lg:col-span-8"><h2 className="forge-heading max-w-3xl text-5xl text-[var(--forge-forest-deep)] md:text-7xl">Use data carefully.</h2><div className="mt-10 max-w-3xl space-y-6 text-lg leading-8 text-[rgba(17,19,17,0.68)]"><p>Diagnostic responses are treated as confidential. Published findings will use aggregated or anonymous patterns rather than identifiable school-level results.</p><p>Benchmark comparisons will only be presented when the available data is sufficiently consistent and comparable.</p></div></div></div></section>

      <section className="forge-dark forge-section"><div className="forge-container grid gap-12 lg:grid-cols-12 lg:items-end"><div className="lg:col-span-8"><p className="forge-eyebrow">Start here</p><h2 className="forge-heading mt-8 max-w-4xl text-5xl md:text-7xl">Choose the diagnostic that fits your setting.</h2></div><div className="lg:col-span-4 lg:text-right"><Link href="/diagnostics" className="forge-button forge-button-primary">View diagnostics</Link></div></div></section>

      <footer className="forge-dark border-t border-[rgba(185,134,74,0.35)]"><div className="forge-container flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between"><Link href="/" className="flex items-center gap-3"><ForgeMark className="h-8 w-8" /><span className="text-xs font-semibold tracking-[0.2em]">FORGE</span></Link><p className="text-xs tracking-[0.1em] text-[rgba(246,244,238,0.45)]">© 2026 FORGE · SCHOOL SPORTS RESEARCH AND DIAGNOSTICS</p></div></footer>
    </main>
  );
}
