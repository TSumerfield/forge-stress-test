"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

type Context = {
  source: "readiness_check" | "stress_test" | "direct";
  score: number | null;
  profile: string;
  exposure: string;
};

const priceOptions = [
  ["under_50", "Under £50"],
  ["50_99", "£50–£99"],
  ["100_199", "£100–£199"],
  ["200_plus", "£200+"],
  ["unsure", "Not sure"],
];

const deliverables = [
  ["01", "The issue", "What Forge believes the real problem is."],
  ["02", "Diagnosis", "Likely causes, including what may sit beneath the visible problem."],
  ["03", "Priority", "What matters now, what can wait and where attention should go first."],
  ["04", "Recommended system", "A practical process, framework or operating change."],
  ["05", "Action plan", "No more than five sequenced actions for the next 30 days."],
  ["06", "Forge tool", "One reusable checklist, template, protocol or framework."],
  ["07", "Watch for", "Risks, dependencies and unintended consequences."],
  ["08", "30-day check", "What should have changed if the intervention is working."],
];

export default function NextStepPage() {
  const [context, setContext] = useState<Context>({
    source: "direct",
    score: null,
    profile: "YOUR RESULT",
    exposure: "your priority area",
  });
  const [interestLevel, setInterestLevel] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [reviewFocus, setReviewFocus] = useState("");
  const [valuableOutcome, setValuableOutcome] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const rawScore = Number(params.get("score"));
    const rawSource = params.get("source");
    const source = rawSource === "stress_test" || rawSource === "readiness_check" ? rawSource : "direct";

    setContext({
      source,
      score: Number.isFinite(rawScore) && rawScore >= 0 && rawScore <= 100 ? rawScore : null,
      profile: params.get("profile") || "YOUR RESULT",
      exposure: params.get("exposure") || "your priority area",
    });
  }, []);

  async function submitInterest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!interestLevel || !priceRange || status === "saving") return;
    setStatus("saving");

    const { error } = await supabase.from("action_review_interest").insert([
      {
        source_diagnostic: context.source,
        diagnostic_score: context.score,
        diagnostic_profile: context.profile,
        primary_exposure: context.exposure,
        interest_level: interestLevel,
        price_range: priceRange,
        review_focus: reviewFocus.trim() || null,
        valuable_outcome: valuableOutcome.trim() || null,
        email: email.trim() || null,
      },
    ]);

    setStatus(error ? "error" : "saved");
  }

  return (
    <main className="min-h-screen bg-[#f3f0e8] text-black">
      <header className="border-b border-black/20">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-6 md:px-10">
          <Link href="/" className="text-sm font-semibold tracking-[0.18em]">FORGE</Link>
          <span className="text-[10px] font-semibold tracking-[0.16em] text-black/55 md:text-xs">ACTION REVIEW · PILOT</span>
        </div>
      </header>

      <section className="border-b border-black/20">
        <div className="mx-auto grid max-w-[1500px] md:grid-cols-12">
          <div className="border-b border-black/20 px-6 py-12 md:col-span-8 md:border-b-0 md:border-r md:px-10 md:py-16">
            <p className="text-xs font-semibold tracking-[0.18em] text-black/55">FROM DIAGNOSIS TO ACTION</p>
            <h1 className="mt-8 max-w-5xl text-[13vw] font-semibold uppercase leading-[0.84] tracking-[-0.07em] md:text-[6.4vw]">You know where the pressure is.</h1>
            <p className="mt-10 max-w-2xl text-xl leading-relaxed md:text-2xl">Forge helps you decide what to do about it.</p>
          </div>
          <aside className="px-6 py-12 md:col-span-4 md:px-10 md:py-16">
            <p className="text-xs font-semibold tracking-[0.16em] text-black/45">YOUR CONTEXT</p>
            {context.score !== null && <p className="mt-8 text-7xl font-semibold tracking-[-0.07em]">{context.score}<span className="text-2xl text-black/35">/100</span></p>}
            <p className="mt-7 text-xl font-semibold uppercase tracking-[-0.03em]">{context.profile}</p>
            <p className="mt-3 text-sm leading-6 text-black/60">Priority area: {context.exposure}</p>
          </aside>
        </div>
      </section>

      <section className="border-b border-black/20 bg-black text-[#f3f0e8]">
        <div className="mx-auto grid max-w-[1500px] md:grid-cols-12">
          <div className="border-b border-white/20 px-6 py-12 md:col-span-4 md:border-b-0 md:border-r md:px-10 md:py-16">
            <p className="text-xs font-semibold tracking-[0.16em] text-white/45">FORGE ACTION REVIEW</p>
            <h2 className="mt-6 text-5xl font-semibold uppercase leading-[0.9] tracking-[-0.06em]">One problem. One focused intervention.</h2>
            <p className="mt-7 leading-7 text-white/65">A concise independent review of one operational problem inside a school sport or athletics setting.</p>
            <div className="mt-10 border-y border-white/20 py-6 text-xs font-semibold uppercase tracking-[0.12em] text-white/60">
              Asynchronous · Fixed scope · No meeting required
            </div>
          </div>
          <div className="px-6 py-12 md:col-span-8 md:px-10 md:py-16">
            <p className="text-xs font-semibold tracking-[0.16em] text-white/45">WHAT YOU WOULD RECEIVE</p>
            <div className="mt-8 divide-y divide-white/20 border-y border-white/20">
              {deliverables.map(([number, title, description]) => (
                <div key={number} className="grid gap-3 py-5 md:grid-cols-[55px_190px_1fr] md:items-start">
                  <span className="text-xs font-semibold text-white/35">{number}</span>
                  <span className="text-sm font-semibold uppercase tracking-[0.08em]">{title}</span>
                  <span className="text-sm leading-6 text-white/60">{description}</span>
                </div>
              ))}
            </div>
            <a href="#interest" className="mt-10 inline-block text-xs font-semibold tracking-[0.14em] underline underline-offset-8">WOULD THIS HELP?</a>
          </div>
        </div>
      </section>

      <section className="border-b border-black/20">
        <div className="mx-auto grid max-w-[1500px] md:grid-cols-3">
          <div className="border-b border-black/20 p-8 md:border-b-0 md:border-r md:p-10">
            <p className="text-xs font-semibold tracking-[0.16em] text-black/45">INPUT</p>
            <h3 className="mt-5 text-3xl font-semibold uppercase tracking-[-0.04em]">Under 10 minutes.</h3>
            <p className="mt-5 leading-7 text-black/60">Describe the problem, what is happening now, what you have tried, your constraints and the outcome you need. Supporting documents are optional.</p>
          </div>
          <div className="border-b border-black/20 p-8 md:border-b-0 md:border-r md:p-10">
            <p className="text-xs font-semibold tracking-[0.16em] text-black/45">SCOPE</p>
            <h3 className="mt-5 text-3xl font-semibold uppercase tracking-[-0.04em]">Deliberately narrow.</h3>
            <p className="mt-5 leading-7 text-black/60">This is not a department audit or open-ended consultancy. Forge examines one meaningful operational issue and recommends the smallest useful response.</p>
          </div>
          <div className="p-8 md:p-10">
            <p className="text-xs font-semibold tracking-[0.16em] text-black/45">DELIVERY</p>
            <h3 className="mt-5 text-3xl font-semibold uppercase tracking-[-0.04em]">Built for action.</h3>
            <p className="mt-5 leading-7 text-black/60">The output is designed to be used, shared internally where appropriate and checked again after 30 days. No recurring commitment.</p>
          </div>
        </div>
      </section>

      <section id="interest" className="border-b border-black/20 bg-[#ece8dd]">
        <div className="mx-auto grid max-w-[1500px] md:grid-cols-12">
          <div className="border-b border-black/20 px-6 py-12 md:col-span-4 md:border-b-0 md:border-r md:px-10 md:py-16">
            <p className="text-xs font-semibold tracking-[0.16em] text-black/45">VALIDATION PILOT</p>
            <h2 className="mt-6 text-5xl font-semibold uppercase leading-[0.92] tracking-[-0.06em]">Should Forge offer this?</h2>
            <p className="mt-6 leading-7 text-black/60">Forge is testing whether sports leaders would pay for this focused intervention before building it further.</p>
            <p className="mt-5 text-sm leading-6 text-black/50">Registering interest is not a purchase or commitment. No school name is required. If you leave an email, it will only be used to contact you about this pilot.</p>
          </div>
          <div className="px-6 py-12 md:col-span-8 md:px-10 md:py-16">
            {status === "saved" ? (
              <div className="max-w-2xl border-y border-black py-12">
                <p className="text-xs font-semibold tracking-[0.16em] text-black/45">INTEREST RECORDED</p>
                <h3 className="mt-5 text-4xl font-semibold uppercase tracking-[-0.05em]">Thank you. That is useful evidence.</h3>
                <p className="mt-5 leading-7 text-black/60">If you supplied an email, Forge may contact you only if the Action Review pilot moves forward. No sales call is required.</p>
              </div>
            ) : (
              <form onSubmit={submitInterest} className="max-w-3xl space-y-10">
                <fieldset>
                  <legend className="text-sm font-semibold">Would you consider paying for a focused independent Action Review of one issue?</legend>
                  <div className="mt-4 grid gap-2 sm:grid-cols-3">
                    {[["yes", "Yes"], ["maybe", "Maybe"], ["not_now", "Not now"]].map(([value, label]) => (
                      <button type="button" key={value} onClick={() => setInterestLevel(value)} className={`border px-5 py-4 text-xs font-semibold tracking-[0.12em] ${interestLevel === value ? "bg-black text-white" : "border-black/30"}`}>{label.toUpperCase()}</button>
                    ))}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="text-sm font-semibold">What price would feel reasonable if it solved a meaningful problem?</legend>
                  <div className="mt-4 grid gap-2 sm:grid-cols-5">
                    {priceOptions.map(([value, label]) => (
                      <button type="button" key={value} onClick={() => setPriceRange(value)} className={`border px-3 py-4 text-xs font-semibold ${priceRange === value ? "bg-black text-white" : "border-black/30"}`}>{label}</button>
                    ))}
                  </div>
                </fieldset>

                <label className="block">
                  <span className="text-sm font-semibold">What single problem would you want Forge to review?</span>
                  <textarea value={reviewFocus} onChange={(event) => setReviewFocus(event.target.value)} rows={3} className="mt-3 w-full border border-black/30 bg-transparent p-4 outline-none focus:border-black" placeholder="For example: unclear staff ownership, parent communication, calendar overload, continuity risk..." />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold">What outcome would make the review genuinely valuable?</span>
                  <textarea value={valuableOutcome} onChange={(event) => setValuableOutcome(event.target.value)} rows={3} className="mt-3 w-full border border-black/30 bg-transparent p-4 outline-none focus:border-black" placeholder="What would need to be clearer, easier, safer or more reliable afterwards?" />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold">Email <span className="font-normal text-black/45">(optional)</span></span>
                  <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-3 w-full border border-black/30 bg-transparent p-4 outline-none focus:border-black" placeholder="you@school.org" />
                </label>

                <button disabled={!interestLevel || !priceRange || status === "saving"} className="bg-black px-7 py-4 text-xs font-semibold tracking-[0.14em] text-white disabled:opacity-30">{status === "saving" ? "SAVING…" : "REGISTER INTEREST"}</button>
                {status === "error" && <p className="text-sm text-red-700">Your response could not be saved. Please try again.</p>}
              </form>
            )}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto flex max-w-[1500px] flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10">
          <p className="max-w-2xl text-sm leading-6 text-black/50">Not ready for a review? Use the diagnostic finding independently. The purpose of Forge is better action, not unnecessary intervention.</p>
          <div className="flex flex-wrap gap-6">
            <Link href="/readiness-check" className="text-xs font-semibold tracking-[0.14em] underline underline-offset-8">READINESS CHECK</Link>
            <Link href="/stress-test" className="text-xs font-semibold tracking-[0.14em] underline underline-offset-8">SYSTEMS STRESS TEST</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
