"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

type AreaKey = "governance" | "member" | "competition" | "risk" | "operations" | "data" | "resilience";
type Area = { key: AreaKey; name: string; description: string };
type Question = { id: number; area: AreaKey; text: string };

const areas: Area[] = [
  { key: "governance", name: "Governance", description: "Roles, decision rights, rules, accountability and succession." },
  { key: "member", name: "Member Value", description: "Clear benefits, engagement, responsiveness and member confidence." },
  { key: "competition", name: "Competition Quality", description: "Consistent delivery, scheduling, eligibility, hosting and competitive experience." },
  { key: "risk", name: "Risk & Safeguarding", description: "Medical, safeguarding, incident and competition-risk expectations." },
  { key: "operations", name: "Operations", description: "Calendar coordination, entries, results, communication and administrative load." },
  { key: "data", name: "Data & Intelligence", description: "Participation, competition, member-school data, reporting and benchmarking." },
  { key: "resilience", name: "Resilience & Strategy", description: "Continuity, financial sustainability, knowledge retention and future direction." },
];

const questions: Question[] = [
  { id: 1, area: "governance", text: "Committee roles, responsibilities and decision rights are explicit and consistently understood." },
  { id: 2, area: "governance", text: "Rules, constitutions and operating expectations are current, accessible and routinely used." },
  { id: 3, area: "governance", text: "Leadership succession can occur without major loss of continuity or institutional knowledge." },
  { id: 4, area: "member", text: "Member schools can clearly describe the value they receive from association membership." },
  { id: 5, area: "member", text: "The association regularly gathers and acts on structured feedback from member schools." },
  { id: 6, area: "member", text: "New Directors of Sport or Athletic Directors can quickly understand how to participate effectively in the association." },
  { id: 7, area: "competition", text: "Competitions are delivered to a consistent standard regardless of which member school hosts them." },
  { id: 8, area: "competition", text: "Scheduling, eligibility, rules and dispute processes are clear enough to minimise avoidable friction." },
  { id: 9, area: "competition", text: "The competition programme provides appropriate breadth, balance and quality across age groups and sports." },
  { id: 10, area: "risk", text: "Medical, safeguarding and emergency expectations are clear for every sanctioned competition." },
  { id: 11, area: "risk", text: "Incident reporting and escalation processes are consistent across host schools and events." },
  { id: 12, area: "risk", text: "The association can identify and address recurring competition risks before they become serious incidents." },
  { id: 13, area: "operations", text: "The annual calendar is coordinated early enough to reduce avoidable clashes and last-minute change." },
  { id: 14, area: "operations", text: "Entries, results, communications and event administration are handled without excessive duplication or manual chasing." },
  { id: 15, area: "operations", text: "Operational workload is distributed sustainably rather than depending on a small number of individuals." },
  { id: 16, area: "data", text: "The association can reliably report participation, teams, fixtures and competition activity across member schools." },
  { id: 17, area: "data", text: "Member schools receive useful comparative information rather than only raw activity totals." },
  { id: 18, area: "data", text: "Association priorities and decisions are informed by structured evidence rather than mainly anecdote." },
  { id: 19, area: "resilience", text: "Critical knowledge is documented well enough to survive committee and school staff turnover." },
  { id: 20, area: "resilience", text: "The association has a clear strategic direction beyond running the next season of competitions." },
  { id: 21, area: "resilience", text: "The association can sustain its current model without relying on hidden overtime, goodwill or a few indispensable people." },
];

const labels: Record<number, string> = { 1: "Not in place", 2: "Major gaps", 3: "Partly in place", 4: "Mostly strong", 5: "Consistently strong" };

function profile(score: number) {
  if (score >= 85) return { name: "STRONG ASSOCIATION", text: "The operating foundations are strong. The next opportunity is to deepen member intelligence and demonstrate value more clearly." };
  if (score >= 70) return { name: "STRONG WITH GAPS", text: "The association is functioning well, but several weaknesses could become constraints as activity or membership grows." };
  if (score >= 50) return { name: "OPERATIONALLY EXPOSED", text: "Important parts of the association rely on inconsistent systems, unclear ownership or limited evidence." };
  return { name: "STRUCTURALLY FRAGILE", text: "Multiple core systems are vulnerable. Strengthening governance, continuity and operational discipline should come before expansion." };
}

