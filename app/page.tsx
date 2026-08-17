"use client";

import Link from "next/link";

const Keystone = ({ className = "" }: { className?: string }) => (

  <svg

    viewBox="0 0 64 64"

    fill="none"

    xmlns="http://www.w3.org/2000/svg"

    className={className}

    aria-hidden="true"

  >

    <path

      d="M16 8H48L56 24L32 56L8 24L16 8Z"

      stroke="currentColor"

      strokeWidth="2"

    />

    <path

      d="M16 8L32 56L48 8"

      stroke="currentColor"

      strokeWidth="2"

    />

    <path d="M8 24H56" stroke="currentColor" strokeWidth="2" />

  </svg>

);

const Arrow = () => <span aria-hidden="true">→</span>;

export default function Home() {

  return (

    <main className="min-h-screen bg-[#f2efe8] text-[#111111]">

      {/* NAV */}

      <header className="border-b border-black/20">

        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-5 py-4 sm:px-6 md:px-10 md:py-5 lg:px-14">

          <Link

            href="/"

            className="flex shrink-0 items-center gap-3 text-sm font-semibold tracking-[0.18em]"

          >

            <Keystone className="h-7 w-7" />

            <span>FORGE</span>

          </Link>

          <nav className="hidden items-center gap-8 text-xs font-medium tracking-[0.14em] md:flex">

            <a href="#method" className="transition-opacity hover:opacity-60">

              METHOD

            </a>

            <a

              href="#intelligence"

              className="transition-opacity hover:opacity-60"

            >

              INSIGHTS

            </a>

            <a href="#about" className="transition-opacity hover:opacity-60">

              ABOUT

            </a>

          </nav>

          <Link

            href="/stress-test"

            className="whitespace-nowrap border border-black px-3 py-3 text-[9px] font-semibold tracking-[0.1em] transition-colors hover:bg-black hover:text-[#f2efe8] sm:px-4 sm:text-[11px] sm:tracking-[0.12em]"

          >

            TAKE THE STRESS TEST <Arrow />

          </Link>

        </div>

      </header>

      {/* HERO */}

      <section className="border-b border-black/20">

        <div className="mx-auto grid min-h-[78vh] max-w-[1500px] grid-cols-1 lg:grid-cols-12">

          <div className="flex flex-col justify-between px-5 py-12 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:col-span-9 lg:px-14 lg:py-24">

            <div>

              <p className="mb-7 max-w-[330px] text-[10px] font-semibold leading-relaxed tracking-[0.16em] sm:text-xs sm:tracking-[0.18em]">

                INDEPENDENT INTELLIGENCE FOR SCHOOL SPORT

              </p>

              <h1 className="max-w-[1100px] text-[13.2vw] font-semibold uppercase leading-[0.88] tracking-[-0.055em] sm:text-[12vw] md:text-[10vw] md:leading-[0.84] md:tracking-[-0.065em] lg:text-[8.4rem] lg:leading-[0.82] lg:tracking-[-0.07em]">

                Better sport

                <br />

                is built on

                <br />

                better systems.

              </h1>

            </div>

            <div className="mt-12 flex flex-col items-start gap-7 sm:mt-16 md:mt-24 md:flex-row md:items-end md:justify-between">

              <p className="max-w-xl text-lg leading-relaxed md:text-xl">

                Forge develops independent intelligence, tools and operating

                frameworks for the people leading sport in international

                schools.

              </p>

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">

                <Link

                  href="/stress-test"

                  className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-xs font-semibold tracking-[0.14em] text-[#f2efe8] transition-opacity hover:opacity-75 sm:w-auto"

                >

                  TAKE THE STRESS TEST <Arrow />

                </Link>

                <a

                  href="#forge"

                  className="inline-flex w-full items-center justify-center border border-black px-6 py-4 text-xs font-semibold tracking-[0.14em] transition-colors hover:bg-black hover:text-[#f2efe8] sm:w-auto"

                >

                  EXPLORE FORGE ↓

                </a>

              </div>

            </div>

          </div>

          <div className="hidden items-center justify-center border-l border-black/20 lg:col-span-3 lg:flex">

            <Keystone className="h-40 w-40 xl:h-52 xl:w-52" />

          </div>

        </div>

      </section>

      {/* PROBLEM */}

      <section id="forge" className="border-b border-black/20">

        <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-6 md:px-10 md:py-28 lg:px-14 lg:py-36">

          <p className="mb-8 text-xs font-semibold tracking-[0.18em] md:mb-10">

            THE PROBLEM

          </p>

          <h2 className="max-w-6xl text-[13vw] font-semibold uppercase leading-[0.92] tracking-[-0.05em] sm:text-5xl md:text-7xl lg:text-8xl">

            Success can

            <br />

            hide fragility.

          </h2>

          <div className="mt-12 grid grid-cols-1 gap-10 border-t border-black/20 pt-8 md:mt-16 md:grid-cols-2 md:pt-10 lg:grid-cols-12">

            <div className="lg:col-span-5">

              <p className="text-xl leading-relaxed md:text-2xl">

                Fixtures happen. Teams compete. Trips run. Parents get

                informed.

              </p>

            </div>

            <div className="lg:col-span-6 lg:col-start-7">

              <p className="text-base leading-7 text-black/75 md:text-lg md:leading-8">

                But underneath a successful programme, critical knowledge can

                live in people&apos;s heads, leaders can become operational

                bottlenecks, responsibilities can remain unclear, and constant

                delivery can leave little capacity for improvement.

              </p>

              <p className="mt-6 text-base font-medium leading-7 md:text-lg">

                Forge exists to make those systems visible, measurable and

                better.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* STRESS TEST */}

      <section className="border-b border-black/20 bg-black text-[#f2efe8]">

        <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-6 md:px-10 md:py-28 lg:px-14 lg:py-36">

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">

            <div className="lg:col-span-3">

              <p className="text-xs font-semibold tracking-[0.18em] text-white/60">

                FORGE / 001

              </p>

            </div>

            <div className="lg:col-span-9">

              <h2 className="text-[14vw] font-semibold uppercase leading-[0.88] tracking-[-0.055em] sm:text-6xl md:text-8xl lg:text-[7.5rem] lg:leading-[0.86] lg:tracking-[-0.06em]">

                Sport

                <br />

                Department

                <br />

                Stress Test

              </h2>

              <div className="mt-12 grid grid-cols-1 gap-8 border-t border-white/25 pt-8 md:mt-14 md:grid-cols-2 md:gap-10 md:pt-10">

                <div>

                  <h3 className="text-2xl font-medium leading-tight md:text-3xl">

                    How resilient is your sports department?

                  </h3>

                </div>

                <div>

                  <p className="text-base leading-7 text-white/70 md:text-lg md:leading-8">

                    Discover where your department is resilient, where it is

                    exposed, and what you should strengthen first.

                  </p>

                </div>

              </div>

              <div className="mt-12 grid grid-cols-2 border-l border-t border-white/25 sm:grid-cols-3 lg:mt-14 lg:grid-cols-6">

                {[

                  "LEADERSHIP",

                  "OPERATIONS",

                  "OWNERSHIP",

                  "COACHING",

                  "KNOWLEDGE",

                  "CAPACITY",

                ].map((item) => (

                  <div

                    key={item}

                    className="border-b border-r border-white/25 px-3 py-6 sm:px-4 sm:py-7"

                  >

                    <p className="break-words text-[9px] font-semibold tracking-[0.12em] text-white/70 sm:text-[10px] sm:tracking-[0.14em]">

                      {item}

                    </p>

                  </div>

                ))}

              </div>

              <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">

                <div className="flex flex-wrap gap-x-5 gap-y-2 text-[10px] font-medium tracking-[0.12em] text-white/65 sm:gap-x-7 sm:text-xs sm:tracking-[0.14em]">

                  <span>24 QUESTIONS</span>

                  <span>10 MINUTES</span>

                  <span>CONFIDENTIAL</span>

                  <span>FREE</span>

                </div>

                <Link

                  href="/stress-test"

                  className="inline-flex w-full items-center justify-center border border-[#f2efe8] px-6 py-4 text-xs font-semibold tracking-[0.14em] transition-colors hover:bg-[#f2efe8] hover:text-black sm:w-fit"

                >

                  TAKE THE STRESS TEST <Arrow />

                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* WHAT FORGE DOES */}

      <section id="about" className="border-b border-black/20">

        <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-6 md:px-10 md:py-28 lg:px-14 lg:py-36">

          <p className="mb-8 text-xs font-semibold tracking-[0.18em] md:mb-10">

            WHAT FORGE DOES

          </p>

          <h2 className="max-w-5xl text-[13vw] font-semibold uppercase leading-[0.92] tracking-[-0.05em] sm:text-5xl md:text-7xl lg:text-8xl">

            From experience

            <br />

            to intelligence.

          </h2>

          <div className="mt-12 grid grid-cols-1 border-l border-t border-black/20 md:mt-16 md:grid-cols-3">

            <div className="border-b border-r border-black/20 p-7 md:p-10">

              <p className="mb-12 text-xs font-semibold tracking-[0.18em] md:mb-16">

                01 / MEASURE

              </p>

              <p className="text-lg leading-8">

                Structured diagnostics make invisible departmental strengths

                and vulnerabilities measurable.

              </p>

            </div>

            <div className="border-b border-r border-black/20 p-7 md:p-10">

              <p className="mb-12 text-xs font-semibold tracking-[0.18em] md:mb-16">

                02 / UNDERSTAND

              </p>

              <p className="text-lg leading-8">

                Forge identifies recurring patterns in how international-school

                sports departments operate, where they struggle and what

                creates resilience.

              </p>

            </div>

            <div className="border-b border-r border-black/20 p-7 md:p-10">

              <p className="mb-12 text-xs font-semibold tracking-[0.18em] md:mb-16">

                03 / IMPROVE

              </p>

              <p className="text-lg leading-8">

                Those insights become practical frameworks, tools and

                interventions designed to improve how sport is led and

                operated.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* METHOD */}

      <section id="method" className="border-b border-black/20">

        <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-6 md:px-10 md:py-28 lg:px-14 lg:py-36">

          <p className="mb-8 text-xs font-semibold tracking-[0.18em] md:mb-10">

            THE FORGE METHOD

          </p>

          <h2 className="max-w-6xl text-[13vw] font-semibold uppercase leading-[0.92] tracking-[-0.05em] sm:text-5xl md:text-7xl lg:text-8xl">

            Don&apos;t treat

            <br />

            the symptom.

            <br />

            Find the system

            <br />

            causing it.

          </h2>

          <div className="mt-14 border-t border-black md:mt-20">

            {[

              ["01", "MEASURE", "What is actually happening?"],

              ["02", "DIAGNOSE", "Where is the constraint?"],

              [

                "03",

                "CHALLENGE",

                "What assumptions or structures are maintaining it?",

              ],

              [

                "04",

                "REDESIGN",

                "What is the smallest change capable of improving the system?",

              ],

              ["05", "MEASURE AGAIN", "Did it work?"],

            ].map(([number, title, text]) => (

              <div

                key={number}

                className="grid grid-cols-12 gap-4 border-b border-black/20 py-7 md:py-9"

              >

                <div className="col-span-2 text-xs font-semibold tracking-[0.14em] md:col-span-1">

                  {number}

                </div>

                <div className="col-span-10 text-sm font-semibold tracking-[0.12em] md:col-span-3">

                  {title}

                </div>

                <div className="col-span-10 col-start-3 mt-3 text-base leading-7 text-black/65 md:col-span-7 md:col-start-auto md:mt-0 md:text-lg">

                  {text}

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* INTELLIGENCE */}

      <section id="intelligence" className="border-b border-black/20">

        <div className="mx-auto grid max-w-[1500px] grid-cols-1 lg:grid-cols-12">

          <div className="px-5 py-16 sm:px-6 md:px-10 md:py-28 lg:col-span-8 lg:px-14 lg:py-36">

            <p className="mb-8 text-xs font-semibold tracking-[0.18em] md:mb-10">

              WHAT WE&apos;RE BUILDING

            </p>

            <h2 className="max-w-5xl text-[13vw] font-semibold uppercase leading-[0.92] tracking-[-0.05em] sm:text-5xl md:text-7xl">

              The intelligence

              <br />

              layer for

              <br />

              school sport.

            </h2>

            <div className="mt-12 max-w-2xl space-y-6 text-base leading-7 text-black/70 md:mt-14 md:text-lg md:leading-8">

              <p>

                Every sports department contains operational knowledge: what

                works, what fails, where time disappears, where programmes

                become dependent on individuals, and which systems create

                resilience.

              </p>

              <p>

                Forge is building structured ways to capture that knowledge,

                turn it into useful intelligence and return it to sports leaders

                as better tools, benchmarks and operating practices.

              </p>

            </div>

          </div>

          <div className="flex flex-col justify-between border-t border-black/20 p-7 sm:p-8 md:p-10 lg:col-span-4 lg:border-l lg:border-t-0 lg:p-14">

            <Keystone className="h-20 w-20 sm:h-24 sm:w-24" />

            <div className="mt-20 space-y-4 text-sm font-semibold tracking-[0.12em] md:mt-24">

              <p>DIAGNOSTICS</p>

              <p>↓</p>

              <p>FRAMEWORKS</p>

              <p>↓</p>

              <p>BENCHMARKS</p>

              <p>↓</p>

              <p>BETTER SPORT</p>

            </div>

          </div>

        </div>

      </section>

      {/* FINAL CTA */}

      <section className="bg-[#f2efe8]">

        <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-6 md:px-10 md:py-28 lg:px-14 lg:py-36">

          <p className="mb-8 text-xs font-semibold tracking-[0.18em] md:mb-10">

            START HERE

          </p>

          <h2 className="max-w-6xl text-[14vw] font-semibold uppercase leading-[0.9] tracking-[-0.055em] sm:text-6xl md:text-8xl lg:text-[7.5rem] lg:leading-[0.88] lg:tracking-[-0.06em]">

            Know where your

            <br />

            department

            <br />

            is exposed.

          </h2>

          <div className="mt-12 flex flex-col gap-8 border-t border-black/20 pt-8 md:mt-14 md:flex-row md:items-end md:justify-between md:pt-10">

            <div>

              <p className="text-lg md:text-xl">

                Start with the Forge Sport Department Stress Test.

              </p>

              <p className="mt-4 text-[10px] font-medium leading-relaxed tracking-[0.12em] text-black/60 sm:text-xs sm:tracking-[0.14em]">

                10 MINUTES · 24 QUESTIONS · CONFIDENTIAL · FREE

              </p>

            </div>

            <Link

              href="/stress-test"

              className="inline-flex w-full items-center justify-center bg-black px-7 py-5 text-xs font-semibold tracking-[0.14em] text-[#f2efe8] transition-opacity hover:opacity-75 sm:w-fit"

            >

              TAKE THE STRESS TEST <Arrow />

            </Link>

          </div>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="border-t border-black bg-black text-[#f2efe8]">

        <div className="mx-auto max-w-[1500px] px-5 py-10 sm:px-6 md:px-10 lg:px-14">

          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">

            <div>

              <div className="flex items-center gap-3">

                <Keystone className="h-7 w-7" />

                <span className="text-sm font-semibold tracking-[0.18em]">

                  FORGE

                </span>

              </div>

              <p className="mt-5 max-w-xs text-sm leading-6 text-white/55">

                Independent intelligence for school sport.

              </p>

            </div>

            <div className="space-y-3 text-xs font-medium tracking-[0.12em] text-white/70">

              <a href="#method" className="block hover:text-white">

                METHOD

              </a>

              <Link href="/stress-test" className="block hover:text-white">

                STRESS TEST

              </Link>

              <a href="#intelligence" className="block hover:text-white">

                INSIGHTS

              </a>

              <a href="#about" className="block hover:text-white">

                ABOUT

              </a>

            </div>

            <div className="flex flex-col justify-between md:items-end">

              <p className="text-xs tracking-[0.12em] text-white/45">

                © 2026 FORGE

              </p>

              <div className="mt-6 flex gap-5 text-[10px] tracking-[0.12em] text-white/45">

                <span>PRIVACY</span>

                <span>TERMS</span>

              </div>

            </div>

          </div>

        </div>

      </footer>

    </main>

  );

}
