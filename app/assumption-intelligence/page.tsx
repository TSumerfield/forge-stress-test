'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

type Decision={id:string;title:string;domain:string|null;created_at:string};
type Assumption={id:string;decision_id:string;statement:string;confidence:number|null;status:string;category:string|null;invalidated_at:string|null;created_at:string};

const categories:[string,RegExp[]][]=[
 ['Demand / adoption',[/demand/i,/participat/i,/adopt/i,/uptake/i,/interest/i,/customer/i,/enrol/i]],
 ['People / capacity',[/staff/i,/coach/i,/capacity/i,/workload/i,/retention/i,/absence/i,/hire/i,/team/i]],
 ['Execution / timing',[/time/i,/timeline/i,/deadline/i,/launch/i,/deliver/i,/complete/i,/schedule/i,/ready/i]],
 ['Financial / cost',[/budget/i,/cost/i,/price/i,/revenue/i,/margin/i,/spend/i,/fund/i,/afford/i]],
 ['Performance / outcome',[/performance/i,/improve/i,/quality/i,/win/i,/progress/i,/develop/i,/result/i]],
 ['External / environment',[/market/i,/regulat/i,/policy/i,/supplier/i,/compet/i,/econom/i,/weather/i,/travel/i]],
 ['Behaviour / stakeholder',[/parent/i,/student/i,/athlete/i,/stakeholder/i,/behavio/i,/support/i,/accept/i,/engage/i]],
];
function classify(statement:string,existing:string|null){if(existing)return existing;for(const[c,patterns]of categories){if(patterns.some(p=>p.test(statement)))return c}return 'Other'}
function pct(n:number,d:number){return d?Math.round(n/d*100):0}

