# TravelBuddy — Authentication & Role-Based Dashboard UI/UX Specification

**Project:** TravelBuddy  
**Document:** AUTH_AND_DASHBOARDS.md  
**Scope:** Frontend-only authentication demo, registration, onboarding, dashboards, navigation, and responsive UI  
**Backend:** Not required  
**Design direction:** Premium, modern, minimal, travel-focused  
**Implementation priority:** Reuse the existing TravelBuddy frontend framework, routing, components, and design system.

---

# 1. Objective

Extend the existing TravelBuddy application with a complete demonstration of authentication and role-based user experiences.

The application must support four distinct roles:

1. **Traveler:** Discovers experiences, plans trips, makes simulated bookings, and finds local guides.
2. **Service Provider:** Manages experiences, prices, availability, and bookings.
3. **Local Guide:** Manages local guiding services, schedules, session requests, and profile information.
4. **Administrator:** Oversees users, providers, guides, experiences, bookings, and demonstration platform activity.

All four roles must have their own dashboards and appropriate navigation.

The goal is not to create an actual authentication service. The goal is to demonstrate how a complete, polished TravelBuddy product would behave.

**Critical requirements:**

- Do not create a backend.
- Do not introduce a database.
- Do not integrate real authentication providers.
- Do not implement actual payment processing.
- Do not redesign unrelated existing TravelBuddy functionality.
- Use meaningful demonstration data.
- Make frontend interactions functional wherever reasonable.
- Maintain a consistent design between desktop and mobile.
- All authentication, authorization, and approval states are simulated and must never be represented as secure or production-ready.

# 2. Demo accounts

Preconfigure the following four accounts.

| Role | Email | Password |
|---|---|---|
| Traveler | traveler@travelbuddy.demo | demo123 |
| Service Provider | provider@travelbuddy.demo | demo123 |
| Local Guide | guide@travelbuddy.demo | demo123 |
| Administrator | admin@travelbuddy.demo | demo123 |

All accounts must work immediately when the application starts.

On the login page, include a collapsible **Explore demo accounts** section showing four selectable demonstration profiles.

Each profile includes its role, a short description, and a **Use demo account** action.

Selecting an account automatically populates the email and password fields. The user then clicks **Sign in** to open the corresponding dashboard.

Do not make four separate login pages. One login screen is simpler to maintain and provides a more consistent experience.

# 3. Authentication screen design

## 3.1 Desktop login

Use a two-column layout.

### Left column: Branding and imagery

Approximately 50–55% of the viewport width.

Include:

- High-quality destination photography featuring Sri Lanka or other beautiful travel destinations.
- TravelBuddy branding.
- Short headline: **Your journey begins here.**
- Supporting text: **Discover unforgettable experiences, connect with local experts, and plan your next adventure.**
- Optional subtle gradient overlay for text readability.

The image should be visually engaging without overwhelming the authentication form.

### Right column: Login

Approximately 45–50% of the viewport width.

Place the form in a centered container with a maximum width around 420 px.

Content order:

1. TravelBuddy logo.
2. Heading: **Welcome back**
3. Subtitle: **Sign in to continue your journey.**
4. Email field.
5. Password field with show/hide control.
6. Sign in button.
7. Demo account selector.
8. Registration link.

Avoid oversized cards, heavy shadows, unnecessarily decorative elements, and excessive empty space.

Do not place the login form inside a large bordered tile if the background already establishes the layout.

## 3.2 Mobile login

The mobile design must feel like a native smartphone application.

Requirements:

- Use a full-height responsive page.
- Remove the large desktop image column.
- Display the TravelBuddy logo near the top.
- Include a small photographic banner only if it improves the composition.
- Keep the form centered horizontally.
- Use generous touch targets.
- Keep primary actions easily reachable.
- Respect keyboard appearance and safe-area insets.
- Allow vertical scrolling on small phones.

Suggested visual order:

**TravelBuddy**

Welcome back  
Sign in to continue your journey.

[Email address]

[Password] [Show]

[Sign in]

Explore demo accounts

New to TravelBuddy? **Create account**

Use the existing application light and dark themes.

The bottom navigation bar should **not** appear on login or registration screens.

## 3.3 Form behavior

