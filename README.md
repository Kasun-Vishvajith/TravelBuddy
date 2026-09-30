# Travel Buddy

Travel Buddy is a local-first travel experiences marketplace inspired by modern experience-booking products. It includes a responsive traveler marketplace, experience detail and checkout flows, a seeded domain model for PostgreSQL/Prisma, and role-based portal surfaces for suppliers, advisors, partners, and admins.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

PostgreSQL is optional for the demo UI because the app ships with realistic local seed data. To use the relational model, start Docker and run `npm run db:push && npm run db:seed`.

Demo portal switcher is available in the header. The local demo uses simulated payments, notifications, commissions, rewards, and voucher generation so workflows can be exercised without third-party accounts.

## Deploy to Vercel

1. Open [Vercel](https://vercel.com/new) and import `Kasun-Vishvajith/TravelBuddy`.
2. Keep the detected framework as **Next.js** and the default build command as `npm run build`.
3. Deploy. Vercel will install dependencies and run Prisma client generation through the `postinstall` script.

The current frontend uses local catalog data, so no database variable is required for the demo UI. If database-backed routes are enabled later, add `DATABASE_URL` in Vercel under **Project Settings → Environment Variables** using a hosted PostgreSQL provider. Set `NEXT_PUBLIC_APP_URL` to the deployed Vercel URL when needed.

For local development, copy `.env.example` to `.env.local`; do not commit `.env.local` or production credentials.
