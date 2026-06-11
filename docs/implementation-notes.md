# Implementation Notes

## Current MVP

- Frontend storefront and admin shell are built with React, TypeScript, Tailwind, Zustand and TanStack Query provider setup.
- Backend Express API exposes auth, products, cart, orders, payments and admin route modules.
- Prisma schema covers the database entities from the technical document.
- Product data is currently mocked on the frontend and backend to allow UI/API development before PostgreSQL setup.

## Next Build Steps

1. Run `npm install`.
2. Copy `server/.env.example` to `server/.env` and configure PostgreSQL.
3. Run `npm run prisma:generate -w server`.
4. Run `npm run prisma:migrate -w server` after database is available.
5. Replace mock route responses with Prisma-backed controllers.
6. Add real JWT refresh-token cookies, payment gateway integration, image upload and admin CRUD forms.
