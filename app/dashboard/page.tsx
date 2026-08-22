'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

type StressResponse = {
  id: string;
  created_at: string;
  forge_score: number | null;
  profile: string | null;
  leadership_score: number | null;
  people_score: number | null;
  systems_score: number | null;
  programme_score: number | null;
  evidence_score: number | null;
  resilience_score: number | null;
  strongest_dimension: string | null;
  weakest_dimension: string | null;
  accuracy_rating: number | null;
  revealed_something: boolean | null;
  priority_problem: string | null;
};

type ReadinessResponse = {
  id: number;
  created_at: string;
  readiness_score: number | null;
  profile: string | null;
  people_score: number | null;
  programme_score: number | null;
  operations_score: number | null;
  safety_score: number | null;
  communication_score: number | null;
  capacity_score: number | null;
  strongest_area: string | null;
  weakest_area: string | null;
};

type Feedback = {
  id: number;
  created_at: string;
  desired_next_step: string | null;
  biggest_challenge: string | null;
  forge_score: number | null;
  profile: string | null;
  weakest_dimension: string | null;
};

type Interest = {
  id: number;
  created_at: string;
  source_diagnostic: string | null;
  diagnostic_score: number | null;
  diagnostic_profile: string | null;
  primary_exposure: string | null;
  interest_level: string | null;
  price_range: string | null;
  review_focus: string | null;
  valuable_outcome: string | null;
};

type TimelineItem = {
  id: string;
  type: string;
  created_at: string;
  score: number | null;
  profile: string | null;
  signal: string | null;
};

function average(values: Array<number | null | undefined>) {
  const valid = values.filter((value): value is number => typeof value === 'number');
  if (!valid.length) return null;
  return Math.round(valid.reduce((sum, value) => sum + value, 0) / valid.length);
}

