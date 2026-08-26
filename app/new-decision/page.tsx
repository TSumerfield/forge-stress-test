'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

type Draft={decision:string;outcome:string;options:string;assumptions:string;prediction:string;confidence:string;reviewDate:string};
const empty:Draft={decision:'',outcome:'',options:'',assumptions:'',prediction:'',confidence:'70',reviewDate:''};
const lines=(v:string)=>v.split('\n').map(x=>x.trim()).filter(Boolean);

export default function NewDecision(){
 const router=useRouter(); const[userId,setUserId]=useState(''); const[d,setD]=useState<Draft>(empty); const[saving,setSaving]=useState(false); const[msg,setMsg]=useState('');
 useEffect(()=>{void (async()=>{const{data}=await supabase.auth.getUser();if(!data.user){router.push('/login');return}setUserId(data.user.id)})()},[router]);
 async function save(e:FormEvent){e.preventDefault();if(!userId||!d.decision.trim())return;setSaving(true);setMsg('');const confidence=Math.max(0,Math.min(100,Number(d.confidence)||0));
  const{data,error}=await supabase.from('decision_intakes').insert({user_id:userId,title:d.decision.trim().slice(0,100),decision:d.decision.trim(),context:'Captured through simplified Forge flow',constraints:'None recorded',options:lines(d.options),difficulty:'meaningful',status:'SUBMITTED',desired_outcome:d.outcome.trim()||null,confidence,expected_result:d.prediction.trim()||null,review_date:d.reviewDate||null,decided_at:new Date().toISOString()}).select('id').single();
  if(error||!data){setMsg(error?.message||'Could not save decision.');setSaving(false);return}
  const assumptions=lines(d.assumptions).map(statement=>({user_id:userId,decision_id:data.id,statement,confidence}));
  const predictions=d.prediction.trim()?[{user_id:userId,decision_id:data.id,prediction:d.prediction.trim(),probability:confidence,target_date:d.reviewDate||null}]:[];
  const[a,p]=await Promise.all([assumptions.length?supabase.from('decision_assumptions').insert(assumptions):Promise.resolve({error:null}),predictions.length?supabase.from('decision_predictions').insert(predictions):Promise.resolve({error:null})]);
  if(a.error||p.error)setMsg('Decision saved, but one linked item needs attention.');else{setMsg('Decision locked. Forge will bring it back when it is time to review.');setD(empty)}setSaving(false);
 }
 return <main className="min-h-screen bg-forge-ivory-50 text-forge-charcoal-900"><Nav/><section className="mx-auto max-w-3xl px-5 py-10 md:px-8 md:py-14"><p className="text-xs font-semibold uppercase tracking-forge text-forge-bronze-600">1 · Decide</p><h1 className="mt-3 font-serif text-4xl text-forge-forest-950 md:text-5xl">Make a decision.</h1><p className="mt-4 text-lg text-forge-stone-600">Capture what you believe now. Forge handles the intelligence underneath.</p>{msg&&<div className="mt-6 border border-forge-bronze-300 bg-white p-4 text-sm">{msg}</div>}
 <form onSubmit={save} className="mt-8 space-y-6 border border-forge-ivory-200 bg-white p-6 md:p-8">
  <Field n="1" label="What are you deciding?"><textarea required className="input min-h-24" value={d.decision} onChange={e=>setD({...d,decision:e.target.value})} placeholder="e.g. Should we launch the pilot in October?"/></Field>
  <Field n="2" label="What outcome do you want?"><textarea className="input min-h-20" value={d.outcome} onChange={e=>setD({...d,outcome:e.target.value})} placeholder="What would success look like?"/></Field>
  <Field n="3" label="What are your main options?"><textarea className="input min-h-20" value={d.options} onChange={e=>setD({...d,options:e.target.value})} placeholder={'One option per line\nLaunch now\nDelay one month'}/></Field>
  <Field n="4" label="What must be true for this to work?"><textarea className="input min-h-24" value={d.assumptions} onChange={e=>setD({...d,assumptions:e.target.value})} placeholder={'One belief per line\nDemand is strong enough\nWe have enough capacity'}/></Field>
  <Field n="5" label="What do you expect will happen?"><textarea className="input min-h-20" value={d.prediction} onChange={e=>setD({...d,prediction:e.target.value})} placeholder="Make one outcome testable enough to check later."/></Field>
  <div className="grid gap-5 sm:grid-cols-2"><Field n="6" label="How confident are you?"><div className="flex items-center gap-4"><input type="range" min="0" max="100" step="5" value={d.confidence} onChange={e=>setD({...d,confidence:e.target.value})} className="w-full"/><span className="w-14 text-right font-serif text-2xl">{d.confidence}%</span></div></Field><Field n="7" label="When should Forge check back?"><input type="date" className="input" value={d.reviewDate} onChange={e=>setD({...d,reviewDate:e.target.value})}/></Field></div>
  <div className="border-t border-forge-ivory-200 pt-6"><button disabled={saving} className="w-full bg-forge-forest-950 px-5 py-4 font-semibold text-white disabled:opacity-50">{saving?'Locking decision…':'Lock decision'}</button><p className="mt-3 text-center text-xs text-forge-stone-500">Your reasoning is preserved before the outcome is known.</p></div>
 </form></section></main>
}
function Field({n,label,children}:{n:string;label:string;children:React.ReactNode}){return <label className="block"><span className="mb-2 flex items-center gap-2 text-sm font-semibold"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-forge-ivory-100 text-xs">{n}</span>{label}</span>{children}</label>}
function Nav(){return <header className="border-b border-forge-ivory-200 bg-forge-forest-950 text-white"><div className="mx-auto flex max-w-forge items-center justify-between px-5 py-5 md:px-8"><a href="/your-forge" className="font-serif text-2xl">FORGE</a><nav className="flex gap-5 text-sm"><a href="/new-decision" className="font-semibold text-forge-bronze-300">New decision</a><a href="/reviews">Reviews</a><a href="/your-forge">Your Forge</a></nav></div></header>}
