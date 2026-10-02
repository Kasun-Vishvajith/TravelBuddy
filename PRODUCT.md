# TravelBuddy

## Platform
Responsive web application using Next.js 14, React, and TypeScript.

## Users and purpose
Travelers discover experiences, save ideas, arrange multi-day trips, explore local guides, and manage demo bookings. Suppliers, advisors, partners, and administrators use separate workspaces.

## Capabilities and constraints
Authentication is a frontend simulation with four roles: traveler, service provider, local guide, and administrator. All predefined and registered accounts use the shared demo password `demo123`; no password or authentication token is persisted. The active account ID is in session storage. Profile and shared marketplace records are local. Providers and guides start with onboarding instead of fabricated customer activity. Role checks do not provide secure access control.
The catalog, guides, ratings, and operational metrics are sample data. Trips, saved experiences, preferences, guide sessions, and demo bookings are stored in this browser. QR sharing encodes trip names, catalog IDs, day order, selection, and completion state; it is not cloud synchronization. No real payment, guide dispatch, or transport service is contacted by the traveler prototype.

## Confirmed brief
Four traveler navigation destinations: Explore, Trips, Guides, Profile. Photography leads discovery; day-based itineraries lead planning. Desktop uses horizontal navigation and contextual panels. Mobile uses a four-item bottom bar, day tabs, filter sheets, and focused checkout. Operational workspaces have separate navigation.
