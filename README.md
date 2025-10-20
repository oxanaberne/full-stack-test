# Full-Stack Developer — 1–2 Day Assessment

**Goal:** Build a small inventory-style web app that demonstrates full-stack skills using **Next.js + React (TypeScript)** for the frontend and **either** a lightweight **Node.js + Express** backend **or** a managed backend (recommended options:**Supabase** / **AppWrite**) for speed. This project is time-boxed — aim to finish the *core* tasks in **one working day (6–10 hours)**.

**NOTE:** The front-end project provided is just a skeleton. You are expected to implement any necessary pages or components to achieve the goal. Please remove any files not used in the final submitted repository - whether front-end or back-end - and document that in `NOTES.md`

**We recommend the following libraries for your front-end project**:
- React Query (`npm i @tanstack/react-query`)
- Classnames (`npm i classnames`)
- CLSX (`npm i clsx`)
- Date-fns (`npm i date-fns`)
- QueryString "qs" (`npm i qs`)
- Radix UI (`npm i radix-ui`)
---

## What we expect you to deliver (required)

1. A **public Git repository** (GitHub/GitLab) with a clear commit history.
2. A working **Next.js + React + TypeScript** frontend.
3. A backend (choose **one**):
   - **Option A (recommended): Supabase/AppWrite** — use hosted DB/auth/storage and Supabase client or edge functions; **OR**
   - **Option B: Node.js + Express** API with a simple DB (Postgres or SQLite).
4. Authentication: **email + password** (no OAuth required).
5. CRUD for `items` (example domain: inventory, plants, products).
6. Search + pagination on the items list (page size = 10).
7. File upload for item image(s).
8. Role-based access: `admin` (create/edit/delete) and `user` (view, reserve).
9. At least **one meaningful automated test** (unit or integration).
10. A `README.md` (modify/replace this file) and a short `NOTES.md` describing tradeoffs and known limitations.

**Optional but nice:**
- Live deployed frontend link (Vercel) and deployed backend (Supabase, Render, Railway), this would be major bonus points.
- Reservations feature that decrements stock.
- Extra tests, optimistic UI, realtime updates.

---

## Timebox & priorities

- **Core (must):** Auth, protected routes, items list + pagination + search, item details, image upload, role enforcement, one test, README, CI. — *6–10 hours*
- **Stretch (nice):** reservations, tests, deployment, better UX. — *only if time allows*

If you must cut scope, finish a smaller set of features well and document what you omitted and why in `NOTES.md`.

---

## Minimal data model (suggested)

You can adapt this to your implementation, but keep these fields available:

**User**
- `id` (uuid)
- `email` (string)
- `password_hash` (or managed by Supabase)
- `role` (`user` | `admin`)

**Item**
- `id` (uuid)
- `name` (string)
- `sku?` (string)
- `description?` (text)
- `quantity` (integer)
- `price?` (decimal)
- `image_url?` (string)
- `created_by` (user id)
- timestamps

**Reservation** (optional)
- `id`, `item_id`, `user_id`, `quantity`, `status`, timestamps

---

## Suggested API contract (if using Express)

All endpoints should return JSON and appropriate HTTP status codes.

```http
POST /api/auth/register
Content-Type: application/json
Body: { "email": "a@b.com", "password": "secret" }
```

```http
POST /api/auth/login
Body: { "email", "password" } -> returns token or sets session
```

```http
GET /api/items?search=&page=1&pageSize=10
Response: { items: [...], meta: { page, pageSize, total } }
```

```http
GET /api/items/:id
POST /api/items        (admin) - form-data for image
PUT /api/items/:id     (admin)
DELETE /api/items/:id  (admin)
POST /api/items/:id/reserve  (user) - { quantity }
```

If using Supabase/AppWrite you can rely on client SDKs for auth and storage and may not need server endpoints for every action.

#### You are entirely free to choose your own backend structure/setup.

---

## Frontend pages — expected

- `/` — items list with search + pagination
- `/item/[id]` — item details + reserve button (for users)
- `/login`, `/register`
- `/admin/new`, `/admin/[id]/edit` — admin-only pages
- Small header showing user avatar/email + role

Design should be *responsive* and *usable*. Use Tailwind CSS, you are free use whatever component library you prefer, for example ShadCN UI.

---

## UX & behavior expectations

- Validations on forms (client and server-side where applicable).
- Friendly error messages (API errors, validation errors).
- Disable submit buttons while requests are in-flight.
- Image preview after upload (optional but nice).
- Role enforcement both in the UI (hide admin buttons) and on the server/API.

---

## Setup & run (what we expect you to document in README)

Include the following in your repo’s top-level README:

1. **Prereqs** (Node v18+, pnpm/yarn/npm)
2. **Env vars** and `.env.example` contents (do **not** commit secrets)
3. How to run locally:
   - `npm install`
   - `npm dev` (or `pnpm run dev`)
4. How to run backend (if Express): `npm start:api` or `npm run dev:api`
5. How to run tests: `npm test`
6. How to run migrations/seed (if any)
7. How to deploy or sample deployed URLs

**Example `.env.example`**

```env
# Frontend
NEXT_PUBLIC_APP_NAME=InventoryTest
NEXT_PUBLIC_API_URL=http://localhost:4000

# Supabase (if using)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=anon_key

# Backend (if using Express)
DATABASE_URL=postgres://test:test@localhost:5432/testdb
JWT_SECRET=replace_with_secure_value_for_production
PORT=4000
```

## Evaluation rubric (high level)

- **Functionality (40 pts)** — auth, CRUD, image upload, pagination/search, role enforcement
- **Code quality (20 pts)** — structure, TypeScript usage, typing
- **UI/UX (20 pts)** — responsive, clear validations & errors
- **Docs & setup (10 pts)** — README, `.env.example`, setup steps
- **Tests (5 pts)** — at least one meaningful test
- **Extras (5 pts)** — deployment, stretch features, additional tests

Passing score ≈ 65/100. If anything is missing, explain it in `NOTES.md`.

---

## Submission checklist (put this in the repo root)

- [ ] Public repo URL
- [ ] `README.md` with run instructions (this file)
- [ ] `.env.example`
- [ ] `NOTES.md` describing tradeoffs and known limitations
- [ ] At least one automated test
- [ ] Clear commit history (small, focused commits)

---

## Hints & pitfalls

- Keep secrets OUT of the repo.
- If you want a fast backend, **Supabase** is recommended — it handles DB, auth and storage and saves setup time.
- If you build a local Express backend for the test and want reproducible DB, provide a `docker-compose.yml` or use **SQLite**.
- Limit scope. It’s better to finish a small, polished product than to deliver many half-finished features.
- Use TypeScript reasonably — avoid `any` as a crutch, but don’t spend hours chasing perfect types. If `any` is used, please explain why in code comments or in your `NOTES.md` file.

---

## Notes for you (optional)

- If you diverge from the spec, document the assumptions and tradeoffs in `NOTES.md`.
- Provide at least one admin user seeded or describe how to create one in the README.

---

Good luck — we look forward to reviewing your submission. If anything in the spec is unclear, document your assumption(s) in `NOTES.md` rather than spending time asking clarifying questions.

