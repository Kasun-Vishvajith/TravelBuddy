import { getDemo, getSession, toExperience } from './demo';
import { readLocal, writeLocal } from './traveler';
export function demoDate() { return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Colombo', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()); }
export function liveOwner(owner: string) { return readLocal<Record<string, boolean>>('tb-provider-live', { 'provider-demo': true, 'provider-sample': true })[owner] ?? (owner.startsWith('guide-') && getDemo().accounts.some(a=>a.id===owner&&a.seeded)); }
export function setLive(owner: string, value: boolean) { writeLocal('tb-provider-live', { ...readLocal('tb-provider-live', { 'provider-demo': true, 'provider-sample': true }), [owner]: value }, 'tb-demo-updated'); }
export function slotsFor(id: string, date: string, times: string[], participants = 1) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return [];
  const data = getDemo(); const listing = data.listings.find(l => l.id === id);
  if (!listing || listing.status !== 'Active') return [];
  const schedule = data.availability.find(a => a.owner === listing.owner && a.date === date);
  if (schedule && (!schedule.available || schedule.capacity < 1)) return [];
  // Unconfigured dates use a consistent fixture schedule; Sundays are unavailable.
  if (!schedule && new Date(date + 'T12:00:00').getDay() === 0) return [];
  const current = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Colombo', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date());
  const booked = data.bookings.filter(b => b.experienceId === id && b.date === date && !['Cancelled','Completed'].includes(b.status));
  return [...times].sort().filter(t => (!schedule || t >= schedule.start && t <= schedule.end) && (date > demoDate() || date === demoDate() && t > current) && booked.filter(b => b.time === t).reduce((n,b) => n + b.participants,0) + participants <= (schedule?.capacity || listing.capacity));
}
export function nextSlot(id: string, times: string[]) {
  const start = demoDate();
  for (let i = 0; i < 60; i++) { const day = new Date(start + 'T12:00:00Z'); day.setUTCDate(day.getUTCDate() + i); const date = day.toISOString().slice(0,10); const time = slotsFor(id,date,times)[0]; if (time) return { date, time }; }
  return { date: start, time: '' };
}
export function liveExperiences() { return getDemo().listings.filter(l => l.status === 'Active' && liveOwner(l.owner)).map(toExperience); }
export type Message = { id: string; sender: string; text: string; experience?: string; at: string };
export type Conversation = { id: string; traveler: string; peer: string; experience: string; messages: Message[] };
export function conversations() { return readLocal<Conversation[]>('tb-conversations', []); }
export function startConversation(experience: string, peer?: string) {
  const account = getSession(); if (!account) return null;
  const provider = peer || getDemo().listings.find(l => l.id === experience)?.owner || 'provider-demo';
  const rows = conversations(); const existing = rows.find(c => c.traveler === account.id && c.peer === provider && c.experience === experience);
  if (existing) return existing;
  const value: Conversation = { id: crypto.randomUUID(), traveler: account.id, peer: provider, experience, messages: [{ id: crypto.randomUUID(), sender: 'sample', text: 'Welcome to this demonstration conversation. Ask about the meeting point, availability, or the experience.', at: new Date().toISOString() }] };
  writeLocal('tb-conversations',[value,...rows]); return value;
}
export type TravelRequest = { id: string; owner: string; destination: string; dates: string; preference: string; message: string; participants: string; visibility: string; response?: 'accepted' | 'ignored' };
export function requests() { return readLocal<TravelRequest[]>('tb-community-requests', []); }
export type LocalReview = { id: string; owner: string; experience: string; rating: number; text: string };
export function reviews() { return readLocal<LocalReview[]>('tb-local-reviews', []); }
