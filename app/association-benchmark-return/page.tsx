"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

type FormState = Record<string, string | boolean>;
type Field = { key: string; label: string; helper?: string; type?: "number" | "text" | "boolean"; step?: string };
type Section = { title: string; eyebrow: string; fields: Field[] };

const sections: Section[] = [
  { title: "School profile", eyebrow: "01 / Context", fields: [
    { key: "association_code", label: "Association code", helper: "Optional pilot code provided by Forge.", type: "text" },
    { key: "school_code", label: "School code", helper: "Use an internal code if the pilot is confidential.", type: "text" },
    { key: "school_name", label: "School name", helper: "Optional during pilot testing.", type: "text" },
    { key: "country", label: "Country / territory", type: "text" },
    { key: "student_enrolment", label: "Total student enrolment", type: "number" },
    { key: "eligible_students", label: "Students eligible for competitive school sport", helper: "Use the number of students who could realistically represent the school during this reporting year.", type: "number" },
  ]},
  { title: "Participation", eyebrow: "02 / Participation", fields: [
    { key: "competitive_participants", label: "Unique competitive sport participants", helper: "Count each student once, even if they represent the school in multiple sports.", type: "number" },
    { key: "female_participants", label: "Female competitive participants", type: "number" },
    { key: "male_participants", label: "Male competitive participants", type: "number" },
    { key: "multi_sport_participants", label: "Students representing the school in 2+ sports", type: "number" },
    { key: "returning_athletes", label: "Returning competitive athletes this year", helper: "Students who participated competitively in both the prior reporting year and this reporting year.", type: "number" },
    { key: "prior_year_athletes", label: "Competitive athletes in prior year", type: "number" },
  ]},
  { title: "Programme", eyebrow: "03 / Programme", fields: [
    { key: "sports_offered", label: "Sports offered", helper: "Count distinct organised sports available through the school programme during the year.", type: "number" },
    { key: "competitive_sports", label: "Competitive sports offered", type: "number" },
    { key: "seasons", label: "Competition seasons", type: "number" },
    { key: "teams_total", label: "Competitive teams", type: "number" },
    { key: "fixtures_scheduled", label: "Fixtures scheduled", helper: "Count scheduled inter-school competitive events. Use the association's agreed fixture definition consistently.", type: "number" },
    { key: "fixtures_completed", label: "Fixtures completed", type: "number" },
    { key: "tournaments_attended", label: "Tournaments attended", type: "number" },
    { key: "tournaments_hosted", label: "Tournaments hosted", type: "number" },
  ]},
  { title: "Resources", eyebrow: "04 / Resources", fields: [
    { key: "sport_staff_fte", label: "Sport / athletics staff FTE", helper: "Full-time equivalent dedicated to sport/athletics operations and delivery. Use FTE rather than simple headcount.", type: "number", step: "0.1" },
    { key: "external_coaches", label: "External coaches used annually", type: "number" },
    { key: "facilities_count", label: "Major sport facilities available", helper: "Pilot measure only. Use the association's agreed facility definition consistently.", type: "number" },
    { key: "annual_sport_budget", label: "Annual sport operating budget", helper: "Use local currency. Exclude salaries and capital expenditure unless the association explicitly adopts another definition.", type: "number", step: "0.01" },
    { key: "transport_spend", label: "Annual sport transport spend", helper: "Use the same local currency as the operating budget.", type: "number", step: "0.01" },
  ]},
  { title: "Operations & experience", eyebrow: "05 / Operations", fields: [
    { key: "average_away_travel_minutes", label: "Typical one-way away travel time (minutes)", helper: "Use a representative typical journey rather than the longest trip of the year.", type: "number" },
    { key: "overnight_competitions", label: "Overnight competitions annually", type: "number" },
    { key: "student_feedback_process", label: "Formal student sport feedback process in place", type: "boolean" },
    { key: "pathways_offered", label: "Formal performance / progression pathways offered", type: "boolean" },
    { key: "notes", label: "Context note", helper: "Optional. Add anything needed to interpret your data fairly.", type: "text" },
  ]},
];

function pct(num: number, den: number) { if (!den) return null; return Math.round((num / den) * 100); }

