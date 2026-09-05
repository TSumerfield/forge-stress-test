import Link from "next/link";

const ForgeMark = ({ className = "" }: { className?: string }) => (
  <img src="/forge-mark.png" alt="" className={className} aria-hidden="true" />
);

const dimensions = [
  ["01", "Leadership & direction", "Priorities, authority and decision-making are clear enough to guide action."],
  ["02", "People & accountability", "Ownership, expectations and productive challenge work without constant chasing."],
  ["03", "Systems & operations", "Recurring work is delivered reliably without depending on memory or heroics."],
  ["04", "Opportunities & pathways", "Sporting opportunities are coherent, explainable and connected to a wider pathway."],
  ["05", "Evidence & improvement", "The department can tell what is working, what is not and what should change."],
  ["06", "Resilience & continuity", "The programme can survive absence, turnover and leadership change."],
];

const failurePatterns = [
  ["Workload hides in people", "Too much of the programme exists in inboxes, memory and individual effort. It works until the person carrying it is absent, overloaded or leaves."],
  ["Growth creates fragility", "More teams, competitions, trips and pathways can look like progress while quietly increasing coordination cost and operational risk."],
  ["Activity outruns evidence", "Departments can become extremely busy without knowing which systems are strong, where pressure is accumulating or what should be fixed first."],
];

