# Project Handover

## Overview

This repository is a white-label e-commerce platform with three workspaces:

- `client/` - customer-facing storefront built with React + Vite + Tailwind
- `admin/` - admin dashboard built with React + Vite + Tailwind
- `server/` - Express API with Prisma + PostgreSQL

Current stack:

- Frontend: React 18, TypeScript, Tailwind CSS, Zustand, TanStack Query
- Backend: Node.js, Express, TypeScript
- Database: PostgreSQL via Prisma
- Dev tooling: Vite, Prisma, Docker Compose

## What Has Been Completed

### Database

- PostgreSQL Prisma schema exists in [server/prisma/schema.prisma](/e:/AMPLE PRO/e-commerce/server/prisma/schema.prisma)
- Docker Compose added at [docker-compose.yml](/e:/AMPLE PRO/e-commerce/docker-compose.yml)
- Server environment file added at [server/.env](/e:/AMPLE PRO/e-commerce/server/.env)
- Prisma schema has been pushed to the database successfully using `prisma db push`
- Tables are visible in PostgreSQL / pgAdmin Desktop

Important note:

- There is currently **no `server/prisma/migrations/` folder**
- The database was synced using `db push`, not versioned migrations

### Admin App

- Missing order details page was added:
  [admin/src/pages/AdminOrderDetailsPage.tsx](/e:/AMPLE PRO/e-commerce/admin/src/pages/AdminOrderDetailsPage.tsx)
- Order detail route fixed in:
  [admin/src/App.tsx](/e:/AMPLE PRO/e-commerce/admin/src/App.tsx)
- Add Product page redesigned to a richer two-column admin form:
  [admin/src/pages/AdminAddProductPage.tsx](/e:/AMPLE PRO/e-commerce/admin/src/pages/AdminAddProductPage.tsx)
- Admin layout was adjusted for browser theme / viewport inconsistencies:
  [admin/src/components/AdminLayout.tsx](/e:/AMPLE PRO/e-commerce/admin/src/components/AdminLayout.tsx)
  [admin/src/styles.css](/e:/AMPLE PRO/e-commerce/admin/src/styles.css)
  [admin/index.html](/e:/AMPLE PRO/e-commerce/admin/index.html)

### Client App

- Header/navbar compacted and aligned closer to the provided design:
  [client/src/components/layout/StoreLayout.tsx](/e:/AMPLE PRO/e-commerce/client/src/components/layout/StoreLayout.tsx)
- Homepage promo card updated toward the provided fruit-sale design:
  [client/src/pages/store/HomePage.tsx](/e:/AMPLE PRO/e-commerce/client/src/pages/store/HomePage.tsx)
- Added missing client pages:
  - [client/src/pages/store/OrderSuccessPage.tsx](/e:/AMPLE PRO/e-commerce/client/src/pages/store/OrderSuccessPage.tsx)
  - [client/src/pages/store/MyAccountPage.tsx](/e:/AMPLE PRO/e-commerce/client/src/pages/store/MyAccountPage.tsx)
  - [client/src/pages/store/MyOrdersPage.tsx](/e:/AMPLE PRO/e-commerce/client/src/pages/store/MyOrdersPage.tsx)
  - [client/src/pages/store/WishlistPage.tsx](/e:/AMPLE PRO/e-commerce/client/src/pages/store/WishlistPage.tsx)
  - [client/src/pages/store/CategoryPage.tsx](/e:/AMPLE PRO/e-commerce/client/src/pages/store/CategoryPage.tsx)
  - [client/src/pages/store/ContactPage.tsx](/e:/AMPLE PRO/e-commerce/client/src/pages/store/ContactPage.tsx)
- Updated client routes in:
  [client/src/App.tsx](/e:/AMPLE PRO/e-commerce/client/src/App.tsx)
- Added lightweight mock account/wishlist data:
  - [client/src/data/accountMock.ts](/e:/AMPLE PRO/e-commerce/client/src/data/accountMock.ts)
  - [client/src/store/wishlistStore.ts](/e:/AMPLE PRO/e-commerce/client/src/store/wishlistStore.ts)
