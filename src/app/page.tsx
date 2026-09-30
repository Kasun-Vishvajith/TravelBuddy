import Link from "next/link";
import { ArrowRight, CalendarDays, Check, MapPinned, ShieldCheck } from "lucide-react";
import { destinations, experiences } from "@/lib/catalog";
import { ExperienceCard } from "@/components/ExperienceCard";
import { SearchBar } from "@/components/AppShell";

export default function HomePage() {
  return <>
    <section className="hero"><div className="hero-inner"><div className="hero-copy"><div className="eyebrow">Travel Buddy</div><h1>Find your next story.</h1><p>One calm place to discover experiences, save what matters and shape it into a trip.</p><div className="hero-search"><SearchBar /></div><div className="hero-guidance"><MapPinned size={16} /><span>Search by place, date or the feeling you want.</span></div></div></div></section>

    <section className="section"><div className="section-inner"><div className="section-heading"><div><div className="eyebrow">Start with a place</div><h2>Where do you want to feel something new?</h2></div><Link className="section-link" href="/destinations">Browse destinations <ArrowRight size={14} /></Link></div><div className="destination-grid">{destinations.slice(0, 4).map((destination) => <Link href={`/search?q=${destination.name}`} className="destination-card" key={destination.name}><img src={destination.image} alt={destination.name} /><div className="destination-info"><h3>{destination.name}</h3><span>{destination.count} experiences · {destination.country}</span></div></Link>)}</div></div></section>

    <section className="section section-muted"><div className="section-inner"><div className="section-heading"><div><div className="eyebrow">Curated for curious travelers</div><h2>Worth making room for.</h2><p>Real places, local people and small moments that stay with you.</p></div><Link className="section-link" href="/search">See every experience <ArrowRight size={14} /></Link></div><div className="experience-grid">{experiences.slice(0, 4).map((experience) => <ExperienceCard key={experience.id} experience={experience} />)}</div></div></section>

    <section className="section"><div className="section-inner"><div className="home-plan-card"><div className="home-plan-copy"><div className="eyebrow">Your trip, in one place</div><h2>Save ideas now. Shape the days later.</h2><p>Trips keeps your saved experiences, shared QR journeys and booking handoffs together without making you choose a path twice.</p><Link className="button button-primary" href="/wishlist">Open Trips <ArrowRight size={16} /></Link></div><div className="home-plan-steps"><div className="home-plan-step"><span><Check size={15} /></span><div><strong>Save</strong><small>Keep one experience or many.</small></div></div><div className="home-plan-step"><span><CalendarDays size={15} /></span><div><strong>Shape</strong><small>Arrange your days in order.</small></div></div><div className="home-plan-step"><span><ShieldCheck size={15} /></span><div><strong>Go</strong><small>Book the plan when it feels right.</small></div></div></div></div></div></section>
  </>;
}