- Validate required fields.
- Validate email format.
- Display incorrect-credential messages near the form.
- Provide a password visibility toggle.
- Support keyboard submission.
- Disable repeated submission during a simulated loading state.
- Show a brief, subtle success transition.
- Navigate to the dashboard associated with the selected account.

Do not create a real **Forgot password** workflow. A small disabled or informational demo-only link is sufficient, or omit it entirely.

# 4. Registration architecture

Registration must support three account types:

- Traveler
- Service Provider
- Local Guide

**Administrators cannot register publicly.** The administrator account exists only as a predefined demonstration account.

## 4.1 Account type selection

When the user selects Create account, show a simple page:

**How will you use TravelBuddy?**

Present three options.

### Traveler

**Explore the world**

Discover destinations, book experiences, and organize journeys.

Action: **Join as traveler**

### Service Provider

**Offer experiences**

List tours, activities, and services for travelers.

Action: **Become a provider**

### Local Guide

**Share your local knowledge**

Help travelers discover your city through personalized experiences.

Action: **Become a local guide**

Use elegant, compact selection cards with meaningful icons.

On desktop, the cards can appear in three columns.

On mobile, display them vertically with comfortable spacing.

Avoid displaying long descriptions inside the selection cards.

# 5. Traveler registration

## Fields

- Full name
- Email address
- Country (optional)
- Preferred travel interests (optional)
- Acceptance of demonstration terms

Do not ask for unnecessary personal information.

After submission:

1. Validate the form.
2. Save a mock traveler profile in browser storage.
3. Display a welcome state.
4. Explain that the demonstration password is `demo123`.
5. Offer **Continue to TravelBuddy**.

Automatically entering the traveler dashboard after registration is acceptable.

# 6. Service Provider registration

Use a two-step registration experience rather than one large, overwhelming form.

## Step 1: Business information

Fields:

- Business or provider name
- Contact person's name
- Business email
- Country
- Main service location

## Step 2: Services

Fields:

- Experience category
- Short business description
- Contact phone (optional)
- Main operating destination

Suggested categories:

- Tours
- Outdoor adventures
- Transportation
- Cultural experiences
- Food experiences
- Wildlife experiences
- Other

Do not collect payment or banking information for this prototype.

### Registration completion

Display:

**Welcome to TravelBuddy Partners**

Your demo provider profile has been created.

Primary action: **Open provider workspace**

New provider accounts should initially have a **Demo setup** state.

Their workspace must guide them toward completing a profile and creating their first experience.

Do not require actual administrative verification to use the demonstration workspace.

# 7. Local Guide registration

Local guides are separate from service providers because the management workflow is different.

Use a two-step form.

## Step 1: Personal information

Fields:

- Full name
- Email address
- Country
- City or primary operating zone
- Languages spoken

## Step 2: Guide profile

Fields:

- Guiding specialties
- Short biography
- Session duration preferences
- Preferred meeting areas
- Profile photograph (optional local preview)

Specialty examples:

- Walking tours
- Local food
- History and culture
- Nature
- Photography
- Shopping
- General local assistance

Avoid requesting identity documents, live location permissions, or sensitive personal information for this demonstration.

### Completion

Show:

**Your local guide journey starts here.**

Explain that the profile is a demonstration and no real verification has occurred.

Primary action: **Open guide dashboard**

New guide accounts should initially show an onboarding checklist rather than fabricated customer bookings.

# 8. Demo authentication and local storage rules

This is a frontend-only demonstration.

Use a shared demo password of `demo123` for all predefined accounts.

For newly registered local demo accounts, also use `demo123` rather than collecting and storing real passwords.

Store only non-sensitive demonstration profile fields, such as:

- Internal local ID
- Name
- Email
- Role
- Non-sensitive profile details
- Demo onboarding state
- Mock preferences

Keep the active mock session in browser session storage, or another suitable frontend-only state mechanism.

Do not persist actual passwords, password hashes, tokens, identity documents, payment credentials, or sensitive user information.

Show users that registration data is stored locally in this browser and that the demo password is shared.

Login behavior:

- Find the account by email in the predefined or locally registered mock accounts.
- Verify the submitted password is the shared demonstration password.
- Set the active mock role.
- Navigate to its dashboard.
- Display a clear demo indicator when appropriate.

This is strictly a simulation of authentication. Frontend role checks do not provide real access control.