- Cart and checkout UI were redesigned closer to provided references:
  - [client/src/pages/store/CartPage.tsx](/e:/AMPLE PRO/e-commerce/client/src/pages/store/CartPage.tsx)
  - [client/src/pages/store/CheckoutPage.tsx](/e:/AMPLE PRO/e-commerce/client/src/pages/store/CheckoutPage.tsx)

## Current Functional State

### Working

- Storefront routes render correctly
- Admin routes render correctly
- PostgreSQL is connected and Prisma schema tables exist
- Product create/edit admin UI submits to the current server API
- Order detail admin page works with the current mock admin API

### Still Mock / In-Memory

These backend sections are still powered by in-memory data stores, not Prisma:

- [server/src/data/catalogStore.ts](/e:/AMPLE PRO/e-commerce/server/src/data/catalogStore.ts)
- [server/src/data/adminDataStore.ts](/e:/AMPLE PRO/e-commerce/server/src/data/adminDataStore.ts)

That means:

- products
- orders
- customers
- categories
- coupons
- inventory

are still mostly mock-backed in the API layer.

The Prisma schema exists, but the route handlers are not yet rewritten to use Prisma queries and mutations.

## How To Run The Project

### 1. Install dependencies

From repo root:

```powershell
npm install
```

### 2. Start PostgreSQL in Docker

Because other local Postgres containers were already using `5432`, this project was configured to use `5433`.

From repo root:

```powershell
$env:POSTGRES_PORT="5433"
docker compose up -d postgres
```

Optional:

```powershell
docker compose down
docker compose logs -f postgres
```

### 3. Server environment

Current server environment file:

[server/.env](/e:/AMPLE PRO/e-commerce/server/.env)

Key DB setting:

```env
DATABASE_URL="postgresql://ample_user:ample_password@localhost:5433/ample_organic_commerce"
```

### 4. Sync Prisma schema to DB

From `server/`:

```powershell
cd "E:\AMPLE PRO\e-commerce\server"
npx prisma db push --schema prisma/schema.prisma
```

This is the command that was used to create the tables.

Optional Prisma client generation:

```powershell
npm run prisma:generate
```

### 5. Run the apps

From repo root:

```powershell
npm run dev:server
```

In another terminal:

```powershell
npm run dev:client
```

In another terminal:

```powershell
npm run dev -w admin
```

Default URLs:

- Client: `http://localhost:5173`
- Admin: `http://localhost:5174`
- Server API: `http://localhost:4000`

## Database Access

### Recommended

Use **pgAdmin Desktop installed on Windows** instead of the Docker pgAdmin service.

### Desktop pgAdmin connection settings

- Host: `localhost`
- Port: `5433`
- Database: `ample_organic_commerce`
- Username: `ample_user`
- Password: `ample_password`

## Important Docker / pgAdmin Notes

The Docker PostgreSQL container works.

The Docker `pgadmin` container had startup issues in this environment. Errors observed:

- `unable to find user pgadmin: no matching entries in passwd file`
- earlier Docker Desktop storage / snapshotter related errors also appeared

Because of that, the stable workflow is:

- run PostgreSQL in Docker
- inspect the DB using desktop pgAdmin

Do not rely on `http://localhost:5051` unless the Docker pgAdmin service is explicitly repaired later.

## Routes Added / Available

### Client

- `/`
- `/products`
- `/products/:slug`
- `/categories/:category`
- `/cart`
- `/checkout`
- `/order-success`
- `/account`
- `/account/orders`
- `/wishlist`
- `/contact`

### Admin

- `/admin`
- `/admin/products`
- `/admin/products/add`
- `/admin/products/:productId/edit`
- `/admin/orders`
- `/admin/orders/:orderId`
- `/admin/inventory`
- `/admin/customers`
- `/admin/categories`
- `/admin/coupons`
- `/admin/reports`
- `/admin/settings`

## Recommended Next Steps

### Highest Priority

1. Replace mock product APIs with Prisma-backed CRUD.
2. Replace admin category/coupon/inventory data stores with Prisma.
3. Replace admin orders/customers with real relational queries from Prisma models.
4. Add a proper migration history instead of relying only on `db push`.

