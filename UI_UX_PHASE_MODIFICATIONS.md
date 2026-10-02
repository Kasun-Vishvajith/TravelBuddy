# TravelBuddy — UI/UX Modification Guide for Codex

This guide is specifically for modifying your existing TravelBuddy frontend, not rebuilding the application. It introduces a client-demonstration phase selector on the sign-in page and defines how every screen, navigation item, dashboard, and interaction should change between iterations.

The central rule is cumulative feature availability:

Phase 1

# 1

Marketplace

Phase 2

# 1 + 2

Marketplace + Social

Phase 3

# 1 + 2 + 3

Connected Travel

The specification below is structured for direct use as a Codex implementation handoff.

# TRAVELBUDDY — FRONTEND UI/UX MODIFICATION SPECIFICATION

**Document:** UI_UX_PHASE_MODIFICATIONS.md\
**Project:** TravelBuddy\
**Task:** Modify the existing application for three client demonstration phases.\
**Scope:** Frontend UI, UX, navigation, simulated interactions, role-specific dashboards, responsive design, and presentation modes.

## 1. Primary instruction to Codex

You are working on an existing TravelBuddy application.

Do not rebuild the application from scratch.

First inspect the current project, existing pages, routing, components, styling, mock data, and authentication interface.

Preserve existing working functionality, then reorganize and extend the frontend according to this specification.

**IMPORTANT: THIS IS A FRONTEND-ONLY TASK.**

Do not implement or modify:

- Backend services.
- Databases.
- Actual authentication services.
- Payment gateways.
- WebSocket servers.
- Real-time communication infrastructure.
- Production API integrations.
- Cloud synchronization.

All new functionality requiring these systems must be demonstrated through interactive frontend simulations using coherent mock data.

A simulated interaction must never be represented as a real financial transaction, authenticated connection, live user, or synchronized service.

---

# 2. Overall UI/UX objective

Build a premium, understandable travel application that looks like a professionally designed consumer product rather than a generic template.

The application has four principal account roles:

1. Traveler
2. Service Provider
3. Local Guide
4. Administrator

Maintain a consistent visual identity while adapting the interface to each role.

Travelers require a visually engaging discovery experience.

Service providers require a clear operational workspace.

Local guides require a simple, schedule-oriented workspace.

Administrators require organized management interfaces.

**Critical design priorities:**

- A user should immediately understand the purpose of a screen.
- Primary actions must be obvious.
- Avoid unnecessary information.
- Prefer progressive disclosure to displaying everything simultaneously.
- Minimize unnecessary page transitions.
- Do not create separate pages for functions better handled using a tab, drawer, or bottom sheet.
- Preserve meaningful navigation state.
- Support both light and dark themes.
- Design desktop and mobile compositions separately.
- Mobile must resemble a native smartphone application.

---

# 3. New feature: Phase selection on sign-in page

This is a mandatory modification.

The sign-in screen must include a dedicated **Client Demo Phase Selector**.

This selector determines which iteration of TravelBuddy the client sees after login.

## 3.1 Available phases

### Phase 1 — Marketplace Foundation

Enabled:

Only Phase 1 functionality.

Focus:

- Package discovery.
- Booking.
- Scheduled availability.
- Live Now providers.
- Provider management.
- Messaging.
- Checkout.
- Booking history.

Phase 2 and Phase 3 functionality must not appear in this mode.

### Phase 2 — Connected Community

Enabled:

Phase 1 + Phase 2 functionality.

Adds:

- Trip planning.
- Traveler profiles.
- Traveler/community discovery.
- Local buddies.
- Reviews.
- Community requests.
- Advanced maps.
- Transportation planning.
- Contextual recommendations.

Do not expose Phase 3-exclusive functionality.

### Phase 3 — Complete TravelBuddy

Enabled:

Phase 1 + Phase 2 + Phase 3 functionality.

Adds:

- Offline trip QR sharing.
- QR trip import and editing.
- On-demand local-guide matching.
- Simulated live guide sessions.
- Connected journey checkout.
- Smart transport handoffs.
- Portable history demonstration.

## 3.2 Sign-in selector design

Desktop sign-in page structure:

LEFT SIDE:

- Large photographic destination image.
- TravelBuddy brand.
- Heading: "Every journey starts somewhere."
- Short supporting description.

RIGHT SIDE:

- Welcome back heading.
- Phase selector.
- Email address.
- Password.
- Sign in button.
- Demo account selector.
- Register link.

### Phase selector visual

Use a horizontal segmented selection control containing:

**Phase 1 | Phase 2 | Phase 3**

Below it, display a single-line description of the selected phase.

Example:

Phase 1 selected:\
"Marketplace and booking experience."

Phase 2 selected:\
"Marketplace, trip planning, and traveler community."

Phase 3 selected:\
"Complete connected travel experience."

Each phase must display its cumulative scope correctly.

Make the active selection clear through typography and a restrained background.

