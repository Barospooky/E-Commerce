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

## Docker Database + pgAdmin

1. Copy `.env.docker.example` to `.env` if you want to customize the Docker credentials and ports.
2. Start PostgreSQL and pgAdmin:

```bash
npm run docker:db:up
```

3. Copy `server/.env.example` to `server/.env` and set:

```bash
DATABASE_URL="postgresql://ample_user:ample_password@localhost:5432/ample_organic_commerce"
```

4. Generate Prisma client and run migrations:

```bash
npm run prisma:generate -w server
npm run prisma:migrate -w server
```

5. Open pgAdmin at `http://localhost:5050` and sign in with the credentials from `.env.docker.example`.
6. The server entry is preloaded as `Amplepro Local Postgres`. If pgAdmin asks for the database password, use the `POSTGRES_PASSWORD` value.