export default function AssociationHealthCheckPage() {
  const [started, setStarted] = useState(false);
  const [areaIndex, setAreaIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [finished, setFinished] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const hasSaved = useRef(false);

  const currentArea = areas[areaIndex];
  const currentQuestions = questions.filter((q) => q.area === currentArea.key);
  const complete = currentQuestions.every((q) => answers[q.id]);
  const progress = Math.round((Object.keys(answers).length / questions.length) * 100);

  const scores = useMemo(() => {
    const result = {} as Record<AreaKey, number>;
    areas.forEach((area) => {
      const qs = questions.filter((q) => q.area === area.key);
      const total = qs.reduce((sum, q) => sum + (answers[q.id] ?? 0), 0);
      result[area.key] = Math.round((total / (qs.length * 5)) * 100);
    });
    return result;
  }, [answers]);

  const overall = useMemo(() => Math.round((Object.values(answers).reduce((sum, value) => sum + value, 0) / (questions.length * 5)) * 100), [answers]);
  const ranked = useMemo(() => [...areas].sort((a, b) => scores[b.key] - scores[a.key]), [scores]);
  const strongest = ranked[0];
  const weakest = ranked[ranked.length - 1];
  const resultProfile = profile(overall);

  async function saveAssessment() {
    if (hasSaved.current) return;
    hasSaved.current = true;
    setSaveStatus("saving");
    const payload = {
      answers,
      health_score: overall,
      profile: resultProfile.name,
      governance_score: scores.governance,
      member_value_score: scores.member,
      competition_quality_score: scores.competition,
      risk_safeguarding_score: scores.risk,
      operations_score: scores.operations,
      data_intelligence_score: scores.data,
      resilience_strategy_score: scores.resilience,
      strongest_area: strongest.name,
      weakest_area: weakest.name,
    };
    try {
      const { error } = await supabase.from("association_health_check_responses").insert([payload]);
      if (error) throw error;
      setSaveStatus("saved");
    } catch (error) {
      console.error("Association Health Check save error:", error);
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

  const Header = ({ label }: { label: string }) => (
    <header className="border-b border-black/20"><div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-6 md:px-10"><Link href="/" className="text-sm font-semibold tracking-[0.18em]">FORGE</Link><span className="text-right text-[10px] font-semibold tracking-[0.14em] text-black/55 md:text-xs md:tracking-[0.16em]">{label}</span></div></header>
  );

  if (!started) return (
    <main className="min-h-screen bg-[#f3f0e8] text-black"><Header label="ASSOCIATION HEALTH CHECK" /><section className="border-b border-black/20"><div className="mx-auto grid min-h-[78vh] max-w-[1500px] md:grid-cols-12"><div className="flex flex-col justify-between border-b border-black/20 px-6 py-12 md:col-span-8 md:border-b-0 md:border-r md:px-10 md:py-16"><div><p className="mb-8 text-xs font-semibold tracking-[0.18em]">FREE · CONFIDENTIAL · APPROX. 8 MINUTES</p><h1 className="max-w-[1100px] text-[13vw] font-semibold uppercase leading-[0.82] tracking-[-0.07em] md:text-[6vw]">How strong is<br />your sports<br />association?</h1></div><div className="mt-16 max-w-2xl"><p className="text-xl leading-relaxed md:text-2xl">A full competition calendar can hide weak governance, fragile systems and poor visibility of member value.</p><p className="mt-6 text-base leading-relaxed text-black/65 md:text-lg">Assess seven dimensions of association strength and leave with a clear picture of where the organisation is resilient and where it is exposed.</p><button onClick={() => setStarted(true)} className="mt-10 bg-black px-7 py-4 text-xs font-semibold tracking-[0.16em] text-white transition-opacity hover:opacity-80">START THE HEALTH CHECK</button></div></div><aside className="px-6 py-12 md:col-span-4 md:px-10 md:py-16"><p className="text-xs font-semibold tracking-[0.18em] text-black/55">YOU WILL RECEIVE</p><div className="mt-10 divide-y divide-black/20 border-y border-black/20">{["Association Health Score", "Seven dimension scores", "Strongest area", "Primary exposure", "Benchmarking direction"].map((label, index) => <div key={label} className="flex items-center gap-5 py-5"><span className="text-xs font-semibold text-black/40">0{index + 1}</span><span className="text-sm font-semibold uppercase tracking-[0.08em]">{label}</span></div>)}</div><p className="mt-8 text-sm leading-relaxed text-black/55">Answer based on what is documented, repeatable and consistently experienced by member schools today.</p></aside></div></section></main>
  );

  if (finished) return (
    <main className="min-h-screen bg-[#f3f0e8] text-black"><Header label="ASSOCIATION HEALTH RESULTS" /><section className="border-b border-black/20"><div className="mx-auto grid max-w-[1500px] md:grid-cols-12"><div className="border-b border-black/20 px-6 py-12 md:col-span-7 md:border-b-0 md:border-r md:px-10 md:py-16"><p className="text-xs font-semibold tracking-[0.18em] text-black/55">ASSOCIATION HEALTH SCORE</p><div className="mt-6 flex items-end gap-3"><span className="text-[28vw] font-semibold leading-[0.75] tracking-[-0.08em] md:text-[14vw]">{overall}</span><span className="mb-2 text-2xl font-semibold text-black/35 md:mb-4">/100</span></div><div className="mt-10 border-t border-black pt-7"><p className="text-sm font-semibold tracking-[0.16em]">{resultProfile.name}</p><p className="mt-3 max-w-xl text-xl leading-relaxed">{resultProfile.text}</p><p className="mt-5 text-xs uppercase tracking-[0.12em] text-black/45">{saveStatus === "saved" ? "Anonymous response saved" : saveStatus === "error" ? "Result calculated · anonymous response could not be saved" : "Saving anonymous response"}</p></div></div><div className="px-6 py-12 md:col-span-5 md:px-10 md:py-16"><p className="text-xs font-semibold tracking-[0.18em] text-black/55">ASSOCIATION PROFILE</p><div className="mt-8"><p className="text-xs font-semibold tracking-[0.14em] text-black/50">STRONGEST AREA</p><p className="mt-2 text-3xl font-semibold uppercase tracking-[-0.04em]">{strongest.name}</p><p className="mt-2 text-lg">{scores[strongest.key]}</p></div><div className="mt-10 border-t border-black/20 pt-8"><p className="text-xs font-semibold tracking-[0.14em] text-black/50">PRIMARY EXPOSURE</p><p className="mt-2 text-3xl font-semibold uppercase tracking-[-0.04em]">{weakest.name}</p><p className="mt-2 text-lg">{scores[weakest.key]}</p></div></div></div></section><section className="border-b border-black/20"><div className="mx-auto max-w-[1500px] px-6 py-12 md:px-10 md:py-16"><p className="text-xs font-semibold tracking-[0.18em] text-black/55">SEVEN DIMENSIONS</p><div className="mt-8 divide-y divide-black/20 border-y border-black/20">{areas.map((area) => <div key={area.key} className="grid gap-3 py-6 md:grid-cols-[260px_1fr_90px] md:items-center"><p className="text-sm font-semibold uppercase tracking-[0.08em]">{area.name}</p><div className="h-2 overflow-hidden bg-black/10"><div className="h-full bg-black" style={{ width: `${scores[area.key]}%` }} /></div><p className="text-right text-2xl font-semibold">{scores[area.key]}</p></div>)}</div></div></section><section className="bg-black text-[#f3f0e8]"><div className="mx-auto grid max-w-[1500px] gap-10 px-6 py-14 md:grid-cols-12 md:px-10 md:py-20"><div className="md:col-span-8"><p className="text-xs font-semibold tracking-[0.18em] text-white/55">NEXT STEP</p><h2 className="mt-6 max-w-4xl text-5xl font-semibold uppercase leading-[0.9] tracking-[-0.05em] md:text-7xl">Good compared with what?</h2><p className="mt-8 max-w-2xl text-lg leading-8 text-white/65">Forge is developing confidential benchmarking for school-sports associations and member schools. Compare participation, programme breadth, resources, operations and student experience without turning schools into a public ranking.</p></div><div className="flex items-end md:col-span-4 md:justify-end"><Link href="/associations" className="border-b border-white pb-1 text-xs font-semibold uppercase tracking-[0.14em]">Explore Association Intelligence</Link></div></div></section></main>
  );

  return (
    <main className="min-h-screen bg-[#f3f0e8] text-black"><Header label={`ASSOCIATION HEALTH CHECK · ${progress}%`} /><section className="border-b border-black/20"><div className="mx-auto max-w-[1500px] px-6 py-8 md:px-10"><div className="h-1 bg-black/10"><div className="h-full bg-black transition-all" style={{ width: `${progress}%` }} /></div></div></section><section><div className="mx-auto grid max-w-[1500px] md:grid-cols-12"><aside className="border-b border-black/20 px-6 py-10 md:col-span-4 md:min-h-[78vh] md:border-b-0 md:border-r md:px-10 md:py-14"><p className="text-xs font-semibold tracking-[0.16em] text-black/45">0{areaIndex + 1} / 07</p><h1 className="mt-7 text-4xl font-semibold uppercase tracking-[-0.04em] md:text-5xl">{currentArea.name}</h1><p className="mt-5 max-w-sm text-base leading-7 text-black/60">{currentArea.description}</p></aside><div className="px-6 py-10 md:col-span-8 md:px-10 md:py-14">{currentQuestions.map((q) => <div key={q.id} className="border-b border-black/20 py-8 first:pt-0"><p className="max-w-3xl text-xl font-medium leading-8">{q.text}</p><div className="mt-6 grid gap-2 sm:grid-cols-5">{[1,2,3,4,5].map((value) => <button key={value} onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: value }))} className={`border px-3 py-4 text-left text-xs font-semibold uppercase tracking-[0.08em] transition-colors ${answers[q.id] === value ? "border-black bg-black text-white" : "border-black/20 hover:border-black"}`}><span className="block text-lg">{value}</span><span className="mt-2 block text-[10px] leading-4 opacity-70">{labels[value]}</span></button>)}</div></div>)}<div className="mt-10 flex items-center justify-between gap-4"><button disabled={areaIndex === 0} onClick={() => setAreaIndex((value) => Math.max(0, value - 1))} className="text-xs font-semibold uppercase tracking-[0.14em] disabled:opacity-30">Previous</button><button disabled={!complete} onClick={() => void next()} className="bg-black px-7 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-white disabled:opacity-25">{areaIndex === areas.length - 1 ? "See results" : "Next area"}</button></div></div></div></section></main>
  );
}