function pretty(value: string | null | undefined) {
  if (!value) return '—';
  return value.replaceAll('_', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function StatCard({ label, value, note }: { label: string; value: string | number; note: string }) {
  return (
    <div className="border border-forge-ivory-200 bg-white p-5 md:p-6">
      <p className="text-[11px] font-semibold uppercase tracking-forge text-forge-stone-500">{label}</p>
      <p className="mt-3 font-serif text-4xl text-forge-forest-950">{value}</p>
      <p className="mt-2 text-sm text-forge-stone-600">{note}</p>
    </div>
  );
}

function Bar({ label, value }: { label: string; value: number | null }) {
  const safe = value ?? 0;
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4 text-sm">
        <span className="text-forge-charcoal-800">{label}</span>
        <span className="font-semibold text-forge-forest-900">{value ?? '—'}</span>
      </div>
      <div className="h-2 bg-forge-ivory-200">
        <div className="h-2 bg-forge-forest-800" style={{ width: `${Math.min(100, Math.max(0, safe))}%` }} />
      </div>
    </div>
  );
}

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState<string | null>(null);
  const [stress, setStress] = useState<StressResponse[]>([]);
  const [readiness, setReadiness] = useState<ReadinessResponse[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [interest, setInterest] = useState<Interest[]>([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    setLoading(true);
    setErrorMessage('');

    const { data: userData, error: userError } = await supabase.auth.getUser();
    const user = userData.user;

    if (userError || !user) {
      router.push('/login');
      return;
    }

    setEmail(user.email ?? null);

    const [stressResult, readinessResult, feedbackResult, interestResult] = await Promise.all([
      supabase.from('stress_test_responses').select('id, created_at, forge_score, profile, leadership_score, people_score, systems_score, programme_score, evidence_score, resilience_score, strongest_dimension, weakest_dimension, accuracy_rating, revealed_something, priority_problem').order('created_at', { ascending: false }),
      supabase.from('readiness_check_responses').select('id, created_at, readiness_score, profile, people_score, programme_score, operations_score, safety_score, communication_score, capacity_score, strongest_area, weakest_area').order('created_at', { ascending: false }),
      supabase.from('stress_test_feedback').select('id, created_at, desired_next_step, biggest_challenge, forge_score, profile, weakest_dimension').order('created_at', { ascending: false }),
      supabase.from('action_review_interest').select('id, created_at, source_diagnostic, diagnostic_score, diagnostic_profile, primary_exposure, interest_level, price_range, review_focus, valuable_outcome').order('created_at', { ascending: false }),
    ]);

    const firstError = stressResult.error || readinessResult.error || feedbackResult.error || interestResult.error;
    if (firstError) {
      console.error('Validation dashboard load error:', firstError);
      setErrorMessage('Forge could not load all validation data. Check Supabase permissions and try again.');
    }

    setStress((stressResult.data || []) as StressResponse[]);
    setReadiness((readinessResult.data || []) as ReadinessResponse[]);
    setFeedback((feedbackResult.data || []) as Feedback[]);
    setInterest((interestResult.data || []) as Interest[]);
    setLoading(false);
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push('/');
  }

  const metrics = useMemo(() => {
    const completions = stress.length + readiness.length;
    const paidSignals = interest.filter((row) => row.interest_level === 'yes' || row.interest_level === 'maybe').length;
    const revealed = stress.filter((row) => row.revealed_something === true).length;
    const revealedRate = stress.length ? Math.round((revealed / stress.length) * 100) : 0;

    return {
      completions,
      stressCount: stress.length,
      readinessCount: readiness.length,
      feedbackCount: feedback.length,
      paidSignals,
      revealedRate,
      stressAverage: average(stress.map((row) => row.forge_score)),
      readinessAverage: average(readiness.map((row) => row.readiness_score)),
    };
  }, [stress, readiness, feedback, interest]);

  const readinessDimensions = useMemo(() => [
    ['People', average(readiness.map((row) => row.people_score))],
    ['Programme', average(readiness.map((row) => row.programme_score))],
    ['Operations', average(readiness.map((row) => row.operations_score))],
    ['Safety', average(readiness.map((row) => row.safety_score))],
    ['Communication', average(readiness.map((row) => row.communication_score))],
    ['Capacity', average(readiness.map((row) => row.capacity_score))],
  ] as Array<[string, number | null]>, [readiness]);

  const stressDimensions = useMemo(() => [
    ['Leadership', average(stress.map((row) => row.leadership_score))],
    ['People', average(stress.map((row) => row.people_score))],
    ['Systems', average(stress.map((row) => row.systems_score))],
    ['Programme', average(stress.map((row) => row.programme_score))],
    ['Evidence', average(stress.map((row) => row.evidence_score))],
    ['Resilience', average(stress.map((row) => row.resilience_score))],
  ] as Array<[string, number | null]>, [stress]);

  const weakestSignals = useMemo(() => {
    const counts = new Map<string, number>();
    [...stress.map((row) => row.weakest_dimension), ...readiness.map((row) => row.weakest_area)]
      .filter((value): value is string => Boolean(value))
      .forEach((value) => counts.set(value, (counts.get(value) || 0) + 1));
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 6);
  }, [stress, readiness]);

  const timeline = useMemo<TimelineItem[]>(() => {
    const items: TimelineItem[] = [
      ...stress.map((row) => ({ id: `stress-${row.id}`, type: 'Stress Test', created_at: row.created_at, score: row.forge_score, profile: row.profile, signal: row.weakest_dimension })),
      ...readiness.map((row) => ({ id: `readiness-${row.id}`, type: 'Readiness Check', created_at: row.created_at, score: row.readiness_score, profile: row.profile, signal: row.weakest_area })),
      ...interest.map((row) => ({ id: `interest-${row.id}`, type: 'Commercial Signal', created_at: row.created_at, score: row.diagnostic_score, profile: row.interest_level, signal: row.primary_exposure || row.review_focus })),
      ...feedback.map((row) => ({ id: `feedback-${row.id}`, type: 'Feedback', created_at: row.created_at, score: row.forge_score, profile: row.profile, signal: row.biggest_challenge || row.desired_next_step })),
    ];
    return items.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 12);
  }, [stress, readiness, feedback, interest]);

  if (loading) {
    return <main className="min-h-screen bg-forge-ivory-50 flex items-center justify-center"><p className="text-forge-stone-600">Loading Forge validation data...</p></main>;
  }

  return (
    <main className="min-h-screen bg-forge-ivory-50 text-forge-charcoal-900">
      <header className="border-b border-forge-ivory-200 bg-forge-forest-950 text-white">
        <div className="mx-auto flex max-w-forge items-center justify-between px-5 py-5 md:px-8">
          <div>
            <a href="/" className="font-serif text-2xl tracking-tight">FORGE</a>
            <p className="mt-1 text-xs uppercase tracking-forge text-forge-bronze-300">Validation dashboard</p>
          </div>
          <div className="text-right">
            {email && <p className="hidden text-xs text-white/60 sm:block">{email}</p>}
            <button onClick={handleSignOut} className="mt-1 text-sm underline underline-offset-4 text-white/80 hover:text-white">Sign out</button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-forge px-5 py-10 md:px-8 md:py-14">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-forge text-forge-bronze-600">Validation mode</p>
            <h1 className="mt-3 font-serif text-4xl leading-tight text-forge-forest-950 md:text-5xl">Is Forge earning the right to exist?</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-forge-stone-600">Track real behaviour: diagnostic completions, repeated pain signals, perceived usefulness and willingness to pay.</p>
          </div>
          <button onClick={loadDashboard} className="self-start border-b border-forge-forest-900 pb-1 text-sm font-semibold text-forge-forest-900">Refresh data</button>
        </div>

        {errorMessage && <div className="mb-8 border border-red-200 bg-red-50 p-4 text-sm text-red-700">{errorMessage}</div>}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Diagnostic completions" value={metrics.completions} note={`${metrics.stressCount} stress test · ${metrics.readinessCount} readiness`} />
          <StatCard label="Feedback submissions" value={metrics.feedbackCount} note="Direct qualitative evidence" />
          <StatCard label="Commercial signals" value={metrics.paidSignals} note="Yes or maybe to deeper help" />
          <StatCard label="Revealed something" value={`${metrics.revealedRate}%`} note="Stress Test users reporting new insight" />
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <section className="border border-forge-ivory-200 bg-white p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-forge text-forge-bronze-600">Year Readiness Check</p>
                <h2 className="mt-2 font-serif text-2xl text-forge-forest-950">Average department exposure</h2>
              </div>
              <div className="text-right"><p className="font-serif text-3xl text-forge-forest-950">{metrics.readinessAverage ?? '—'}</p><p className="text-xs text-forge-stone-500">average score</p></div>
            </div>
            <div className="mt-7 space-y-5">
              {readinessDimensions.map(([label, value]) => <Bar key={label} label={label} value={value} />)}
            </div>
          </section>

          <section className="border border-forge-ivory-200 bg-white p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-forge text-forge-bronze-600">Sport Department Stress Test</p>
                <h2 className="mt-2 font-serif text-2xl text-forge-forest-950">Average system strength</h2>
              </div>
              <div className="text-right"><p className="font-serif text-3xl text-forge-forest-950">{metrics.stressAverage ?? '—'}</p><p className="text-xs text-forge-stone-500">average score</p></div>
            </div>
            <div className="mt-7 space-y-5">
              {stressDimensions.map(([label, value]) => <Bar key={label} label={label} value={value} />)}
            </div>
          </section>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <section className="border border-forge-ivory-200 bg-white p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-forge text-forge-bronze-600">Emerging pain</p>
            <h2 className="mt-2 font-serif text-2xl text-forge-forest-950">Most common weakest areas</h2>
            <div className="mt-6 divide-y divide-forge-ivory-200">
              {weakestSignals.length === 0 ? <p className="py-4 text-sm text-forge-stone-500">Not enough data yet.</p> : weakestSignals.map(([label, count], index) => (
                <div key={label} className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-3"><span className="font-serif text-xl text-forge-bronze-600">{String(index + 1).padStart(2, '0')}</span><span className="text-sm text-forge-charcoal-800">{label}</span></div>
                  <span className="text-sm font-semibold text-forge-forest-900">{count}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="border border-forge-ivory-200 bg-white p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-forge text-forge-bronze-600">Latest evidence</p>
            <h2 className="mt-2 font-serif text-2xl text-forge-forest-950">Validation activity</h2>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[680px] text-left text-sm">
                <thead><tr className="border-b border-forge-ivory-200 text-[11px] uppercase tracking-forge text-forge-stone-500"><th className="pb-3 pr-4 font-semibold">Date</th><th className="pb-3 pr-4 font-semibold">Signal</th><th className="pb-3 pr-4 font-semibold">Score</th><th className="pb-3 pr-4 font-semibold">Profile</th><th className="pb-3 font-semibold">Weakness / intent</th></tr></thead>
                <tbody className="divide-y divide-forge-ivory-200">
                  {timeline.length === 0 ? <tr><td colSpan={5} className="py-6 text-forge-stone-500">No validation activity yet.</td></tr> : timeline.map((item) => (
                    <tr key={item.id}>
                      <td className="py-4 pr-4 text-forge-stone-500">{new Date(item.created_at).toLocaleDateString()}</td>
                      <td className="py-4 pr-4 font-medium text-forge-charcoal-900">{item.type}</td>
                      <td className="py-4 pr-4">{item.score ?? '—'}</td>
                      <td className="py-4 pr-4">{pretty(item.profile)}</td>
                      <td className="py-4 text-forge-stone-600">{pretty(item.signal)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <section className="mt-6 border border-forge-forest-800 bg-forge-forest-950 p-6 text-white md:p-8">
          <p className="text-xs font-semibold uppercase tracking-forge text-forge-bronze-300">Decision rule</p>
          <div className="mt-4 grid gap-6 md:grid-cols-3">
            <div><p className="font-serif text-xl">Pain</p><p className="mt-2 text-sm leading-6 text-white/65">Do the same weaknesses recur across departments?</p></div>
            <div><p className="font-serif text-xl">Usefulness</p><p className="mt-2 text-sm leading-6 text-white/65">Do leaders say Forge revealed something worth acting on?</p></div>
            <div><p className="font-serif text-xl">Payment</p><p className="mt-2 text-sm leading-6 text-white/65">Do diagnostic users ask for deeper help and accept a real price?</p></div>
          </div>
        </section>
      </section>
    </main>
  );
}
