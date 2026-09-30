"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, ChevronDown, Compass, MapPinned, Search, ShoppingBag, UserRound } from "lucide-react";
import { useEffect, useState } from "react";

const portals = [
  { label: "Traveler marketplace", href: "/" },
  { label: "Traveler account", href: "/account" },
  { label: "Supplier center", href: "/supplier" },
  { label: "Advisor portal", href: "/advisor" },
  { label: "Partner portal", href: "/partner" },
  { label: "Admin console", href: "/admin" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    const update = () => setCartCount(Number(window.localStorage.getItem("tb-cart-count") || 0));
    update();
    window.addEventListener("tb-cart-updated", update);
    return () => window.removeEventListener("tb-cart-updated", update);
  }, []);
  const mobileNav = [
    { label: "Explore", href: "/", icon: <Compass size={20} /> },
    { label: "Discover", href: "/search", icon: <Search size={20} /> },
    { label: "Guides", href: "/guide", icon: <MapPinned size={20} /> },
    { label: "Trips", href: "/wishlist", icon: <CalendarDays size={20} /> },
    { label: "Account", href: "/account", icon: <UserRound size={20} /> },
  ];
  const isPortalRoute = ["/supplier", "/advisor", "/partner", "/admin"].some((route) => pathname === route || pathname.startsWith(`${route}/`));
  return (
    <div className={`app-shell ${isPortalRoute ? "portal-app-shell" : ""}`}>
      <header className="site-header">
        <Link href="/" className="brand" aria-label="Travel Buddy home"><span className="brand-mark"><Compass size={17} strokeWidth={2.5} /></span><span>travel<span>buddy</span></span></Link>
        <nav className="desktop-nav"><Link className={pathname === "/" ? "active" : ""} href="/">Explore</Link><Link className={pathname === "/search" ? "active" : ""} href="/search">Discover</Link><Link className={pathname === "/wishlist" ? "active" : ""} href="/wishlist">Trips</Link><Link className={pathname === "/guide" ? "active" : ""} href="/guide">Guides</Link></nav>
        <div className="header-actions">
          <Link href="/cart" className="cart-button"><ShoppingBag size={18} /><span>Cart</span>{cartCount > 0 && <b>{cartCount}</b>}</Link>
          <details className="portal-switcher"><summary className="account-button"><UserRound size={17} /><span>Hi, Maya</span><ChevronDown size={14} /></summary><div className="portal-menu"><span className="portal-menu-label">Demo workspace</span>{portals.map((portal) => <Link key={portal.href} href={portal.href}>{portal.label}</Link>)}</div></details>
        </div>
      </header>
      <main>{children}</main>
      <nav className="mobile-bottom-nav" aria-label="Primary navigation">
        {mobileNav.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname === item.href;
          return <Link key={item.href} href={item.href} className={active ? "active" : ""}>{item.icon}<span>{item.label}</span></Link>;
        })}
      </nav>
      <footer className="site-footer"><div className="footer-main"><div><Link href="/" className="brand footer-brand"><span className="brand-mark"><Compass size={17} strokeWidth={2.5} /></span><span>travel<span>buddy</span></span></Link><p>Make every trip a story worth telling.</p></div><div><h4>Discover</h4><Link href="/search">Things to do</Link><Link href="/destinations">Top destinations</Link><Link href="/inspiration">Travel inspiration</Link></div><div><h4>Travel Buddy</h4><Link href="/about">About us</Link><Link href="/support">Help center</Link><Link href="/supplier">List your experience</Link></div><div><h4>Get the app</h4><p className="muted">Your next adventure is always within reach.</p><div className="app-badges"><span> App Store</span><span>▶ Google Play</span></div></div></div><div className="footer-bottom"><span>© 2026 Travel Buddy</span><span>English (US) · USD</span><span>Privacy · Terms · Accessibility</span></div></footer>
    </div>
  );
}

export function SearchBar({ compact = false }: { compact?: boolean }) {
  return <form className={`search-bar ${compact ? "compact" : ""}`} action="/search"><div className="search-field"><Search size={19} /><div><label>Where to?</label><input name="q" placeholder="City, attraction or experience" /></div></div><div className="search-field date-field"><CalendarDays size={18} /><div><label>When</label><input name="date" type="date" aria-label="Choose a date" /></div></div><button type="submit" className="button button-primary search-submit"><Search size={18} /><span>Search</span></button></form>;
}
