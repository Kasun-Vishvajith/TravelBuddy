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