Include a **Reset demo data** option in an appropriate settings area with a confirmation step.

---

# 9. Role-based navigation architecture

The application must display navigation appropriate to the current account role.

## Traveler

Desktop top navigation:

- Explore
- My Trips
- Local Guides
- Saved
- Bookings
- Profile

Mobile bottom navigation:

1. Explore
2. Trips
3. Guides
4. Profile

Saved experiences and booking management remain available through contextual links.

## Service Provider

Desktop sidebar:

- Overview
- My Experiences
- Bookings
- Availability
- Reviews
- Business Profile
- Settings

Mobile bottom navigation:

1. Home
2. Listings
3. Bookings
4. Account

Availability and reviews are accessible from Listings and Account where appropriate.

## Local Guide

Desktop sidebar:

- Overview
- Session Requests
- My Sessions
- Availability
- Guide Profile
- Reviews
- Settings

Mobile bottom navigation:

1. Home
2. Sessions
3. Availability
4. Profile

## Administrator

Desktop sidebar:

- Overview
- Users
- Providers
- Local Guides
- Experiences
- Bookings
- Content
- Activity
- Settings

Mobile bottom navigation:

1. Overview
2. Users
3. Listings
4. More

The **More** destination groups remaining administrator operations into a simple, readable screen.

Never squeeze every administrative sidebar entry into mobile navigation.

---

# 10. Traveler dashboard

The traveler dashboard should feel like a personalized travel homepage, not an administrative dashboard.

Do not introduce unnecessary analytics charts.

## Main sections

### Header

- Personalized greeting
- Profile shortcut
- Saved experiences shortcut
- Cart shortcut, if the existing application supports it

### Search

Prominent destination and experience search.

### Continue planning

If a traveler has an unfinished trip, show one compact, prominent trip card.

Include:

- Destination
- Travel dates
- Number of planned days
- Number of activities
- Continue planning action

If no trip exists, show **Start your first trip**.

### Upcoming bookings

Display up to two upcoming bookings initially, when available.

Include:

- Experience title
- Date
- Location
- Status
- View booking action

Provide **View all** for additional bookings.

### Recommended experiences

Use real-looking destination photography and sample experience data.

Each listing card should display:

- Image
- Experience title
- Destination
- Rating, explicitly demo data
- Price, explicitly demo data
- Save action

### Quick access

Provide contextual actions for:

- Create trip
- Find local guide
- View saved experiences
- Manage bookings

Avoid repeating the same navigation options excessively.

## Desktop arrangement

Use a spacious, content-first layout:

- Header and search area across the top
- Continue planning as a prominent section
- Upcoming bookings beneath
- Recommended experience cards in a three- or four-column responsive grid
- Optional compact sidebar for trip information only if useful

## Mobile arrangement

Prioritize:

1. Greeting and search
2. Continue trip
3. Upcoming booking
4. Experience recommendations

Use vertically stacked content with horizontally scrollable experience collections where appropriate.

Do not attempt to make every section visible without scrolling.

---

# 11. Service Provider dashboard

Provider dashboards should feel like professional business-management software while preserving TravelBuddy branding.

## 11.1 Overview

### Top header

**Good morning, [Provider Name]**

Subtitle: **Here's what's happening with your experiences.**

Actions:

- Add experience
- View bookings

### Summary metrics

Include four example metrics:

- Total experiences
- Upcoming bookings
- Pending booking requests
- Estimated revenue (demo)

Use compact, restrained metric cards.

Do not use colorful status dots or excessive decorative graphics.

### Recent bookings

Display a table with:

- Booking reference
- Experience
- Traveler
- Date
- Participants
- Status
- Action

Possible demo statuses:

- Pending
- Confirmed
- Completed
- Cancelled

Make statuses distinguishable through both text and subtle styling.

### Experience performance

Display a short list of existing experiences, including:

- Experience name
- Category
- Starting price
- Booking count
- Listing status

### Upcoming schedule

Show an easy-to-read list of upcoming activities rather than a large calendar on the homepage.

### Setup guidance

For newly registered providers, replace sample performance metrics with meaningful onboarding prompts.

Examples:

- Complete business profile
- Create first experience
- Add photos
- Configure availability

## 11.2 My Experiences

Desktop layout:

