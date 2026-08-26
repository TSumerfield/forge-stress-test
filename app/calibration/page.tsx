'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

type Decision = { id:string; title:string; domain:string|null; confidence:number|null; decided_at:string|null; created_at:string };
type Prediction = { id:string; decision_id:string; probability:number|null; resolution_status:string; resolved_result:boolean|null; brier_score:number|null; resolved_at:string|null };
type Review = { id:string; decision_id:string; process_quality_score:number|null; outcome_quality_score:number|null; lesson:string|null; future_rule:string|null; reviewed_at:string };
type Assumption = { id:string; decision_id:string; statement:string; confidence:number|null; status:string; invalidated_at:string|null };

function avg(values:number[]) { return values.length ? values.reduce((a,b)=>a+b,0)/values.length : null; }
function round1(v:number|null){ return v===null ? null : Math.round(v*10)/10; }
function pct(v:number|null){ return v===null ? '—' : `${Math.round(v)}%`; }
function calibrationLabel(score:number|null){ if(score===null)return 'No baseline'; if(score<=0.05)return 'Excellent'; if(score<=0.15)return 'Strong'; if(score<=0.25)return 'Mixed'; return 'Weak'; }

export default function CalibrationPage(){
  const router=useRouter();
  const[loading,setLoading]=useState(true);
  const[message,setMessage]=useState('');
  const[decisions,setDecisions]=useState<Decision[]>([]);
  const[predictions,setPredictions]=useState<Prediction[]>([]);
  const[reviews,setReviews]=useState<Review[]>([]);
  const[assumptions,setAssumptions]=useState<Assumption[]>([]);

  useEffect(()=>{void bootstrap()},[]);
  async function bootstrap(){
    const{data,error}=await supabase.auth.getUser();
    if(error||!data.user){router.push('/login');return}
    const[d,p,r,a]=await Promise.all([
      supabase.from('decision_intakes').select('id,title,domain,confidence,decided_at,created_at').order('created_at',{ascending:true}),
      supabase.from('decision_predictions').select('id,decision_id,probability,resolution_status,resolved_result,brier_score,resolved_at').order('resolved_at',{ascending:true,nullsFirst:true}),
      supabase.from('decision_reviews').select('id,decision_id,process_quality_score,outcome_quality_score,lesson,future_rule,reviewed_at').order('reviewed_at',{ascending:true}),
      supabase.from('decision_assumptions').select('id,decision_id,statement,confidence,status,invalidated_at')
    ]);
    const err=d.error||p.error||r.error||a.error;
    if(err)setMessage(`Could not load calibration profile: ${err.message}`);
    setDecisions((d.data||[]) as Decision[]); setPredictions((p.data||[]) as Prediction[]); setReviews((r.data||[]) as Review[]); setAssumptions((a.data||[]) as Assumption[]); setLoading(false);
  }

  const resolved=predictions.filter(p=>p.resolution_status==='resolved'&&typeof p.brier_score==='number');
  const avgBrier=round1(avg(resolved.map(p=>(p.brier_score||0)*100)));
  const resolutionRate=predictions.length?Math.round(predictions.filter(p=>p.resolution_status==='resolved').length/predictions.length*100):0;
  const avgProcess=round1(avg(reviews.map(r=>r.process_quality_score).filter((v):v is number=>typeof v==='number')));
  const avgOutcome=round1(avg(reviews.map(r=>r.outcome_quality_score).filter((v):v is number=>typeof v==='number')));
  const invalidated=assumptions.filter(a=>a.status==='invalidated'||a.invalidated_at);
  const assumptionFailureRate=assumptions.length?Math.round(invalidated.length/assumptions.length*100):0;

  const domainRows=useMemo(()=>{
    const domains=Array.from(new Set(decisions.map(d=>d.domain||'general')));
    return domains.map(domain=>{
      const ids=new Set(decisions.filter(d=>(d.domain||'general')===domain).map(d=>d.id));
      const rp=resolved.filter(p=>ids.has(p.decision_id));
      const rr=reviews.filter(r=>ids.has(r.decision_id));
      const conf=decisions.filter(d=>ids.has(d.id)&&typeof d.confidence==='number').map(d=>d.confidence as number);
      return {domain,decisions:ids.size,forecasts:rp.length,brier:round1(avg(rp.map(p=>(p.brier_score||0)*100))),confidence:round1(avg(conf)),process:round1(avg(rr.map(r=>r.process_quality_score).filter((v):v is number=>typeof v==='number')))};
    }).sort((a,b)=>b.decisions-a.decisions);
  },[decisions,resolved,reviews]);

  const confidenceBuckets=useMemo(()=>{
    const buckets=[{label:'0–59%',min:0,max:59},{label:'60–74%',min:60,max:74},{label:'75–89%',min:75,max:89},{label:'90–100%',min:90,max:100}];
    return buckets.map(b=>{
      const rows=resolved.filter(p=>typeof p.probability==='number'&&p.probability!>=b.min&&p.probability!<=b.max);
      const actual=rows.length?Math.round(rows.filter(p=>p.resolved_result===true).length/rows.length*100):null;
      const stated=rows.length?round1(avg(rows.map(p=>p.probability as number))):null;
      const gap=actual===null||stated===null?null:round1(stated-actual);
      return {...b,count:rows.length,actual,stated,gap};
    });
  },[resolved]);

  const trend=useMemo(()=>{
    const rows=[...reviews].sort((a,b)=>new Date(a.reviewed_at).getTime()-new Date(b.reviewed_at).getTime()).filter(r=>typeof r.process_quality_score==='number');
    if(rows.length<4)return null;
    const half=Math.floor(rows.length/2);
    const first=avg(rows.slice(0,half).map(r=>r.process_quality_score as number));
    const second=avg(rows.slice(half).map(r=>r.process_quality_score as number));
    if(first===null||second===null)return null;
    return round1(second-first);
  },[reviews]);

  const recurringRules=useMemo(()=>{
    const rules=reviews.map(r=>r.future_rule?.trim()).filter((v):v is string=>Boolean(v));
    return rules.slice(-8).reverse();
  },[reviews]);

  const insight=useMemo(()=>{
    if(resolved.length<5)return 'Too little resolved evidence for a reliable judgement profile. Keep closing loops.';
    const weakDomain=[...domainRows].filter(d=>d.brier!==null&&d.forecasts>=2).sort((a,b)=>(b.brier||0)-(a.brier||0))[0];
    const over=confidenceBuckets.filter(b=>b.gap!==null&&b.count>=2).sort((a,b)=>Math.abs(b.gap||0)-Math.abs(a.gap||0))[0];
    const parts=[];
    if(weakDomain)parts.push(`Your weakest current forecast calibration is in ${weakDomain.domain}.`);
    if(over&&over.gap!==null){parts.push(over.gap>0?`You appear overconfident by about ${Math.abs(over.gap)} points in the ${over.label} confidence band.`:`You appear underconfident by about ${Math.abs(over.gap)} points in the ${over.label} confidence band.`)}
    if(trend!==null)parts.push(trend>0?`Decision-process scores are improving by ${trend} points versus your earlier baseline.`:trend<0?`Decision-process scores are down ${Math.abs(trend)} points versus your earlier baseline.`:'Decision-process quality is broadly flat.');
    return parts.join(' ')||'Keep resolving predictions to expose calibration patterns.';
  },[resolved,domainRows,confidenceBuckets,trend]);

  if(loading)return <main className="flex min-h-screen items-center justify-center bg-forge-ivory-50"><p>Building calibration profile...</p></main>;

  return <main className="min-h-screen bg-forge-ivory-50 text-forge-charcoal-900">
    <header className="border-b border-forge-ivory-200 bg-forge-forest-950 text-white"><div className="mx-auto flex max-w-forge items-center justify-between px-5 py-5 md:px-8"><div><a href="/" className="font-serif text-2xl">FORGE</a><p className="mt-1 text-xs uppercase tracking-forge text-forge-bronze-300">Calibration profile</p></div><div className="flex gap-5 text-sm"><a href="/decision-ledger" className="underline underline-offset-4">Ledger</a><a href="/review-queue" className="underline underline-offset-4">Review queue</a></div></div></header>
    <section className="mx-auto max-w-forge px-5 py-10 md:px-8 md:py-14">
      <div className="max-w-3xl"><p className="text-xs font-semibold uppercase tracking-forge text-forge-bronze-600">Judgement intelligence</p><h1 className="mt-3 font-serif text-4xl text-forge-forest-950 md:text-5xl">How well do you actually decide?</h1><p className="mt-4 leading-7 text-forge-stone-600">Forge compares confidence, forecasts, assumptions and reviewed decision quality to reveal where judgement is strong, weak or improving.</p></div>
      {message&&<div className="mt-6 border border-forge-bronze-300 bg-white p-4 text-sm">{message}</div>}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Metric label="Resolved forecasts" value={resolved.length} note={`${resolutionRate}% resolution rate`} />
        <Metric label="Calibration error" value={avgBrier===null?'—':avgBrier} note={avgBrier===null?'No baseline yet':`${calibrationLabel(avgBrier/100)} · lower is better`} />
        <Metric label="Process quality" value={avgProcess??'—'} note="Average reviewed decision process" />
        <Metric label="Outcome quality" value={avgOutcome??'—'} note="Average realised outcome quality" />
        <Metric label="Assumption failure" value={`${assumptionFailureRate}%`} note={`${invalidated.length} invalidated of ${assumptions.length}`} />
      </div>

      <section className="mt-8 border border-forge-forest-800 bg-forge-forest-950 p-6 text-white md:p-8"><p className="text-xs font-semibold uppercase tracking-forge text-forge-bronze-300">Current read</p><h2 className="mt-2 font-serif text-3xl">Calibration signal</h2><p className="mt-4 max-w-4xl leading-7 text-white/75">{insight}</p></section>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <section className="border border-forge-ivory-200 bg-white p-6 md:p-8"><p className="text-xs font-semibold uppercase tracking-forge text-forge-bronze-600">By domain</p><h2 className="mt-2 font-serif text-2xl text-forge-forest-950">Where judgement travels well</h2><div className="mt-6 overflow-x-auto"><table className="w-full min-w-[560px] text-left text-sm"><thead><tr className="border-b text-[11px] uppercase tracking-forge text-forge-stone-500"><th className="pb-3">Domain</th><th>Decisions</th><th>Resolved</th><th>Avg confidence</th><th>Calibration error</th><th>Process</th></tr></thead><tbody className="divide-y">{domainRows.map(r=><tr key={r.domain}><td className="py-4 font-semibold capitalize">{r.domain}</td><td>{r.decisions}</td><td>{r.forecasts}</td><td>{pct(r.confidence)}</td><td>{r.brier??'—'}</td><td>{r.process??'—'}</td></tr>)}</tbody></table></div></section>

        <section className="border border-forge-ivory-200 bg-white p-6 md:p-8"><p className="text-xs font-semibold uppercase tracking-forge text-forge-bronze-600">Confidence calibration</p><h2 className="mt-2 font-serif text-2xl text-forge-forest-950">Confidence vs reality</h2><div className="mt-6 space-y-4">{confidenceBuckets.map(b=><div key={b.label} className="border-t border-forge-ivory-200 pt-4 first:border-t-0 first:pt-0"><div className="flex justify-between gap-4"><span className="font-semibold">{b.label}</span><span className="text-sm text-forge-stone-500">{b.count} resolved</span></div><div className="mt-2 grid grid-cols-3 gap-3 text-sm"><div><p className="text-xs text-forge-stone-500">Stated</p><p className="mt-1 font-serif text-2xl">{pct(b.stated)}</p></div><div><p className="text-xs text-forge-stone-500">Occurred</p><p className="mt-1 font-serif text-2xl">{pct(b.actual)}</p></div><div><p className="text-xs text-forge-stone-500">Gap</p><p className="mt-1 font-serif text-2xl">{b.gap===null?'—':`${b.gap>0?'+':''}${b.gap}`}</p></div></div></div>)}</div></section>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <section className="border border-forge-ivory-200 bg-white p-6"><p className="text-xs font-semibold uppercase tracking-forge text-forge-bronze-600">Improvement</p><h2 className="mt-2 font-serif text-2xl text-forge-forest-950">Decision-process trend</h2><p className="mt-5 font-serif text-5xl text-forge-forest-950">{trend===null?'—':`${trend>0?'+':''}${trend}`}</p><p className="mt-3 text-sm leading-6 text-forge-stone-600">Change in average process-quality score between the earlier and later halves of completed reviews.</p></section>
        <section className="border border-forge-ivory-200 bg-white p-6"><p className="text-xs font-semibold uppercase tracking-forge text-forge-bronze-600">Assumption discipline</p><h2 className="mt-2 font-serif text-2xl text-forge-forest-950">What keeps breaking</h2><div className="mt-5 space-y-3">{invalidated.slice(0,6).map(a=><div key={a.id} className="border-t border-forge-ivory-200 pt-3 first:border-t-0 first:pt-0"><p className="text-sm">{a.statement}</p><p className="mt-1 text-xs text-forge-stone-500">Original confidence {a.confidence??'—'}%</p></div>)}{invalidated.length===0&&<p className="text-sm text-forge-stone-500">No assumptions have been invalidated yet.</p>}</div></section>
        <section className="border border-forge-ivory-200 bg-white p-6"><p className="text-xs font-semibold uppercase tracking-forge text-forge-bronze-600">Decision rules</p><h2 className="mt-2 font-serif text-2xl text-forge-forest-950">Lessons carried forward</h2><div className="mt-5 space-y-3">{recurringRules.map((r,i)=><div key={`${r}-${i}`} className="border-t border-forge-ivory-200 pt-3 text-sm first:border-t-0 first:pt-0">{r}</div>)}{recurringRules.length===0&&<p className="text-sm text-forge-stone-500">Completed reviews will create your future-rule library.</p>}</div></section>
      </div>
    </section>
  </main>;
}

function Metric({label,value,note}:{label:string;value:string|number;note:string}){return <div className="border border-forge-ivory-200 bg-white p-5"><p className="text-[11px] font-semibold uppercase tracking-forge text-forge-stone-500">{label}</p><p className="mt-3 font-serif text-4xl text-forge-forest-950">{value}</p><p className="mt-2 text-sm text-forge-stone-600">{note}</p></div>}
