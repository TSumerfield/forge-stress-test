import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Insights | Forge",
  description: "Forge observations and research on the systems behind strong sports and athletics operations in international schools.",
};

const ForgeMark = ({ className = "" }: { className?: string }) => (
  <img src="/forge-mark.png" alt="" className={className} aria-hidden="true" />
);

const insights = [
  { number:"001", label:"Leadership dependency", title:"When one capable leader becomes the operating system", text:"A sports operation can look efficient while quietly becoming dependent on one person to remember, decide and rescue.", href:"/insights/leadership-dependency", status:"Read insight" },
  { number:"002", label:"Coaching consistency", title:"Why standards drift between teams and seasons", text:"Strong individual coaches do not automatically create a consistent athlete experience. Shared expectations have to survive different people and contexts.", href:"/insights/coaching-consistency", status:"Read insight" },
  { number:"003", label:"Knowledge resilience", title:"What leaves when good staff leave", text:"Turnover becomes expensive when the operation loses relationships, routines and decision logic that were never captured in the system.", status:"Research question" },
  { number:"004", label:"Operational clarity", title:"Busy is not the same as controlled", text:"A full calendar can hide unclear ownership, duplicated work and recurring problems that capable staff simply absorb.", status:"Research question" },
  { number:"005", label:"Capacity", title:"Growth can make a successful sports offering more fragile", text:"More teams, games, competitions and opportunities add value only when the operating system can absorb the additional complexity.", status:"Research question" },
  { number:"006", label:"Evidence", title:"Measure what helps leaders decide", text:"Useful evidence should change priorities, resource allocation or practice. If it changes nothing, it is reporting rather than intelligence.", status:"Research question" },
];

export default function InsightsPage() {
  return (
    <main className="forge-light overflow-hidden">
      <header className="border-b forge-border"><div className="forge-container flex h-[76px] items-center justify-between"><Link href="/" className="flex items-center gap-3"><ForgeMark className="h-9 w-9" /><span className="text-sm font-semibold tracking-[0.2em]">FORGE</span></Link><nav className="hidden items-center gap-8 text-[11px] font-semibold uppercase tracking-[0.14em] lg:flex"><Link href="/stress-test">Stress Test</Link><Link href="/insights" className="text-[var(--forge-bronze)]">Insights</Link><Link href="/systems">Systems</Link><Link href="/benchmarking">Benchmarking</Link><Link href="/about">About</Link></nav><Link href="/stress-test" className="forge-button forge-button-primary">Start the test</Link></div></header>
      <section className="border-b forge-border"><div className="forge-container grid min-h-[590px] items-end gap-12 py-20 lg:grid-cols-12 lg:py-28"><div className="lg:col-span-4 lg:self-start"><p className="forge-eyebrow">Forge intelligence / field notes</p></div><div className="lg:col-span-8"><h1 className="forge-display max-w-4xl text-[clamp(4rem,7vw,7.4rem)] text-[var(--forge-forest-deep)]">See the system beneath the symptom.</h1><p className="mt-10 max-w-2xl text-xl leading-9 text-[rgba(17,19,17,0.68)]">Observations, frameworks and emerging research on how sports and athletics operations in international schools actually work.</p></div></div></section>
      <section className="forge-section border-b forge-border"><div className="forge-container"><div className="mb-12 grid gap-8 lg:grid-cols-12"><div className="lg:col-span-4"><p className="forge-eyebrow">Current questions</p></div><div className="lg:col-span-8"><p className="max-w-3xl text-lg leading-8 text-[rgba(17,19,17,0.64)]">Forge is interested in recurring operational problems, not hot takes. Published insights are separated from questions still being investigated.</p></div></div><div className="grid border-l border-t forge-border md:grid-cols-2 lg:grid-cols-3">{insights.map((item) => { const content=<><div className="flex items-center justify-between"><span className="forge-eyebrow">{item.number}</span><span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[rgba(17,19,17,0.45)]">{item.label}</span></div><h2 className="forge-heading mt-14 text-3xl text-[var(--forge-forest-deep)]">{item.title}</h2><p className="mt-6 text-sm leading-7 text-[rgba(17,19,17,0.62)]">{item.text}</p><p className={`mt-7 w-fit text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--forge-bronze)] ${item.href ? "underline underline-offset-8" : ""}`}>{item.status}</p></>; return item.href ? <Link key={item.number} href={item.href} className="min-h-[350px] border-b border-r p-8 forge-border transition-colors hover:bg-white/40 lg:p-9">{content}</Link> : <article key={item.number} className="min-h-[350px] border-b border-r p-8 forge-border lg:p-9">{content}</article>; })}</div></div></section>
      <section className="forge-forest forge-section border-b border-[rgba(185,134,74,0.35)]"><div className="forge-container grid gap-12 lg:grid-cols-12"><div className="lg:col-span-4"><p className="forge-eyebrow">How the knowledge compounds</p></div><div className="lg:col-span-8"><h2 className="forge-heading max-w-4xl text-5xl md:text-7xl">Experience becomes more useful when patterns can be compared.</h2><p className="mt-10 max-w-3xl text-lg leading-8 text-[rgba(246,244,238,0.7)]">As Forge gathers confidential diagnostic data, the aim is to move from individual observations toward stronger patterns, useful comparisons and better decision rules. Findings will only be presented when the evidence earns the claim.</p></div></div></section>
      <section className="forge-dark forge-section"><div className="forge-container grid gap-12 lg:grid-cols-12 lg:items-end"><div className="lg:col-span-8"><p className="forge-eyebrow">Contribute to the picture</p><h2 className="forge-heading mt-8 text-5xl md:text-7xl">Start with your operation.</h2></div><div className="lg:col-span-4 lg:text-right"><Link href="/stress-test" className="forge-button forge-button-primary">Take the stress test</Link></div></div></section>
    </main>
  );
}