- Page heading
- Add experience action
- Search and status filters
- Experience management table

Mobile layout:

- Compact listing cards
- Search
- Filter bottom sheet
- Add experience action

Each experience should support simulated:

- View
- Edit
- Duplicate
- Pause or activate
- Delete with confirmation

### Experience editor

Use a dedicated page with clearly organized tabs:

1. Basics
2. Photos
3. Itinerary
4. Pricing
5. Availability

Use the existing experience data model wherever possible.

Avoid one extremely long editing form.

## 11.3 Bookings

Show a searchable booking list.

Selecting a booking opens a detailed view containing:

- Booking reference
- Traveler display name
- Experience
- Date and time
- Participant count
- Meeting details
- Payment simulation status
- Booking status

Allow relevant mock status changes.

## 11.4 Availability

Create a practical date-oriented scheduling interface.

Features:

- Calendar or date list
- Available and unavailable dates
- Time slots
- Participant capacity
- Save changes

On mobile, prioritize a day-oriented view instead of compressing a full desktop calendar.

## 11.5 Reviews

Display seeded demonstration reviews with:

- Experience name
- Rating
- Traveler name
- Date
- Review text

Do not build complicated review analytics.

## 11.6 Business Profile

Include:

- Business name
- Logo or image
- Description
- Operating locations
- Categories
- Contact information
- Profile completion

## 11.7 Settings

Include:

- Appearance
- Demo notifications
- Account preferences
- Reset local demonstration data
- Sign out

---

# 12. Local Guide dashboard

The guide dashboard must feel more personal and schedule-focused than the service provider dashboard.

## 12.1 Overview

### Header

**Welcome back, [Guide Name]**

Subtitle: **Manage your local experiences and upcoming sessions.**

### Primary information

Include:

- Upcoming sessions
- New session requests
- Scheduled hours
- Estimated demo earnings

### Next session

Feature the nearest scheduled session prominently.

Show:

- Traveler display name
- Date
- Time
- Session type
- Meeting area
- View details action

### New requests

List recent local-guiding requests.

Include:

- Requested date
- Duration
- Language
- Local zone
- Status

### Availability preview

Display the next few days of availability.

### Profile completeness

For newly registered guides, show onboarding guidance instead of invented customer activity.

## 12.2 Session Requests

Dedicated page for incoming requests.

Statuses:

- New
- Accepted
- Declined
- Expired

A request detail screen should display:

- Session category
- Traveler display name
- Preferred language
- Requested date and time
- Duration
- General meeting zone
- Traveler questions

Actions:

- Accept request
- Decline request

Use confirmation dialogs where needed.

These actions should update local mock data only.

## 12.3 My Sessions

Show upcoming and past sessions.

Use two tabs:

- Upcoming
- History

Each session includes:

- Traveler
- Session type
- Date
- Duration
- Meeting area
- Status

Mock session transitions may include:

- Accepted
- In progress
- Completed
- Cancelled

Do not simulate real-time location sharing or pretend that a real traveler has been contacted.

## 12.4 Availability

This page should be especially easy to use on mobile.

Include:

- Day selector
- Available hours
- Unavailable days
- Preferred operating areas
- Save action

Mobile should use date chips and clear time-slot controls.

Desktop may use a calendar with an adjacent time editor.

## 12.5 Guide Profile

Include:

- Profile photograph
- Display name
- Biography
- Languages
- Guiding specialties
- Main operating zones
- Typical session durations
- General meeting preferences

Offer a **Preview traveler view** action.

## 12.6 Reviews

Display sample feedback, clearly labeled as demonstration content.

## 12.7 Settings

Provide:

- Appearance
- Notification preferences
- Profile preferences
- Sign out

---

# 13. Administrator dashboard

The admin experience must be professional, information-dense only where justified, and easy to understand.

Use a distinct administrative workspace layout while retaining TravelBuddy's overall design language.

## 13.1 Overview

### Header

**Platform Overview**

Subtitle: **Manage TravelBuddy's demonstration marketplace.**

### Summary metrics

Include:

- Total registered users
- Active service providers
- Local guide profiles
- Experience listings
- Demo bookings
- Pending reviews

Show relevant sample values derived from local demonstration data where feasible.

Do not create meaningless graphs solely for decoration.

