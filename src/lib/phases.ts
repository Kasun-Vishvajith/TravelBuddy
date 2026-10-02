export type Phase = 1 | 2 | 3;
export const phases = [
  { id: 1 as Phase, name: 'Marketplace Foundation', description: 'Marketplace and booking experience.' },
  { id: 2 as Phase, name: 'Connected Community', description: 'Marketplace, trip planning, and traveler community.' },
  { id: 3 as Phase, name: 'Complete TravelBuddy', description: 'Complete connected travel experience.' },
];
export const featurePhases = {
  marketplace: 1, liveProviders: 1, messaging: 1, bookings: 1,
  tripPlanner: 2, community: 2, reviews: 2, extendedProfile: 2,
  scheduledGuides: 2, partnerships: 2, transportPlanning: 2,
  offlineQr: 3, onDemandGuides: 3, liveSessions: 3,
  connectedJourney: 3, transportHandoffs: 3, portableHistory: 3,
} as const;
export type Feature = keyof typeof featurePhases;
export const enabled = (phase: Phase, feature: Feature) => phase >= featurePhases[feature];
export function routeFeature(path: string): Feature | undefined {
  if (path === '/scan') return 'offlineQr';
  if (path === '/account/history') return 'portableHistory';
  if (path.startsWith('/trips')) return 'tripPlanner';
  if (path.startsWith('/community') || path.startsWith('/requests') || path.startsWith('/admin/community')) return 'community';
  if (path.startsWith('/reviews') || /\/(supplier|admin|guide-workspace)\/reviews/.test(path)) return 'reviews';
  if (path === '/partner' || path.startsWith('/supplier/collaboration') || path.startsWith('/admin/partnerships')) return 'partnerships';
  if (path === '/guide' || path.startsWith('/guide/')) return 'scheduledGuides';
  if (/^\/guide-workspace\/(requests|sessions|availability)/.test(path) || path.startsWith('/admin/guides')) return 'scheduledGuides';
  if (path.startsWith('/guide-workspace/inbox') || path.startsWith('/guide-workspace/community')) return 'scheduledGuides';
  if (path.startsWith('/admin/journeys')) return 'connectedJourney';
  if (path.startsWith('/admin/sessions')) return 'liveSessions';
}
export function availableRoute(path: string, phase: Phase): string {
  const feature = routeFeature(path);
  if (!feature || enabled(phase, feature)) return path;
  if (path.startsWith('/guide-workspace')) return '/guide-workspace/profile';
  if (path.startsWith('/supplier')) return '/supplier';
  if (path.startsWith('/admin')) return '/admin';
  if (path.startsWith('/trips')) return '/bookings';
  return '/';
}