Avoid bright badges, oversized phase cards, or unnecessarily decorative controls.

## 3.3 Mobile phase selector

Use a compact segmented control beneath the welcome heading.

The three phases must be easy to select with a finger.

Do not display three large vertically stacked phase cards on the login screen.

The selector should fit comfortably on common smartphones.

## 3.4 Demo accounts

Preserve these predefined demonstration accounts:

| Role          | Email                                                         | Password |
| ------------- | ------------------------------------------------------------- | -------- |
| Traveler      | [traveler@travelbuddy.demo](mailto:traveler@travelbuddy.demo) | demo123  |
| Provider      | [provider@travelbuddy.demo](mailto:provider@travelbuddy.demo) | demo123  |
| Local Guide   | [guide@travelbuddy.demo](mailto:guide@travelbuddy.demo)       | demo123  |
| Administrator | [admin@travelbuddy.demo](mailto:admin@travelbuddy.demo)       | demo123  |

Display these accounts through an expandable **Try a demo account** section.

Selecting an account fills in the credentials.

The chosen phase is independent of the account selection.

The same demo credentials remain valid in every phase.

## 3.5 Important phase behavior

The selected phase determines the visible application capabilities.

**The feature sets are cumulative:**

- Phase 1 = P1.
- Phase 2 = P1 + P2.
- Phase 3 = P1 + P2 + P3.

Do not implement the phases as three disconnected applications.

Use one application with shared components and centralized phase-based UI configuration.

When the selected phase changes:

- Update the visible navigation.
- Update dashboard content.
- Update search filters.
- Update cards and contextual actions.
- Update accessible screens.
- Update mock interactions.
- Update visible demo data where appropriate.

Changing the phase must not change the signed-in account's role.

For the simplest reliable demonstration, select the phase before signing in. Changing the phase afterward should return the presenter to the login selector through a deliberate action, rather than silently switching an active workflow.

A clear, compact current-phase indicator can appear in the authenticated application header, for example:

"Client Demo · Phase 2"

Avoid displaying it as a large promotional banner on every screen.

## 3.6 Feature visibility enforcement

Centralize feature visibility rather than scattering independent checks throughout components.

Each feature should have a minimum phase.

Example conceptual configuration:

- Package search: Phase 1.
- Scheduled bookings: Phase 1.
- Live providers: Phase 1.
- Messaging: Phase 1.
- Trip planner: Phase 2.
- Community nearby people: Phase 2.
- Reviews: Phase 2.
- Offline QR: Phase 3.
- On-demand guide matching: Phase 3.
- Connected journey booking: Phase 3.

The navigation, routing, and UI must all use this same feature configuration.

If a user manually enters a URL for a feature not available in the selected phase, redirect to the nearest appropriate available page.

Do not leave inaccessible features as dead buttons, unexplained empty panels, or half-functional screens.

---

# 4. Phase 1 — Marketplace Foundation

Phase 1 must feel like a complete, focused package-booking marketplace.

It should not resemble an unfinished Phase 3 interface with missing sections.

## 4.1 Traveler homepage

Main components, in visual order:

1. TravelBuddy header.
2. Destination search.
3. Compact category shortcuts.
4. Featured packages.
5. Live Now experiences.
6. Popular destinations.
7. Additional recommendations.

Keep the homepage visually light.

Avoid unnecessary dashboard statistics, charts, or business information.

### Desktop

- Horizontal top navigation.
- Large but restrained destination hero.
- Search integrated into the hero or directly below it.
- Three- or four-column experience grids.
- Comfortable whitespace.
- Photography-first listing cards.

### Mobile

- Compact header with brand/profile shortcut.
- Prominent search input.
- Horizontally scrollable category shortcuts.
- Two-column or horizontal package cards according to content density.
- Clear access to Live Now discovery.
- Native-style bottom navigation.

Keep the search and first useful experience content visible near the beginning of the screen.

## 4.2 Browse and search packages

Provide:

- Destination search.
- Category selection.
- Date selection.
- Price filtering.
- Duration filtering.
- Availability filters.
- Sort options.

Desktop layout:

- Filter sidebar where appropriate.
- Search results.
- Optional map/list view.

Mobile layout:

- Search header.
- Compact filter button.
- Filter bottom sheet.
- Clean result cards.

Every filter must visibly update the simulated result set.

## 4.3 Package details

Include:

- Large photography gallery.
- Package title.
- Destination.
- Price.
- Duration.
- Description.
- Highlights.
- Inclusions and exclusions.
- Meeting location.
- Cancellation policy.
- Scheduled availability.
- Provider information.
- Contact provider action.
- Book Now action.

Do not display Phase 2 review submission or rating systems during Phase 1.

Avoid overcrowding the initial viewport.

Show the most important booking details first, with longer information organized below.

## 4.4 Scheduled availability

Create a date and time selection workflow.

Desktop:

Calendar and available time slots.

Mobile:

