import type { Experience } from "./catalog";
import { travelerBookings } from './demo';
export const SAVED_KEY = "tb-saved-experiences";
export const BOOKINGS_KEY = "tb-bookings";
export type CartItem = Experience & { selectedOption: string; selectedDate: string; selectedTime: string; travelers: number; journey?: { recommendation?: { price: number; title: string } | null; transfers: { title: string; option: { price: number; name: string } }[]; guidePrice: number } };
export type Booking = { id: string; title: string; image: string; experienceIds: string[]; date: string; time: string; travelers: number; total: number; payLater: boolean; meetingPoint: string; createdAt: string; status?: string; journeySummary?: string };
export function readLocal<T>(key: string, fallback: T): T { if (typeof window === "undefined") return fallback; try { const raw = window.localStorage.getItem(key); return raw ? JSON.parse(raw) as T : fallback; } catch { return fallback; } }
export function writeLocal(key: string, value: unknown, event = "tb-traveler-updated") { window.localStorage.setItem(key, JSON.stringify(value)); window.dispatchEvent(new Event(event)); }
export function readSaved(): string[] { const saved = readLocal<unknown>(SAVED_KEY, []); return Array.isArray(saved) ? saved.filter((id): id is string => typeof id === "string") : []; }
export function toggleSaved(id: string): boolean { const saved = readSaved(); const next = saved.includes(id) ? saved.filter((item) => item !== id) : [...saved, id]; writeLocal(SAVED_KEY, next); return next.includes(id); }
export function readBookings(): Booking[] { const bookings = readLocal<unknown>(BOOKINGS_KEY, []); const demo=travelerBookings();const local = Array.isArray(bookings) ? (bookings as Booking[]).map(b=>({...b,status:demo.find(d=>d.id===b.id)?.status||b.status})) : []; return [...local,...travelerBookings().filter(b=>!local.some(l=>l.id===b.id))]; }
export function clearCart() { window.localStorage.removeItem("tb-cart-experience"); window.localStorage.removeItem("tb-cart-count"); window.dispatchEvent(new Event("tb-cart-updated")); }
