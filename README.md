# Amplepro Organic Commerce

White-label e-commerce platform for organic food brands. This repository follows the uploaded technical plan:

- React 18 + TypeScript storefront and admin panel
- Tailwind CSS visual system
- Zustand client state
- TanStack Query-ready API layer
- Node.js + Express backend
- Prisma + PostgreSQL schema
- JWT-ready auth architecture

## Quick Start

```bash
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and the API runs on `http://localhost:4000`.

## Workspace

- `client/` - customer storefront and admin UI
- `server/` - Express API, Prisma schema, route modules

## White-Label Branding

Update `client/src/config/brand.ts` to replace the temporary Ample Pro logo, colors, and copy with the client brand.

## Environment

Copy `server/.env.example` to `server/.env` and fill in local database/auth settings before running Prisma migrations.
