import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Brand } from '@/components/AppShell';
import { phases } from '@/lib/phases';

export const metadata = { title: 'Understanding the phases | TravelBuddy' };

const details = [
  {
    summary: 'Discover experiences and try the complete individual booking flow.',
    features: [
      ['Discover & book', 'Explore destinations and packages, search by availability, see providers marked Live Now, choose a date, time and traveler count, and try cart, checkout and confirmation.'],
      ['Stay in touch', 'Contact a provider through Inbox, share an experience link, save favorite packages, and view Upcoming, Completed and Cancelled bookings.'],
      ['Find experiences nearby', 'Explore the shared demonstration map and list, filter experience categories, and preview package details.'],
    ],
    roles: [
      ['Traveler', 'Explore, Nearby, Bookings, Inbox, saved experiences and basic profile/settings.'],
      ['Service provider', 'Manage packages, schedules and bookings; toggle Live Now; respond through Inbox; maintain a business profile.'],
      ['Local guide', 'Set up a basic guide profile and settings.'],
      ['Administrator', 'Oversee accounts, providers, packages, bookings, featured content and marketplace activity.'],
    ],
  },
  {
    summary: 'Adds trip planning, traveler community and scheduled local guides.',
    features: [
      ['Plan a trip', 'Create day-based itineraries, add packages or a complete tour, reorder activities, track completion, set a trip start date, and keep transport notes and local guide options. Book individual packages from your plan.'],
      ['Connect with the community', 'Discover traveler and buddy profiles nearby, set profile visibility, post travel requests, and review or accept a scripted buddy package proposal. Share package cards in conversations.'],
      ['Meet scheduled guides', 'Browse local guide profiles and arrange a demonstration session ahead of time. Guides gain requests, scheduled sessions and availability tools.'],
      ['Reviews & collaboration', 'Review a completed demo experience, explore extended traveler profiles, and use provider collaboration and partnership tools.'],
    ],
    roles: [
      ['Traveler', 'Adds Trips, community profiles, travel requests, reviews, extended profile and scheduled guides.'],
      ['Service provider', 'Adds traveler reviews and collaboration tools.'],
      ['Local guide', 'Adds a guide dashboard, requests, scheduled sessions, availability, reviews and contextual buddy conversations.'],
      ['Administrator', 'Adds guide account, review, community content and partnership oversight.'],
    ],
  },
  {
    summary: 'Adds on-demand help, shareable trips and connected journey booking.',
    features: [
      ['Share & import trips with QR', 'Export a trip QR bundle, review an imported itinerary, select the activities to keep, and save an independently editable trip with its start date.'],
      ['Travel Buddy Now', 'Match with an available sample guide, start and end a simulated session, and ask questions with scripted replies. Guides gain on-demand availability and Inbox.'],
      ['Book a connected journey', 'Select multiple activities, add optional guide and transport estimates, review transport handoffs and departure times, and see one checkout total with separate costs.'],
      ['Carry your history', 'Export local history as JSON, review an imported copy, and save it as a separate device preview.'],
    ],
    roles: [
      ['Traveler', 'Adds QR import/export, Travel Buddy Now, live sessions, connected checkout, transport handoffs and portable history.'],
      ['Service provider', 'Adds connected booking summaries.'],
      ['Local guide', 'Adds on-demand availability, Inbox and simulated live session operation.'],
      ['Administrator', 'Adds connected journey and live session oversight.'],
    ],
  },
];

export default function PhaseGuidePage() {
  return <div className="phase-guide">
    <header className="phase-guide-top"><Brand /><Link className="back-link" href="/login"><ArrowLeft size={16} aria-hidden="true" /> Back to sign in</Link></header>
    <div className="phase-guide-intro"><h1>One TravelBuddy.<br />Three ways to explore.</h1><p>Start with the marketplace, add a community, then explore the complete connected journey. Each phase includes everything from the phases before it.</p></div>
    <nav className="phase-guide-jumps" aria-label="Jump to a phase">{phases.map(p => <a key={p.id} href={`#phase-${p.id}`}><strong>Phase {p.id}</strong><span>{p.name}</span><ArrowRight size={18} aria-hidden="true" /></a>)}</nav>
    {phases.map((phase, index) => <section className="phase-guide-section" id={`phase-${phase.id}`} key={phase.id} aria-labelledby={`phase-heading-${phase.id}`}>
      <div className="phase-guide-heading"><span className="phase-guide-number" aria-hidden="true">{phase.id}</span><div><h2 id={`phase-heading-${phase.id}`}>Phase {phase.id} · {phase.name}</h2><p>{details[index].summary}</p><span className="phase-guide-includes">{index === 0 ? 'The foundation' : `Everything in Phase ${index}, plus these additions`}</span></div></div>
      <dl className="phase-guide-features">{details[index].features.map(([title, description]) => <div key={title}><dt>{title}</dt><dd>{description}</dd></div>)}</dl>
      <details className="phase-guide-roles"><summary>What each role can do in Phase {phase.id}</summary><dl>{details[index].roles.map(([role, description]) => <div key={role}><dt>{role}</dt><dd>{description}</dd></div>)}</dl></details>
    </section>)}
    <footer className="phase-guide-footer"><h2>Ready to choose your phase?</h2><p>The phase selector works with any of the four demo accounts. Your phase selection stays with you when you return to sign in.</p><Link href="/login" className="button button-primary">Choose a phase <ArrowRight size={17} aria-hidden="true" /></Link><p className="phase-guide-demo">This is a frontend demonstration. Messages, bookings, guide sessions and transport are simulated. Data is stored in this browser; no real payment or service is arranged. The Nearby map uses illustrative locations.</p></footer>
  </div>;
}
