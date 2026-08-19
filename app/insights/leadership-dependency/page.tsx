import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Leadership Dependency | Forge Insights",
  description: "A practical Forge field note on how capable sports leaders can accidentally become the operating system of their department.",
};

const Arrow = () => <span aria-hidden="true">↗</span>;

export default function LeadershipDependencyInsight() {
  return (
    <main className="forge-light overflow-hidden">
      <header className="border-b forge-border">
        <div className="forge-container flex h-[76px] items-center justify-between">
          <Link href="/" className="flex items-center gap-3"><img src="/forge-mark.png" alt="" className="h-9 w-9" aria-hidden="true" /><span className="text-sm font-semibold tracking-[0.2em]">FORGE</span></Link>
          <Link href="/insights" className="text-[11px] font-semibold uppercase tracking-[0.14em]">All insights</Link>
        </div>
      </header>

      <article>
        <section className="border-b forge-border">
          <div className="forge-container grid gap-12 py-20 lg:grid-cols-12 lg:py-28">
            <div className="lg:col-span-4"><p className="forge-eyebrow">Forge insight 001 / Leadership dependency</p></div>
            <div className="lg:col-span-8">
              <h1 className="forge-display max-w-5xl text-[clamp(3.7rem,7vw,7rem)] text-[var(--forge-forest-deep)]">When one capable leader becomes the operating system.</h1>
              <p className="mt-10 max-w-3xl text-xl leading-9 text-[rgba(17,19,17,0.68)]">A department can look efficient precisely because one person is absorbing the complexity. That is performance, but it is not resilience.</p>
            </div>
          </div>
        </section>

        <section className="forge-section border-b forge-border">
          <div className="forge-container grid gap-12 lg:grid-cols-12">
            <aside className="lg:col-span-4"><p className="forge-eyebrow">The pattern</p></aside>
            <div className="space-y-8 lg:col-span-7">
              <p className="text-lg leading-9">Leadership dependency develops when important decisions, relationships, routines and exceptions repeatedly route through the same person. The leader becomes the fastest way to get things done, so the department learns to use them as infrastructure.</p>
              <p className="text-lg leading-9">The warning sign is not simply that the leader is busy. It is that normal delivery becomes slower, less certain or less consistent when that person is absent.</p>
              <div className="border-l-2 border-[var(--forge-bronze)] pl-7"><p className="forge-heading text-3xl text-[var(--forge-forest-deep)]">The test: if the leader disappeared for two weeks, what would stop, stall or require guessing?</p></div>
            </div>
          </div>
        </section>

        <section className="forge-forest forge-section border-b border-[rgba(185,134,74,0.35)]">
          <div className="forge-container grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4"><p className="forge-eyebrow">Four signals</p></div>
            <div className="grid gap-px bg-[rgba(185,134,74,0.28)] md:grid-cols-2 lg:col-span-8">
              {[['01','Routine approvals climb upward','Staff wait for the leader to resolve decisions that should have clear owners or rules.'],['02','Knowledge lives in memory','Contacts, exceptions, timelines and judgement are known rather than captured.'],['03','Problems are rescued, not removed','The same operational failures recur because capable people keep absorbing them.'],['04','Absence creates uncertainty','People can execute tasks, but hesitate when the situation falls outside the normal script.']].map(([n,t,x]) => <div key={n} className="bg-[var(--forge-forest)] p-8"><span className="forge-eyebrow">{n}</span><h2 className="forge-heading mt-8 text-3xl">{t}</h2><p className="mt-5 text-sm leading-7 text-[rgba(246,244,238,0.7)]">{x}</p></div>)}
            </div>
          </div>
        </section>

        <section className="forge-section border-b forge-border">
          <div className="forge-container grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4"><p className="forge-eyebrow">One useful move</p></div>
            <div className="lg:col-span-8">
              <h2 className="forge-heading max-w-4xl text-5xl text-[var(--forge-forest-deep)] md:text-6xl">Run a dependency audit before writing another procedure.</h2>
              <p className="mt-8 max-w-3xl text-lg leading-8 text-[rgba(17,19,17,0.66)]">For one working week, record every issue that requires a specific person to remember, approve, explain or rescue it. At the end, classify each dependency: decision right, missing information, unclear ownership, undocumented process or relationship knowledge. Fix the repeated dependency, not the individual incident.</p>
              <p className="mt-8 text-sm leading-7 text-[rgba(17,19,17,0.52)]">Forge note: this is an operating framework, not a benchmark claim. Forge will publish comparative findings only when sufficient diagnostic evidence exists.</p>
            </div>
          </div>
        </section>

        <section className="forge-dark forge-section"><div className="forge-container grid gap-10 lg:grid-cols-12 lg:items-end"><div className="lg:col-span-8"><p className="forge-eyebrow">Measure the system</p><h2 className="forge-heading mt-7 text-5xl md:text-7xl">How dependent is your department?</h2></div><div className="lg:col-span-4 lg:text-right"><Link href="/stress-test" className="forge-button forge-button-primary">Take the stress test <Arrow /></Link></div></div></section>
      </article>
    </main>
  );
}