### Frontend Follow-Up

1. Continue pixel-matching the storefront against the provided references.
2. Add mobile menu behavior to the storefront header.
3. Hook account/orders/wishlist pages to real backend data after auth/user models are wired.

### Backend / Data

1. Add seed script for products, categories, admin user, and demo orders.
2. Add auth persistence and real admin login flow.
3. Replace hard-coded client mock account data.

## Useful Files For Next Developer

### Setup / Infra

- [docker-compose.yml](/e:/AMPLE PRO/e-commerce/docker-compose.yml)
- [server/.env](/e:/AMPLE PRO/e-commerce/server/.env)
- [server/.env.example](/e:/AMPLE PRO/e-commerce/server/.env.example)
- [server/prisma/schema.prisma](/e:/AMPLE PRO/e-commerce/server/prisma/schema.prisma)

### Backend

- [server/src/routes/admin.routes.ts](/e:/AMPLE PRO/e-commerce/server/src/routes/admin.routes.ts)
- [server/src/routes/product.routes.ts](/e:/AMPLE PRO/e-commerce/server/src/routes/product.routes.ts)
- [server/src/data/catalogStore.ts](/e:/AMPLE PRO/e-commerce/server/src/data/catalogStore.ts)
- [server/src/data/adminDataStore.ts](/e:/AMPLE PRO/e-commerce/server/src/data/adminDataStore.ts)

### Admin Frontend

- [admin/src/App.tsx](/e:/AMPLE PRO/e-commerce/admin/src/App.tsx)
- [admin/src/components/AdminLayout.tsx](/e:/AMPLE PRO/e-commerce/admin/src/components/AdminLayout.tsx)
- [admin/src/pages/AdminAddProductPage.tsx](/e:/AMPLE PRO/e-commerce/admin/src/pages/AdminAddProductPage.tsx)
- [admin/src/pages/AdminOrderDetailsPage.tsx](/e:/AMPLE PRO/e-commerce/admin/src/pages/AdminOrderDetailsPage.tsx)

### Client Frontend

- [client/src/App.tsx](/e:/AMPLE PRO/e-commerce/client/src/App.tsx)
- [client/src/components/layout/StoreLayout.tsx](/e:/AMPLE PRO/e-commerce/client/src/components/layout/StoreLayout.tsx)
- [client/src/pages/store/HomePage.tsx](/e:/AMPLE PRO/e-commerce/client/src/pages/store/HomePage.tsx)
- [client/src/pages/store/CartPage.tsx](/e:/AMPLE PRO/e-commerce/client/src/pages/store/CartPage.tsx)
- [client/src/pages/store/CheckoutPage.tsx](/e:/AMPLE PRO/e-commerce/client/src/pages/store/CheckoutPage.tsx)
- [client/src/pages/store/MyAccountPage.tsx](/e:/AMPLE PRO/e-commerce/client/src/pages/store/MyAccountPage.tsx)
- [client/src/pages/store/MyOrdersPage.tsx](/e:/AMPLE PRO/e-commerce/client/src/pages/store/MyOrdersPage.tsx)
- [client/src/pages/store/WishlistPage.tsx](/e:/AMPLE PRO/e-commerce/client/src/pages/store/WishlistPage.tsx)
- [client/src/pages/store/CategoryPage.tsx](/e:/AMPLE PRO/e-commerce/client/src/pages/store/CategoryPage.tsx)
- [client/src/pages/store/ContactPage.tsx](/e:/AMPLE PRO/e-commerce/client/src/pages/store/ContactPage.tsx)

## Quick Start Summary

For the next developer, the shortest path is:

```powershell
cd "E:\AMPLE PRO\e-commerce"
npm install
$env:POSTGRES_PORT="5433"
docker compose up -d postgres
cd server
npx prisma db push --schema prisma/schema.prisma
cd ..
npm run dev:server
npm run dev:client
npm run dev -w admin
```

Then:

- open pgAdmin Desktop and connect to `localhost:5433`
- open client at `http://localhost:5173`
- open admin at `http://localhost:5174`
