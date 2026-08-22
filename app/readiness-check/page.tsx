"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

type AreaKey = "people" | "programme" | "operations" | "safety" | "communication" | "capacity";
type Area = { key: AreaKey; name: string; shortName: string; description: string };
type Question = { id: number; area: AreaKey; text: string };

const areas: Area[] = [
  { key: "people", name: "People & Ownership", shortName: "People", description: "Roles, cover, induction and accountable ownership." },
  { key: "programme", name: "Opportunities & Calendar", shortName: "Opportunities", description: "A coherent sports offering with confirmed dates and dependencies." },
  { key: "operations", name: "Facilities & Equipment", shortName: "Operations", description: "Spaces, equipment, bookings and suppliers ready for delivery." },
  { key: "safety", name: "Safety & Contingencies", shortName: "Safety", description: "Medical, student protection, risk and disruption plans that work." },
  { key: "communication", name: "Communication & Expectations", shortName: "Communication", description: "Clear information for staff, students and families." },
  { key: "capacity", name: "Workload & Pressure Points", shortName: "Capacity", description: "A manageable launch with visible bottlenecks and trade-offs." },
];

const questions: Question[] = [
  { id: 1, area: "people", text: "Every major activity in the opening six weeks has one clearly accountable owner." },
  { id: 2, area: "people", text: "New and returning staff understand their responsibilities, decision rights and immediate priorities." },
  { id: 3, area: "people", text: "Critical responsibilities have realistic cover if a key person is unexpectedly absent." },
  { id: 4, area: "programme", text: "The opening-phase calendar is confirmed, accessible and checked for major conflicts." },
  { id: 5, area: "programme", text: "Tryouts or trials, team selection, clubs, activities and competition pathways have clear dates, criteria and owners." },
  { id: 6, area: "programme", text: "Dependencies involving other departments, schools or external providers have been confirmed." },
  { id: 7, area: "operations", text: "Facilities and recurring bookings are confirmed for the opening phase of the year." },
  { id: 8, area: "operations", text: "Essential equipment has been checked and shortages have an owner, budget and resolution date." },
  { id: 9, area: "operations", text: "Travel, transportation, officials, venues and key suppliers are confirmed where they are already required." },
  { id: 10, area: "safety", text: "Risk assessments, medical information and emergency procedures are current and accessible." },
  { id: 11, area: "safety", text: "Staff understand the reporting and escalation process for injuries, student protection concerns and serious incidents." },
  { id: 12, area: "safety", text: "Credible contingencies exist for weather, facility loss, transportation failure and staff absence." },
  { id: 13, area: "communication", text: "Staff know what must be communicated, by whom, through which channel and by when." },
  { id: 14, area: "communication", text: "Students and families can easily find the information needed for the opening weeks." },
  { id: 15, area: "communication", text: "Likely points of confusion or complaint have been anticipated and addressed in advance." },
  { id: 16, area: "capacity", text: "The opening six weeks are deliverable without relying on sustained overtime or repeated last-minute rescue." },
  { id: 17, area: "capacity", text: "The sports operation has identified its most congested periods and reduced, moved or delegated work where necessary." },
  { id: 18, area: "capacity", text: "Leaders have protected time to resolve emerging issues rather than carrying a completely full delivery load." },
];

const labels: Record<number, string> = { 1: "Not in place", 2: "Major gaps", 3: "Partly ready", 4: "Mostly ready", 5: "Fully ready" };

const actions: Record<AreaKey, string[]> = {
  people: ["Assign one accountable owner to every major opening-phase activity.", "Confirm cover for the three responsibilities most vulnerable to absence.", "Issue a one-page responsibilities and decision-rights brief to staff."],
  programme: ["Run a six-week calendar collision check with all key dependencies visible.", "Confirm dates, criteria and ownership for tryouts or trials, teams and activities.", "Close outstanding commitments with partner schools and providers."],
  operations: ["Complete a facilities, bookings and essential-equipment readiness walk.", "Give every shortage a named owner, budget decision and deadline.", "Reconfirm travel, transportation, venues, officials and suppliers already required."],
  safety: ["Verify that risk, medical and emergency information is current and accessible.", "Brief staff on injury, student protection and serious-incident escalation.", "Write the response for the three most credible opening-phase disruptions."],
  communication: ["Create one communication map covering audience, message, owner, channel and date.", "Publish one reliable source of opening-week information for families.", "Pre-empt the three questions or complaints most likely to consume staff time."],
  capacity: ["Map the opening six weeks and mark workload peaks before they arrive.", "Remove, delay or delegate at least one low-value commitment in each peak period.", "Protect leadership capacity for exceptions, decisions and emerging problems."],
};