Date strip or compact calendar with easy-to-tap time slots.

When a date is selected, update the available slots.

Show unavailable dates clearly.

Prevent selecting an unavailable demo slot.

## 4.5 Live Now discovery

Create a distinct Live Now availability mode within discovery.

Features:

- Live provider list.
- Map/list switching.
- Provider availability state.
- Category filters.
- Distance or location information derived from demonstration locations.
- Next available time.
- Immediate booking action.

Do not create a completely separate duplicate marketplace.

Use the existing listing and search component system.

## 4.6 Map and list view

Phase 1 map displays available service providers only.

Include:

- Map markers.
- Provider preview.
- List/map toggle.
- Zoom controls.
- Recenter action.

Do not show Phase 2 traveler/community people markers.

Use meaningful demonstration provider locations.

## 4.7 Book Now

When booking a Live Now package:

- Default to today's date.
- Preselect the nearest valid available time.
- Show traveler count.
- Allow adjustment before confirmation.

If no valid time remains today, show the next available slot with its actual date.

Ensure the default is deterministic and understandable during client demonstrations.

## 4.8 Chat before booking

Introduce a reusable messaging UI.

Traveler flow:

Package details → Contact provider → Conversation → Return to booking.

Conversation components:

- Chat header.
- Provider information.
- Message bubbles.
- Message composer.
- Relevant package summary.
- Return to booking action.

Use scripted or locally simulated replies.

Label conversations as demonstration data where appropriate.

Do not pretend a real provider is online.

## 4.9 Cart and checkout

Use a focused checkout flow:

Cart → Traveler details → Booking review → Simulated payment → Confirmation.

Display:

- Package information.
- Date and time.
- Traveler count.
- Price summary.
- Cancellation information.
- Pay-later eligibility where applicable.
- Simulated payment option.

Clearly identify payment as a demonstration.

Do not request or store real payment-card details.

## 4.10 Booking history

Create sections for:

- Upcoming
- Completed
- Cancelled

Each booking card should provide:

- Experience.
- Date.
- Travelers.
- Status.
- View details.

Mobile bookings should use readable cards rather than compressed data tables.

## 4.11 Provider dashboard

Phase 1 provider Home must include:

- Business greeting.
- Go Live/Go Offline toggle.
- Active packages summary.
- Upcoming bookings.
- New inquiries.
- Recent conversations.
- Quick Add Package action.

The Go Live toggle must have a clear text state.

Example:

"Currently offline" / "Accepting Live Now requests"

Changing the toggle updates the mock provider visibility in Live Now discovery.

## 4.12 Provider package management

Provider pages:

- Package list.
- Create package.
- Edit package.
- Booking inbox.
- Conversation inbox.
- Schedule and availability.
- Business profile.

Create/Edit Package form sections:

1. Basic details.
2. Photos.
3. Description and inclusions.
4. Pricing.
5. Availability.

Avoid extremely long forms without sections.

## 4.13 Facebook destination deep links

Add a Share action on relevant destination and package screens.

Possible choices:

- Copy link.
- Share via device share sheet.
- Facebook share link when supported.

Shared URLs should lead to the appropriate destination or listing route in the demo.

Do not introduce Facebook authentication or a separate Facebook integration dashboard.

---

# 5. Phase 2 — Connected Community

Phase 2 includes every Phase 1 feature.

Do not remove Live Now, the existing marketplace, booking features, or provider tools.

Instead, extend the application naturally.

## 5.1 Traveler homepage changes

Preserve destination discovery and package search.

Add a compact **Continue your trip** section when a traveler has a plan.

Do not turn the homepage into a complex itinerary dashboard.

Example visual order:

1. Search.
2. Continue Trip, if applicable.
3. Featured experiences.
4. Nearby opportunities.
5. Community discovery entry point.
6. Recommendations.

Keep new content contextual.

## 5.2 My Trips

Introduce My Trips as a primary traveler destination.

Two principal sections:

- Plans.
- Bookings.

Trip cards display:

- Destination.
- Travel dates.
- Number of days.
- Number of activities.
- Progress.
- Continue action.

Provide Create Trip.

## 5.3 Trip planner

Use one trip workspace.

Desktop:

- Left: day navigation.
- Center: itinerary timeline.
- Right: journey summary.

Mobile:

- Trip heading.
- Horizontal day selector.
- Vertical itinerary.
- Add activity action.
- Contextual day menu.

Supported UI:

- Add individual experiences.
- Add complete tours.
- Reorder activities.
- Move activities between days.
- Mark experiences complete.
- Add transport arrangements.
- Add optional guides to booked packages.

Provide Move Earlier and Move Later actions as alternatives to dragging.

## 5.4 Remember traveler count

When adding activities or booking packages, populate the traveler count from the last locally selected value.

Allow editing at all times.

Show the saved count as an editable default, not an unchangeable assumption.

## 5.5 Contextual recommendations

