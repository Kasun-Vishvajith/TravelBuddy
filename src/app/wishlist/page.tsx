import Link from "next/link";
import { Heart } from "lucide-react";
import { ExperienceCard } from "@/components/ExperienceCard";
import { experiences } from "@/lib/catalog";

export default function WishlistPage() { return <div className="account-page"><div className="account-inner"><div className="account-head"><div><div className="eyebrow">Maya’s collections</div><h1>Wishlist</h1><p className="muted">Keep the possibilities close.</p></div><button className="button button-secondary">+ Create a list</button></div><div className="portal-card"><div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 23 }}><Heart size={18} color="var(--orange)" fill="var(--orange)" /><strong>My wishlist</strong><span className="muted" style={{ fontSize: 12 }}> · 6 experiences</span></div><div className="experience-grid">{experiences.slice(0, 6).map((experience) => <ExperienceCard key={experience.id} experience={experience} />)}</div></div><Link className="button button-ghost" href="/">← Back to exploring</Link></div></div>; }
