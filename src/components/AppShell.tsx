"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Compass, MapPinned, Search, ShoppingBag, UserRound, Map } from "lucide-react";
import { useEffect, useState } from "react";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    const update = () => setCartCount(Number(window.localStorage.getItem("tb-cart-count") || 0));
    update();
    window.addEventListener("tb-cart-updated", update);
    return () => window.removeEventListener("tb-cart-updated", update);
  }, []);
  const primaryNav = [
    { label: "Explore", href: "/", icon: <Compass size={20} /> },
    { label: "Experiences", href: "/search", icon: <Search size={20} /> },
    { label: "Destinations", href: "/destinations", icon: <Map size={20} /> },
    { label: "Guides", href: "/guide", icon: <MapPinned size={20} /> },
    { label: "Trips", href: "/wishlist", icon: <CalendarDays size={20} /> },
  ];
  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
  const isPortalRoute = ["/supplier", "/advisor", "/partner", "/admin"].some((route) => pathname === route || pathname.startsWith(`${route}/`));
  return (
    <div className={`app-shell ${isPortalRoute ? "portal-app-shell" : ""}`}>
      <header className="site-header">
        <Link href="/" className="brand" aria-label="Travel Buddy home"><span className="brand-mark"><Compass size={17} strokeWidth={2.5} /></span><span>travel<span>buddy</span></span></Link>
        <nav className="desktop-nav" aria-label="Primary navigation">{primaryNav.map((item) => <Link key={item.href} className={isActive(item.href) ? "active" : ""} aria-current={isActive(item.href) ? "page" : undefined} href={item.href}>{item.label}</Link>)}</nav>
        <div className="header-actions">
          <Link href="/cart" className={`cart-button ${isActive("/cart") ? "active" : ""}`} aria-label={`Cart${cartCount > 0 ? `, ${cartCount} items` : ""}`} aria-current={isActive("/cart") ? "page" : undefined}><ShoppingBag size={18} /><span>Cart</span>{cartCount > 0 && <b>{cartCount}</b>}</Link>
          <Link href="/login" className={`account-button ${isActive("/login") ? "active" : ""}`} aria-label="Log in" aria-current={isActive("/login") ? "page" : undefined}><UserRound size={17} /><span>Log in</span></Link>
        </div>
      </header>
      <main>{children}</main>
      <nav className="mobile-bottom-nav" aria-label="Primary navigation">
        {[
          ...primaryNav.slice(0, 1),
          primaryNav[1],
          primaryNav[3],
          primaryNav[4],
          { label: "Cart", href: "/cart", icon: <ShoppingBag size={20} /> },
        ].map((item) => <Link key={item.href} href={item.href} className={isActive(item.href) ? "active" : ""} aria-current={isActive(item.href) ? "page" : undefined}>{item.icon}<span>{item.label}</span>{item.href === "/cart" && cartCount > 0 && <b className="mobile-cart-count">{cartCount}</b>}</Link>)}
      </nav>
      <footer className="site-footer"><div className="footer-main"><div><Link href="/" className="brand footer-brand"><span className="brand-mark"><Compass size={17} strokeWidth={2.5} /></span><span>travel<span>buddy</span></span></Link><p>Make every trip a story worth telling.</p></div><div><h4>Discover</h4><Link href="/search">Things to do</Link><Link href="/destinations">Top destinations</Link><Link href="/inspiration">Travel inspiration</Link></div><div><h4>Plan &amp; travel</h4><Link href="/wishlist">Your trips</Link><Link href="/guide">Local guides</Link><Link href="/support">Help center</Link><Link href="/supplier">List your experience</Link></div><div><h4>Need a hand?</h4><p className="muted">Get local help and make the most of your time away.</p><Link href="/guide">Find a local guide</Link><Link href="/support">Visit the help center</Link></div></div><div className="footer-bottom"><span>© 2026 Travel Buddy</span><span>English (US) · USD</span><span>Privacy · Terms · Accessibility</span></div></footer>
    </div>
  );
}

export function SearchBar({ compact = false }: { compact?: boolean }) {
  return <form className={`search-bar ${compact ? "compact" : ""}`} action="/search"><div className="search-field"><Search size={19} /><div><label>Where to?</label><input name="q" placeholder="City, attraction or experience" /></div></div><div className="search-field date-field"><CalendarDays size={18} /><div><label>When</label><input name="date" type="date" aria-label="Choose a date" /></div></div><button type="submit" className="button button-primary search-submit"><Search size={18} /><span>Search</span></button></form>;
}