Introduce recommendations inside itinerary workflows.

Examples:

After a morning experience:\
"Explore nearby activities."

After an experience ending far from the next destination:\
"Consider transport."

Recommendations should appear only when relevant.

Do not place a large AI-style recommendation dashboard on every page.

Use simple simulated recommendation rules and realistic fixtures.

## 5.6 Extended traveler profile

Add:

- Profile photograph.
- Biography.
- Interests.
- Languages.
- Home city or general location.
- Travel preferences.

Users must control profile visibility.

Avoid exposing precise personal location by default.

## 5.7 Nearby community discovery

Expand the existing Nearby screen.

Phase 1 shows live providers.

Phase 2 adds community discovery.

Suggested filter tabs:

- Everyone.
- Local Buddies.
- Travelers.

Also preserve a visible Live Providers filter or section.

Desktop:

Map/list view, filters, and contextual profiles.

Mobile:

- Compact map.
- Filter chips.
- Nearby result cards.
- Full-screen map option.

A single map system should serve providers and community discovery, with distinct marker categories and clear filtering.

Do not render every category simultaneously without a clear way to distinguish them.

## 5.8 Community profiles

Traveler and local-buddy cards may display:

- Profile photo.
- Display name.
- General location.
- Languages.
- Shared interests.
- Short biography.
- View profile action.

Avoid dense social-network profile pages.

Profile actions should be clearly relevant to the role.

## 5.9 Traveler plans and requests

Introduce an easy-to-find Create Travel Request action within Trips or Nearby.

Form:

- Destination.
- Dates.
- Activity preference.
- Short message.
- Preferred participants.
- Visibility preferences.

Allow users to inspect their request before posting.

Show a demonstration notice when submitting.

## 5.10 Local buddy response

A buddy can respond with:

- A short message.
- Their profile.
- A curated package proposal.

Design this as part of the existing request detail and messaging system.

Do not create a separate complex proposal-management application.

The traveler can accept or ignore a response.

Respect selected visibility filters in the frontend demonstration.

## 5.11 Enhanced messaging

Extend Phase 1 messaging rather than replacing it.

Add:

- Share experience card.
- Share package proposal.
- Link to trip or request.
- Relevant conversation context.

Shared packages should appear as compact rich cards with image, title, price, and View Details action.

## 5.12 Advanced map interface

Phase 2 adds:

- People-category filters.
- Street/satellite switch.
- Zoom controls.
- Recenter.
- List/map switching.
- Privacy-aware approximate locations.

Use clear map markers that represent distinct categories.

Do not simulate precise live movement of real people.

## 5.13 Reviews and ratings

Add traveler review workflows.

Screens:

- Review summary.
- Review list.
- Write review.

The Write Review action should appear for eligible completed demonstration experiences.

Reviews must be labeled as sample data when seeded.

Keep the interface lightweight.

## 5.14 Partner and supplier tools

Extend provider and existing partner workspaces with relevant management tools.

Possible sections:

- Partnership overview.
- Shared or promoted packages.
- Partner performance examples.
- Local collaboration requests.

Reuse the established management dashboard style.

Do not create additional top-level account roles unless the current project already has them.

## 5.15 Completed experiences

Add a dedicated Completed section within My Trips or Booking History.

Completed experience cards may offer:

- View details.
- Write review.
- Add to travel history.

The history should use the same underlying mock records.

---

# 6. Phase 3 — Complete TravelBuddy

Phase 3 contains all Phase 1 and Phase 2 features.

Do not change the navigation architecture unnecessarily.

Integrate advanced features into established workflows.

## 6.1 Offline trip QR

Add Share Trip to the trip-planner header.

Available actions:

- Generate QR.
- Show QR.
- Copy trip information.
- Import trip.

Do not place QR generation on the main homepage.

Keep it contextual to an existing itinerary.

## 6.2 QR import preview

After scanning or pasting trip data, display an Import Review screen.

Show:

- Trip title.
- Destination.
- Dates.
- Included activities.
- Individual checkboxes.
- Select All.
- Deselect All.
- Import Selected action.

Allow travelers to edit the imported trip locally.

Validate the encoded demo data before using it.

The offline QR must not contain private account credentials or sensitive traveler information.

## 6.3 On-demand guide matching

Expand guide discovery into Travel Buddy Now.

Traveler workflow:

Select zone → View available demo guides → Select guide → Configure session → Review request.

Guide cards should display:

- Photo.
- Name.
- Languages.
- Specialties.
- Operating zone.
- Session duration.
- Demonstration availability.

Keep the interface straightforward.

## 6.4 Live guide session

Introduce an Active Session screen.

Include:

- Guide profile summary.
- Session title.
- Simulated start/end time.
- Meeting area.
- Questions and answers.
- Session status.
- End Session action.

Use locally scripted Q&A.

Do not claim real-time communication or actual guide participation.

## 6.5 Connected journey booking

Extend trip booking to combine:

