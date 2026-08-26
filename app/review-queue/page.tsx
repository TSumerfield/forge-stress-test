'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

type Decision = {
  id: string;
  title: string;
  decision: string;
  domain: string | null;
  confidence: number | null;
  expected_result: string | null;
  review_date: string | null;
  decided_at: string | null;
  status: string;
};

type Prediction = {
  id: string;
  decision_id: string;
  prediction: string;
  probability: number | null;
  target_date: string | null;
  resolution_status: string;
  resolved_result: boolean | null;
  resolved_text: string | null;
  resolution_notes: string | null;
  brier_score: number | null;
};

type Review = {
  id: string;
  decision_id: string;
  process_quality_score: number | null;
  outcome_quality_score: number | null;
  lesson: string | null;
  future_rule: string | null;
  reviewed_at: string;
};

type Outcome = {
  id: string;
  decision_id: string;
  outcome_summary: string;
  success_score: number | null;
  observed_at: string;
};

function scoreBrier(probability: number | null, result: boolean) {
  if (probability === null) return null;
  const p = Math.min(100, Math.max(0, probability)) / 100;
  const actual = result ? 1 : 0;
  return Number(((p - actual) ** 2).toFixed(4));
}

function qualityLabel(score: number | null) {
  if (score === null) return 'No resolved forecasts yet';
  if (score <= 0.05) return 'Excellent calibration';
  if (score <= 0.15) return 'Strong calibration';
  if (score <= 0.25) return 'Mixed calibration';
  return 'Poor calibration';
}

