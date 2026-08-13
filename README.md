## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

- `/` — Home (hero, what I offer, skills, 3 projects/category, CTA)
- `/about` — About, offerings, education, courses
- `/projects` — Full project list
- `/contact` — Contact form
- `/admin` — CMS login → `/admin/dashboard`

## CMS setup

Add these to `.env.local` (see `.env.example`):

- `MONGODB_URI` — MongoDB Atlas connection string
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — dashboard login
- `AUTH_SECRET` — random secret for session cookies
- `CLOUDINARY_*` — optional image uploads (or paste URLs in admin)
- `NEXT_PUBLIC_EMAILJS_*` — contact form

Then seed default content:

```bash
npm run seed
```

Or use **Seed database** inside `/admin/dashboard` after logging in.

Without MongoDB, the public site still runs using built-in fallback data from `src/lib/data.ts`.