- Main experience.
- Additional activities.
- Optional guide.
- Transport segments.

Use one journey summary.

Show the separate estimated costs and total.

Allow the traveler to remove optional components.

Avoid forcing the user into several disconnected checkout interfaces.

## 6.6 Transport handoff suggestions

When an itinerary activity ends, show a relevant transport suggestion if the next activity requires a transfer.

Display:

- Origin.
- Destination.
- Suggested departure.
- Estimated duration.
- Estimated price.
- Add to journey action.

Use demonstration data and label estimates appropriately.

## 6.7 Portable travel history

Provide a Travel History section within the traveler profile.

Show completed experiences and past trips.

Since this is frontend-only, implement a simulated portability interface using local export/import or sample device-history previews.

Do not claim actual automatic cross-device synchronization.

A simple explanation can state:

"This demonstration previews how your travel history would appear across devices. Real synchronization is not enabled."

---

# 7. Phase-aware mobile navigation

Do not use a hamburger menu for the four principal traveler destinations.

Use a bottom navigation bar designed for smartphones.

## 7.1 Traveler — Phase 1

Bottom tabs:

1. Explore.
2. Nearby.
3. Bookings.
4. Inbox.

Profile access: top-right avatar.

Nearby shows live providers only.

Do not display Trips, community people, QR tools, or on-demand guide matching.

## 7.2 Traveler — Phase 2

Bottom tabs:

1. Explore.
2. Trips.
3. Nearby.
4. Inbox.

Profile access: top-right avatar.

Changes:

- Trips replaces Bookings as a primary destination.
- Bookings remains accessible as a section within Trips.
- Nearby includes the community filters and live providers.
- Messaging supports shared packages and travel requests.

No QR import or on-demand guide session controls yet.

## 7.3 Traveler — Phase 3

Keep the Phase 2 four-tab navigation:

1. Explore.
2. Trips.
3. Nearby.
4. Inbox.

Add Phase 3 capabilities contextually:

- QR sharing under Trips.
- QR import within the planner.
- Travel Buddy Now within Nearby.
- Guide conversations within Inbox.
- Connected bookings within the trip/checkout workflow.

Do not add a fifth or sixth tab merely because more features exist.

## 7.4 Provider navigation

All phases where provider features are available:

1. Home.
2. Packages.
3. Bookings.
4. Inbox.

Profile/settings via avatar or Account section.

Phase 1:

Core marketplace, Live Now, availability, and messaging.

Phase 2:

Include applicable partner and collaboration tools inside existing sections.

Phase 3:

Add connected-journey-related booking details without adding another primary tab.

## 7.5 Local Guide navigation

Preserve the guide account and profile structure in all phases.

Phase 1:

Only foundational account/profile presentation, as guide operations are not included in the Phase 1 feature roadmap. Clearly indicate that this role's specialized demonstration begins in a later iteration; do not expose future guide services as active Phase 1 features.

Phase 2:

- Home.
- Sessions.
- Availability.
- Profile.

Support guide profiles and optional guide participation attached to packages.

Phase 3:

- Home.
- Sessions.
- Inbox.
- Profile.

Availability remains accessible from Home.

Add on-demand matching and active sessions.

## 7.6 Administrator navigation

Desktop uses a left sidebar.

Mobile bottom tabs:

1. Overview.
2. Users.
3. Listings.
4. More.

Phase 1:

Only marketplace accounts, providers, packages, and bookings.

Phase 2:

Add reviews, guides, partnerships, and community content management.

Phase 3:

Add oversight of simulated connected journeys, live guide sessions, and related sample activities.

Never display Phase 3 metrics inside Phase 1 dashboards.

---

# 8. Desktop layout structure

## 8.1 Traveler interface

Use:

- Horizontal top navigation.
- Content-first design.
- Large destination photography.
- Compact search.
- Experience grids.
- Contextual booking panels.

Do not create a permanent business-dashboard sidebar for travelers.

## 8.2 Provider interface

Use:

- Left navigation sidebar.
- Page heading and contextual actions.
- Compact performance information.
- Booking tables.
- Package management lists.
- Detail drawers.
- Availability editor.

## 8.3 Local Guide interface

Use:

- Left navigation sidebar.
- Next session focus.
- Requests.
- Availability summary.
- Simple schedule controls.
- Profile management.

## 8.4 Administrator interface

Use:

- Persistent desktop sidebar.
- Compact page header.
- Relevant summary metrics.
- Searchable data tables.
- Contextual filters.
- Detail panels.
- Activity feed.

Avoid oversized dashboards packed with unrelated charts.

---

# 9. Mobile visual and interaction standards

The mobile interface should feel like a dedicated smartphone app, not a desktop website reduced in width.

Mandatory requirements:

