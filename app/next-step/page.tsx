"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

type Context = {
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

export default function NextStepPage() {
  const [context, setContext] = useState<Context>({ score: null, profile: "YOUR RESULT", exposure: "your priority area" });
  const [interestLevel, setInterestLevel] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [reviewFocus, setReviewFocus] = useState("");
  const [valuableOutcome, setValuableOutcome] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const rawScore = Number(params.get("score"));
    setContext({
      score: Number.isFinite(rawScore) && rawScore >= 0 && rawScore <= 100 ? rawScore : null,
      profile: params.get("profile") || "YOUR RESULT",
      exposure: params.get("exposure") || "your priority area",
    });
  }, []);

  async function submitInterest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!interestLevel || !priceRange || status === "saving") return;
    setStatus("saving");

    const { error } = await supabase.from("action_review_interest").insert([{
      source_diagnostic: "readiness_check",
      diagnostic_score: context.score,
      diagnostic_profile: context.profile,
      primary_exposure: context.exposure,
      interest_level: interestLevel,
      price_range: priceRange,
      review_focus: reviewFocus.trim() || null,
      valuable_outcome: valuableOutcome.trim() || null,
      email: email.trim() || null,
    }]);

    setStatus(error ? "error" : "saved");
  }

  return (
    <main className="min-h-screen bg-[#f3f0e8] text-black">
      <header className="border-b border-black/20">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-6 md:px-10">
          <Link href="/" className="text-sm font-semibold tracking-[0.18em]">FORGE</Link>
          <span className="text-[10px] font-semibold tracking-[0.16em] text-black/55 md:text-xs">CHOOSE YOUR NEXT STEP</span>
        </div>
      </header>

      <section className="border-b border-black/20">
        <div className="mx-auto grid max-w-[1500px] md:grid-cols-12">
          <div className="border-b border-black/20 px-6 py-12 md:col-span-8 md:border-b-0 md:border-r md:px-10 md:py-16">
            <p className="text-xs font-semibold tracking-[0.18em] text-black/55">FROM DIAGNOSIS TO ACTION</p>
            <h1 className="mt-8 max-w-5xl text-[13vw] font-semibold uppercase leading-[0.84] tracking-[-0.07em] md:text-[6.4vw]">Choose the smallest useful next step.</h1>
          </div>
          <aside className="px-6 py-12 md:col-span-4 md:px-10 md:py-16">
            <p className="text-xs font-semibold tracking-[0.16em] text-black/45">YOUR CONTEXT</p>
            {context.score !== null && <p className="mt-8 text-7xl font-semibold tracking-[-0.07em]">{context.score}<span className="text-2xl text-black/35">/100</span></p>}
            <p className="mt-7 text-xl font-semibold uppercase tracking-[-0.03em]">{context.profile}</p>
            <p className="mt-3 text-sm leading-6 text-black/60">Primary exposure: {context.exposure}</p>
          </aside>
        </div>
      </section>

      <section className="border-b border-black/20">
        <div className="mx-auto grid max-w-[1500px] lg:grid-cols-3">
          <article className="flex min-h-[390px] flex-col justify-between border-b border-black/20 p-8 lg:border-b-0 lg:border-r lg:p-10">
            <div><p className="text-xs font-semibold tracking-[0.16em] text-black/45">01 · ACT INDEPENDENTLY</p><h2 className="mt-8 text-4xl font-semibold uppercase tracking-[-0.05em]">Use your results.</h2><p className="mt-5 leading-7 text-black/60">Return to your three recommended actions and assign an owner, deadline and evidence of completion.</p></div>
            <Link href="/readiness-check" className="mt-10 w-fit text-xs font-semibold tracking-[0.14em] underline underline-offset-8">REVISIT THE CHECK</Link>
          </article>
          <article className="flex min-h-[390px] flex-col justify-between border-b border-black/20 bg-black p-8 text-[#f3f0e8] lg:border-b-0 lg:border-r lg:p-10">
            <div><p className="text-xs font-semibold tracking-[0.16em] text-white/45">02 · INDEPENDENT REVIEW</p><h2 className="mt-8 text-4xl font-semibold uppercase tracking-[-0.05em]">Sequence the next 30 days.</h2><p className="mt-5 leading-7 text-white/65">Register interest in a fixed-scope Forge review of your gaps, documents and immediate priorities. No call required.</p></div>
            <a href="#interest" className="mt-10 w-fit text-xs font-semibold tracking-[0.14em] underline underline-offset-8">REGISTER INTEREST</a>
          </article>
          <article className="flex min-h-[390px] flex-col justify-between p-8 lg:p-10">
            <div><p className="text-xs font-semibold tracking-[0.16em] text-black/45">03 · GO DEEPER</p><h2 className="mt-8 text-4xl font-semibold uppercase tracking-[-0.05em]">Examine the system.</h2><p className="mt-5 leading-7 text-black/60">Use the Department Stress Test to expose the structural conditions beneath immediate readiness gaps.</p></div>
            <Link href="/stress-test" className="mt-10 w-fit text-xs font-semibold tracking-[0.14em] underline underline-offset-8">TAKE THE STRESS TEST</Link>
          </article>
        </div>
      </section>

      <section id="interest" className="border-b border-black/20">
        <div className="mx-auto grid max-w-[1500px] md:grid-cols-12">
          <div className="border-b border-black/20 px-6 py-12 md:col-span-4 md:border-b-0 md:border-r md:px-10 md:py-16">
            <p className="text-xs font-semibold tracking-[0.16em] text-black/45">PROPOSED PILOT</p>
            <h2 className="mt-6 text-5xl font-semibold uppercase leading-[0.92] tracking-[-0.06em]">Forge Readiness Action Review.</h2>
            <p className="mt-6 leading-7 text-black/60">A concise independent review of your diagnostic, selected documents and immediate risks, returned as a prioritised 30-day action plan.</p>
            <p className="mt-5 text-sm leading-6 text-black/50">Registering interest is not a purchase or commitment. It helps determine whether Forge should build this offer.</p>
          </div>
          <div className="px-6 py-12 md:col-span-8 md:px-10 md:py-16">
            {status === "saved" ? (
              <div className="max-w-2xl border-y border-black py-12"><p className="text-xs font-semibold tracking-[0.16em] text-black/45">INTEREST RECORDED</p><h3 className="mt-5 text-4xl font-semibold uppercase tracking-[-0.05em]">Thank you. No sales call will follow.</h3><p className="mt-5 leading-7 text-black/60">If you supplied an email, Forge may contact you only if the pilot moves forward.</p></div>
            ) : (
              <form onSubmit={submitInterest} className="max-w-3xl space-y-10">
                <fieldset><legend className="text-sm font-semibold">Would you consider paying for an independent Action Review?</legend><div className="mt-4 grid gap-2 sm:grid-cols-3">{[["yes","Yes"],["maybe","Maybe"],["not_now","Not now"]].map(([value,label]) => <button type="button" key={value} onClick={() => setInterestLevel(value)} className={`border px-5 py-4 text-xs font-semibold tracking-[0.12em] ${interestLevel === value ? "bg-black text-white" : "border-black/30"}`}>{label.toUpperCase()}</button>)}</div></fieldset>
                <fieldset><legend className="text-sm font-semibold">What price would feel reasonable if the review solved a meaningful problem?</legend><div className="mt-4 grid gap-2 sm:grid-cols-5">{priceOptions.map(([value,label]) => <button type="button" key={value} onClick={() => setPriceRange(value)} className={`border px-3 py-4 text-xs font-semibold ${priceRange === value ? "bg-black text-white" : "border-black/30"}`}>{label}</button>)}</div></fieldset>
                <label className="block"><span className="text-sm font-semibold">What would you want reviewed?</span><textarea value={reviewFocus} onChange={(e) => setReviewFocus(e.target.value)} rows={3} className="mt-3 w-full border border-black/30 bg-transparent p-4 outline-none focus:border-black" placeholder="Calendar, staffing, communication, risk planning…" /></label>
                <label className="block"><span className="text-sm font-semibold">What outcome would make the review valuable?</span><textarea value={valuableOutcome} onChange={(e) => setValuableOutcome(e.target.value)} rows={3} className="mt-3 w-full border border-black/30 bg-transparent p-4 outline-none focus:border-black" placeholder="A clearer sequence, fewer launch risks, leadership assurance…" /></label>
                <label className="block"><span className="text-sm font-semibold">Email <span className="font-normal text-black/45">(optional)</span></span><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-3 w-full border border-black/30 bg-transparent p-4 outline-none focus:border-black" placeholder="you@school.org" /></label>
                <button disabled={!interestLevel || !priceRange || status === "saving"} className="bg-black px-7 py-4 text-xs font-semibold tracking-[0.14em] text-white disabled:opacity-30">{status === "saving" ? "SAVING…" : "REGISTER INTEREST"}</button>
                {status === "error" && <p className="text-sm text-red-700">Your response could not be saved. Please try again.</p>}
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
