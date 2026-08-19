import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Coaching Consistency | Forge Insights",
  description: "A Forge field note on why coaching standards drift across teams, coaches and seasons, and what sports departments can do about it.",
};

const Arrow = () => <span aria-hidden="true">↗</span>;

export default function CoachingConsistencyInsight() {
  return (
    <main className="forge-light overflow-hidden">
      <header className="border-b forge-border"><div className="forge-container flex h-[76px] items-center justify-between"><Link href="/" className="flex items-center gap-3"><img src="/forge-mark.png" alt="" className="h-9 w-9" aria-hidden="true" /><span className="text-sm font-semibold tracking-[0.2em]">FORGE</span></Link><Link href="/insights" className="text-[11px] font-semibold uppercase tracking-[0.14em]">All insights</Link></div></header>

      <article>
        <section className="border-b forge-border"><div className="forge-container grid gap-12 py-20 lg:grid-cols-12 lg:py-28"><div className="lg:col-span-4"><p className="forge-eyebrow">Forge insight 002 / Coaching consistency</p></div><div className="lg:col-span-8"><h1 className="forge-display max-w-5xl text-[clamp(3.7rem,7vw,7rem)] text-[var(--forge-forest-deep)]">Why standards drift between teams and seasons.</h1><p className="mt-10 max-w-3xl text-xl leading-9 text-[rgba(17,19,17,0.68)]">A department can employ strong coaches and still deliver an inconsistent student experience. The gap appears when quality depends on individual interpretation rather than shared expectations.</p></div></div></section>

        <section className="forge-section border-b forge-border"><div className="forge-container grid gap-12 lg:grid-cols-12"><div className="lg:col-span-4"><p className="forge-eyebrow">The pattern</p></div><div className="space-y-8 lg:col-span-7"><p className="text-lg leading-9">Coaching inconsistency rarely begins with poor intent. It begins when departments rely on professional judgement without agreeing the minimum standards that should survive different sports, personalities and competitive contexts.</p><p className="text-lg leading-9">The result is a programme where some students experience excellent communication, development and feedback while others receive something materially different under the same department banner.</p><div className="border-l-2 border-[var(--forge-bronze)] pl-7"><p className="forge-heading text-3xl text-[var(--forge-forest-deep)]">The test: could two competent coaches describe the department&apos;s non-negotiable coaching standards in broadly the same way?</p></div></div></div></section>

        <section className="forge-forest forge-section border-b border-[rgba(185,134,74,0.35)]"><div className="forge-container grid gap-12 lg:grid-cols-12"><div className="lg:col-span-4"><p className="forge-eyebrow">Four signals</p></div><div className="grid gap-px bg-[rgba(185,134,74,0.28)] md:grid-cols-2 lg:col-span-8">{[['01','Standards are implied','Coaches are expected to know what good looks like, but the department has not made the minimum expectations explicit.'],['02','Feedback depends on the coach','Athletes receive very different levels of communication, review and development guidance between teams.'],['03','Problems appear late','Issues surface through parent complaints, athlete dissatisfaction or leadership intervention rather than routine observation.'],['04','Induction focuses on logistics','New coaches learn schedules, facilities and fixtures before they learn the department standard for coaching behaviour.']].map(([n,t,x]) => <div key={n} className="bg-[var(--forge-forest)] p-8"><span className="forge-eyebrow">{n}</span><h2 className="forge-heading mt-8 text-3xl">{t}</h2><p className="mt-5 text-sm leading-7 text-[rgba(246,244,238,0.7)]">{x}</p></div>)}</div></div></section>

        <section className="forge-section border-b forge-border"><div className="forge-container grid gap-12 lg:grid-cols-12"><div className="lg:col-span-4"><p className="forge-eyebrow">One useful move</p></div><div className="lg:col-span-8"><h2 className="forge-heading max-w-4xl text-5xl text-[var(--forge-forest-deep)] md:text-6xl">Define five coaching non-negotiables before writing another handbook.</h2><p className="mt-8 max-w-3xl text-lg leading-8 text-[rgba(17,19,17,0.66)]">Choose five observable behaviours that should be true across every team regardless of sport. Keep them concrete enough to observe and coach. For example: session starts prepared; athletes know the purpose; feedback is specific; selection decisions are explained consistently; safeguarding and communication expectations are followed.</p><p className="mt-8 text-sm leading-7 text-[rgba(17,19,17,0.52)]">Forge note: this is an operating framework, not a benchmark claim. Comparative findings should only be published once diagnostic evidence supports them.</p></div></div></section>

        <section className="forge-dark forge-section"><div className="forge-container grid gap-10 lg:grid-cols-12 lg:items-end"><div className="lg:col-span-8"><p className="forge-eyebrow">Make the standard visible</p><h2 className="forge-heading mt-7 text-5xl md:text-7xl">Build a coaching baseline.</h2></div><div className="lg:col-span-4 lg:text-right"><Link href="/systems/coaching-baseline" className="forge-button forge-button-primary">Use the system <Arrow /></Link></div></div></section>
      </article>
    </main>
  );
}