- Native-style navigation patterns.
- Bottom navigation for primary authenticated screens.
- Clear back navigation on secondary pages.
- Full-width fields.
- Large touch targets.
- Safe-area spacing.
- Sticky contextual actions where useful.
- Bottom sheets for filters and compact selections.
- Full-screen views for lengthy forms.
- Smooth transitions.
- Readable typography.
- Support for the on-screen keyboard.

## Screen hierarchy

On mobile:

Primary screens use bottom navigation.

Secondary screens use a back button.

Focused screens such as checkout, image previews, and full-screen chat may temporarily hide bottom navigation.

Do not put bottom navigation underneath the virtual keyboard or behind sticky checkout controls.

## Home screen density

Prioritize:

- Greeting or destination context.
- Main search/action.
- First important content block.

Further content may scroll naturally.

Avoid trying to display the entire application in one viewport.

## Map behavior

A useful mobile pattern is:

- Map visible at top.
- Compact result sheet underneath.
- Drag sheet upward to see more results.
- Switch to full list when needed.

Do not allow map overlays to obstruct primary navigation.

---

# 10. Visual design system

Reuse the existing TravelBuddy theme wherever possible.

Suggested reference palette:

## Light theme

- Canvas: #FFFFFF
- Secondary surface: #F5F6F4
- Deep teal: #123B39
- Main text: #162326
- Muted text: #667574
- Warm accent: #D78D63

## Dark theme

- Canvas: #111918
- Secondary surface: #1C2725
- Elevated surface: #263330
- Main text: #F4F6F4
- Muted text: #AAB8B3
- Accent teal: #80B8AE

Verify contrast rather than assuming every color pairing works.

## Typography

Prefer Montserrat prominently for:

- Brand.
- Headings.
- Navigation.
- Buttons.

Use comfortably readable body typography.

Suggested sizing:

- Desktop main title: 30–38 px.
- Mobile main title: 24–28 px.
- Body: 15–16 px.
- Secondary labels: 13–14 px.
- Avoid extremely small essential text.

## Spacing

Use a consistent spacing scale based on approximately 8 px increments, allowing 4 px subdivisions where appropriate.

Typical values:

- Input height: 44–52 px.
- Primary button height: 46–52 px.
- Standard card radius: 12–16 px.
- Mobile side padding: 16–20 px.
- Desktop main content width: approximately 1200–1440 px depending on page type.

These are visual guidelines, not reasons to replace an already consistent design system.

## Component styling

Prefer:

- White or dark neutral surfaces.
- Restrained dividers.
- Clear section hierarchy.
- Realistic travel photography.
- Meaningful icons.
- Compact status labels.
- Subtle shadows.
- Consistent corner radii.

Avoid:

- Pastel tiles everywhere.
- Heavy dark borders around light-colored cards.
- Random gradients.
- Tiny decorative dots beside statuses.
- Oversized rounded tiles for every paragraph.
- Unnecessary glass effects.
- Excessive shadows.
- Generic dashboard charts.
- Dense pages filled with simultaneous information.

Use intentional visual contrast instead of decoration.

---

# 11. Common reusable components

Audit existing components before introducing new ones.

Reuse or extend:

- AppHeader.
- NavigationBar.
- MobileBottomNavigation.
- DesktopSidebar.
- PhaseSelector.
- PhaseIndicator.
- SearchBar.
- FilterSheet.
- ExperienceCard.
- ProviderCard.
- GuideCard.
- BookingCard.
- TripCard.
- ChatWindow.
- MessageComposer.
- AvailabilityCalendar.
- MapListToggle.
- ProfileCard.
- StatusLabel.
- DetailDrawer.
- ConfirmationDialog.
- EmptyState.
- LoadingState.
- ToastNotification.

Suggested phase-aware conceptual components:

- PhaseGate.
- RoleGate.
- PhaseNavigation.
- DemoDataProvider.

Names are suggestions. Follow the project's existing naming conventions.

Avoid duplicate components that render nearly identical interfaces.

---

# 12. Role-specific dashboard changes by phase

## Traveler

| Area      | Phase 1         | Phase 2                          | Phase 3                                  |
| --------- | --------------- | -------------------------------- | ---------------------------------------- |
| Discovery | Packages        | Packages                         | Packages                                 |
| Nearby    | Live providers  | Providers + community            | Providers + community + on-demand guides |
| Trips     | Booking history | Planner + bookings               | Planner + QR + connected journeys        |
| Messages  | Provider chat   | Shared packages + buddy requests | Guide sessions + all previous            |
| Profile   | Basic           | Full social profile              | Full profile + portable history preview  |

## Provider

| Area         | Phase 1              | Phase 2                           | Phase 3                     |
| ------------ | -------------------- | --------------------------------- | --------------------------- |
| Overview     | Packages/bookings    | Add partner information           | Add connected journey data  |
| Listings     | Package management   | Extended collaboration            | Multi-service relationships |
| Availability | Scheduled + Live Now | Same + relevant planning context  | Integrated journey context  |
| Inbox        | Booking inquiries    | Shared packages and collaboration | Journey-related inquiries   |

