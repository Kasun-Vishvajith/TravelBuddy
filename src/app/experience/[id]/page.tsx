"use client";

import Link from "next/link";
import { CalendarDays, CarFront, Check, Clock3, Heart, MapPin, MessageCircle, ShieldCheck, Star, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { getExperience, experiences, guideProfiles, yalaJourneyRecommendations, yalaJourneyTransferLegs } from "@/lib/catalog";
import { ExperienceCard } from "@/components/ExperienceCard";
import { GuideProfileCard } from "@/components/GuideProfileCard";
import { ConnectedJourneyBuilder, type ConnectedJourney } from "@/components/ConnectedJourneyBuilder";
import { SaveToJourneyButton } from "@/components/JourneyPlanner";
import { readSaved, toggleSaved } from "@/lib/traveler";
import { JOURNEY_CHECKOUT_KEY } from "@/lib/journey";
import { Photo } from "@/components/Photo";

type BookingStep = "details" | "transfer-choice" | "journey";
const LAST_TRAVELERS_KEY = "tb-last-travelers";

export default function ExperiencePage({ params, searchParams }: { params: { id: string }; searchParams: { date?: string } }) {
  const experience = getExperience(params.id) || experiences[0];
  const [option, setOption] = useState(0);
  const [date, setDate] = useState("2026-10-18");
  const [time, setTime] = useState(experience.options[0].times[0]);
  const [travelers, setTravelers] = useState(2);
  const [saved, setSaved] = useState(false);
  const [usingNow, setUsingNow] = useState(false);
  const [bookingStep, setBookingStep] = useState<BookingStep>("details");
  const [ready, setReady] = useState(false);
  const selected = experience.options[option];
  const localGuides = guideProfiles.filter((guide) => guide.destination === experience.destination).slice(0, 2);
  const isYala = experience.id === "yala-safari";

  useEffect(() => {
    setReady(true);
    if (searchParams.date && /^\d{4}-\d{2}-\d{2}$/.test(searchParams.date)) setDate(searchParams.date);
    setSaved(readSaved().includes(experience.id));
    const stored = Number(window.localStorage.getItem(LAST_TRAVELERS_KEY));
    if (stored >= 1 && stored <= 6) setTravelers(stored);
  }, []);

  function rememberTravelers(value: number) {
    setTravelers(value);
    window.localStorage.setItem(LAST_TRAVELERS_KEY, String(value));
  }

  function todayValue() {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${now.getFullYear()}-${month}-${day}`;
  }

  function nearestAvailableTime(times: string[]) {
    const now = new Date();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    const available = times
      .map((value) => {
        const [hours, minutes] = value.split(":").map(Number);
        return { value, minutes: hours * 60 + minutes };
      })
      .sort((left, right) => left.minutes - right.minutes);
    return available.find((item) => item.minutes >= nowMinutes)?.value || available[0]?.value || times[0];
  }

  function chooseNow() {
    setDate(todayValue());
    setTime(nearestAvailableTime(selected.times));
    setUsingNow(true);
  }

  function addToCart(journey?: ConnectedJourney) {
    window.localStorage.setItem(LAST_TRAVELERS_KEY, String(travelers));
    const cartItem = { ...experience, price: selected.price, selectedOption: selected.name, selectedDate: date, selectedTime: time, travelers, journey, journeyTotal: journey?.total };
    window.localStorage.removeItem(JOURNEY_CHECKOUT_KEY);
    window.localStorage.setItem("tb-cart-count", "1");
    window.localStorage.setItem("tb-cart-experience", JSON.stringify(cartItem));
    window.dispatchEvent(new Event("tb-cart-updated"));
    window.location.href = "/cart";
  }

  function openTransferChoice() {
    if (isYala) setBookingStep("transfer-choice");
    else addToCart();
  }

  function arrangeTransportOnly() {
    const transfers = yalaJourneyTransferLegs.map((leg) => ({ legId: leg.id, title: leg.title, option: leg.options[0] }));
    const transportOnly: ConnectedJourney = { anchorTitle: experience.title, date, time, travelers, recommendation: null, transfers, guide: false, guidePrice: 0, total: selected.price * travelers + transfers.reduce((sum, item) => sum + item.option.price, 0) };
    addToCart(transportOnly);
  }

  if (!getExperience(params.id)) return <div className="empty-state"><h1>We couldn’t find that experience.</h1><Link className="button button-primary" href="/search">Explore experiences</Link></div>;
  return (
    <div className="product-page">
      <div className="product-crumb"><Link href="/">Home</Link> / <Link href="/search">{experience.destination}</Link> / {experience.title}</div>
      <div className="product-main">
        <div className="product-title-block">
          <div className="card-location"><MapPin size={14} /> {experience.destination}, {experience.country} · {experience.category} · {experience.duration}</div>
          <h1>{experience.title}</h1>
          <div className="product-meta"><span className="rating-stars"><Star size={15} fill="currentColor" /> {experience.rating}</span><span>{experience.reviews.toLocaleString()} sample reviews</span><span>·</span><span>{experience.supplier}</span><button className="button button-ghost" aria-pressed={saved} onClick={() => setSaved(toggleSaved(experience.id))}><Heart size={16} fill={saved ? "currentColor" : "none"} /> {saved ? "Saved" : "Save"}</button><SaveToJourneyButton experienceId={experience.id} /><span className="demo-badge">Sample experience</span></div>
        </div>
        <div className={`product-gallery gallery-count-${experience.gallery.length}`}>{experience.gallery.map((photo,index) => <Photo key={`${photo}-${index}`} className={index === 0 ? "gallery-main" : ""} src={photo} alt={index === 0 ? experience.title : `${experience.destination} experience photograph ${index + 1}`} priority={index === 0} />)}</div>
        <div className="product-layout">
          <div className="product-content">
            <section><h2>Experience overview</h2><p>{experience.description}</p><ul className="feature-list">{experience.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></section>
            <section><h2>What to expect</h2><div className="itinerary">{experience.itinerary.map((item) => <div className="itinerary-item" key={item.title}><div className="itinerary-time">{item.time}</div><div><strong>{item.title}</strong><p>{item.detail}</p></div></div>)}</div></section>
            {localGuides.length > 0 && <section className="experience-guide-section"><div className="product-section-heading"><div><h2>A local perspective on {experience.destination}.</h2><p>Explore sample guide profiles and plan a flexible demo session around your interests.</p></div></div><div className="experience-guide-list">{localGuides.map((guide) => <GuideProfileCard key={guide.id} guide={guide} compact />)}</div></section>}
            <section><h2>What’s included</h2><div className="feature-list"><div><div className="eyebrow" style={{ marginBottom: 6 }}>Included</div>{experience.included.map((item) => <p key={item} style={{ margin: "7px 0" }}>✓ {item}</p>)}</div><div><div className="eyebrow" style={{ marginBottom: 6 }}>Not included</div>{experience.notIncluded.map((item) => <p key={item} style={{ margin: "7px 0" }}>× {item}</p>)}</div></div></section>
            <section><h2>Meeting point</h2><p style={{ display: "flex", gap: 8, alignItems: "center" }}><MapPin size={18} color="var(--orange)" /> {experience.meetingPoint}</p><a className="map-external" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(experience.meetingPoint)}`} target="_blank" rel="noreferrer"><MapPin size={17} /> Open meeting point in maps</a></section>
            <section><h2>Cancellation & sample reviews</h2><p>{experience.freeCancellation ? "Sample policy: cancel up to 24 hours before departure for a full refund." : "This sample experience is non-refundable."}</p><div className="review-summary"><div><div className="review-score">{experience.rating}</div><span className="rating-stars"><Star size={16} fill="currentColor" /> Sample traveler rating</span></div><p>{experience.reviews} illustrative reviews. Ratings and review counts are sample data for exploring this prototype.</p></div></section>
          </div>
          <aside id="booking-options" className={`booking-card ${bookingStep !== "details" ? "booking-card-journey" : ""}`}>
            {bookingStep === "details" && <>
              <div><span className="price-big">${selected.price}</span><span> per adult</span>{experience.originalPrice && experience.originalPrice > selected.price && <span className="strike">${experience.originalPrice}</span>}</div>
              <div className="rating-row" style={{ marginTop: 4 }}><span className="rating-stars"><Star size={14} fill="currentColor" /> {experience.rating}</span><span>({experience.reviews})</span></div>
              <hr />
              <div className="booking-label-row"><label htmlFor="experience-date" className="booking-label"><CalendarDays size={13} /> Date</label><button type="button" className={`booking-now ${usingNow ? "active" : ""}`} onClick={chooseNow}><Clock3 size={12} /> Today</button></div>
              <input id="experience-date" className="booking-select" type="date" value={date} onChange={(event) => { setDate(event.target.value); setUsingNow(false); }} />
              {usingNow && <span className="booking-now-note">Today · suggested sample start time</span>}
              <label htmlFor="experience-time" className="booking-label"><Clock3 size={13} /> Start time</label>
              <select id="experience-time" className="booking-select" value={time} onChange={(event) => { setTime(event.target.value); setUsingNow(false); }}>{selected.times.map((startTime) => <option key={startTime}>{startTime}</option>)}</select>
              <label htmlFor="experience-travelers" className="booking-label"><Users size={13} /> Travelers</label>
              <select id="experience-travelers" className="booking-select" value={travelers} onChange={(event) => rememberTravelers(Number(event.target.value))}>{[1, 2, 3, 4, 5, 6].map((number) => <option key={number} value={number}>{number} {number === 1 ? "traveler" : "travelers"}</option>)}</select>
              <label htmlFor="experience-option" className="booking-label">Choose an option</label>
              <select id="experience-option" className="booking-select" value={option} onChange={(event) => { setOption(Number(event.target.value)); setTime(experience.options[Number(event.target.value)].times[0]); setUsingNow(false); }}>{experience.options.map((item, index) => <option key={item.name} value={index}>{item.name} · ${item.price}</option>)}</select>
              <button className="button button-primary button-wide" disabled={!date || !ready} onClick={openTransferChoice}>{!ready ? "Loading options…" : isYala ? "Continue to trip options" : "Add to cart"}</button>
              <div className="booking-perks">{experience.freeCancellation && <div><Check size={14} /> Sample free cancellation policy</div>}{experience.payLater && <div><ShieldCheck size={14} /> Demo reserve now, pay later</div>}<div><MessageCircle size={14} /> Demo booking · No real charge</div></div>
            </>}
            {bookingStep === "transfer-choice" && <div className="transfer-choice"><button className="journey-back" onClick={() => setBookingStep("details")}><CalendarDays size={14} /> Edit date and travelers</button><div className="eyebrow">Before you book</div><h2>How will you get to Yala?</h2><p>We can keep your safari booking simple or connect it with transport and something else nearby.</p><div className="transfer-choice-list"><button className="transfer-choice-card" onClick={() => addToCart()}><span className="choice-icon"><Check size={17} /></span><span><strong>I already have transport</strong><small>Book the Yala safari only.</small></span></button><button className="transfer-choice-card" onClick={arrangeTransportOnly}><span className="choice-icon"><CarFront size={17} /></span><span><strong>Arrange transport</strong><small>Simulate a ride from Galle and after the safari.</small></span></button><button className="transfer-choice-card featured" onClick={() => setBookingStep("journey")}><span className="choice-icon"><MapPin size={17} /></span><span><strong>Recommend a connected journey</strong><small>See several nearby experiences and choose each leg.</small></span></button></div><button className="button button-ghost" onClick={() => addToCart()}>Skip and book safari only <span aria-hidden="true">→</span></button></div>}
            {bookingStep === "journey" && <ConnectedJourneyBuilder anchorTitle={experience.title} anchorPrice={selected.price} date={date} time={time} travelers={travelers} recommendations={yalaJourneyRecommendations} transferLegs={yalaJourneyTransferLegs} onBack={() => setBookingStep("transfer-choice")} onContinue={(journey) => addToCart(journey)} />}
          </aside>
        </div>
        <section className="section" style={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 0 }}><div className="section-heading"><div><div className="eyebrow">Keep exploring</div><h2>More like this</h2></div></div><div className="experience-grid">{experiences.filter((item) => item.id !== experience.id).slice(0, 4).map((item) => <ExperienceCard key={item.id} experience={item} />)}</div></section>
      </div>
      <div className="mobile-booking-action"><div><strong>${selected.price}</strong>per person</div><a className="button button-primary" href="#booking-options">Choose booking options</a></div>
    </div>
  );
}
