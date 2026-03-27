# CitraLand Fun Run 5K Batam

Marketing site and admin CMS built with Next.js 16, React 19, Tailwind CSS 4, PostgreSQL, and Prisma.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- PostgreSQL
- Prisma ORM
- Zod

## What changed

- Supabase runtime usage has been removed.
- Admin authentication now uses hashed passwords plus hashed session tokens stored in PostgreSQL.
- Site content is stored as structured JSON in `SiteContent`, with revision history in `SiteContentRevision`.
- Audit events are recorded in `AuditLog`.
- Admin uploads are written to local disk under `public/uploads`, which keeps VPS deployment simple.
- Public pages now use a tighter token-based design system with improved spacing, contrast, and responsive behavior.

## Data model

Prisma models:

- `AdminUser`
- `AdminSession`
- `SiteContent`
- `SiteContentRevision`
- `AuditLog`

Schema file:

- [`prisma/schema.prisma`](/C:/Users/danel/Documents/Project/FunRun%20Site/prisma/schema.prisma)

Initial SQL migration:

- [`prisma/migrations/20260327_init/migration.sql`](/C:/Users/danel/Documents/Project/FunRun%20Site/prisma/migrations/20260327_init/migration.sql)

Seed script:

- [`prisma/seed.ts`](/C:/Users/danel/Documents/Project/FunRun%20Site/prisma/seed.ts)

## Environment

Copy `.env.example` to `.env.local` and update the values:

```powershell
Copy-Item .env.example .env.local
```

Required variables:

```env
SITE_URL=https://run.example.com
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/funrun_site
ADMIN_SESSION_SECRET=replace-with-a-long-random-secret
```

Recommended variables:

```env
ADMIN_SESSION_TTL_HOURS=168
UPLOAD_DIR=public/uploads
ADMIN_SEED_EMAIL=admin@example.com
ADMIN_SEED_PASSWORD=ChangeMe!12345
ADMIN_SEED_NAME=Fun Run Admin
```

## Local development

```bash
npm install
npm run prisma:generate
npm run dev
```

Useful URLs:

- Site: `http://localhost:3000`
- Admin login: `http://localhost:3000/admin/login`

If `DATABASE_URL` is not configured, the public site still renders safe fallback content and the admin area shows a setup-required state.

## Database setup

Apply the migration and seed the first admin/content row:

```bash
npm run prisma:migrate
npm run prisma:seed
```

If `ADMIN_SEED_PASSWORD` is omitted, the seed script generates a password and prints it once in the terminal.

## Deployment notes

Recommended target:

- Ubuntu or Debian VPS
- Node.js runtime
- PostgreSQL on the same VPS or private LAN
- Reverse proxy or Cloudflare Tunnel in front of the Next.js app

Suggested deployment flow:

```bash
npm ci
npm run prisma:generate
npm run build
npm run prisma:migrate
npm run prisma:seed
npm run start
```

Operational notes:

- Persist `public/uploads` on disk or bind it to a volume.
- Set a strong `ADMIN_SESSION_SECRET` in production.
- Rotate the seeded admin password after first login.
- Point `SITE_URL` to the final public domain behind Cloudflare Tunnel.

## Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
npm run start
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```