export default function AssumptionIntelligence(){
 const router=useRouter();const[loading,setLoading]=useState(true);const[message,setMessage]=useState('');const[decisions,setDecisions]=useState<Decision[]>([]);const[assumptions,setAssumptions]=useState<Assumption[]>([]);
 useEffect(()=>{void load()},[]);
 async function load(){const{data:u,error}=await supabase.auth.getUser();if(error||!u.user){router.push('/login');return}const[d,a]=await Promise.all([
  supabase.from('decision_intakes').select('id,title,domain,created_at').order('created_at',{ascending:true}),
  supabase.from('decision_assumptions').select('id,decision_id,statement,confidence,status,category,invalidated_at,created_at').order('created_at',{ascending:true})
 ]);const err=d.error||a.error;if(err)setMessage(err.message);setDecisions((d.data||[]) as Decision[]);setAssumptions((a.data||[]) as Assumption[]);setLoading(false)}
 const enriched=useMemo(()=>assumptions.map(a=>({...a,inferredCategory:classify(a.statement,a.category),failed:a.status==='invalidated'||Boolean(a.invalidated_at)})),[assumptions]);
 const categoryRows=useMemo(()=>Array.from(new Set(enriched.map(a=>a.inferredCategory))).map(category=>{const rows=enriched.filter(a=>a.inferredCategory===category);const failed=rows.filter(a=>a.failed);const avgConfidence=rows.length?Math.round(rows.reduce((s,a)=>s+(a.confidence||0),0)/rows.length):0;return{category,total:rows.length,failed:failed.length,failureRate:pct(failed.length,rows.length),avgConfidence}}).sort((a,b)=>b.failureRate-a.failureRate||b.total-a.total),[enriched]);
 const domainRows=useMemo(()=>Array.from(new Set(decisions.map(d=>d.domain||'general'))).map(domain=>{const ids=new Set(decisions.filter(d=>(d.domain||'general')===domain).map(d=>d.id));const rows=enriched.filter(a=>ids.has(a.decision_id));const failed=rows.filter(a=>a.failed);return{domain,total:rows.length,failed:failed.length,failureRate:pct(failed.length,rows.length)}}).sort((a,b)=>b.failureRate-a.failureRate),[decisions,enriched]);
 const risky=categoryRows.filter(r=>r.total>=2&&r.failureRate>=40).slice(0,5);
 const warnings=useMemo(()=>risky.map(r=>`${r.category}: ${r.failureRate}% of ${r.total} recorded assumptions have failed.`),[risky]);
 const recentFailures=enriched.filter(a=>a.failed).slice(-8).reverse();
 const totalFailed=enriched.filter(a=>a.failed).length;
 if(loading)return <main className="flex min-h-screen items-center justify-center bg-forge-ivory-50"><p>Building assumption intelligence...</p></main>;
 return <main className="min-h-screen bg-forge-ivory-50 text-forge-charcoal-900">
  <header className="border-b border-forge-ivory-200 bg-forge-forest-950 text-white"><div className="mx-auto flex max-w-forge items-center justify-between px-5 py-5 md:px-8"><div><a href="/" className="font-serif text-2xl">FORGE</a><p className="mt-1 text-xs uppercase tracking-forge text-forge-bronze-300">Assumption intelligence</p></div><div className="flex gap-5 text-sm"><a href="/decision-ledger" className="underline underline-offset-4">Ledger</a><a href="/calibration" className="underline underline-offset-4">Calibration</a></div></div></header>
  <section className="mx-auto max-w-forge px-5 py-10 md:px-8 md:py-14">
   <div className="max-w-3xl"><p className="text-xs font-semibold uppercase tracking-forge text-forge-bronze-600">Memory advantage</p><h1 className="mt-3 font-serif text-4xl text-forge-forest-950 md:text-5xl">Which assumptions keep letting you down?</h1><p className="mt-4 leading-7 text-forge-stone-600">Forge groups assumptions into recurring classes, tracks which ones fail, and turns that history into warnings for future decisions.</p></div>
   {message&&<div className="mt-6 border border-forge-bronze-300 bg-white p-4 text-sm">{message}</div>}
   <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><Metric label="Assumptions" value={enriched.length} note="Across all captured decisions"/><Metric label="Invalidated" value={totalFailed} note={`${pct(totalFailed,enriched.length)}% failure rate`}/><Metric label="Assumption classes" value={categoryRows.length} note="Recurring judgement patterns"/><Metric label="Risk classes" value={risky.length} note="At least 2 examples and ≥40% failure"/></div>
   <section className="mt-8 border border-forge-forest-800 bg-forge-forest-950 p-6 text-white md:p-8"><p className="text-xs font-semibold uppercase tracking-forge text-forge-bronze-300">Pre-decision warnings</p><h2 className="mt-2 font-serif text-3xl">Historical weak spots</h2><div className="mt-5 space-y-3">{warnings.length?warnings.map(w=><p key={w} className="border-t border-white/15 pt-3 text-sm leading-6 first:border-t-0 first:pt-0">{w}</p>):<p className="text-sm text-white/65">No repeatable weak assumption class yet. Keep closing loops.</p>}</div></section>
   <div className="mt-8 grid gap-6 xl:grid-cols-2">
    <section className="border border-forge-ivory-200 bg-white p-6 md:p-8"><p className="text-xs font-semibold uppercase tracking-forge text-forge-bronze-600">Pattern library</p><h2 className="mt-2 font-serif text-2xl text-forge-forest-950">Assumption classes</h2><div className="mt-6 overflow-x-auto"><table className="w-full min-w-[560px] text-left text-sm"><thead><tr className="border-b text-[11px] uppercase tracking-forge text-forge-stone-500"><th className="pb-3">Class</th><th>Total</th><th>Failed</th><th>Failure</th><th>Avg confidence</th></tr></thead><tbody className="divide-y">{categoryRows.map(r=><tr key={r.category}><td className="py-4 font-semibold">{r.category}</td><td>{r.total}</td><td>{r.failed}</td><td>{r.failureRate}%</td><td>{r.avgConfidence}%</td></tr>)}</tbody></table></div></section>
    <section className="border border-forge-ivory-200 bg-white p-6 md:p-8"><p className="text-xs font-semibold uppercase tracking-forge text-forge-bronze-600">Context</p><h2 className="mt-2 font-serif text-2xl text-forge-forest-950">Failure by decision domain</h2><div className="mt-6 space-y-4">{domainRows.map(r=><div key={r.domain} className="border-t border-forge-ivory-200 pt-4 first:border-t-0 first:pt-0"><div className="flex justify-between gap-4"><span className="font-semibold capitalize">{r.domain}</span><span>{r.failureRate}%</span></div><p className="mt-1 text-xs text-forge-stone-500">{r.failed} failed of {r.total} assumptions</p></div>)}</div></section>
   </div>
   <section className="mt-8 border border-forge-ivory-200 bg-white p-6 md:p-8"><p className="text-xs font-semibold uppercase tracking-forge text-forge-bronze-600">Failure memory</p><h2 className="mt-2 font-serif text-2xl text-forge-forest-950">Recent invalidated assumptions</h2><div className="mt-6 divide-y divide-forge-ivory-200">{recentFailures.length?recentFailures.map(a=>{const d=decisions.find(x=>x.id===a.decision_id);return <div key={a.id} className="py-4 first:pt-0"><div className="flex flex-col gap-2 md:flex-row md:justify-between"><div><p className="text-sm font-semibold">{a.statement}</p><p className="mt-1 text-xs text-forge-stone-500">{d?.title||'Decision'} · {a.inferredCategory}</p></div><p className="text-sm">Original confidence {a.confidence??'—'}%</p></div></div>}):<p className="text-sm text-forge-stone-500">No invalidated assumptions yet.</p>}</div></section>
  </section>
 </main>
}
function Metric({label,value,note}:{label:string;value:string|number;note:string}){return <div className="border border-forge-ivory-200 bg-white p-5"><p className="text-[11px] font-semibold uppercase tracking-forge text-forge-stone-500">{label}</p><p className="mt-3 font-serif text-4xl text-forge-forest-950">{value}</p><p className="mt-2 text-sm text-forge-stone-600">{note}</p></div>}
