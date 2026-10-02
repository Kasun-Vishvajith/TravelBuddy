import { experiences, guideProfiles, type Experience } from './catalog';
import { readLocal, writeLocal, type Booking } from './traveler';
import { createDemoJourneyPlan, JOURNEY_PLANS_KEY } from './journey';
export type Role = 'traveler' | 'provider' | 'guide' | 'admin';
export type DemoAccount = {
    id: string;
    role: Role;
    name: string;
    email: string;
    createdAt: string;
    seeded: boolean;
    status: string;
    review: string;
    details: Record<string, string>;
};
export type Listing = {
    id: string;
    owner: string;
    title: string;
    destination: string;
    category: string;
    price: number;
    image: string;
    description: string;
    itinerary: string;
    capacity: number;
    date: string;
    time: string;
    status: string;
    review: string;
};
export type DemoBooking = {
    id: string;
    experienceId: string;
    traveler: string;
    travelerId: string;
    date: string;
    time: string;
    participants: number;
    amount: number;
    meeting: string;
    status: string;
};
export type GuideSession = {
    id: string;
    guideId: string;
    traveler: string;
    date: string;
    time: string;
    duration: number;
    language: string;
    zone: string;
    category: string;
    question: string;
    status: string;
};
export type Availability = {
    owner: string;
    date: string;
    available: boolean;
    start: string;
    end: string;
    capacity: number;
    area: string;
};
export type Activity = {
    id: string;
    at: string;
    actor: string;
    action: string;
    item: string;
};
export type DemoData = {
    accounts: DemoAccount[];
    listings: Listing[];
    bookings: DemoBooking[];
    sessions: GuideSession[];
    availability: Availability[];
    activity: Activity[];
    content: {
        id: string;
        active: boolean;
    }[];
};
export const DEMO_KEY = 'tb-role-demo-v1';
export const SESSION_KEY = 'tb-demo-session';
const travelerKeys = ['tb-journey-plans', 'tb-checkout-plan', 'tb-bookings', 'tb-saved-experiences', 'tb-cart-experience', 'tb-cart-count'];
function switchTraveler(account: DemoAccount | null) {
    const previous = window.localStorage.getItem('tb-traveler-owner') || 'guest';
    const next = account?.role === 'traveler' ? account.id : 'guest';
    if (previous === next)
        return;
    const cache = readLocal<Record<string, Record<string, string>>>('tb-traveler-storage', {});
    cache[previous] = {};
    travelerKeys.forEach(k => { const raw = window.localStorage.getItem(k); if (raw !== null)
        cache[previous][k] = raw; window.localStorage.removeItem(k); });
    const saved = cache[next] || (next === 'traveler-demo' ? cache.guest : undefined) || {};
    Object.entries(saved).forEach(([k, v]) => window.localStorage.setItem(k, v));
    if (account?.role === 'traveler' && !account.seeded && !cache[next]) {
        window.localStorage.setItem('tb-journey-plans', '[]');
        window.localStorage.setItem('tb-bookings', '[]');
        window.localStorage.setItem('tb-saved-experiences', '[]');
    }
    writeLocal('tb-traveler-storage', cache);
    window.localStorage.setItem('tb-traveler-owner', next);
    window.dispatchEvent(new Event('tb-cart-updated'));
    window.dispatchEvent(new Event('tb-traveler-updated'));
    window.dispatchEvent(new Event('tb-journey-plans-updated'));
}
export const roleNames: Record<Role, string> = { traveler: 'Traveler', provider: 'Service Provider', guide: 'Local Guide', admin: 'Administrator' };
export const roleHome: Record<Role, string> = { traveler: '/dashboard', provider: '/supplier', guide: '/guide-workspace', admin: '/admin' };
export const predefined: DemoAccount[] = [
    { id: 'traveler-demo', role: 'traveler', name: 'Alex Morgan', email: 'traveler@travelbuddy.demo', createdAt: '2026-10-01', seeded: true, status: 'Active', review: 'Approved', details: { country: 'Sri Lanka', interests: 'Food, culture' } },
    { id: 'provider-demo', role: 'provider', name: 'Ceylon Compass', email: 'provider@travelbuddy.demo', createdAt: '2026-10-01', seeded: true, status: 'Active', review: 'Approved', details: { contact: 'Ari Perera', country: 'Sri Lanka', location: 'Colombo', destination: 'Colombo', category: 'Tours', description: 'Thoughtful small-group experiences across Sri Lanka.' } },
    { id: 'guide-demo', role: 'guide', name: 'Nadeesha Perera', email: 'guide@travelbuddy.demo', createdAt: '2026-10-01', seeded: true, status: 'Active', review: 'Approved', details: { country: 'Sri Lanka', location: 'Galle Fort', languages: 'English, Sinhala', specialties: 'History, Food walks, Architecture', biography: guideProfiles[0].bio, duration: '2 hours', meeting: 'Fort entrance', image: guideProfiles[0].image } },
    { id: 'admin-demo', role: 'admin', name: 'Sam Fernando', email: 'admin@travelbuddy.demo', createdAt: '2026-10-01', seeded: true, status: 'Active', review: 'Approved', details: {} }
];
export function seedData(): DemoData {
    const sampleAccounts: DemoAccount[] = [{ id: 'provider-sample', role: 'provider', name: 'World Local Experiences', email: 'world@travelbuddy.demo', createdAt: '2026-09-20', seeded: true, status: 'Active', review: 'Pending', details: { contact: 'Taylor Lane', location: 'Ubud, Kyoto, Amalfi, New York', description: 'Sample international experience collection.' } }, { id: 'traveler-sample', role: 'traveler', name: 'Maya Chen', email: 'maya@travelbuddy.demo', createdAt: '2026-09-21', seeded: true, status: 'Active', review: 'Approved', details: { country: 'Singapore' } }, { id: 'traveler-sample-2', role: 'traveler', name: 'Liam Reed', email: 'liam@travelbuddy.demo', createdAt: '2026-09-22', seeded: true, status: 'Active', review: 'Approved', details: { country: 'Ireland' } }, ...guideProfiles.slice(1).map(g => ({ id: `guide-${g.id}`, role: 'guide' as Role, name: g.name, email: `${g.id}@travelbuddy.demo`, createdAt: '2026-09-23', seeded: true, status: 'Active', review: 'Approved', details: { location: g.zone, languages: g.languages.join(', '), specialties: g.specialties.join(', '), biography: g.bio, image: g.image } }))];
    return { accounts: [...predefined, ...sampleAccounts].map(a => ({ ...a, details: { ...a.details } })), listings: experiences.map((e, i) => ({ id: e.id, owner: i < 3 ? 'provider-demo' : 'provider-sample', title: e.title, destination: e.destination, category: e.category, price: e.price, image: e.image, description: e.description, itinerary: e.itinerary.map(s => `${s.time} — ${s.title}`).join('\n'), capacity: 12, date: '2026-10-18', time: e.options[0].times[0], status: 'Active', review: i === 3 ? 'Pending' : 'Approved' })),
        bookings: [{ id: 'TB-DEMO-101', experienceId: 'colombo-food', traveler: 'Alex Morgan', travelerId: 'traveler-demo', date: '2026-10-18', time: '17:00', participants: 2, amount: 84, meeting: 'Colombo Fort Railway Station', status: 'Confirmed' }, { id: 'TB-DEMO-102', experienceId: 'sigiriya-dawn', traveler: 'Maya Chen', travelerId: 'traveler-sample', date: '2026-10-19', time: '04:30', participants: 4, amount: 272, meeting: 'Hotel lobby', status: 'Pending' }, { id: 'TB-DEMO-103', experienceId: 'yala-safari', traveler: 'Liam Reed', travelerId: 'traveler-sample-2', date: '2026-09-28', time: '05:00', participants: 2, amount: 148, meeting: 'Tissamaharama hotel lobby', status: 'Completed' }],
        sessions: [{ id: 'GS-101', guideId: 'guide-demo', traveler: 'Maya Chen', date: '2026-10-18', time: '09:00', duration: 2, language: 'English', zone: 'Galle Fort', category: 'History walk', question: 'Could we visit a quiet courtyard?', status: 'Accepted' }, { id: 'GS-102', guideId: 'guide-demo', traveler: 'Liam Reed', date: '2026-10-20', time: '15:00', duration: 3, language: 'English', zone: 'Galle Fort', category: 'Food walk', question: 'Interested in local family recipes.', status: 'Accepted' }, { id: 'GR-103', guideId: 'guide-demo', traveler: 'Alex Morgan', date: '2026-10-22', time: '10:00', duration: 2, language: 'English', zone: 'Fort entrance', category: 'Photography walk', question: 'Where is the best morning light?', status: 'New' }, { id: 'GR-104', guideId: 'guide-demo', traveler: 'Sofia Rossi', date: '2026-10-23', time: '14:00', duration: 1, language: 'English', zone: 'Galle Fort', category: 'Local assistance', question: 'An easy introduction to the fort.', status: 'New' }, { id: 'GR-105', guideId: 'guide-demo', traveler: 'James Hill', date: '2026-09-20', time: '10:00', duration: 2, language: 'English', zone: 'Galle Fort', category: 'History walk', question: '', status: 'Completed' }, { id: 'GR-106', guideId: 'guide-demo', traveler: 'Aiko Sato', date: '2026-09-18', time: '10:00', duration: 1, language: 'English', zone: 'Galle Fort', category: 'Walking tour', question: '', status: 'Expired' }],
        availability: ['provider-demo', 'guide-demo'].flatMap(owner => [18, 19, 20, 21, 22].map(day => ({ owner, date: `2026-10-${day}`, available: day !== 21, start: '09:00', end: '17:00', capacity: owner === 'guide-demo' ? 4 : 12, area: owner === 'guide-demo' ? 'Galle Fort' : 'Colombo' }))),
        activity: [{ id: 'activity-seed', at: '2026-10-01T08:00:00+05:30', actor: 'Demo setup', action: 'Created sample marketplace records', item: 'TravelBuddy' }], content: experiences.slice(0, 4).map(e => ({ id: e.id, active: true })) };
}
export function getDemo(): DemoData {
    const fixtures=seedData();const stored=readLocal<DemoData|null>(DEMO_KEY,null);
    if(!stored||!Array.isArray(stored.accounts)||!Array.isArray(stored.listings))return fixtures;
    return {...stored,accounts:[...stored.accounts,...fixtures.accounts.filter(a=>!stored.accounts.some(s=>s.id===a.id))]};
}
export function saveDemo(data: DemoData, action?: string, item = '') {
    const session = getSession();
    if (action)
        data.activity = [{ id: crypto.randomUUID(), at: new Date().toISOString(), actor: session?.name || 'Demo visitor', action, item }, ...data.activity].slice(0, 150);
    writeLocal(DEMO_KEY, data, 'tb-demo-updated');
}
export function getSession(): DemoAccount | null { if (typeof window === 'undefined')
    return null; try {
    const id = window.sessionStorage.getItem(SESSION_KEY);
    return getDemo().accounts.find(a => a.id === id) || null;
}
catch {
    return null;
} }
export function signIn(email: string, password: string): DemoAccount {
    if (password !== 'demo123')
        throw new Error('Incorrect demo email or password.');
    const data = getDemo();
    const account = data.accounts.find(a => a.email.toLowerCase() === email.trim().toLowerCase());
    if (!account)
        throw new Error('Incorrect demo email or password.');
    switchTraveler(account);
    window.sessionStorage.setItem(SESSION_KEY, account.id);
    if (!window.localStorage.getItem(DEMO_KEY))
        saveDemo(data);
    writeLocal('tb-demo-profile', { name: account.name, email: account.email });
    if (account.id === 'traveler-demo') {
        if (!window.localStorage.getItem(JOURNEY_PLANS_KEY))
            writeLocal(JOURNEY_PLANS_KEY, [createDemoJourneyPlan()]);
        if (!window.localStorage.getItem('tb-saved-experiences'))
            writeLocal('tb-saved-experiences', ['colombo-food', 'sigiriya-dawn']);
    }
    if(account.role==='traveler'){
        const local=readLocal<Booking[]>('tb-bookings',[]);
        const imported=local.filter(b=>!data.bookings.some(d=>d.id===b.id)).map(b=>({id:b.id,experienceId:b.experienceIds[0],traveler:account.name,travelerId:account.id,date:b.date,time:b.time,participants:b.travelers,amount:b.total,meeting:b.meetingPoint,status:'Confirmed'}));
        if(imported.length)saveDemo({...data,bookings:[...imported,...data.bookings]});
    }
    window.dispatchEvent(new Event('tb-session-updated'));
    return account;
}
export function signOut() { switchTraveler(null); window.sessionStorage.removeItem(SESSION_KEY); window.dispatchEvent(new Event('tb-session-updated')); }
export function registerAccount(role: Role, name: string, email: string, details: Record<string, string>): DemoAccount {
    if (role === 'admin')
        throw new Error('Administrator registration is unavailable. Use the predefined demo account.');
    const data = getDemo();
    if (data.accounts.some(a => a.email.toLowerCase() === email.trim().toLowerCase()))
        throw new Error('This email already exists in the local demo.');
    const account: DemoAccount = { id: crypto.randomUUID(), role, name: name.trim(), email: email.trim().toLowerCase(), createdAt: new Date().toISOString().slice(0, 10), seeded: false, status: 'Demo setup', review: role === 'traveler' ? 'Approved' : 'Pending', details };
    data.accounts.push(account);
    saveDemo(data, 'Registered local demo account', account.name);
    return account;
}
export function resetDemo() {
    window.sessionStorage.removeItem(SESSION_KEY);
    const keys = [DEMO_KEY, 'tb-traveler-owner', 'tb-traveler-storage', 'tb-journey-plans', 'tb-checkout-plan', 'tb-bookings', 'tb-saved-experiences', 'tb-cart-experience', 'tb-cart-count', 'tb-demo-profile', 'tb-guide-session', 'tb-supplier-draft', 'tb-demo-notifications', 'tb-email-preference', 'tb-last-travelers'];
    keys.forEach(k => window.localStorage.removeItem(k));
    writeLocal(DEMO_KEY, seedData(), 'tb-demo-updated');
    window.dispatchEvent(new Event('tb-session-updated'));
    window.dispatchEvent(new Event('tb-traveler-updated'));
    window.dispatchEvent(new Event('tb-cart-updated'));
}
export function toExperience(l: Listing): Experience {
    const original = experiences.find(e => e.id === l.id);
    const base = original || experiences[0];
    return { ...base, id: l.id, title: l.title, destination: l.destination, category: l.category, price: l.price, image: l.image || base.image, gallery: original?.gallery || [l.image || base.image], description: l.description,
        options: original ? original.options.map(o => ({ ...o, price: Math.max(0, o.price + l.price - original.price) })) : [{ name: 'Local demo experience', price: l.price, duration: 'See itinerary', detail: `Max ${l.capacity} participants`, times: [l.time || '09:00'] }],
        ...(original ? {} : { rating: 0, reviews: 0, duration: 'See itinerary', country: 'Demo destination', supplier: 'Local demo provider', meetingPoint: l.destination, highlights: [], included: [], notIncluded: [], itinerary: l.itinerary.split('\n').filter(Boolean).map(s => ({ time: '', title: s, detail: '' })), freeCancellation: false, payLater: false, pickup: false }) };
}
export function publicExperiences() { return getDemo().listings.filter(l => l.status === 'Active').map(toExperience); }
export function travelerBookings(): Booking[] { const account = getSession(); if (!account)
    return []; return getDemo().bookings.filter(b => b.travelerId === account.id).map(b => { const l = getDemo().listings.find(l => l.id === b.experienceId)!; return { id: b.id, title: l?.title || 'Demo experience', image: l?.image || '', experienceIds: [b.experienceId], date: b.date, time: b.time, travelers: b.participants, total: b.amount, payLater: false, meetingPoint: b.meeting, createdAt: '2026-10-01', status: b.status }; }); }
