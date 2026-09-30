import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  Compass,
  LockKeyhole,
  MapPinned,
  Package,
  ShieldCheck,
  UserRound,
  Users,
} from "lucide-react";

const demoRoles = [
  { eyebrow: "For travelers", name: "Maya Chen", role: "Traveler account", description: "Discover experiences, save ideas and turn them into a bookable trip.", href: "/account", icon: <Compass size={20} />, tone: "orange", features: ["Explore the marketplace", "Plan and share trips", "Manage bookings and rewards"] },
  { eyebrow: "For travelers on the move", name: "Travel Buddy Now", role: "Local guide experience", description: "Find a nearby local, start a live session and see the guide handoff flow.", href: "/guide", icon: <MapPinned size={20} />, tone: "mint", features: ["Choose a live zone", "Match with a local guide", "Run a simulated session"] },
  { eyebrow: "For experience operators", name: "Ari Perera", role: "Supplier center", description: "Publish experiences and keep bookings, availability and performance moving.", href: "/supplier", icon: <Package size={20} />, tone: "sand", features: ["Manage experiences", "Review upcoming bookings", "Create a new product"] },
  { eyebrow: "For travel professionals", name: "Maya Chen", role: "Advisor portal", description: "Curate recommendations for clients and track bookings and commissions.", href: "/advisor", icon: <Users size={20} />, tone: "lavender", features: ["Book for a client", "Build a client shortlist", "Share tracked recommendations"] },
  { eyebrow: "For growth partners", name: "Wanderwise Media", role: "Partner portal", description: "Build referral links and widgets while following clicks, bookings and earnings.", href: "/partner", icon: <BarChart3 size={20} />, tone: "blue", features: ["Create affiliate links", "Track referral performance", "View commission activity"] },
  { eyebrow: "For platform operations", name: "Jordan Lee", role: "Admin console", description: "See the marketplace from the inside: products, suppliers, travelers and health.", href: "/admin", icon: <ShieldCheck size={20} />, tone: "ink", features: ["Review marketplace activity", "Monitor platform health", "Open the audit trail"] },
];

export default function LoginPage() {
  return (
    <div className="demo-login-page">
      <div className="demo-login-inner">
        <section className="demo-login-hero">
          <div className="demo-login-hero-copy">
            <div className="eyebrow">Travel Buddy · Product demo</div>
            <h1>Choose a view and step inside.</h1>
            <p>This is a guided demo workspace. Pick one role to see the part of Travel Buddy it is built for — no passwords, setup or extra accounts needed.</p>
            <div className="demo-login-note"><LockKeyhole size={15} /><span>All data is simulated for showcasing the product.</span></div>
          </div>
          <div className="demo-login-hero-mark" aria-hidden="true"><Compass size={62} strokeWidth={1.4} /></div>
        </section>

        <div className="demo-login-heading">
          <div><div className="eyebrow">Demo access</div><h2>Explore each side of the journey</h2></div>
          <span className="demo-login-count">{demoRoles.length} role views</span>
        </div>

        <section className="demo-role-grid" aria-label="Demo role logins">
          {demoRoles.map((demo) => (
            <article className={`demo-role-card demo-role-card-${demo.tone}`} key={demo.role}>
              <div className="demo-role-card-topline"><span className="demo-role-icon">{demo.icon}</span><span className="demo-role-eyebrow">{demo.eyebrow}</span></div>
              <h3>{demo.role}</h3><p>{demo.description}</p>
              <div className="demo-role-user"><UserRound size={14} /><span>Demo identity</span><strong>{demo.name}</strong></div>
              <ul className="demo-role-features">{demo.features.map((feature) => <li key={feature}><span>✓</span>{feature}</li>)}</ul>
              <Link className="button button-secondary demo-role-button" href={demo.href}>Login as {demo.role === "Local guide experience" ? "a local guide" : demo.role.replace(" portal", "").replace(" center", "").replace(" console", "").toLowerCase()}<ArrowRight size={15} /></Link>
            </article>
          ))}
        </section>

        <section className="demo-login-footer-card"><div className="demo-login-footer-icon"><CalendarDays size={18} /></div><div><strong>Want the full traveler flow?</strong><p>Start at the marketplace, save an experience, build a connected journey and continue to simulated checkout.</p></div><Link className="button button-primary" href="/">Open marketplace <ArrowRight size={15} /></Link></section>
        <p className="demo-login-standard-link">Have an account? <Link href="/login/standard">Use standard login</Link> · <Link href="/register">Create an account</Link></p>
      </div>
    </div>
  );
}