export default function ReviewQueuePage() {
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [outcomes, setOutcomes] = useState<Outcome[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});

  useEffect(() => { void bootstrap(); }, []);

  async function bootstrap() {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) { router.push('/login'); return; }
    setUserId(data.user.id);
    await loadAll();
    setLoading(false);
  }

  async function loadAll() {
    const [d, p, r, o] = await Promise.all([
      supabase.from('decision_intakes').select('id,title,decision,domain,confidence,expected_result,review_date,decided_at,status').order('review_date', { ascending: true, nullsFirst: false }),
      supabase.from('decision_predictions').select('id,decision_id,prediction,probability,target_date,resolution_status,resolved_result,resolved_text,resolution_notes,brier_score').order('target_date', { ascending: true, nullsFirst: false }),
      supabase.from('decision_reviews').select('id,decision_id,process_quality_score,outcome_quality_score,lesson,future_rule,reviewed_at').order('reviewed_at', { ascending: false }),
      supabase.from('decision_outcomes').select('id,decision_id,outcome_summary,success_score,observed_at').order('observed_at', { ascending: false })
    ]);
    const err = d.error || p.error || r.error || o.error;
    if (err) setMessage(`Could not load review queue: ${err.message}`);
    setDecisions((d.data || []) as Decision[]);
    setPredictions((p.data || []) as Prediction[]);
    setReviews((r.data || []) as Review[]);
    setOutcomes((o.data || []) as Outcome[]);
  }

  async function resolvePrediction(prediction: Prediction, result: boolean) {
    if (!userId) return;
    setMessage('');
    const brier = scoreBrier(prediction.probability, result);
    const { error } = await supabase.from('decision_predictions').update({
      resolution_status: 'resolved',
      resolved_result: result,
      resolved_at: new Date().toISOString(),
      resolved_text: result ? 'Occurred' : 'Did not occur',
      resolution_notes: notes[prediction.id]?.trim() || null,
      brier_score: brier
    }).eq('id', prediction.id);
    if (error) setMessage(error.message);
    else setMessage('Prediction resolved and calibration updated.');
    await loadAll();
  }

  const today = new Date();
  today.setHours(23, 59, 59, 999);

  const dueDecisions = useMemo(() => decisions.filter(d => {
    if (!d.review_date) return false;
    if (new Date(d.review_date) > today) return false;
    return !reviews.some(r => r.decision_id === d.id);
  }), [decisions, reviews]);

  const duePredictions = useMemo(() => predictions.filter(p => {
    if (p.resolution_status === 'resolved' || !p.target_date) return false;
    return new Date(p.target_date) <= today;
  }), [predictions]);

  const resolved = predictions.filter(p => p.resolution_status === 'resolved' && typeof p.brier_score === 'number');
  const avgBrier = resolved.length ? Number((resolved.reduce((sum, p) => sum + (p.brier_score || 0), 0) / resolved.length).toFixed(3)) : null;
  const resolutionRate = predictions.length ? Math.round((predictions.filter(p => p.resolution_status === 'resolved').length / predictions.length) * 100) : 0;
  const scoredReviews = reviews.filter(r => r.process_quality_score !== null);
  const avgProcess = scoredReviews.length ? Math.round(scoredReviews.reduce((s, r) => s + (r.process_quality_score || 0), 0) / scoredReviews.length) : null;

  if (loading) return <main className="flex min-h-screen items-center justify-center bg-forge-ivory-50"><p>Loading review queue...</p></main>;

  return <main className="min-h-screen bg-forge-ivory-50 text-forge-charcoal-900">
    <header className="border-b border-forge-ivory-200 bg-forge-forest-950 text-white">
      <div className="mx-auto flex max-w-forge items-center justify-between px-5 py-5 md:px-8">
        <div><a href="/" className="font-serif text-2xl">FORGE</a><p className="mt-1 text-xs uppercase tracking-forge text-forge-bronze-300">Decision review queue</p></div>
        <div className="flex gap-5 text-sm"><a href="/decision-ledger" className="underline underline-offset-4">Decision Ledger</a><a href="/calibration" className="underline underline-offset-4">Calibration</a><a href="/dashboard" className="underline underline-offset-4">Dashboard</a></div>
      </div>
    </header>

    <section className="mx-auto max-w-forge px-5 py-10 md:px-8 md:py-14">
      <div className="max-w-3xl"><p className="text-xs font-semibold uppercase tracking-forge text-forge-bronze-600">Close the loop</p><h1 className="mt-3 font-serif text-4xl text-forge-forest-950 md:text-5xl">Review what you believed before you knew.</h1><p className="mt-4 leading-7 text-forge-stone-600">Forge only becomes intelligence when predictions resolve and decisions are reviewed. This queue surfaces the work that is due.</p></div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Decision reviews due" value={dueDecisions.length} note="Past review date, not yet reviewed" />
        <Metric label="Forecasts due" value={duePredictions.length} note="Predictions ready to resolve" />
        <Metric label="Resolution rate" value={`${resolutionRate}%`} note={`${predictions.filter(p=>p.resolution_status==='resolved').length} of ${predictions.length} forecasts`} />
        <Metric label="Brier score" value={avgBrier ?? '—'} note={qualityLabel(avgBrier)} />
      </div>

      {message && <div className="mt-6 border border-forge-bronze-300 bg-white p-4 text-sm">{message}</div>}

      <section className="mt-8 border border-forge-ivory-200 bg-white p-6 md:p-8">
        <div className="flex items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-forge text-forge-bronze-600">Forecast calibration</p><h2 className="mt-2 font-serif text-3xl text-forge-forest-950">Predictions to resolve</h2></div><p className="text-xs text-forge-stone-500">Lower Brier score is better</p></div>
        <div className="mt-6 space-y-5">
          {duePredictions.length === 0 && <p className="text-sm text-forge-stone-500">Nothing is due yet.</p>}
          {duePredictions.map(p => {
            const d = decisions.find(x => x.id === p.decision_id);
            return <article key={p.id} className="border border-forge-ivory-200 p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between"><div><p className="text-xs uppercase tracking-forge text-forge-stone-500">{d?.title || 'Decision'} · due {p.target_date}</p><h3 className="mt-2 font-serif text-2xl text-forge-forest-950">{p.prediction}</h3></div><div className="text-right"><p className="text-xs uppercase tracking-forge text-forge-stone-500">Original probability</p><p className="mt-1 font-serif text-3xl">{p.probability ?? '—'}%</p></div></div>
              <textarea value={notes[p.id] || ''} onChange={e=>setNotes({...notes,[p.id]:e.target.value})} placeholder="Optional resolution evidence or context" className="mt-4 w-full border border-forge-ivory-300 bg-forge-ivory-50 px-3 py-3 text-sm outline-none focus:border-forge-forest-800" />
              <div className="mt-4 flex flex-wrap gap-3"><button onClick={()=>resolvePrediction(p,true)} className="bg-forge-forest-950 px-4 py-2 text-sm font-semibold text-white">Occurred</button><button onClick={()=>resolvePrediction(p,false)} className="border border-forge-forest-900 px-4 py-2 text-sm font-semibold text-forge-forest-950">Did not occur</button></div>
            </article>;
          })}
        </div>
      </section>

      <section className="mt-8 border border-forge-ivory-200 bg-white p-6 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-forge text-forge-bronze-600">Decision review</p><h2 className="mt-2 font-serif text-3xl text-forge-forest-950">Decisions waiting to be closed</h2>
        <div className="mt-6 divide-y divide-forge-ivory-200">
          {dueDecisions.length === 0 && <p className="py-4 text-sm text-forge-stone-500">No decision reviews are due.</p>}
          {dueDecisions.map(d => {
            const latestOutcome = outcomes.find(o => o.decision_id === d.id);
            const openPredictions = predictions.filter(p => p.decision_id === d.id && p.resolution_status !== 'resolved').length;
            return <div key={d.id} className="py-5 first:pt-0">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div><p className="text-xs uppercase tracking-forge text-forge-stone-500">{d.domain || 'General'} · review due {d.review_date}</p><h3 className="mt-1 font-serif text-2xl text-forge-forest-950">{d.title}</h3><p className="mt-2 max-w-2xl text-sm text-forge-stone-600">Expected: {d.expected_result || 'Not recorded'}</p>{latestOutcome && <p className="mt-2 text-sm text-forge-stone-700"><strong>Latest outcome:</strong> {latestOutcome.outcome_summary}</p>}</div><div className="shrink-0 text-left md:text-right"><p className="text-xs uppercase tracking-forge text-forge-stone-500">Open forecasts</p><p className="mt-1 font-serif text-3xl">{openPredictions}</p><a href="/decision-ledger" className="mt-2 inline-block border-b border-forge-forest-900 text-sm font-semibold">Open in Ledger</a></div></div>
            </div>;
          })}
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="border border-forge-ivory-200 bg-white p-6 md:p-8"><p className="text-xs font-semibold uppercase tracking-forge text-forge-bronze-600">Calibration history</p><h2 className="mt-2 font-serif text-2xl text-forge-forest-950">Resolved forecasts</h2><div className="mt-5 divide-y divide-forge-ivory-200">{resolved.slice(0,10).map(p=><div key={p.id} className="py-4"><div className="flex justify-between gap-4"><span className="text-sm">{p.prediction}</span><span className="font-semibold">{p.brier_score?.toFixed(3)}</span></div><p className="mt-1 text-xs text-forge-stone-500">{p.probability}% forecast · {p.resolved_result ? 'occurred' : 'did not occur'}</p></div>)}{resolved.length===0&&<p className="py-4 text-sm text-forge-stone-500">Resolve forecasts to establish a calibration baseline.</p>}</div></div>
        <div className="border border-forge-forest-800 bg-forge-forest-950 p-6 text-white md:p-8"><p className="text-xs font-semibold uppercase tracking-forge text-forge-bronze-300">Decision quality</p><h2 className="mt-2 font-serif text-2xl">Separate process from luck.</h2><p className="mt-4 text-sm leading-6 text-white/65">A good decision can produce a bad outcome and a poor decision can get lucky. Forge tracks both so future calibration is based on judgement quality, not hindsight alone.</p><div className="mt-7 border-t border-white/15 pt-5"><p className="text-xs uppercase tracking-forge text-white/45">Average process quality</p><p className="mt-2 font-serif text-4xl">{avgProcess ?? '—'}</p><p className="mt-1 text-xs text-white/45">from completed decision reviews</p></div><a href="/calibration" className="mt-6 inline-block border-b border-forge-bronze-300 pb-1 text-sm font-semibold text-forge-bronze-300">Open full calibration profile</a></div>
      </section>
    </section>
  </main>;
}

function Metric({ label, value, note }: { label: string; value: string | number; note: string }) {
  return <div className="border border-forge-ivory-200 bg-white p-5"><p className="text-[11px] font-semibold uppercase tracking-forge text-forge-stone-500">{label}</p><p className="mt-3 font-serif text-4xl text-forge-forest-950">{value}</p><p className="mt-2 text-sm text-forge-stone-600">{note}</p></div>;
}