export default function Home() {
  return (
    <main className="forge-light overflow-hidden">
      <header className="relative z-30 border-b forge-border">
        <div className="forge-container flex h-[76px] items-center justify-between gap-6">
          <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Forge home">
            <ForgeMark className="h-9 w-9" />
            <span className="text-sm font-semibold tracking-[0.2em]">FORGE</span>
          </Link>
          <nav className="hidden items-center gap-8 text-[11px] font-semibold uppercase tracking-[0.14em] lg:flex">
            <Link href="/stress-test" className="transition-colors hover:text-[var(--forge-bronze)]">Stress Test</Link>
            <Link href="/insights" className="transition-colors hover:text-[var(--forge-bronze)]">Insights</Link>
            <Link href="/about" className="transition-colors hover:text-[var(--forge-bronze)]">About</Link>
          </nav>
          <Link href="/stress-test?source=website&campaign=homepage" className="forge-button forge-button-primary whitespace-nowrap">
            Take the Stress Test
          </Link>
        </div>
      </header>

      <section className="relative border-b forge-border">
        <div className="pointer-events-none absolute inset-0 opacity-[0.035]" aria-hidden="true" style={{ backgroundImage: "linear-gradient(rgba(8,26,22,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(8,26,22,.7) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="forge-container relative grid min-h-[calc(100vh-76px)] lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="flex flex-col justify-between py-14 lg:py-20 lg:pr-14 xl:py-24">
            <div>
              <div className="mb-10 flex items-center gap-4">
                <span className="forge-rule" />
                <p className="forge-eyebrow">Independent research · International school sport</p>
              </div>
              <h1 className="forge-display max-w-[930px] text-[clamp(3.7rem,7.5vw,7.6rem)] text-[var(--forge-forest-deep)]">
                Most school sport problems are not sport problems.
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-black/65 md:text-xl md:leading-9">
                They are systems problems. Forge helps sports leaders see where their department is strong, where hidden fragility is building and what deserves attention first.
              </p>
            </div>

            <div className="mt-14 border-t pt-8 forge-border">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-medium text-[var(--forge-forest-deep)]">The Forge Sport Department Stress Test</p>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-black/55">Free · confidential · around 10 minutes · immediate individual result · no school name required</p>
                </div>
                <div className="flex flex-wrap items-center gap-7">
                  <Link href="/stress-test?source=website&campaign=homepage_hero" className="forge-button forge-button-primary">
                    Start the Stress Test
                  </Link>
                  <a href="#dimensions" className="forge-button text-black/65">See what it examines</a>
                </div>
              </div>
            </div>
          </div>

          <aside className="hidden border-l py-20 pl-10 forge-border lg:flex lg:flex-col lg:justify-between xl:pl-12 xl:py-24">
            <div>
              <div className="flex items-center justify-between border-b pb-4 forge-border">
                <p className="forge-eyebrow">Department system scan</p>
                <span className="text-[10px] font-semibold tracking-[0.16em] text-black/35">6 DIMENSIONS</span>
              </div>
              <div className="mt-7 space-y-5">
                {dimensions.map(([n, title], i) => (
                  <div key={n} className="group">
                    <div className="mb-2 flex items-end justify-between gap-4">
                      <span className="text-xs font-medium text-black/65">{title}</span>
                      <span className="font-mono text-[10px] text-black/30">0{6 - i}</span>
                    </div>
                    <div className="h-[3px] w-full bg-black/[0.08]">
                      <div className="h-full bg-[var(--forge-forest)]" style={{ width: `${88 - i * 8}%`, opacity: 0.88 - i * 0.08 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-14 border-t pt-6 forge-border">
              <div className="relative mb-8 aspect-square w-full max-w-[245px] mx-auto">
                <div className="absolute inset-0 rotate-45 border border-[rgba(185,134,74,0.44)]" />
                <div className="absolute inset-[14%] rotate-45 border border-[rgba(185,134,74,0.30)]" />
                <div className="absolute inset-[28%] rotate-45 border border-[rgba(185,134,74,0.20)]" />
                <div className="absolute inset-[36%] rotate-45 bg-[var(--forge-forest)]" />
                <ForgeMark className="absolute inset-[41%] h-[18%] w-[18%] object-contain" />
              </div>
              <p className="text-xs leading-5 text-black/45">The score is not the point. The useful question is where the operating model is most exposed and what should change next.</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="forge-dark border-b border-[rgba(185,134,74,0.35)]">
        <div className="forge-container grid gap-10 py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-4">
            <p className="forge-eyebrow">The hidden problem</p>
          </div>
          <div className="lg:col-span-8">
            <h2 className="forge-heading max-w-4xl text-4xl md:text-6xl">The visible programme can look healthy while the operating system underneath it is under strain.</h2>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-white/60">Fixtures get played. Trips leave on time. Teams train. Parents receive messages. That does not automatically mean the system behind the programme is resilient.</p>

            <div className="mt-14 grid gap-px bg-[rgba(185,134,74,0.30)] md:grid-cols-3">
              {failurePatterns.map(([title, copy], i) => (
                <article key={title} className="bg-[var(--forge-forest-deep)] p-7 md:min-h-[300px]">
                  <span className="forge-eyebrow">0{i + 1}</span>
                  <h3 className="forge-heading mt-10 text-2xl">{title}</h3>
                  <p className="mt-5 text-sm leading-6 text-white/55">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="dimensions" className="forge-section border-b forge-border">
        <div className="forge-container">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="forge-eyebrow">The diagnostic</p>
            </div>
            <div className="lg:col-span-8">
              <h2 className="forge-heading max-w-4xl text-5xl text-[var(--forge-forest-deep)] md:text-7xl">Six dimensions. One operating picture.</h2>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-black/60">The Stress Test looks beneath results, participation numbers and busy calendars to examine the systems that make a sports department sustainable.</p>
            </div>
          </div>

          <div className="mt-16 grid border-l border-t forge-border md:grid-cols-2 lg:grid-cols-3">
            {dimensions.map(([n, title, description]) => (
              <article key={n} className="group min-h-[260px] border-b border-r p-7 forge-border transition-colors hover:bg-white/35">
                <div className="flex items-center justify-between">
                  <span className="forge-eyebrow">{n}</span>
                  <span className="h-2 w-2 rotate-45 bg-[var(--forge-bronze)] opacity-45 transition-opacity group-hover:opacity-100" />
                </div>
                <h3 className="forge-heading mt-12 text-2xl text-[var(--forge-forest-deep)]">{title}</h3>
                <p className="mt-4 text-sm leading-6 text-black/58">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="forge-forest border-b border-[rgba(185,134,74,0.35)]">
        <div className="forge-container grid lg:grid-cols-[0.85fr_1.15fr]">
          <div className="border-b py-16 lg:border-b-0 lg:border-r lg:py-24 lg:pr-14 border-[rgba(185,134,74,0.35)]">
            <p className="forge-eyebrow">What you get</p>
            <h2 className="forge-heading mt-8 text-5xl md:text-6xl">A better starting point for the next decision.</h2>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/62">Not a league table. Not a made-up benchmark. A structured view of your own operating model, designed to expose where further attention may be useful.</p>
          </div>
          <div className="py-16 lg:py-24 lg:pl-14">
            <div className="space-y-0">
              {[
                ["01", "Complete the diagnostic", "Answer practical questions about how the department actually operates, not how it is meant to operate on paper."],
                ["02", "See your profile immediately", "Receive an individual result across the six dimensions and identify the areas carrying the most exposure."],
                ["03", "Use the result as a conversation starter", "Take the profile into planning, leadership discussion or departmental review. The aim is better questions and better priorities."],
              ].map(([n, title, copy]) => (
                <div key={n} className="grid gap-5 border-t py-7 border-[rgba(185,134,74,0.30)] md:grid-cols-[70px_1fr]">
                  <span className="forge-eyebrow">{n}</span>
                  <div>
                    <h3 className="forge-heading text-2xl">{title}</h3>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-white/58">{copy}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/stress-test?source=website&campaign=homepage_process" className="forge-button forge-button-primary mt-8">Take the Stress Test</Link>
          </div>
        </div>
      </section>

      <section className="forge-section border-b forge-border">
        <div className="forge-container grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="forge-eyebrow">Evidence standard</p>
          </div>
          <div className="lg:col-span-8">
            <h2 className="forge-heading max-w-4xl text-5xl text-[var(--forge-forest-deep)] md:text-7xl">No fake precision. No invented benchmarks.</h2>
            <div className="mt-10 max-w-3xl space-y-5 text-lg leading-8 text-black/62">
              <p>Forge is building an independent evidence base on how sports departments in international schools actually operate.</p>
              <p>Individual diagnostic results are not presented as industry benchmarks. Where there is not enough comparable evidence to support a wider claim, Forge will say so.</p>
              <p>The long-term value comes from better evidence, better questions and practical systems that improve through repeated use.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b forge-border">
        <div className="forge-container grid lg:grid-cols-2">
          <div className="py-16 lg:py-20 lg:pr-14">
            <p className="forge-eyebrow">Forge research</p>
            <h2 className="forge-heading mt-7 text-4xl text-[var(--forge-forest-deep)] md:text-5xl">Want to contribute without taking the full diagnostic?</h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-black/58">Pulse 001 is a shorter research instrument focused on staffing, workload pressure, recruitment difficulty and recurring operational headaches.</p>
            <Link href="/pulse" className="forge-button mt-7">Take the 3-minute Pulse</Link>
          </div>
          <div className="border-t py-16 lg:border-l lg:border-t-0 lg:py-20 lg:pl-14 forge-border">
            <p className="forge-eyebrow">What Forge is becoming</p>
            <h2 className="forge-heading mt-7 text-4xl text-[var(--forge-forest-deep)] md:text-5xl">A growing intelligence layer for sports leadership.</h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-black/58">Diagnostics are the starting point. The broader ambition is to turn recurring problems, operating patterns and tested solutions into useful research, frameworks and practical systems for international-school sport.</p>
            <Link href="/about" className="forge-button mt-7">About Forge</Link>
          </div>
        </div>
      </section>

      <section className="forge-dark forge-section">
        <div className="forge-container grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="forge-eyebrow">Start here</p>
            <h2 className="forge-heading mt-8 max-w-5xl text-5xl md:text-7xl">Find the part of your sports department that is carrying more risk than it looks.</h2>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/58">Ten minutes. Confidential. Immediate individual result. No school name required.</p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Link href="/stress-test?source=website&campaign=homepage_final" className="forge-button forge-button-primary">Take the Stress Test</Link>
          </div>
        </div>
      </section>

      <footer className="forge-dark border-t border-white/10">
        <div className="forge-container flex flex-col gap-5 py-8 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <ForgeMark className="h-7 w-7 opacity-80" />
            <span className="font-semibold tracking-[0.18em] text-white/65">FORGE</span>
          </div>
          <p>Independent research on the systems behind international-school sport.</p>
        </div>
      </footer>
    </main>
  );
}