## Local Guide

| Area            | Phase 1               | Phase 2                        | Phase 3                        |
| --------------- | --------------------- | ------------------------------ | ------------------------------ |
| Account         | Basic profile         | Full guide profile             | Full guide profile             |
| Work management | Not active in Phase 1 | Scheduled guide participation  | Scheduled + on-demand sessions |
| Availability    | Not active            | Schedule                       | Schedule + on-demand           |
| Messages        | Not active            | Relevant package communication | Active session Q&A             |

## Administrator

| Area                | Phase 1               | Phase 2                | Phase 3                      |
| ------------------- | --------------------- | ---------------------- | ---------------------------- |
| Dashboard           | Marketplace oversight | Community and reviews  | Connected services oversight |
| User management     | Basic accounts        | Extended profiles      | Extended profiles            |
| Provider management | Packages/bookings     | Partnerships           | Connected journey records    |
| Guide management    | Not exposed           | Profiles and schedules | Matching/session oversight   |
| Content             | Destinations/packages | Community content      | All previous content         |

All data presented must correspond to the active phase.

---

# 13. Demo data strategy

Use shared, coherent demonstration fixtures.

The same package should have consistent information wherever it appears.

Example:

A Yala Safari package appearing in Explore should use the same basic details inside:

- Package details.
- Provider package management.
- Booking summary.
- Trip planner when enabled.
- Connected journey when enabled.

Avoid contradictory mock prices, dates, or participants.

## Phase-specific fixture expectations

Phase 1:

- Example travelers.
- Example providers.
- Packages.
- Availability.
- Live provider statuses.
- Booking records.
- Provider messages.

Phase 2 adds:

- Trip plans.
- Traveler profiles.
- Buddy profiles.
- Community requests.
- Reviews.
- Transport examples.
- Extended message content.

Phase 3 adds:

- QR trip examples.
- Guide matching examples.
- Session Q&A.
- Connected journeys.
- Transport handoffs.
- Portable history previews.

Use stable identifiers and deterministic examples.

Keep phase datasets cumulative, while allowing the presenter to reset local changes before a demonstration.

Use browser-local storage only for non-sensitive UI demo state.

The predefined demo password is a demonstration convention and must not be treated as secure authentication.

---

# 14. Important workflow rules

## Rule A: Preserve continuity

If a user opens a package, contacts a provider, and returns to the package, the selected package and relevant booking choices should remain intact.

## Rule B: Avoid unnecessary duplication

Do not create separate chat applications for travelers, providers, and guides.

Use a shared messaging interface adapted to the current conversation type and role.

## Rule C: Contextual feature placement

Examples:

QR sharing belongs in Trip Planner.

Live Now belongs in Discovery and Provider Home.

Transport suggestions belong in itineraries and connected bookings.

Guide matching belongs in Nearby and relevant trip workflows.

Reviews belong on experience details and completed history.

## Rule D: Clear primary action

Each page should have one clearly dominant primary action.

Examples:

Search page: Explore results.

Package details: Select date / Book.

Trip planner: Add experience.

Provider package list: Add package.

Guide request details: Accept request.

## Rule E: Avoid fake complexity

Do not create dozens of statistics or complex charts merely to make the product look advanced.

The client should understand the workflow without explanations from the developer.

## Rule F: Honest demonstrations

All simulated systems must have clear behavior.

Real-time availability, chat, map users, payment, and portability should not be misrepresented as operational backend features.

---

# 15. Registration and account requirements

Preserve the existing role-based login and registration design.

Public registration paths:

- Traveler.
- Service Provider.
- Local Guide.

Administrators use predefined demo accounts only.

The authentication screens are shared demonstration infrastructure across all phases.

However, specialized role functionality must remain phase-gated.

New guide accounts may access their basic profile in Phase 1 but must not access scheduled guide marketplace features until Phase 2 or on-demand features until Phase 3.

After successful simulated registration, show the appropriate onboarding or dashboard based on role and selected phase.

Keep forms short and clearly organized.

Do not introduce real password storage, credential verification, or production authentication logic.

---

# 16. Empty states and interaction feedback

Every screen must handle:

- No results.
- No bookings.
- No trips.
- No messages.
- No available providers.
- No guide matches.
- No reviews.
- No upcoming sessions.

Only display states for features enabled in the current phase.

Use helpful empty-state explanations and relevant actions.

Examples:

"No packages match your filters."

"No upcoming bookings."

"Your first trip starts here."

"No local buddies match your selected area."

"No demo guides are available in this zone."

Never leave a blank page with no explanation.

Use subtle toasts after successful local actions.

Require confirmation before destructive actions.

Provide meaningful keyboard focus and accessible labels.

---

# 17. Codex implementation sequence

Follow this exact order.

## Step 1 — Inspect existing frontend

Identify:

- Framework.
- Router.
- Components.
- Theme system.
- Current account roles.
- Screens already implemented.
- Current mock data.
- Existing interactions.