function getProfile(score: number) {
  if (score >= 85) return { name: "READY TO LAUNCH", description: "The foundations are in place. Focus on maintaining visibility and responding early when conditions change." };
  if (score >= 70) return { name: "READY WITH GAPS", description: "The year can launch effectively, but several unresolved gaps deserve action before pressure increases." };
  if (score >= 50) return { name: "OPERATIONALLY EXPOSED", description: "Important parts of delivery remain vulnerable to disruption, ambiguity or last-minute intervention." };
  return { name: "HIGH-RISK START", description: "Multiple launch conditions are not yet secure. Reduce exposure before adding further activity." };
}

export default function ReadinessCheckPage() {
  const [started, setStarted] = useState(false);
  const [areaIndex, setAreaIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [finished, setFinished] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const hasSaved = useRef(false);

  const currentArea = areas[areaIndex];
  const currentQuestions = questions.filter((question) => question.area === currentArea.key);
  const complete = currentQuestions.every((question) => answers[question.id]);
  const progress = Math.round((Object.keys(answers).length / questions.length) * 100);

  const scores = useMemo(() => {
    const result = {} as Record<AreaKey, number>;
    areas.forEach((area) => {
      const areaQuestions = questions.filter((question) => question.area === area.key);
      const total = areaQuestions.reduce((sum, question) => sum + (answers[question.id] ?? 0), 0);
      result[area.key] = Math.round((total / (areaQuestions.length * 5)) * 100);
    });
    return result;
  }, [answers]);

  const overallScore = useMemo(() => Math.round((Object.values(answers).reduce((sum, value) => sum + value, 0) / 90) * 100), [answers]);
  const ranked = useMemo(() => [...areas].sort((a, b) => scores[b.key] - scores[a.key]), [scores]);
  const strongest = ranked[0];
  const weakest = ranked[ranked.length - 1];
  const profile = getProfile(overallScore);

  async function saveAssessment() {
    if (hasSaved.current) return;
    hasSaved.current = true;
    setSaveStatus("saving");
    const payload = {
      answers,
      readiness_score: overallScore,
      profile: profile.name,
      people_score: scores.people,
      programme_score: scores.programme,
      operations_score: scores.operations,
      safety_score: scores.safety,
      communication_score: scores.communication,
      capacity_score: scores.capacity,
      strongest_area: strongest.name,
      weakest_area: weakest.name,
    };
    try {
      const { error } = await supabase.from("readiness_check_responses").insert([payload]);
      if (error) throw error;
      setSaveStatus("saved");
    } catch (error) {
      console.error("Readiness Check save error:", error);
      hasSaved.current = false;
      setSaveStatus("error");
    }
  }

  async function next() {
    if (!complete) return;
    if (areaIndex === areas.length - 1) {
      setFinished(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      await saveAssessment();
      return;
    }
    setAreaIndex((value) => value + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function restart() {
    setStarted(false); setFinished(false); setAreaIndex(0); setAnswers({}); setSaveStatus("idle"); hasSaved.current = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const Header = ({ label }: { label: string }) => (
    <header className="border-b border-black/20">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-6 md:px-10">
        <Link href="/" className="text-sm font-semibold tracking-[0.18em]">FORGE</Link>
        <span className="text-right text-[10px] font-semibold tracking-[0.14em] text-black/55 md:text-xs md:tracking-[0.16em]">{label}</span>
      </div>
    </header>
  );

  if (!started) return (
    <main className="min-h-screen bg-[#f3f0e8] text-black">
      <Header label="SCHOOL SPORTS READINESS CHECK" />
      <section className="border-b border-black/20">
        <div className="mx-auto grid min-h-[78vh] max-w-[1500px] md:grid-cols-12">
          <div className="flex flex-col justify-between border-b border-black/20 px-6 py-12 md:col-span-8 md:border-b-0 md:border-r md:px-10 md:py-16">
            <div>
              <p className="mb-8 text-xs font-semibold tracking-[0.18em]">FREE · CONFIDENTIAL · APPROX. 5 MINUTES</p>
              <h1 className="max-w-[1050px] text-[14vw] font-semibold uppercase leading-[0.82] tracking-[-0.07em] md:text-[6.5vw]">Ready for<br />what comes<br />next?</h1>
            </div>
            <div className="mt-16 max-w-2xl">
              <p className="text-xl leading-relaxed md:text-2xl">A full calendar is not the same as a ready sports operation.</p>
              <p className="mt-6 text-base leading-relaxed text-black/65 md:text-lg">Check the six operational conditions most likely to shape the start of your year or season. Find the gaps, protect capacity and leave with three priorities.</p>
              <button onClick={() => setStarted(true)} className="mt-10 bg-black px-7 py-4 text-xs font-semibold tracking-[0.16em] text-white transition-opacity hover:opacity-80">CHECK YOUR READINESS</button>
            </div>
          </div>
          <aside className="px-6 py-12 md:col-span-4 md:px-10 md:py-16">
            <p className="text-xs font-semibold tracking-[0.18em] text-black/55">YOU WILL RECEIVE</p>
            <div className="mt-10 divide-y divide-black/20 border-y border-black/20">
              {["Readiness score", "Six area scores", "Strongest area", "Primary exposure", "Three priority actions"].map((label, index) => <div key={label} className="flex items-center gap-5 py-5"><span className="text-xs font-semibold text-black/40">0{index + 1}</span><span className="text-sm font-semibold uppercase tracking-[0.08em]">{label}</span></div>)}
            </div>
            <p className="mt-8 text-sm leading-relaxed text-black/55">Answer based on what is confirmed and usable today, not what is planned or assumed.</p>
          </aside>
        </div>
      </section>
    </main>
  );

  if (finished) return (
    <main className="min-h-screen bg-[#f3f0e8] text-black">
      <Header label="READINESS RESULTS" />
      <section className="border-b border-black/20">
        <div className="mx-auto grid max-w-[1500px] md:grid-cols-12">
          <div className="border-b border-black/20 px-6 py-12 md:col-span-7 md:border-b-0 md:border-r md:px-10 md:py-16">
            <p className="text-xs font-semibold tracking-[0.18em] text-black/55">READINESS SCORE</p>
            <div className="mt-6 flex items-end gap-3"><span className="text-[28vw] font-semibold leading-[0.75] tracking-[-0.08em] md:text-[14vw]">{overallScore}</span><span className="mb-2 text-2xl font-semibold text-black/35 md:mb-4">/100</span></div>
            <div className="mt-10 border-t border-black pt-7"><p className="text-sm font-semibold tracking-[0.16em]">{profile.name}</p><p className="mt-3 max-w-xl text-xl leading-relaxed">{profile.description}</p></div>
          </div>
          <div className="px-6 py-12 md:col-span-5 md:px-10 md:py-16">
            <p className="text-xs font-semibold tracking-[0.18em] text-black/55">LAUNCH PROFILE</p>
            <div className="mt-8"><p className="text-xs font-semibold tracking-[0.14em] text-black/50">STRONGEST AREA</p><p className="mt-2 text-3xl font-semibold uppercase tracking-[-0.04em]">{strongest.name}</p><p className="mt-2 text-lg">{scores[strongest.key]}</p></div>
            <div className="mt-10 border-t border-black/20 pt-8"><p className="text-xs font-semibold tracking-[0.14em] text-black/50">PRIMARY EXPOSURE</p><p className="mt-2 text-3xl font-semibold uppercase tracking-[-0.04em]">{weakest.name}</p><p className="mt-2 text-lg">{scores[weakest.key]}</p></div>
          </div>
        </div>
      </section>
      <section className="border-b border-black/20">
        <div className="mx-auto max-w-[1500px] px-6 py-12 md:px-10 md:py-16">
          <p className="text-xs font-semibold tracking-[0.18em] text-black/55">SIX READINESS AREAS</p>
          <div className="mt-8 divide-y divide-black/20 border-y border-black/20">{areas.map((area) => <div key={area.key} className="grid gap-3 py-6 md:grid-cols-[260px_1fr_90px] md:items-center"><p className="text-sm font-semibold uppercase tracking-[0.08em]">{area.name}</p><div className="h-2 overflow-hidden bg-black/10"><div className="h-full bg-black" style={{ width: `${scores[area.key]}%` }} /></div><p className="text-right text-2xl font-semibold">{scores[area.key]}</p></div>)}</div>
        </div>
      </section>
      <section className="border-b border-black/20 bg-black text-[#f3f0e8]">
        <div className="mx-auto grid max-w-[1500px] md:grid-cols-12">
          <div className="border-b border-white/20 px-6 py-12 md:col-span-4 md:border-b-0 md:border-r md:px-10 md:py-16"><p className="text-xs font-semibold tracking-[0.18em] text-white/50">THREE THINGS TO DO NEXT</p><h2 className="mt-6 text-4xl font-semibold uppercase leading-[0.95] tracking-[-0.05em]">Strengthen {weakest.shortName}.</h2></div>
          <div className="px-6 py-12 md:col-span-8 md:px-10 md:py-16"><div className="divide-y divide-white/20 border-y border-white/20">{actions[weakest.key].map((action, index) => <div key={action} className="grid gap-4 py-6 md:grid-cols-[50px_1fr]"><span className="text-xs font-semibold text-white/40">0{index + 1}</span><p className="text-lg leading-relaxed md:text-xl">{action}</p></div>)}</div></div>
        </div>
      </section>
      <section className="border-b border-black/20"><div className="mx-auto grid max-w-[1500px] gap-8 px-6 py-12 md:grid-cols-2 md:px-10 md:py-16"><div><p className="text-xs font-semibold tracking-[0.18em] text-black/55">TURN FINDINGS INTO ACTION</p><h2 className="mt-5 text-4xl font-semibold uppercase tracking-[-0.05em]">Choose the smallest useful next step.</h2><p className="mt-5 max-w-xl leading-relaxed text-black/60">Act independently, register interest in an independent 30-day Action Review, or examine the deeper system beneath the gaps.</p><Link href={`/next-step?score=${overallScore}&profile=${encodeURIComponent(profile.name)}&exposure=${encodeURIComponent(weakest.name)}`} className="mt-8 inline-block text-xs font-semibold tracking-[0.16em] underline underline-offset-8">SEE MY OPTIONS</Link></div><div className="flex items-end justify-start md:justify-end"><button onClick={restart} className="border border-black px-6 py-4 text-xs font-semibold tracking-[0.14em]">RETAKE THE CHECK</button></div></div></section>
      {saveStatus === "error" && <p className="mx-auto max-w-[1500px] px-6 py-4 text-sm text-red-700 md:px-10">Your result was calculated, but the anonymous response could not be saved.</p>}
    </main>
  );

  return (
    <main className="min-h-screen bg-[#f3f0e8] text-black">
      <Header label={`AREA 0${areaIndex + 1} / 06`} />
      <section className="border-b border-black/20"><div className="h-1 bg-black/10"><div className="h-full bg-black transition-all" style={{ width: `${progress}%` }} /></div><div className="mx-auto max-w-[1500px] px-6 py-6 md:px-10"><div className="flex items-end justify-between gap-6"><div><p className="text-xs font-semibold tracking-[0.16em] text-black/45">{currentArea.description}</p><h1 className="mt-3 text-4xl font-semibold uppercase tracking-[-0.05em] md:text-6xl">{currentArea.name}</h1></div><span className="text-sm font-semibold">{progress}%</span></div></div></section>
      <section><div className="mx-auto max-w-[1500px] divide-y divide-black/20 border-b border-black/20">{currentQuestions.map((question) => <article key={question.id} className="grid gap-7 px-6 py-10 md:grid-cols-12 md:px-10 md:py-12"><div className="md:col-span-5"><span className="text-xs font-semibold text-black/40">{String(question.id).padStart(2, "0")}</span><h2 className="mt-4 text-xl font-semibold leading-snug md:text-2xl">{question.text}</h2></div><div className="grid grid-cols-5 gap-2 md:col-span-7 md:items-center">{[1,2,3,4,5].map((value) => <button key={value} onClick={() => setAnswers((previous) => ({ ...previous, [question.id]: value }))} aria-label={`${labels[value]}: ${question.text}`} className={`min-h-[82px] border px-1 py-3 text-center transition-colors ${answers[question.id] === value ? "border-black bg-black text-white" : "border-black/25 hover:border-black"}`}><span className="text-xl font-semibold md:text-2xl">{value}</span><span className="mt-2 hidden text-[9px] font-semibold uppercase leading-tight tracking-[0.05em] md:block">{labels[value]}</span></button>)}</div></article>)}</div></section>
      <section><div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-6 py-8 md:px-10"><button disabled={areaIndex === 0} onClick={() => { setAreaIndex((value) => value - 1); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="px-2 py-4 text-xs font-semibold tracking-[0.14em] disabled:opacity-25">PREVIOUS</button><button disabled={!complete || saveStatus === "saving"} onClick={next} className="bg-black px-7 py-4 text-xs font-semibold tracking-[0.14em] text-white disabled:cursor-not-allowed disabled:opacity-25">{areaIndex === areas.length - 1 ? "SEE MY RESULTS" : "NEXT AREA"}</button></div></section>
    </main>
  );
}
