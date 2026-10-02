"use client";
import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { readSaved } from "@/lib/traveler";
import { publicExperiences } from "@/lib/demo";
import { experiences } from "@/lib/catalog";
import { ExperienceCard } from "@/components/ExperienceCard";
export default function SavedPage() { const [ids, setIds] = useState<string[]>([]); useEffect(() => { const load = () => setIds(readSaved()); load(); window.addEventListener("tb-traveler-updated", load); return () => window.removeEventListener("tb-traveler-updated", load); }, []); const saved = publicExperiences().filter((item) => ids.includes(item.id)); return <div className="workspace-page"><div className="content-width"><div className="page-heading"><div><h1>A little collection of possibilities.</h1><p>Your saved experiences, ready when you are.</p></div><Link className="button button-secondary" href="/trips">Go to my trips <ArrowRight size={16} /></Link></div>{saved.length ? <div className="experience-grid">{saved.map((item) => <ExperienceCard key={item.id} experience={item} />)}</div> : <div className="empty-state"><Heart size={35} /><h2>Something will catch your eye.</h2><p>Tap the heart on an experience to save it here.</p><Link className="button button-primary" href="/search">Explore experiences <ArrowRight size={16} /></Link></div>}<p className="inline-note">Your collection is saved on this device.</p></div></div>; }