### Pending actions

A compact review queue showing:

- Provider registrations
- Guide profile submissions
- Experience submissions
- Reported content, if supported by seeded sample data

### Recent activity

Display timestamped sample events:

- New traveler registration
- Provider profile created
- Experience updated
- Booking status changed
- Guide request accepted

### Operational overview

Include a small set of recent bookings and listing records.

Provide links to the relevant management pages.

## 13.2 Users

Provide a searchable table:

- Display name
- Email
- Role
- Registration date
- Demo status
- Actions

Actions:

- View details
- Edit local demo status
- View associated records when available

Never suggest that changing a frontend status genuinely disables or secures an account.

## 13.3 Providers

Display:

- Business name
- Contact person
- Location
- Number of listings
- Demo review status
- Actions

Include a detail drawer or page with business profile information.

Allow simulated review-state updates:

- Pending
- Approved
- Needs changes

These statuses are only local demonstration metadata.

## 13.4 Local Guides

Display:

- Guide name
- Operating location
- Languages
- Specialties
- Upcoming demo sessions
- Demo review status

Provide profile inspection and simulated status controls.

## 13.5 Experiences

Display:

- Experience title
- Provider
- Destination
- Category
- Price
- Status
- Actions

Support:

- Search
- Filter
- View details
- Change local review state
- Toggle listing visibility in the demo

## 13.6 Bookings

Display:

- Booking reference
- Traveler
- Experience
- Provider
- Date
- Amount
- Status

Selecting a booking must open its detailed information.

Keep actions contextual.

## 13.7 Content

Use this area for lightweight management of homepage content.

Examples:

- Featured destinations
- Featured experiences
- Promotional content displayed on Explore

Reorder or activate seeded content locally.

Do not build a complex content management system.

## 13.8 Activity

Display a readable chronological activity list.

Each event contains:

- Timestamp
- Actor
- Action
- Related item

Events are simulated or generated from local demo interactions.

## 13.9 Settings

Include:

- Appearance
- Demo workspace information
- Reset demo data
- Sign out

---

# 14. Dashboard visual language

The application should visually distinguish the traveler experience from management workspaces without making them look like unrelated products.

## Color palette

### Light theme

- Main background: `#FFFFFF`
- Secondary background: `#F5F6F4`
- Brand deep teal: `#123B39`
- Primary text: `#162326`
- Muted text: `#667574`
- Warm accent: `#D78D63`

### Dark theme

Suggested starting colors:

- Main background: `#111918`
- Secondary surface: `#1C2725`
- Elevated surface: `#263330`
- Primary text: `#F4F6F4`
- Muted text: `#AAB8B3`
- Brand accent: `#80B8AE`

Validate all foreground/background contrast combinations before using them.

## Typography

Use Montserrat prominently for:

- Brand
- Page headings
- Navigation
- Buttons
- Important labels

Use a highly legible body font, including Montserrat if it remains comfortable at regular text sizes.

Suggested sizing:

- Desktop page headings: 28–36 px
- Mobile page headings: 23–28 px
- Main body: 15–16 px
- Secondary text: 13–14 px
- Small metadata: approximately 12 px minimum where practical

## Components

Prefer:

- Clean surfaces
- Consistent spacing
- Rounded controls
- Restrained shadows
- Natural images
- Simple Lucide icons
- Clear typography
- Subtle dividers

Avoid:

- Randomly colored tiles
- Bright gradients on every section
- Thick borders around all cards
- Decorative glowing effects
- Tiny text
- Status indicators represented only by colored dots
- Unnecessary charts
- Repeated navigation buttons
- Excessive glassmorphism

## Buttons

Primary actions use the brand color.

Secondary actions use a restrained outlined or subtle background style.

Destructive actions must be visually differentiated and require confirmation when consequential.

## Status presentation

Use readable text labels such as:

- Pending
- Confirmed
- Completed
- Cancelled
- Needs changes

A status may use a subtle background, but do not rely on color alone.

# 15. Responsive layout rules

## Desktop

For management workspaces:

- Persistent left navigation sidebar
- Top header with current workspace name
- Profile menu
- Main content container with comfortable maximum width
- Two- or three-column page sections where appropriate
- Tables for substantial management data

For travelers:

