# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Dev server:** `pnpm dev` (uses Turbopack)
- **Build:** `pnpm build`
- **Start production:** `pnpm start`
- **Seed database:** Visit `/seed` route after starting the dev server (GET request creates tables and inserts placeholder data)

No test runner or linter is configured.

## Environment Setup

Copy `.env.example` to `.env` and fill in PostgreSQL credentials and `AUTH_SECRET` (generate with `openssl rand -base64 32`). The database requires SSL (`ssl: 'require'`).

## Architecture

This is a Next.js App Router project (TypeScript, pnpm) based on the Next.js Learn Course, extended with x402 cryptocurrency payment protocol support.

### Data Layer

- **Database:** PostgreSQL via the `postgres` library (raw SQL, no ORM)
- **Queries:** `app/lib/data.ts` — all database query functions (fetchRevenue, fetchFilteredInvoices, etc.)
- **Types:** `app/lib/definitions.ts` — manually defined TypeScript types for all database entities
- **Amounts:** Stored as integers (cents) in the database; converted to dollars for display via `formatCurrency` in `app/lib/utils.ts`
- **Seeding:** `app/seed/route.ts` — creates tables (users, customers, invoices, revenue) and populates from `app/lib/placeholder-data.ts`

### x402 Payment Integration

- **`proxy.ts`** — Configures x402 resource server, payment proxy, and paywall for protected routes
- **Supported networks:** Base Sepolia (EVM) and Solana Devnet (SVM) via `@x402/*` packages
- **Protected routes:** `/protected` ($0.01) and `/api/weather` ($0.001) require cryptocurrency payment
- Uses `@x402/next` for Next.js middleware integration and `@x402/paywall` for client-side payment UI

### UI & Styling

- **Tailwind CSS** with custom 13-column grid and shimmer animation (see `tailwind.config.ts`)
- **CSS Modules** used on the home page (`app/ui/home.module.css`)
- **`clsx`** for conditional class names
- **`@heroicons/react`** for icons
- **`styled-components`** is installed but minimally used

### Authentication

- **NextAuth v5 beta** (`next-auth@5.0.0-beta.25`) — scaffolded but not fully wired up
- **`bcrypt`** for password hashing in seed data

### Key Conventions

- Path alias: `@/*` maps to the project root
- UI components live in `app/ui/` with subdirectories per feature (dashboard, invoices, customers)
- Client components are marked with `'use client'`; data fetching happens in server components
- Pagination uses 6 items per page (`ITEMS_PER_PAGE` constant in `app/lib/data.ts`)
- Zod is available for schema validation
