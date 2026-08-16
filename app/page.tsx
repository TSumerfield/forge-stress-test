const KeystoneMark = ({ className = "" }: { className?: string }) => (

  <svg

    viewBox="0 0 64 64"

    aria-hidden="true"

    className={className}

    fill="none"

    xmlns="http://www.w3.org/2000/svg"

  >

    <path

      d="M14 10H50L44 22H20L14 10Z"

      fill="currentColor"

    />

    <path

      d="M20 25H44L39 35H25L20 25Z"

      fill="currentColor"

    />

    <path

      d="M25 38H39L34 54H30L25 38Z"

      fill="currentColor"

    />

  </svg>

);

const Arrow = () => <span aria-hidden="true">→</span>;

export default function Home() {

  return (

    <main className="min-h-screen bg-forge-ivory-100 text-forge-charcoal-900">

      {/* HEADER */}

      <header className="absolute inset-x-0 top-0 z-30">

        <div className="forge-container flex h-24 items-center justify-between border-b border-white/10">

          <a href="/" className="flex items-center gap-3 text-forge-ivory-100">

            <KeystoneMark className="h-8 w-8 text-forge-bronze-500" />

            <div className="leading-none">

              <div className="text-lg font-semibold tracking-[0.22em]">FORGE</div>

              <div className="mt-1 text-[8px] tracking-[0.18em] text-forge-ivory-100/55">

                SPORTS LEADERSHIP INTELLIGENCE

              </div>

            </div>

          </a>

          <nav className="hidden items-center gap-8 text-[11px] font-medium uppercase tracking-[0.14em] text-forge-ivory-100/70 lg:flex">

            <a href="#forge" className="transition hover:text-forge-bronze-400">

              Forge

            </a>

            <a

              href="#intelligence"

              className="transition hover:text-forge-bronze-400"

            >

              Intelligence

            </a>

            <a

              href="#decision-review"

              className="transition hover:text-forge-bronze-400"

            >

              Decision Review

            </a>

            <a href="#about" className="transition hover:text-forge-bronze-400">

              About

            </a>

            <a

              href="/submit"

              className="border border-forge-bronze-500 px-5 py-3 text-forge-bronze-300 transition hover:bg-forge-bronze-500 hover:text-forge-forest-950"

            >

              Submit a Decision

            </a>

          </nav>

          <a

            href="/submit"

            className="border border-forge-bronze-500 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-forge-bronze-300 lg:hidden"

          >

            Submit

          </a>

        </div>

      </header>

      {/* HERO */}

      <section className="relative overflow-hidden bg-forge-forest-950 text-forge-ivory-100">

        <div className="absolute inset-0 opacity-20">

          <div className="absolute left-[8%] top-0 h-full w-px bg-white/20" />

          <div className="absolute left-[42%] top-0 hidden h-full w-px bg-white/10 md:block" />

          <div className="absolute right-[8%] top-0 h-full w-px bg-white/20" />

        </div>

        <div className="forge-container relative grid min-h-[760px] items-end gap-12 pb-20 pt-40 lg:grid-cols-[1.02fr_0.98fr] lg:pb-24">

          <div className="max-w-3xl">

            <div className="forge-eyebrow mb-7">Sports Leadership Intelligence</div>

            <h1 className="forge-display max-w-3xl text-[clamp(3.6rem,8vw,7.6rem)] text-forge-ivory-100">

              The intelligence

              <br />

              behind better sport.

            </h1>

            <p className="mt-8 max-w-xl text-base leading-7 text-forge-ivory-100/68 md:text-lg">

              Forge brings together evidence, independent judgement and

              practical systems for leaders responsible for school sport.

            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <a

                href="#forge"

                className="forge-button forge-button-primary"

              >

                Explore Forge

              </a>

              <a

                href="#decision-review"

                className="forge-button forge-button-secondary gap-3"

              >

                Decision Review <Arrow />

              </a>

            </div>

          </div>

          <div className="relative hidden min-h-[500px] lg:block">

            <div className="absolute inset-x-0 bottom-0 h-[82%] border border-forge-bronze-500/25 bg-forge-forest-900">

              <div className="absolute inset-8 border border-forge-bronze-500/20" />

              <div className="absolute bottom-[13%] left-[12%] h-[13%] w-[72%] border-l border-t border-forge-bronze-500/60" />

              <div className="absolute bottom-[28%] left-[22%] h-[13%] w-[62%] border-l border-t border-forge-bronze-500/50" />

              <div className="absolute bottom-[43%] left-[32%] h-[13%] w-[52%] border-l border-t border-forge-bronze-500/40" />

              <div className="absolute bottom-[58%] left-[42%] h-[13%] w-[42%] border-l border-t border-forge-bronze-500/30" />

              <div className="absolute right-[8%] top-[8%] text-right">

                <div className="forge-eyebrow">Structure</div>

                <p className="mt-2 max-w-[180px] text-xs leading-5 text-forge-ivory-100/45">

                  Strong outcomes are shaped by what sits beneath them.

                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* PROBLEM */}

      <section id="forge" className="forge-section bg-forge-ivory-100">

        <div className="forge-container">

          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">

            <div>

              <div className="forge-eyebrow">The Problem</div>

              <h2 className="forge-heading mt-6 text-5xl md:text-6xl">

                School sport is complex.

                <br />

                Its knowledge infrastructure isn&apos;t.

              </h2>

            </div>

            <div className="flex items-end">

              <p className="max-w-2xl text-lg leading-8 text-forge-charcoal-900/68">

                Sports leaders make hundreds of decisions across people,

                programmes, competition, facilities, budgets and strategy. Yet

                useful knowledge is often fragmented, decisions disappear into

                memory, and departments repeatedly solve problems others have

                already encountered.

              </p>

            </div>

          </div>

          <div className="mt-16 grid border-y border-forge-charcoal-900/12 md:grid-cols-2 lg:grid-cols-4">

            {[

              ["Knowledge", "Fragmented and hard to find."],

              ["Decisions", "Often made with incomplete information."],

              ["Memory", "Experience disappears when people leave."],

              ["Repetition", "Departments repeatedly solve the same problems."],

            ].map(([title, copy], index) => (

              <div

                key={title}

                className={`px-0 py-8 md:px-8 ${

                  index > 0 ? "border-t border-forge-charcoal-900/12 md:border-l md:border-t-0" : ""

                }`}

              >

                <div className="mb-6 text-xs tracking-[0.14em] text-forge-bronze-600">

                  0{index + 1}

                </div>

                <h3 className="forge-heading text-2xl">{title}</h3>

                <p className="mt-3 text-sm leading-6 text-forge-charcoal-900/58">

                  {copy}

                </p>

              </div>

            ))}

          </div>

          <p className="mt-10 text-sm font-semibold uppercase tracking-[0.14em] text-forge-forest-800">

            Forge exists to change that.

          </p>

        </div>

      </section>

      {/* DOMAIN */}

      <section className="forge-section bg-forge-forest-800 text-forge-ivory-100">

        <div className="forge-container">

          <div className="max-w-3xl">

            <div className="forge-eyebrow">The Forge Domain</div>

            <h2 className="forge-heading mt-6 text-5xl md:text-6xl">

              Behind better sport.

            </h2>

          </div>

          <div className="mt-16 grid border-t border-forge-bronze-500/30 lg:grid-cols-3">

            {[

              {

                n: "01",

                title: "Intelligence",

                lead: "Make sense of what matters.",

                copy:

                  "Evidence, research and experience brought together to create clarity around the realities of leading sport.",

              },

              {

                n: "02",

                title: "Decisions",

                lead: "Challenge what deserves challenging.",

                copy:

                  "Independent scrutiny for consequential choices before they become commitments.",

              },

              {

                n: "03",

                title: "Systems",

                lead: "Make good practice survive.",

                copy:

                  "Structures, processes and institutional knowledge that become stronger through use.",

              },

            ].map((item, index) => (

              <article

                key={item.title}

                className={`py-10 lg:px-10 ${

                  index > 0

                    ? "border-t border-forge-bronze-500/30 lg:border-l lg:border-t-0"

                    : ""

                }`}

              >

                <div className="text-xs tracking-[0.14em] text-forge-bronze-400">

                  {item.n}

                </div>

                <h3 className="forge-heading mt-8 text-4xl">{item.title}</h3>

                <p className="mt-5 font-medium text-forge-bronze-300">

                  {item.lead}

                </p>

                <p className="mt-4 max-w-sm text-sm leading-7 text-forge-ivory-100/60">

                  {item.copy}

                </p>

              </article>

            ))}

          </div>

        </div>

      </section>

      {/* COMPOUNDING MODEL */}

      <section className="border-y border-forge-charcoal-900/10 bg-forge-ivory-100 py-16">

        <div className="forge-container">

          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">

            <div>

              <div className="forge-eyebrow">A Working Principle</div>

              <h2 className="forge-heading mt-5 text-4xl md:text-5xl">

                Every decision should leave the next leader better informed.

              </h2>

            </div>

            <div className="grid grid-cols-2 gap-px bg-forge-charcoal-900/10 md:grid-cols-4">

              {["Intelligence", "Decisions", "Systems", "Learning"].map(

                (label, index) => (

                  <div

                    key={label}

                    className="bg-forge-ivory-100 px-5 py-7 text-center"

                  >

                    <div className="text-[10px] tracking-[0.15em] text-forge-bronze-600">

                      0{index + 1}

                    </div>

                    <div className="mt-3 text-xs font-semibold uppercase tracking-[0.12em]">

                      {label}

                    </div>

                  </div>

                )

              )}

            </div>

          </div>

        </div>

      </section>

      {/* DECISION REVIEW */}

      <section

        id="decision-review"

        className="forge-section bg-forge-ivory-100"

      >

        <div className="forge-container grid gap-14 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-24">

          <div>

            <div className="forge-eyebrow">Currently at Forge</div>

            <h2 className="forge-heading mt-6 text-5xl md:text-6xl">

              Forge Decision Review

            </h2>

            <p className="mt-5 text-xl font-medium text-forge-forest-800">

              Independent scrutiny before you commit.

            </p>

            <p className="mt-7 max-w-xl text-base leading-8 text-forge-charcoal-900/65">

              Bring Forge a consequential decision. We examine the evidence,

              challenge the assumptions, consider what may have been missed and

              provide a clear recommendation before you commit.

            </p>

            <div className="mt-9 grid max-w-xl grid-cols-3 border-y border-forge-charcoal-900/10 py-5">

              <div>

                <div className="text-2xl font-semibold">£195</div>

                <div className="mt-1 text-[10px] uppercase tracking-[0.12em] text-forge-charcoal-900/45">

                  Founding review

                </div>

              </div>

              <div>

                <div className="text-2xl font-semibold">72h</div>

                <div className="mt-1 text-[10px] uppercase tracking-[0.12em] text-forge-charcoal-900/45">

                  Target

                </div>

              </div>

              <div>

                <div className="text-2xl font-semibold">3</div>

                <div className="mt-1 text-[10px] uppercase tracking-[0.12em] text-forge-charcoal-900/45">

                  Founding places

                </div>

              </div>

            </div>

            <a

              href="/submit"

              className="mt-9 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-forge-forest-800"

            >

              Explore Decision Review <Arrow />

            </a>

          </div>

          {/* Report mockup */}

          <div className="relative mx-auto w-full max-w-[430px]">

            <div className="absolute -left-7 -top-7 h-full w-full border border-forge-bronze-500/30" />

            <div className="relative min-h-[560px] bg-forge-forest-950 p-8 text-forge-ivory-100 shadow-forge md:p-10">

              <div className="flex items-start justify-between">

                <KeystoneMark className="h-10 w-10 text-forge-bronze-500" />

                <div className="text-right text-[9px] uppercase tracking-[0.15em] text-forge-ivory-100/45">

                  Decision Review

                  <br />

                  Confidential

                </div>

              </div>

              <div className="mt-28">

                <div className="forge-eyebrow">Forge Decision Review</div>

                <h3 className="forge-heading mt-5 text-4xl">

                  Independent scrutiny before commitment.

                </h3>

                <div className="mt-12 border-t border-forge-bronze-500/40 pt-6">

                  <div className="grid grid-cols-2 gap-6">

                    <div>

                      <div className="text-[9px] uppercase tracking-[0.14em] text-forge-ivory-100/40">

                        Verdict

                      </div>

                      <div className="mt-2 text-lg text-forge-bronze-300">

                        MODIFY

                      </div>

                    </div>

                    <div>

                      <div className="text-[9px] uppercase tracking-[0.14em] text-forge-ivory-100/40">

                        Confidence

                      </div>

                      <div className="mt-2 text-lg">HIGH</div>

                    </div>

                  </div>

                </div>

              </div>

              <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between border-t border-white/10 pt-5">

                <span className="text-[8px] uppercase tracking-[0.15em] text-white/35">

                  Sports Leadership Intelligence

                </span>

                <span className="text-xs text-forge-bronze-400">FORGE</span>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* INTELLIGENCE */}

      <section

        id="intelligence"

        className="forge-section border-y border-forge-charcoal-900/10 bg-[#ede9df]"

      >

        <div className="forge-container">

          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">

            <div>

              <div className="forge-eyebrow">Forge Intelligence</div>

              <h2 className="forge-heading mt-6 text-5xl md:text-6xl">

                Knowledge worth keeping.

              </h2>

            </div>

            <div className="flex items-end">

              <p className="max-w-2xl text-base leading-8 text-forge-charcoal-900/62">

                Insights, evidence, frameworks and field observations from the

                realities of leading school sport. Forge Intelligence will grow

                through useful work, not content for content&apos;s sake.

              </p>

            </div>

          </div>

          <div className="mt-14 grid gap-px bg-forge-charcoal-900/12 md:grid-cols-2 lg:grid-cols-4">

            {[

              ["Insight", "Patterns worth noticing."],

              ["Framework", "Structures worth reusing."],

              ["Field Note", "Observations from practice."],

              ["Evidence Review", "Research made useful."],

            ].map(([type, description]) => (

              <article

                key={type}

                className="min-h-[220px] bg-forge-ivory-100 p-7"

              >

                <div className="forge-rule" />

                <div className="mt-16 text-[10px] font-semibold uppercase tracking-[0.14em] text-forge-bronze-600">

                  {type}

                </div>

                <p className="forge-heading mt-4 text-2xl">{description}</p>

              </article>

            ))}

          </div>

        </div>

      </section>

      {/* PRINCIPLES */}

      <section id="about" className="forge-section bg-forge-forest-950 text-forge-ivory-100">

        <div className="forge-container">

          <div className="max-w-3xl">

            <div className="forge-eyebrow">Our Principles</div>

            <h2 className="forge-heading mt-6 text-5xl md:text-6xl">

              How Forge works.

            </h2>

          </div>

          <div className="mt-14 grid border-t border-forge-bronze-500/30 md:grid-cols-2">

            {[

              [

                "Evidence over assumption.",

                "We seek evidence. We test assumptions.",

              ],

              [

                "Systems over heroics.",

                "Strong departments should not depend on exceptional individuals holding everything together.",

              ],

              [

                "Decisions should outlive memory.",

                "Preserve what was decided, why it was decided and what happened next.",

              ],

              [

                "Knowledge should compound.",

                "Every useful experience should make the next decision easier.",

              ],

            ].map(([title, copy], index) => (

              <div

                key={title}

                className={`py-9 md:p-10 ${

                  index % 2 === 1 ? "md:border-l md:border-forge-bronze-500/30" : ""

                } ${

                  index > 1 ? "border-t border-forge-bronze-500/30" : index === 1 ? "border-t border-forge-bronze-500/30 md:border-t-0" : ""

                }`}

              >

                <div className="text-[10px] tracking-[0.15em] text-forge-bronze-400">

                  0{index + 1}

                </div>

                <h3 className="forge-heading mt-5 text-3xl">{title}</h3>

                <p className="mt-4 max-w-md text-sm leading-7 text-forge-ivory-100/58">

                  {copy}

                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* FINAL CTA */}

      <section className="bg-forge-bronze-500">

        <div className="forge-container grid gap-8 py-12 md:grid-cols-[1fr_auto] md:items-center">

          <div>

            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-forge-forest-950/65">

              Facing a consequential decision?

            </div>

            <h2 className="forge-heading mt-3 text-4xl text-forge-forest-950">

              Pressure-test it before you commit.

            </h2>

          </div>

          <a

            href="/submit"

            className="inline-flex min-h-12 items-center justify-center border border-forge-forest-950 px-6 text-xs font-semibold uppercase tracking-[0.14em] text-forge-forest-950 transition hover:bg-forge-forest-950 hover:text-forge-ivory-100"

          >

            Submit a Decision

          </a>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="bg-forge-forest-950 text-forge-ivory-100">

        <div className="forge-container py-14">

          <div className="grid gap-10 border-b border-white/10 pb-12 md:grid-cols-[1fr_auto]">

            <div>

              <div className="flex items-center gap-3">

                <KeystoneMark className="h-9 w-9 text-forge-bronze-500" />

                <span className="text-xl font-semibold tracking-[0.22em]">

                  FORGE

                </span>

              </div>

              <p className="mt-4 text-xs uppercase tracking-[0.16em] text-white/42">

                Sports Leadership Intelligence

              </p>

              <p className="forge-heading mt-7 text-3xl text-forge-ivory-100/90">

                Behind better sport.

              </p>

            </div>

            <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-xs uppercase tracking-[0.13em] text-white/55">

              <a href="#forge" className="hover:text-forge-bronze-300">

                Forge

              </a>

              <a href="#intelligence" className="hover:text-forge-bronze-300">

                Intelligence

              </a>

              <a

                href="#decision-review"

                className="hover:text-forge-bronze-300"

              >

                Decision Review

              </a>

              <a href="/submit" className="hover:text-forge-bronze-300">

                Submit a Decision

              </a>

            </div>

          </div>

          <div className="flex flex-col gap-3 pt-6 text-[10px] uppercase tracking-[0.12em] text-white/30 md:flex-row md:items-center md:justify-between">

            <span>© 2026 Forge. All rights reserved.</span>

            <span>Built for leaders responsible for school sport.</span>

          </div>

        </div>

      </footer>

    </main>

  );

}