- Horizontal navigation
- Large photography-led discovery sections
- Experience grids
- Contextual panels when useful

## Tablet

- Reduce the number of grid columns.
- Allow a compact sidebar or alternative workspace navigation.
- Preserve accessible controls.
- Prevent horizontal page overflow.

## Mobile

Use role-specific bottom navigation for authenticated primary screens.

Essential requirements:

- Fixed or sticky bottom navigation with safe-area padding
- Clear active destination
- Four primary tabs
- Minimum comfortable touch-target dimensions
- Full-width form controls
- Compact headers
- Scrollable page content
- Contextual bottom sheets
- Limited table usage
- Avoid tiny desktop tables squeezed into phones

Use cards or focused detail screens instead of wide tables.

When viewing a specific detail page, provide a native-style back control.

Long editing workflows can hide the bottom navigation temporarily to reduce distraction.

Maintain good behavior when the virtual keyboard opens.

# 16. Empty, loading, and error states

Every significant page needs meaningful states.

## Empty states

Examples:

**No upcoming trips**

Start planning your next adventure.

Action: Create trip

**No experiences yet**

Create your first experience to showcase what you offer.

Action: Add experience

**No session requests**

New requests will appear here in the demonstration when sample activity is created.

## Loading states

Use subtle skeleton placeholders or simple loading feedback.

Avoid long artificial delays.

## Form errors

Show specific guidance.

Examples:

- Enter a valid email address.
- This email already exists in the local demo.
- Please complete the required fields.
- Incorrect demo email or password.

## Successful actions

Provide brief toast messages.

Examples:

- Experience updated.
- Availability saved.
- Demo booking status changed.
- Profile saved.

# 17. Navigation routes

Prefer the existing application routing convention. The following routes are recommended only if the project does not already define equivalents.

## Authentication

- `/login`
- `/register`
- `/register/traveler`
- `/register/provider`
- `/register/guide`

## Traveler

- `/explore`
- `/search`
- `/experiences/:id`
- `/trips`
- `/trips/:id`
- `/guides`
- `/guides/:id`
- `/saved`
- `/cart`
- `/checkout`
- `/bookings`
- `/bookings/:id`
- `/profile`

## Provider

- `/provider`
- `/provider/experiences`
- `/provider/experiences/new`
- `/provider/experiences/:id/edit`
- `/provider/bookings`
- `/provider/bookings/:id`
- `/provider/availability`
- `/provider/reviews`
- `/provider/profile`
- `/provider/settings`

## Local Guide

- `/guide`
- `/guide/requests`
- `/guide/requests/:id`
- `/guide/sessions`
- `/guide/sessions/:id`
- `/guide/availability`
- `/guide/profile`
- `/guide/reviews`
- `/guide/settings`

## Administrator

- `/admin`
- `/admin/users`
- `/admin/providers`
- `/admin/guides`
- `/admin/experiences`
- `/admin/bookings`
- `/admin/content`
- `/admin/activity`
- `/admin/settings`

Use parameterized routes instead of creating separate route definitions for each individual record.

# 18. Frontend state architecture

Reuse existing frontend state management if available.

Suggested conceptual modules:

- Demo account definitions
- Mock session management
- Registration state
- Role-based route configuration
- Dashboard fixture data
- Local data persistence
- Theme preferences
- Notification/toast state

Avoid duplicating login logic across roles.

Avoid duplicating the same navigation logic inside every page.

Role-specific pages should reuse common components:

- App shell
- Sidebar
- Bottom navigation
- Header
- Profile menu
- Search input
- Form fields
- Status labels
- Data table
- Detail drawer
- Confirmation dialog
- Empty-state illustration or icon
- Toast notifications

Use separate role configurations and data models where their workflows genuinely differ.

Preserve existing traveler data structures and trip-planner behavior.

# 19. Demo behavior and data consistency

Seed each predefined account with enough content to demonstrate its dashboard.

## Traveler fixture

Include:

- One upcoming trip
- Several experiences
- One upcoming booking
- Saved activities
- A small itinerary

## Service Provider fixture

Include:

- Three sample experiences
- Several sample bookings
- Available dates
- Two sample reviews
- Basic business profile information

## Local Guide fixture

Include:

- Guide profile
- Two upcoming sessions
- Several request examples
- Availability schedule
- Sample reviews

