"use client";
import Link from 'next/link';
import { useState } from 'react';
import { CarFront, Plus, UserRound } from 'lucide-react';
import { getExperienceForJourneyEvent, type JourneyPlan, type JourneyEvent } from '@/lib/journey';
import { guideProfiles } from '@/lib/catalog';
import { readLocal, writeLocal } from '@/lib/traveler';
import { usePhase } from './PhaseProvider';
export type TripExtra = { transport?: { origin: string; destination: string; departure: string; duration: string; price: number }; guide?: { name: string; price: number } };
export function tripExtras(plan: JourneyPlan) { const all = readLocal<Record<string, Record<string, TripExtra>>>('tb-trip-extras', {}); return plan.events.filter(e=>e.selected).flatMap(e=>all[plan.id]?.[e.id]?[all[plan.id][e.id]]:[]); }
export function TripConnections({ plan, event, next }: { plan: JourneyPlan; event: JourneyEvent; next?: JourneyEvent }) {
  const { has } = usePhase();const [revision,setRevision]=useState(0);const [notice,setNotice]=useState('');
  const experience=getExperienceForJourneyEvent(event);const target=next?getExperienceForJourneyEvent(next):undefined;
  const all=readLocal<Record<string,Record<string,TripExtra>>>('tb-trip-extras',{});const extras=all[plan.id]?.[event.id]||{};
  const guide=guideProfiles.find(g=>g.destination===experience?.destination);
  const route = experience && target ? `${experience.destination}:${target.destination}` : '';
  const estimate = ({'Colombo:Sigiriya':{minutes:210,price:85},'Sigiriya:Yala':{minutes:360,price:150},'Galle:Yala':{minutes:210,price:65}} as Record<string,{minutes:number;price:number}>)[route] || {minutes:90,price:45};
  const start=experience?.options[0].times[0]?.split(':').map(Number)||[9,0];
  const departureMinutes=(start[0]*60+start[1]+Math.round(parseFloat(experience?.duration||'2')*60)+15)%1440;
  const departure=`${String(Math.floor(departureMinutes/60)).padStart(2,'0')}:${String(departureMinutes%60).padStart(2,'0')}`;
  function save(value:TripExtra){writeLocal('tb-trip-extras',{...all,[plan.id]:{...all[plan.id],[event.id]:value}});setRevision(revision+1);setNotice('Journey option saved locally.');}
  if(!experience)return null;
  return <div className="trip-connections">{guide&&<div><button className="text-link" onClick={()=>save({...extras,guide:extras.guide?undefined:{name:guide.name,price:guide.price*2}})}><UserRound size={15}/>{extras.guide?`Remove ${guide.name}`:'Add optional local guide'}</button><span className="inline-note">{extras.guide?`${extras.guide.name} · 2 hours · $${extras.guide.price} demo estimate`:has('connectedJourney')?'Optional guide included in connected checkout':'Scheduled guiding note; included checkout begins in Phase 3'}</span></div>}{target&&target.destination!==experience.destination&&<div className="transport-suggestion"><strong>{has('transportHandoffs')&&event.status==='completed'?'Your next transport handoff':'Consider transport for the next leg'}</strong><p>{experience.destination} → {target.destination}</p>{has('transportHandoffs')?<><p>Suggested departure: {departure} · Estimated duration: {estimate.minutes} minutes · ${estimate.price} per vehicle</p><button className="text-link" onClick={()=>save({...extras,transport:extras.transport?undefined:{origin:experience.destination,destination:target.destination,departure,duration:`${estimate.minutes} minutes`,price:estimate.price}})}><CarFront size={15}/>{extras.transport?'Remove transfer':'Add transfer to journey'}</button><small>Demonstration estimate. No vehicle is dispatched.</small></>:<Link className="text-link" href={`/search?category=${encodeURIComponent('Transportation')}`}>Explore transport options</Link>}</div>}{event.status!=='completed'&&<Link className="text-link" href={`/search?q=${encodeURIComponent(experience.destination)}`}>Explore nearby activities</Link>}{notice&&<small role="status">{notice}</small>}</div>;
}
