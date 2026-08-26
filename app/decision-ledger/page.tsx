'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

type Decision = {
  id: string;
  title: string;
  decision: string;
  context: string;
  constraints: string;
  options: unknown;
  supporting_evidence: string | null;
  difficulty: string;
  status: 'DRAFT' | 'SUBMITTED' | 'IN_REVIEW' | 'READY' | 'SHIPPED' | 'ARCHIVED';
  desired_outcome: string | null;
  confidence: number | null;
  expected_result: string | null;
  review_date: string | null;
  domain: string | null;
  decision_type: string | null;
  what_would_change_mind: string | null;
  decided_at: string | null;
  created_at: string;
};

type Assumption = { id: string; decision_id: string; statement: string; confidence: number | null; status: string };
type Prediction = { id: string; decision_id: string; prediction: string; probability: number | null; target_date: string | null; resolution_status: string; resolved_text: string | null; brier_score: number | null };
type Outcome = { id: string; decision_id: string; outcome_summary: string; success_score: number | null; outcome_status: string; observed_at: string };
type Review = { id: string; decision_id: string; process_quality_score: number | null; outcome_quality_score: number | null; lesson: string | null; future_rule: string | null; reviewed_at: string };

type Draft = {
  title: string;
  decision: string;
  context: string;
  constraints: string;
  desiredOutcome: string;
  evidence: string;
  options: string;
  confidence: string;
  expectedResult: string;
  reviewDate: string;
  domain: string;
  decisionType: string;
  changeMind: string;
  assumptions: string;
  predictions: string;
};

const emptyDraft: Draft = {
  title: '', decision: '', context: '', constraints: '', desiredOutcome: '', evidence: '', options: '', confidence: '70', expectedResult: '', reviewDate: '', domain: 'sport', decisionType: 'operational', changeMind: '', assumptions: '', predictions: ''
};

function lines(value: string) { return value.split('\n').map(v => v.trim()).filter(Boolean); }
function clamp(value: number, min = 0, max = 100) { return Math.min(max, Math.max(min, value)); }
function pct(value: number | null) { return typeof value === 'number' ? `${value}%` : '—'; }
function statusLabel(value: string) { return value.replaceAll('_', ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase()); }