## Administrator fixture

Include:

- The predefined accounts
- Sample traveler accounts
- Sample provider profiles
- Guide profiles
- Experience records
- Booking records
- Activity events

Where practical, all roles should reference the same underlying mock records.

For example:

- A traveler booking should correspond to an experience belonging to a provider.
- An accepted guide request should appear in the guide's sessions.
- An experience status updated by the admin should be reflected in the associated provider's demonstration listing.

Use stable local identifiers.

Do not create contradictory dashboard counts and table content.

# 20. Local demo interaction requirements

The following interactions should operate without a backend:

- Sign in with predefined accounts
- Register a traveler
- Register a service provider
- Register a guide
- Sign out
- Select a demo account
- Navigate according to role
- Edit non-sensitive mock profiles
- Create and edit local experiences
- Change local booking statuses
- Change local guide request statuses
- Update availability
- Search and filter mock records
- Save local changes
- Reset local demonstration data

Use browser storage for non-sensitive demo records where suitable.

Do not store passwords or sensitive details.

Do not pretend that simulated bookings charge customers, that mock administrators can securely authorize accounts, or that local updates synchronize with a server.

An ordinary visitor may browse public traveler content without signing in if the existing application already supports guest browsing.

Require a simulated login only for actions that need a traveler profile or role workspace.

# 21. Implementation order for Codex

Follow this order to prevent navigation and component inconsistencies.

### Phase 1: Inspect existing project

Understand:

- Frontend framework
- Router
- Existing components
- Design tokens
- Theme system
- Current dashboard screens
- Travel and booking data structures

Do not replace functional existing implementations unnecessarily.

### Phase 2: Shared design foundation

Establish or reuse:

- Typography
- Color variables
- Spacing
- Buttons
- Inputs
- Dialogs
- Responsive app shell
- Mobile bottom navigation

### Phase 3: Demo authentication

Implement:

- Shared login
- Demo accounts
- Registration selection
- Three registration forms
- Session handling
- Logout

### Phase 4: Role-specific navigation

Implement the traveler, provider, guide, and admin application shells.

### Phase 5: Dashboards

Build dashboards in this order:

1. Traveler
2. Service Provider
3. Local Guide
4. Administrator

### Phase 6: Management pages

Implement the supporting pages and mock actions defined above.

### Phase 7: Responsive refinement

Test:

- 360 px mobile width
- 390 px mobile width
- 768 px tablet width
- 1024 px laptop width
- 1440 px desktop width

Verify light and dark themes at each breakpoint.

### Phase 8: Final validation

Check all predefined logins using `demo123`.

Verify that:

- Every role lands in the correct workspace.
- Registration works for the three public roles.
- Admin registration is unavailable.
- Navigation never leads to missing pages.
- Logout clears the active mock session.
- Refreshing a management page behaves predictably.
- Local demonstration changes persist as intended.
- Resetting demo data restores the predefined fixtures.
- Mobile navigation is usable.
- No component overflows horizontally.
- Forms remain accessible with the on-screen keyboard.
- Buttons either perform their labeled action or explicitly explain that the capability is a demo.
- Every major page has loading, empty, and error states where appropriate.

# 22. Final acceptance criteria

The implementation is complete only when:

1. A visitor can sign in as any of the four predefined demo roles.
2. All predefined accounts accept `demo123`.
3. Traveler, provider, and guide registration screens work locally.
4. Each role has its own relevant dashboard.
5. Each dashboard links to the management pages described in this specification.
6. The traveler marketplace remains intact.
7. Provider and guide workflows remain clearly distinct.
8. Admin screens provide useful platform oversight using coherent demonstration data.
9. Mobile layouts feel like a dedicated smartphone application.
10. Desktop dashboards are spacious, readable, and professional.
11. Light and dark themes are consistent.
12. No backend, database, or real authentication service is required.
13. No real password or sensitive account information is stored.
14. No dead buttons or unexplained placeholder destinations remain.
15. All simulated behavior is accurately identified as demonstration functionality.

**Final design principle:** TravelBuddy should look and behave like one cohesive product with several specialized workspaces. Travelers should feel inspired and comfortable. Providers and guides should feel organized. Administrators should immediately understand the platform's demonstration state. Every screen should prioritize clarity over decoration.