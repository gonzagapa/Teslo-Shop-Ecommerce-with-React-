# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `pnpm install` — install dependencies (this project uses pnpm, see `pnpm-lock.yaml`)
- `pnpm dev` — start the Vite dev server
- `pnpm build` — type-check (`tsc -b`) then build with Vite
- `pnpm lint` — run ESLint over the project
- `pnpm preview` — preview the production build

There is no test setup in this project currently (no test runner/config present).

The app expects a backend API at the URL configured in `.env` as `VITE_API_URL` (currently `http://localhost:3000/api`). Product images are resolved as `${VITE_API_URL}/files/product/{image}`, so a backend must be running for product data/images to load.

## Architecture

This is a React 19 + TypeScript + Vite storefront ("Teslo Shop") using React Router v8 (`createBrowserRouter`) and TanStack Query for server state. Styling is Tailwind CSS v4 with shadcn/ui components (`components.json`, style `base-nova`, icon library `lucide`).

### Path alias
`@/*` maps to `src/*` (configured in both `tsconfig.json` and `vite.config.ts`). Use `@/...` imports rather than relative paths across module boundaries.

### Feature-module structure
Code is organized by feature/domain area under `src/`, not by technical layer. Each domain follows a consistent internal shape:

- `src/shop/` — public storefront (home, gender-filtered listing, product detail, products listing). Has its own `layout/`, `page/`, `components/`, `hooks/`, `actions/`.
- `src/admin/` — admin dashboard (products CRUD, stats). Has its own `layout/`, `pages/`, `components/`.
- `src/auth/` — login/register. Has its own `layout/`, `pages/`.
- `src/components/ui/` — shadcn/ui primitives (button, card, input, table, etc.) — generated/managed via the shadcn CLI, treat as low-level building blocks.
- `src/components/custom/` — shared custom components not tied to one domain.
- `src/types/` — shared domain types/interfaces (`Product`, `ProductResponse`, `User`), imported via `@/types/...`.
- `src/api/api.teslo.ts` — single shared Axios instance (`apiTeslo`), baseURL from `VITE_API_URL`. All HTTP calls should go through this instance rather than creating new Axios clients.
- `src/mocks/` — static mock data (used ad hoc, not a full mocking framework).

Within a domain, data-fetching follows an actions + hooks split:
- `*.action.ts` files (e.g. `src/shop/actions/get-products.action.ts`) contain the raw async fetch function using `apiTeslo`, including request shaping (query params) and response post-processing (e.g. rewriting image URLs to absolute API URLs).
- `use*.tsx` hook files (e.g. `src/shop/hooks/useProducts.tsx`) wrap actions in `@tanstack/react-query`'s `useQuery`, deriving query params/`queryKey` from URL search params (`useSearchParams`) so pagination/filtering state lives in the URL.

### Routing
`src/app.router.tsx` defines three top-level route trees sharing one router, each with its own layout wrapping an `Outlet`:
- `/` → `ShopLayout` (storefront: home, `gender/:gender`, `product/:id`)
- `/auth` → `AuthLayout` (lazy-loaded) → login/register
- `/admin` → `AdminLayout` (lazy-loaded) → dashboard, `products`, `products/:idSlug`

`AuthLayout` and `AdminLayout` are lazy-loaded via `React.lazy`; shop pages are eagerly imported. Follow this pattern when adding new top-level sections (lazy-load layouts that aren't needed on first paint).

### App shell
`src/TesloApp.tsx` wires up `QueryClientProvider` (one shared `QueryClient`) and `RouterProvider`, plus `ReactQueryDevtools`. `src/main.tsx` mounts `TesloApp` in `StrictMode`.

### Query key conventions
Query keys are structured objects capturing all filter/pagination inputs, e.g. `['products', { offset, limit, sizes, gender, price, query }]` — keep this pattern for cache correctness when adding new list-fetching hooks.