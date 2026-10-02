"use client";
import Link from "next/link";
import { Check, Heart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import type { Experience } from "@/lib/catalog";
import { readSaved, toggleSaved } from "@/lib/traveler";
import { Photo } from "./Photo";
export function ExperienceCard({ experience, horizontal = false, date }: { experience: Experience; horizontal?: boolean; date?: string }) {
  const [saved, setSaved] = useState(false);
  const href = `/experience/${experience.id}${date ? `?date=${encodeURIComponent(date)}` : ""}`;
  useEffect(() => { const load = () => setSaved(readSaved().includes(experience.id)); load(); window.addEventListener("tb-traveler-updated", load); return () => window.removeEventListener("tb-traveler-updated", load); }, [experience.id]);
  return <article className={`experience-card ${horizontal ? "horizontal" : ""}`}><div className="card-image-wrap"><Link href={href} tabIndex={-1} aria-hidden="true"><Photo src={experience.image} alt={experience.title} className="card-image" /></Link><span className="image-tag">{experience.category}</span><button type="button" className={`save-button ${saved ? "saved" : ""}`} onClick={() => setSaved(toggleSaved(experience.id))} aria-pressed={saved} aria-label={`${saved ? "Unsave" : "Save"} ${experience.title}`}><Heart size={19} fill={saved ? "currentColor" : "none"} /></button></div><div className="card-content"><div className="card-location">{experience.destination}, {experience.country}</div><Link href={href}><h3>{experience.title}</h3></Link><div className="rating-row"><span className="rating-stars"><Star size={13} fill="currentColor" /> {experience.rating}</span><span className="review-count">({experience.reviews.toLocaleString()} sample reviews)</span><span className="dot-divider">·</span><span>{experience.duration}</span></div><div className="card-bottom"><p className="card-price"><span>From </span><strong>${experience.price}</strong><span> / person</span></p>{experience.freeCancellation && <span className="free-cancel"><Check size={13} /> Flexible</span>}</div></div></article>;
}
export function StatCard({ label, value, detail }: { label: string; value: string; detail: string; tone?: string }) { return <div className="stat-card"><span className="stat-label">{label}</span><strong>{value}</strong><span className="stat-detail">{detail}</span></div>; }