Produce a brief inventory of what can be reused.

## Step 2 — Add centralized phase configuration

Define the three phases and their cumulative feature sets.

Use the same configuration for:

- Routes.
- Navigation.
- Dashboard content.
- Actions.
- Search filters.
- Page sections.

## Step 3 — Modify authentication UI

Add the three-option phase selector.

Preserve four demo accounts and password `demo123`.

Make phase selection independent of account selection.

## Step 4 — Finalize Phase 1

Ensure all Phase 1 UI workflows exist.

Remove Phase 2 and Phase 3 features from its navigation, search, dashboard, and available routes.

## Step 5 — Implement Phase 2 additions

Extend the existing screens with trip planning, profiles, social discovery, maps, and review workflows.

Preserve every Phase 1 capability.

## Step 6 — Implement Phase 3 additions

Integrate QR, on-demand guides, session Q&A, connected journey booking, and portable-history demonstration.

Preserve Phase 1 and Phase 2 capabilities.

## Step 7 — Refine responsive layouts

Test desktop and mobile independently.

Suggested test widths:

- 360 px.
- 390 px.
- 768 px.
- 1024 px.
- 1440 px.

Test light and dark themes.

## Step 8 — Functional UI validation

Verify:

- Phase switching before login.
- All four demo accounts.
- Correct role dashboard.
- Phase-appropriate navigation.
- No inaccessible phase routes.
- Functional mock interactions.
- Consistent demo data.
- Responsive behavior.
- No horizontal overflow.
- No unexplained dead buttons.

---

# 18. Client demonstration acceptance tests

## Test 1 — Phase 1

Select Phase 1 on login.

Sign in as traveler.

Expected:

- Package marketplace.
- Search and filters.
- Scheduled booking.
- Live Now providers.
- Map/list.
- Chat.
- Cart.
- Simulated checkout.
- Booking history.

Must not show:

- Full trip planner.
- Traveler community.
- Buddy matching.
- Phase 2 reviews.
- QR trip tools.
- On-demand guide sessions.
- Connected journeys.

Sign in as provider.

Expected:

- Package management.
- Live toggle.
- Availability.
- Bookings.
- Chat inbox.

## Test 2 — Phase 2

Select Phase 2.

Sign in as traveler.

Expected:

Everything from Phase 1, plus:

- Trip planning.
- Trip activity reordering.
- Transport planning.
- Full traveler profile.
- Local buddy discovery.
- Community requests.
- Expanded maps.
- Shared packages in chat.
- Reviews.
- Completed experience history.

Must not show:

- QR trip import/export.
- On-demand guide matching.
- Active live guide Q&A.
- Phase 3 connected journey booking.
- Portable history preview.

Check provider, guide, and administrator workspaces for their Phase 2 additions.

## Test 3 — Phase 3

Select Phase 3.

Sign in as traveler.

Expected:

Everything from Phases 1 and 2, plus:

- Offline QR export.
- QR import review.
- Activity selection during import.
- Travel Buddy Now.
- Simulated active guide session.
- Connected booking.
- Automatic transport suggestions.
- Portable history demonstration.

Check corresponding provider, guide, and admin views.

## Test 4 — Visual consistency

For every supported role and phase:

- Typography is consistent.
- Navigation matches the active phase.
- Page layout follows the same design system.
- Mobile uses appropriate native-style controls.
- Light/dark themes work.
- Screen sizes remain readable.
- Primary actions are easy to identify.
- No unsupported functionality is falsely presented as operational.

---

# 19. Required handoff from Codex

After implementation, provide:

1. Summary of frontend modifications.
2. Files created or modified.
3. Components reused.
4. Route changes.
5. Phase feature matrix.
6. Screen inventory by role.
7. Description of simulated interactions.
8. Any missing demonstration workflows.
9. Instructions to run locally.
10. Results of available build and UI checks.

Do not modify backend files.

Do not introduce real external services.

Do not silently remove existing TravelBuddy features.

---

# FINAL DESIGN REQUIREMENT

TravelBuddy should feel like one premium application evolving through three client-visible iterations.

**Phase 1:** A complete and straightforward booking marketplace.

**Phase 2:** The same marketplace, enhanced with itinerary planning, community discovery, and traveler connections.

**Phase 3:** The complete connected travel companion, including QR trip sharing, flexible local guides, and linked travel services.

The user must immediately understand each iteration's value without needing an explanation of the implementation.

Use the fewest screens and controls that fully support the required workflows.

Prioritize usability, visual consistency, readability, and realistic navigation over decoration or feature density.

### One additional design recommendation

For the client demonstration, I would keep the selected phase visible through a small, unobtrusive label in the header. That prevents confusion when switching between traveler, provider, guide, and admin accounts during a presentation.

The phase selector should control actual frontend visibility and workflows, not merely change a title or dashboard appearance. That is the main behavior Codex needs to get right.