export default function AssociationBenchmarkReturnPage() {
  const [form, setForm] = useState<FormState>({});
  const [section, setSection] = useState(0);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const numeric = (key: string) => Number(form[key] || 0);

  const derived = useMemo(() => ({
    participation: pct(numeric("competitive_participants"), numeric("eligible_students")),
    fixtureCompletion: pct(numeric("fixtures_completed"), numeric("fixtures_scheduled")),
    multiSport: pct(numeric("multi_sport_participants"), numeric("competitive_participants")),
    retention: pct(numeric("returning_athletes"), numeric("prior_year_athletes")),
    studentsPerStaff: numeric("sport_staff_fte") ? Math.round(numeric("eligible_students") / numeric("sport_staff_fte")) : null,
    opportunitiesPer100: numeric("eligible_students") ? Math.round((numeric("fixtures_completed") / numeric("eligible_students")) * 1000) / 10 : null,
  }), [form]);

  const errors = useMemo(() => {
    const e: string[] = [];
    const eligible = numeric("eligible_students"), enrolled = numeric("student_enrolment"), participants = numeric("competitive_participants");
    if (eligible && enrolled && eligible > enrolled) e.push("Eligible students cannot exceed total enrolment.");
    if (participants && eligible && participants > eligible) e.push("Unique competitive participants cannot exceed eligible students.");
    if (numeric("female_participants") + numeric("male_participants") > participants && participants) e.push("Female and male participant totals currently exceed unique competitive participants. Check the figures or explain the difference in the context note.");
    if (numeric("multi_sport_participants") > participants && participants) e.push("Multi-sport participants cannot exceed unique competitive participants.");
    if (numeric("fixtures_completed") > numeric("fixtures_scheduled") && numeric("fixtures_scheduled")) e.push("Fixtures completed cannot exceed fixtures scheduled.");
    if (numeric("returning_athletes") > numeric("prior_year_athletes") && numeric("prior_year_athletes")) e.push("Returning athletes cannot exceed prior-year athletes.");
    return e;
  }, [form]);

  const current = sections[section];
  function setValue(key: string, value: string | boolean) { setForm((prev) => ({ ...prev, [key]: value })); }

  async function submit() {
    if (errors.length) return;
    setStatus("saving");
    const payload: Record<string, string | number | boolean | null> = {};
    sections.flatMap((s) => s.fields).forEach((field) => {
      const value = form[field.key];
      if (field.type === "boolean") payload[field.key] = typeof value === "boolean" ? value : null;
      else if (field.type === "number") payload[field.key] = value === undefined || value === "" ? null : Number(value);
      else payload[field.key] = typeof value === "string" && value.trim() ? value.trim() : null;
    });
    const { error } = await supabase.from("association_benchmark_returns").insert([payload]);
    if (error) { console.error(error); setStatus("error"); return; }
    setStatus("saved"); window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const metricRows = [["Participation rate", derived.participation, "%"], ["Competitive opportunities / 100", derived.opportunitiesPer100, ""], ["Fixture completion", derived.fixtureCompletion, "%"], ["Multi-sport rate", derived.multiSport, "%"], ["Athlete retention", derived.retention, "%"], ["Students per sport FTE", derived.studentsPerStaff, ""]] as const;

  if (status === "saved") return <main className="min-h-screen bg-[#f3f0e8] text-black"><header className="border-b border-black/20"><div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-6 md:px-10"><Link href="/" className="text-sm font-semibold tracking-[0.18em]">FORGE</Link><span className="text-xs font-semibold tracking-[0.14em] text-black/55">ASSOCIATION BENCHMARK</span></div></header><section className="mx-auto grid min-h-[78vh] max-w-[1500px] md:grid-cols-12"><div className="border-b border-black/20 px-6 py-14 md:col-span-8 md:border-b-0 md:border-r md:px-10 md:py-20"><p className="text-xs font-semibold tracking-[0.18em] text-black/50">RETURN RECEIVED</p><h1 className="mt-8 max-w-4xl text-5xl font-semibold uppercase leading-[0.9] tracking-[-0.05em] md:text-8xl">The data becomes valuable when the cohort exists.</h1><p className="mt-10 max-w-2xl text-xl leading-8 text-black/65">Your return has been stored confidentially. Forge will only present association comparisons when there is enough comparable data to make the benchmark meaningful.</p><div className="mt-12 flex flex-wrap gap-5"><Link href="/association-benchmark-sample" className="border-b border-black pb-1 text-xs font-semibold uppercase tracking-[0.14em]">View sample school report</Link><Link href="/state-of-school-sport-sample" className="border-b border-black pb-1 text-xs font-semibold uppercase tracking-[0.14em]">View sample association report</Link></div></div><aside className="px-6 py-14 md:col-span-4 md:px-10 md:py-20"><p className="text-xs font-semibold tracking-[0.18em] text-black/50">FORGE BENCHMARK CORE</p><div className="mt-8 divide-y divide-black/20 border-y border-black/20">{metricRows.map(([label,value,suffix]) => <div key={label} className="flex items-center justify-between gap-5 py-5"><span className="text-sm">{label}</span><strong>{value === null ? "—" : `${value}${suffix}`}</strong></div>)}</div><p className="mt-6 text-xs leading-5 text-black/50">These are school-level derived metrics, not association benchmarks. Peer comparisons appear only when a credible cohort exists.</p></aside></section></main>;

  return <main className="min-h-screen bg-[#f3f0e8] text-black"><header className="border-b border-black/20"><div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-6 md:px-10"><Link href="/" className="text-sm font-semibold tracking-[0.18em]">FORGE</Link><span className="text-right text-[10px] font-semibold tracking-[0.14em] text-black/55 md:text-xs">ASSOCIATION BENCHMARK · PILOT RETURN</span></div></header><section className="border-b border-black/20"><div className="mx-auto grid max-w-[1500px] md:grid-cols-12"><div className="border-b border-black/20 px-6 py-10 md:col-span-8 md:border-b-0 md:border-r md:px-10 md:py-14"><p className="text-xs font-semibold tracking-[0.18em]">CONFIDENTIAL · ANNUAL MEMBER-SCHOOL RETURN</p><h1 className="mt-8 max-w-4xl text-5xl font-semibold uppercase leading-[0.9] tracking-[-0.05em] md:text-8xl">Build the baseline.</h1><p className="mt-8 max-w-2xl text-lg leading-8 text-black/65">A focused return designed to produce useful peer context without creating another major reporting burden for schools.</p></div><aside className="px-6 py-10 md:col-span-4 md:px-10 md:py-14"><p className="text-xs font-semibold tracking-[0.18em] text-black/50">BENCHMARK RULES</p><p className="mt-6 text-sm leading-7 text-black/60">Comparable definitions. Confidential school-level outputs. No public rankings. No guessed data. No peer comparison until the cohort is large and comparable enough to support it.</p></aside></div></section><section className="border-b border-black/20"><div className="mx-auto max-w-[1500px] px-6 py-6 md:px-10"><div className="mb-3 flex justify-between text-[10px] font-semibold uppercase tracking-[0.12em] text-black/45"><span>Section {section + 1} of {sections.length}</span><span>{Math.round(((section + 1) / sections.length) * 100)}%</span></div><div className="h-1 bg-black/10"><div className="h-full bg-black" style={{ width: `${((section + 1) / sections.length) * 100}%` }} /></div></div></section><section className="mx-auto grid max-w-[1500px] md:grid-cols-12"><aside className="border-b border-black/20 px-6 py-8 md:col-span-4 md:min-h-[70vh] md:border-b-0 md:border-r md:px-10 md:py-14"><p className="text-xs font-semibold tracking-[0.16em] text-black/45">{current.eyebrow}</p><h2 className="mt-5 text-4xl font-semibold uppercase tracking-[-0.04em] md:mt-7 md:text-5xl">{current.title}</h2><div className="mt-7 border-t border-black/20 pt-5 text-sm leading-6 text-black/55 md:mt-10 md:pt-6">Complete only what you can report accurately. Missing data is better than guessed data.</div></aside><div className="px-6 py-8 md:col-span-8 md:px-10 md:py-14"><div className="space-y-7">{current.fields.map((field) => <div key={field.key} className="border-b border-black/20 pb-7"><label className="block text-lg font-semibold">{field.label}</label>{field.helper && <p className="mt-2 max-w-2xl text-sm leading-6 text-black/50">{field.helper}</p>}{field.type === "boolean" ? <div className="mt-4 flex gap-3">{[true,false].map((v) => <button type="button" key={String(v)} onClick={() => setValue(field.key,v)} className={`border px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] ${form[field.key] === v ? "border-black bg-black text-white" : "border-black/25"}`}>{v ? "Yes" : "No"}</button>)}</div> : <input value={(form[field.key] as string) ?? ""} onChange={(e) => setValue(field.key,e.target.value)} type={field.type === "number" ? "number" : "text"} inputMode={field.type === "number" ? (field.step ? "decimal" : "numeric") : undefined} min={field.type === "number" ? 0 : undefined} step={field.step} className="mt-4 h-14 w-full border border-black/25 bg-transparent px-4 text-base outline-none focus:border-black" />}</div>)}</div>{errors.length > 0 && <div className="mt-8 border border-black bg-black/[0.04] p-5"><p className="text-xs font-semibold uppercase tracking-[0.14em]">Check before continuing</p><ul className="mt-3 space-y-2 text-sm leading-6">{errors.map((error) => <li key={error}>{error}</li>)}</ul></div>}<div className="mt-9 flex items-center justify-between gap-4">{section > 0 ? <button onClick={() => {setSection((v)=>v-1);window.scrollTo({top:0,behavior:"smooth"});}} className="border-b border-black pb-1 text-xs font-semibold uppercase tracking-[0.14em]">Previous</button> : <span />}{section < sections.length-1 ? <button onClick={() => {setSection((v)=>v+1);window.scrollTo({top:0,behavior:"smooth"});}} className="bg-black px-7 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-white">Continue</button> : <button onClick={submit} disabled={status === "saving" || errors.length > 0} className="bg-black px-7 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-white disabled:opacity-35">{status === "saving" ? "Saving..." : "Submit return"}</button>}</div>{status === "error" && <p className="mt-6 text-sm">The return could not be saved. Please try again.</p>}</div></section></main>;
}