export default function DecisionLedgerPage() {
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [assumptions, setAssumptions] = useState<Assumption[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [outcomes, setOutcomes] = useState<Outcome[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [outcomeText, setOutcomeText] = useState('');
  const [successScore, setSuccessScore] = useState('');
  const [processScore, setProcessScore] = useState('');
  const [outcomeScore, setOutcomeScore] = useState('');
  const [lesson, setLesson] = useState('');
  const [futureRule, setFutureRule] = useState('');

  useEffect(() => { void bootstrap(); }, []);

  async function bootstrap() {
    setLoading(true);
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) { router.push('/login'); return; }
    setUserId(data.user.id);
    await loadAll();
    setLoading(false);
  }

  async function loadAll() {
    const [d, a, p, o, r] = await Promise.all([
      supabase.from('decision_intakes').select('*').order('created_at', { ascending: false }),
      supabase.from('decision_assumptions').select('id,decision_id,statement,confidence,status').order('created_at', { ascending: true }),
      supabase.from('decision_predictions').select('id,decision_id,prediction,probability,target_date,resolution_status,resolved_text,brier_score').order('created_at', { ascending: true }),
      supabase.from('decision_outcomes').select('id,decision_id,outcome_summary,success_score,outcome_status,observed_at').order('observed_at', { ascending: false }),
      supabase.from('decision_reviews').select('id,decision_id,process_quality_score,outcome_quality_score,lesson,future_rule,reviewed_at').order('reviewed_at', { ascending: false })
    ]);
    const err = d.error || a.error || p.error || o.error || r.error;
    if (err) setMessage(`Could not load the ledger: ${err.message}`);
    setDecisions((d.data || []) as Decision[]);
    setAssumptions((a.data || []) as Assumption[]);
    setPredictions((p.data || []) as Prediction[]);
    setOutcomes((o.data || []) as Outcome[]);
    setReviews((r.data || []) as Review[]);
    if (!selectedId && d.data?.[0]?.id) setSelectedId(d.data[0].id);
  }

  async function createDecision(e: FormEvent) {
    e.preventDefault();
    if (!userId || !draft.title.trim() || !draft.decision.trim() || !draft.context.trim()) return;
    setSaving(true); setMessage('');
    const confidence = clamp(Number(draft.confidence || 0));
    const { data, error } = await supabase.from('decision_intakes').insert({
      user_id: userId,
      title: draft.title.trim(),
      decision: draft.decision.trim(),
      context: draft.context.trim(),
      constraints: draft.constraints.trim() || 'None recorded',
      options: lines(draft.options),
      supporting_evidence: draft.evidence.trim() || null,
      difficulty: 'meaningful',
      status: 'DRAFT',
      desired_outcome: draft.desiredOutcome.trim() || null,
      confidence,
      expected_result: draft.expectedResult.trim() || null,
      review_date: draft.reviewDate || null,
      domain: draft.domain || null,
      decision_type: draft.decisionType || null,
      what_would_change_mind: draft.changeMind.trim() || null
    }).select('id').single();

    if (error || !data) { setMessage(error?.message || 'Decision could not be created.'); setSaving(false); return; }

    const assumptionRows = lines(draft.assumptions).map(statement => ({ user_id: userId, decision_id: data.id, statement, confidence }));
    const predictionRows = lines(draft.predictions).map(prediction => ({ user_id: userId, decision_id: data.id, prediction, probability: confidence, target_date: draft.reviewDate || null }));
    const [a, p] = await Promise.all([
      assumptionRows.length ? supabase.from('decision_assumptions').insert(assumptionRows) : Promise.resolve({ error: null }),
      predictionRows.length ? supabase.from('decision_predictions').insert(predictionRows) : Promise.resolve({ error: null })
    ]);
    if (a.error || p.error) setMessage(`Decision saved, but linked records need attention: ${(a.error || p.error)?.message}`);
    else setMessage('Decision captured. Review it, then freeze it when the reasoning is complete.');
    setDraft(emptyDraft); setSelectedId(data.id); await loadAll(); setSaving(false);
  }

  async function freezeDecision(id: string) {
    setSaving(true); setMessage('');
    const { error } = await supabase.from('decision_intakes').update({ status: 'SUBMITTED', decided_at: new Date().toISOString() }).eq('id', id);
    if (error) setMessage(error.message); else setMessage('Decision frozen. The pre-outcome reasoning is now preserved.');
    await loadAll(); setSaving(false);
  }

  async function addOutcome(e: FormEvent) {
    e.preventDefault(); if (!selectedId || !outcomeText.trim()) return;
    setSaving(true);
    const { error } = await supabase.from('decision_outcomes').insert({ user_id: userId, decision_id: selectedId, outcome_summary: outcomeText.trim(), success_score: successScore ? clamp(Number(successScore)) : null, outcome_status: 'observed' });
    if (error) setMessage(error.message); else { setMessage('Outcome recorded.'); setOutcomeText(''); setSuccessScore(''); }
    await loadAll(); setSaving(false);
  }

  async function addReview(e: FormEvent) {
    e.preventDefault(); if (!selectedId) return;
    setSaving(true);
    const { error } = await supabase.from('decision_reviews').insert({
      user_id: userId,
      decision_id: selectedId,
      process_quality_score: processScore ? clamp(Number(processScore)) : null,
      outcome_quality_score: outcomeScore ? clamp(Number(outcomeScore)) : null,
      lesson: lesson.trim() || null,
      future_rule: futureRule.trim() || null,
      review_type: 'outcome_review'
    });
    if (error) setMessage(error.message); else { setMessage('Review closed. The lesson is now part of Forge memory.'); setProcessScore(''); setOutcomeScore(''); setLesson(''); setFutureRule(''); }
    await loadAll(); setSaving(false);
  }

  const selected = useMemo(() => decisions.find(d => d.id === selectedId) || null, [decisions, selectedId]);
  const selectedAssumptions = assumptions.filter(a => a.decision_id === selectedId);
  const selectedPredictions = predictions.filter(p => p.decision_id === selectedId);
  const selectedOutcomes = outcomes.filter(o => o.decision_id === selectedId);
  const selectedReviews = reviews.filter(r => r.decision_id === selectedId);
  const dueCount = decisions.filter(d => d.review_date && new Date(d.review_date) <= new Date() && !reviews.some(r => r.decision_id === d.id)).length;
  const resolvedPredictions = predictions.filter(p => p.resolution_status === 'resolved').length;
  const resolutionRate = predictions.length ? Math.round((resolvedPredictions / predictions.length) * 100) : 0;

  if (loading) return <main className="flex min-h-screen items-center justify-center bg-forge-ivory-50"><p>Loading Forge Decision Ledger...</p></main>;

  return <main className="min-h-screen bg-forge-ivory-50 text-forge-charcoal-900">
    <header className="border-b border-forge-ivory-200 bg-forge-forest-950 text-white">
      <div className="mx-auto flex max-w-forge items-center justify-between px-5 py-5 md:px-8">
        <div><a href="/" className="font-serif text-2xl">FORGE</a><p className="mt-1 text-xs uppercase tracking-forge text-forge-bronze-300">Decision intelligence · internal v0</p></div>
        <div className="flex items-center gap-5 text-sm"><a href="/dashboard" className="underline underline-offset-4">Validation dashboard</a><button onClick={async()=>{await supabase.auth.signOut();router.push('/')}} className="underline underline-offset-4">Sign out</button></div>
      </div>
    </header>

    <section className="mx-auto max-w-forge px-5 py-10 md:px-8 md:py-14">
      <div className="grid gap-5 md:grid-cols-3">
        <Metric label="Decisions" value={decisions.length} note="Meaningful decisions captured" />
        <Metric label="Reviews due" value={dueCount} note="Outcomes waiting to be closed" />
        <Metric label="Prediction resolution" value={`${resolutionRate}%`} note={`${resolvedPredictions} of ${predictions.length} predictions resolved`} />
      </div>
      {message && <div className="mt-6 border border-forge-bronze-300 bg-white p-4 text-sm">{message}</div>}

      <div className="mt-8 grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="border border-forge-ivory-200 bg-white p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-forge text-forge-bronze-600">Capture</p>
          <h1 className="mt-2 font-serif text-3xl text-forge-forest-950">New decision</h1>
          <p className="mt-3 text-sm leading-6 text-forge-stone-600">Record what you believe before the outcome is known. One assumption or prediction per line.</p>
          <form onSubmit={createDecision} className="mt-7 space-y-5">
            <Field label="Decision title"><input required value={draft.title} onChange={e=>setDraft({...draft,title:e.target.value})} className="input" placeholder="e.g. Move morning training to 06:45" /></Field>
            <Field label="Decision"><textarea required value={draft.decision} onChange={e=>setDraft({...draft,decision:e.target.value})} className="input min-h-24" placeholder="What are you actually deciding?" /></Field>
            <Field label="Desired outcome"><textarea value={draft.desiredOutcome} onChange={e=>setDraft({...draft,desiredOutcome:e.target.value})} className="input min-h-20" placeholder="What does success look like?" /></Field>
            <Field label="Context"><textarea required value={draft.context} onChange={e=>setDraft({...draft,context:e.target.value})} className="input min-h-28" placeholder="What is happening and why does this decision exist?" /></Field>
            <div className="grid gap-4 md:grid-cols-2"><Field label="Domain"><select value={draft.domain} onChange={e=>setDraft({...draft,domain:e.target.value})} className="input"><option value="sport">Sport</option><option value="forge">Forge</option><option value="leadership">Leadership</option><option value="capital">Capital</option><option value="personal">Personal</option><option value="other">Other</option></select></Field><Field label="Decision type"><select value={draft.decisionType} onChange={e=>setDraft({...draft,decisionType:e.target.value})} className="input"><option value="operational">Operational</option><option value="people">People</option><option value="strategic">Strategic</option><option value="investment">Investment</option><option value="selection">Selection</option><option value="risk">Risk</option></select></Field></div>
            <Field label="Options considered"><textarea value={draft.options} onChange={e=>setDraft({...draft,options:e.target.value})} className="input min-h-24" placeholder={'Option A\nOption B\nOption C'} /></Field>
            <Field label="Evidence"><textarea value={draft.evidence} onChange={e=>setDraft({...draft,evidence:e.target.value})} className="input min-h-24" placeholder="What evidence supports the decision?" /></Field>
            <Field label="Constraints"><textarea value={draft.constraints} onChange={e=>setDraft({...draft,constraints:e.target.value})} className="input min-h-20" placeholder="Budget, time, policy, people, uncertainty..." /></Field>
            <Field label="Assumptions"><textarea value={draft.assumptions} onChange={e=>setDraft({...draft,assumptions:e.target.value})} className="input min-h-28" placeholder={'Participation will remain stable\nStaff capacity is sufficient\nThe new schedule will improve attendance'} /></Field>
            <Field label="Predictions"><textarea value={draft.predictions} onChange={e=>setDraft({...draft,predictions:e.target.value})} className="input min-h-28" placeholder={'Attendance improves within 6 weeks\nNo increase in staff absence\nAthlete retention remains above 90%'} /></Field>
            <div className="grid gap-4 md:grid-cols-2"><Field label="Confidence %"><input type="number" min="0" max="100" value={draft.confidence} onChange={e=>setDraft({...draft,confidence:e.target.value})} className="input" /></Field><Field label="Review date"><input type="date" value={draft.reviewDate} onChange={e=>setDraft({...draft,reviewDate:e.target.value})} className="input" /></Field></div>
            <Field label="Expected result"><textarea value={draft.expectedResult} onChange={e=>setDraft({...draft,expectedResult:e.target.value})} className="input min-h-20" placeholder="What specifically do you expect to happen?" /></Field>
            <Field label="What would change your mind?"><textarea value={draft.changeMind} onChange={e=>setDraft({...draft,changeMind:e.target.value})} className="input min-h-20" placeholder="Define the evidence that would invalidate this reasoning." /></Field>
            <button disabled={saving} className="w-full bg-forge-forest-950 px-5 py-4 text-sm font-semibold text-white disabled:opacity-50">{saving?'Saving...':'Capture decision'}</button>
          </form>
        </section>

        <section>
          <div className="border border-forge-ivory-200 bg-white p-6 md:p-8">
            <div className="flex items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-forge text-forge-bronze-600">Ledger</p><h2 className="mt-2 font-serif text-3xl text-forge-forest-950">Decision history</h2></div><button onClick={()=>void loadAll()} className="text-sm underline underline-offset-4">Refresh</button></div>
            <div className="mt-6 max-h-[440px] divide-y divide-forge-ivory-200 overflow-y-auto border-t border-forge-ivory-200">
              {decisions.length===0?<p className="py-8 text-sm text-forge-stone-500">No decisions yet. Capture the first one.</p>:decisions.map(d=><button key={d.id} onClick={()=>setSelectedId(d.id)} className={`w-full px-1 py-5 text-left ${selectedId===d.id?'bg-forge-ivory-100':''}`}><div className="flex items-start justify-between gap-4"><div><p className="font-semibold text-forge-forest-950">{d.title}</p><p className="mt-1 text-xs uppercase tracking-[0.08em] text-forge-stone-500">{d.domain || 'Uncategorised'} · {statusLabel(d.status)}</p></div><span className="text-sm font-semibold">{pct(d.confidence)}</span></div><p className="mt-2 line-clamp-2 text-sm leading-6 text-forge-stone-600">{d.decision}</p></button>)}
            </div>
          </div>

          {selected && <div className="mt-6 border border-forge-ivory-200 bg-white p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between"><div><p className="text-xs font-semibold uppercase tracking-forge text-forge-bronze-600">Decision record</p><h2 className="mt-2 font-serif text-3xl text-forge-forest-950">{selected.title}</h2><p className="mt-2 text-sm text-forge-stone-500">{statusLabel(selected.status)} · {selected.domain || 'No domain'} · Confidence {pct(selected.confidence)}</p></div>{selected.status==='DRAFT'&&<button disabled={saving} onClick={()=>void freezeDecision(selected.id)} className="bg-forge-forest-950 px-5 py-3 text-sm font-semibold text-white">Freeze decision</button>}</div>
            <Record label="Decision" value={selected.decision} />
            <Record label="Desired outcome" value={selected.desired_outcome} />
            <Record label="Context" value={selected.context} />
            <Record label="Expected result" value={selected.expected_result} />
            <Record label="What would change my mind" value={selected.what_would_change_mind} />
            <div className="mt-7 grid gap-6 md:grid-cols-2"><ListBlock title="Assumptions" items={selectedAssumptions.map(a=>`${a.statement} · ${pct(a.confidence)}`)} /><ListBlock title="Predictions" items={selectedPredictions.map(p=>`${p.prediction} · ${pct(p.probability)}${p.target_date?` · ${p.target_date}`:''}`)} /></div>
            <div className="mt-8 border-t border-forge-ivory-200 pt-7">
              <p className="text-xs font-semibold uppercase tracking-forge text-forge-bronze-600">Close the loop</p>
              <div className="mt-5 grid gap-7 lg:grid-cols-2">
                <form onSubmit={addOutcome} className="space-y-4"><h3 className="font-serif text-xl">Record outcome</h3><textarea value={outcomeText} onChange={e=>setOutcomeText(e.target.value)} className="input min-h-28" placeholder="What actually happened?" required/><input value={successScore} onChange={e=>setSuccessScore(e.target.value)} type="number" min="0" max="100" className="input" placeholder="Outcome success 0–100"/><button disabled={saving} className="border border-forge-forest-900 px-4 py-3 text-sm font-semibold">Save outcome</button></form>
                <form onSubmit={addReview} className="space-y-4"><h3 className="font-serif text-xl">Review judgement</h3><div className="grid grid-cols-2 gap-3"><input value={processScore} onChange={e=>setProcessScore(e.target.value)} type="number" min="0" max="100" className="input" placeholder="Process 0–100"/><input value={outcomeScore} onChange={e=>setOutcomeScore(e.target.value)} type="number" min="0" max="100" className="input" placeholder="Outcome 0–100"/></div><textarea value={lesson} onChange={e=>setLesson(e.target.value)} className="input min-h-20" placeholder="What did this teach us?"/><textarea value={futureRule} onChange={e=>setFutureRule(e.target.value)} className="input min-h-20" placeholder="Rule for the next similar decision"/><button disabled={saving} className="border border-forge-forest-900 px-4 py-3 text-sm font-semibold">Save review</button></form>
              </div>
            </div>
            {(selectedOutcomes.length>0||selectedReviews.length>0)&&<div className="mt-8 grid gap-6 md:grid-cols-2"><ListBlock title="Observed outcomes" items={selectedOutcomes.map(o=>`${o.outcome_summary}${o.success_score!==null?` · ${o.success_score}/100`:''}`)} /><ListBlock title="Lessons" items={selectedReviews.map(r=>`${r.lesson||'Review completed'}${r.future_rule?` · Next rule: ${r.future_rule}`:''}`)} /></div>}
          </div>}
        </section>
      </div>
    </section>
    <style jsx global>{`.input{width:100%;border:1px solid #d8d2c5;background:#fff;padding:.8rem .9rem;font-size:.9rem;outline:none}.input:focus{border-color:#173f35}.line-clamp-2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}`}</style>
  </main>;
}

function Field({label,children}:{label:string;children:React.ReactNode}) { return <label className="block"><span className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-forge-stone-500">{label}</span>{children}</label>; }
function Metric({label,value,note}:{label:string;value:string|number;note:string}) { return <div className="border border-forge-ivory-200 bg-white p-5"><p className="text-[11px] font-semibold uppercase tracking-forge text-forge-stone-500">{label}</p><p className="mt-2 font-serif text-4xl text-forge-forest-950">{value}</p><p className="mt-1 text-sm text-forge-stone-600">{note}</p></div>; }
function Record({label,value}:{label:string;value:string|null}) { if(!value)return null; return <div className="mt-6"><p className="text-[11px] font-semibold uppercase tracking-forge text-forge-stone-500">{label}</p><p className="mt-2 whitespace-pre-wrap text-sm leading-6">{value}</p></div>; }
function ListBlock({title,items}:{title:string;items:string[]}) { return <div><h3 className="font-serif text-xl text-forge-forest-950">{title}</h3>{items.length===0?<p className="mt-3 text-sm text-forge-stone-500">None recorded.</p>:<ul className="mt-3 space-y-3 text-sm leading-6">{items.map((item,i)=><li key={`${title}-${i}`} className="border-l-2 border-forge-bronze-300 pl-3">{item}</li>)}</ul>}</div>; }
