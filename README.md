# F99 Solution — Digital Marketing Agency Website

A production-ready agency website with a 3D hero, service/portfolio/blog/pricing pages, free lead-magnet
tools, a lead-capturing backend and a mini-CRM admin panel.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · GSAP + Lenis ·
React Three Fiber · MongoDB (Mongoose) · Auth.js (credentials) · Nodemailer · Zod + React Hook Form · MDX.

---

## 1. Quick start

Requirements: **Node.js 20+** and a **MongoDB** database (local, or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster).

```bash
npm install
cp .env.example .env.local        # Windows (cmd): copy .env.example .env.local
# edit .env.local — see the table below
npm run seed:admin                # creates your admin login
npm run dev                       # http://localhost:3000
```

The public site works without MongoDB (forms need it). Admin needs `MONGODB_URI` + `AUTH_SECRET`.

## 2. Environment variables

| Variable                                          | Required        | Purpose                                                                                |
| ------------------------------------------------- | --------------- | -------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                            | Yes (prod)      | Public URL, no trailing slash. Drives canonical URLs, sitemap, schema. **Build-time.** |
| `MONGODB_URI`                                     | Yes             | MongoDB connection string (local or Atlas).                                            |
| `AUTH_SECRET`                                     | Yes (admin)     | Signs admin sessions. Generate: `npx auth secret`.                                     |
| `AUTH_TRUST_HOST`                                 | Non-Vercel only | Set `true` when self-hosting behind a proxy.                                           |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD`                   | For seeding     | Used only by `npm run seed:admin` (password ≥ 10 chars).                               |
| `ADMIN_NAME`                                      | Optional        | Display name for the seeded admin.                                                     |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`           | For email       | If `SMTP_HOST` is empty, leads are still saved and emails are skipped.                 |
| `SMTP_USER`, `SMTP_PASS`                          | For email       | SMTP credentials (Gmail: use an App Password).                                         |
| `MAIL_FROM`, `ADMIN_NOTIFY_EMAIL`                 | For email       | Sender address and where new-lead alerts go.                                           |
| `NEXT_PUBLIC_GA4_ID`, `_GTM_ID`, `_META_PIXEL_ID` | Optional        | Each tracker loads only if set **and** the visitor accepts cookies.                    |

> `NEXT_PUBLIC_*` variables are baked into the build. Change them → redeploy.

## 3. Make it yours (no code hunting)

| Change this…                                                 | Edit this file                                                                                       |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| Agency name, phone, email, WhatsApp, address, hours, socials | [config/site.ts](config/site.ts) (keep `hoursSpec` in sync with `hours`)                             |
| Navigation and footer links                                  | [config/nav.ts](config/nav.ts)                                                                       |
| All 17 services (copy, process, FAQs, tools)                 | [data/services.ts](data/services.ts)                                                                 |
| Homepage stats, logos, FAQs, testimonial fallbacks           | [data/home.ts](data/home.ts)                                                                         |
| Pricing plans and quarterly discount                         | [data/pricing.ts](data/pricing.ts)                                                                   |
| About page, values, tools, certifications                    | [data/about.ts](data/about.ts)                                                                       |
| Sample case studies                                          | [data/case-studies.ts](data/case-studies.ts)                                                         |
| Job openings                                                 | [data/careers.ts](data/careers.ts)                                                                   |
| Blog posts                                                   | add `.mdx` files to [content/blog/](content/blog)                                                    |
| Brand colours (accent, dark/light)                           | top of [app/globals.css](app/globals.css)                                                            |
| Privacy Policy / Terms text                                  | [app/privacy-policy/page.tsx](app/privacy-policy/page.tsx), [app/terms/page.tsx](app/terms/page.tsx) |

### ⚠️ Replace the SAMPLE content before launch

The following are **fictional placeholders** (labelled "sample" in the UI and in code comments). Never
present them as real:

- Client logos, stats, testimonials → `data/home.ts`
- Case studies and their numbers → `data/case-studies.ts`
- Pricing figures → `data/pricing.ts`
- Phone, email, WhatsApp, address, social links → `config/site.ts`
- Certifications and founder photo → `data/about.ts` / About page
- Privacy Policy and Terms are **templates** — have a qualified professional review them.

Real testimonials and case studies can also be added in **/admin**; once any are published there, they
replace the samples on the site automatically.

## 4. Admin panel / mini-CRM

1. Put `MONGODB_URI`, `AUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` in `.env.local`.
2. `npm run seed:admin` (re-run any time to reset the password).
3. Sign in at **/admin/login**.

Includes: dashboard (totals, this week, by service, by source, follow-ups due), leads table (search; filter
by status/service/source/date; pagination), lead detail (status New → Contacted → Proposal Sent → Won/Lost,
notes, follow-up date), **CSV export** of the filtered list, and CRUD for testimonials and case studies.

## 5. How the backend works

All forms (contact, free audit, ROI report, newsletter, exit-intent popup) `POST` to `/api/leads`:

1. Reject oversized/invalid JSON → 2. silently drop honeypot hits → 3. validate with the shared Zod schemas
   (`lib/validators.ts`) → 4. rate-limit **5 submissions / IP / 10 min** (MongoDB-backed, serverless-safe) →
2. save the lead → 6. email the admin and auto-reply to the visitor (sent after the response).

Admin sign-in is limited to 10 attempts / IP / 15 min. Every admin page and API route re-verifies the signed
session; `proxy.ts` is only a convenience redirect.

## 6. Deploy to Vercel + MongoDB Atlas

### a) MongoDB Atlas

1. Create a free cluster at [cloud.mongodb.com](https://cloud.mongodb.com).
2. **Database Access** → add a user with a strong password (read/write on one database).
3. **Network Access** → add `0.0.0.0/0` (Vercel's IPs are dynamic). Safe because the user/password protect the DB.
4. **Connect → Drivers** → copy the connection string and add your database name:
   `mongodb+srv://USER:PASS@CLUSTER.mongodb.net/f99-solution?retryWrites=true&w=majority`
   (URL-encode special characters in the password).

### b) Create the admin user in Atlas

Run once from your computer, temporarily pointing `.env.local` at the Atlas URI:

```bash
# .env.local: MONGODB_URI=<Atlas string>, ADMIN_EMAIL=..., ADMIN_PASSWORD=...
npm run seed:admin
```

### c) Deploy on Vercel

1. Push the project to GitHub and **Import** it at [vercel.com/new](https://vercel.com/new) (framework: Next.js, auto-detected).
2. **Settings → Environment Variables** — add (for Production): `NEXT_PUBLIC_SITE_URL` (your final domain,
   e.g. `https://www.yourdomain.in`), `MONGODB_URI`, `AUTH_SECRET`, the SMTP variables, `MAIL_FROM`,
   `ADMIN_NOTIFY_EMAIL`, and any analytics IDs. You do **not** need `ADMIN_EMAIL/PASSWORD` on Vercel.
3. **Deploy.** Then add your custom domain under **Settings → Domains** and redeploy if you changed
   `NEXT_PUBLIC_SITE_URL`.

### d) After the first deploy — checklist

- [ ] Open `/admin/login` and sign in; submit the contact form and confirm the lead appears and emails arrive.
- [ ] Visit `/sitemap.xml` and `/robots.txt`; submit the sitemap in Google Search Console.
- [ ] Test the share image: `/opengraph-image`.
- [ ] Replace all SAMPLE content (section 3) and review the legal pages.
- [ ] Verify tracking in GA4/Meta Events Manager after accepting the cookie banner.

**Email on Vercel:** use an SMTP provider with generous limits (Brevo, Amazon SES, Zoho, Resend SMTP) for
production. Gmail works for low volume with an App Password.

## 7. Scripts

| Command              | Purpose                                   |
| -------------------- | ----------------------------------------- |
| `npm run dev`        | Development server                        |
| `npm run build`      | Production build                          |
| `npm start`          | Run the production build                  |
| `npm run lint`       | ESLint                                    |
| `npm run typecheck`  | TypeScript check                          |
| `npm run format`     | Prettier (Tailwind-aware)                 |
| `npm run seed:admin` | Create / reset the admin user from `.env` |

## 8. Project structure

```
app/            routes (public pages, /admin, /api)
components/     ui · layout · sections · three (3D) · admin · seo · analytics
config/         site + navigation configuration
data/           editable content (services, pricing, case studies, ...)
content/blog/   MDX blog posts
lib/            validators, db, mail, rate-limit, SEO, consent, utilities
models/         Mongoose models (Lead, Testimonial, CaseStudy, AdminUser, RateLimit)
scripts/        seed-admin.mjs
proxy.ts        optimistic redirect for /admin (Next 16 "middleware")
```

## 9. Performance, accessibility & testing notes

Verified on the production build with Lighthouse (headless Chrome, local server):

- **Desktop (home):** Performance 85–98 with the 3D hero (inner pages without 3D: 99–100), Best Practices 100, SEO 100. Accessibility is 96 on desktop: an audit snapshot can catch two moving hero cards partly overlapping, which shrinks one card's clickable area below 24 px (WCAG target size). It is 100 on mobile.
- **Mobile (simulated, throttled), home page:** Performance **74–78 with the 3D scene on phones** (LCP ≈ 1 s; the cost is JavaScript / blocking time, TBT ≈ 1.1–1.4 s, and ~+350 KB) vs **88–91 with phones on the static orb**. So the 3D scene on phones costs about 12–15 points and sits **below the 85+ target**. Inner pages without 3D: 88–96 (not re-measured after the hero redesign). Accessibility 100, Best Practices 100, SEO 100. Run-to-run variance is about ±8.
- **3D hero:** a NASA Blue Marble Earth with a day/night shader (city lights from NASA Black Marble on the dark side), lit clouds, a fresnel atmosphere, 4 glowing rings (3 blue, 1 orange) with travelling light particles, drifting glass shards, Bloom (post-processing), and 8 orbiting glass service cards that are real links (hover pauses the orbit, Tab-focusable, click navigates). Cards are driven by the `hero` field in [data/services.ts](data/services.ts) (label, phone label, order, optional brand icon), not hard-coded. Lazy-loaded after the browser is idle, `dpr` capped at `[1, 2]`, rendering paused when scrolled off-screen. The orbit is fitted to the canvas size and re-fitted on resize. Desktop loads ~480 KB of WebP textures. **Under 768 px** (and on weaker devices): 1024px textures (~75 KB), no clouds, no Bloom, fewer particles, a smaller Earth below the hero text, and 4 compact cards. `prefers-reduced-motion`: no spin, no orbit, no particle or shard motion, a still, deliberately composed frame, and rendering on demand. Devices with ≤ 2 cores / ≤ 2 GB RAM get the static orb. If WebGL or a texture fails, the orb is shown instead of an error.
- **Phones and the 85+ target:** to put phones back on the static orb (recovers the ~12–15 mobile points), set `SCENE_ON_PHONES = false` at the top of [components/three/hero-canvas.tsx](components/three/hero-canvas.tsx).
- A crawl of all 39 sitemap pages found no broken internal links and exactly one `h1`, title, description and canonical per page.
- Browser tests cover navigation, theme toggle, pricing toggle, filters, search, ROI calculator, every form, the cookie banner, consent-gated tracking, exit-intent popup, and the mobile menu.

Re-run Lighthouse yourself after you replace the placeholder content and connect real analytics, since
third-party scripts (GA/GTM/Pixel) will affect scores.

## 10. Known limitations

- Lighthouse performance on phones depends on the device/network; third-party trackers lower it.
- Sample case studies/testimonials stay visible until you publish real ones in `/admin`.
- Rate limiting keys on the client IP from proxy headers; behind an untrusted proxy, configure it to set `x-forwarded-for` correctly.
- Emails are sent after the response; if your SMTP is down, the lead is saved but the email is only logged.

## 12. SEO content system

- **One plan, one file.** [data/seo-keywords.ts](data/seo-keywords.ts) holds, for every page, one primary keyword, 3–5 secondary keywords, the `<title>` (50–60 characters, primary keyword first, brand last) and the meta description (140–160 characters, benefit + call to action). Pages read it through `buildMetadata()` in [lib/metadata.ts](lib/metadata.ts), which also sets the canonical URL, Open Graph and Twitter tags **and the share image** (pages that define their own `openGraph` do not inherit the root image automatically).
- **Voice.** Everywhere except the About page the site speaks as the company ("we", "our team"). The founder (name, MCA, experience, quote, photo slot) appears **only** on `/about`, with `Person` JSON-LD linked to the `Organization` via `founder`. Emails are signed "Team F99 Solution"; blog posts are authored by "F99 Solution Team".
- **Service pages** are generated from [data/services.ts](data/services.ts) + [data/service-content/](data/service-content): ~900–1,300 words each (what it is, who needs it, approach, process, common mistakes, what we measure, deliverables, tools, cost factors, honest results, 7–8 FAQs), `Service` + `FAQPage` + `BreadcrumbList` schema, 3 related services, a related guide and the contact page, all with descriptive anchor text.
- **Local SEO.** "Areas we serve" (Mumbai, Thane, Navi Mumbai, Pune, all of India, international) comes from `siteConfig.areasServed` and feeds both the on-page section and the `ProfessionalService` (LocalBusiness) schema together with the address and hours in `config/site.ts`.
- **Blog.** Three in-depth guides (1,500+ words) with an automatic table of contents, published/updated dates and `BlogPosting` schema. The three earlier sample posts redirect (301) to the new guides.
- **Trust (E-E-A-T).** The "How we work" block states only things the business actually does (documented process, monthly reporting, client-owned accounts, privacy-aware data handling). **No client names, awards, reviews or statistics are claimed**; anything illustrative is labelled SAMPLE.
- **Verify it.** With the site running: `npm run seo:check -- http://localhost:3000` crawls the sitemap and checks one H1, title/description lengths, canonical, valid JSON-LD, primary keyword in the H1 and first 100 words, word-count targets, banned phrases, and that the founder appears only on `/about`.
- **Images.** When you add real images use descriptive file names (e.g. `ahsan-founder-director-f99-solution.webp`) and keyword-aware alt text; the founder photo slot takes its alt text from config automatically.

## 13. Credits

All textures live in `public/textures/` and were resized and converted to WebP by us (2048×1024 and 1024×512).

| Texture                                | Source                                                                                                                                                                                                                                                                                    | Licence / terms                                                                       |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `earth-day-*.webp` (day map)           | **NASA Earth Observatory — [Blue Marble: Next Generation with Topography and Bathymetry](https://science.nasa.gov/earth/earth-observatory/blue-marble-next-generation/base-topography-bathymetry)** (July composite, 5400×2700 JPEG)                                                      | NASA imagery — see "NASA terms" below                                                 |
| `earth-night-*.webp` (city lights)     | **NASA Earth Observatory — [Black Marble 2016](https://science.nasa.gov/earth/earth-observatory/earth-at-night/maps/)** (`BlackMarble_2016_01deg.jpg`, Suomi NPP VIIRS data)                                                                                                              | NASA imagery — see "NASA terms" below                                                 |
| `earth-clouds-1024.webp` (cloud layer) | **[Solar System Scope](https://www.solarsystemscope.com/textures/)** textures ("based on NASA elevation and imagery data"), via the [three.js repo](https://github.com/mrdoob/three.js/tree/dev/examples/textures/planets) (`earth_bump_roughness_clouds_4096.jpg`, blue channel → alpha) | **CC BY 4.0** — commercial use allowed **with attribution** (kept in the site footer) |

**NASA terms.** NASA's [Images and Media Usage Guidelines](https://www.nasa.gov/nasa-brand-center/images-and-media/) state that NASA content — including "texture maps" for 3D models — is "generally not subject to copyright in the United States", that it may be used for informational purposes including web pages, that **NASA should be acknowledged as the source**, and that commercial use **must not explicitly or implicitly convey NASA's endorsement** of goods or services. We acknowledge NASA in the footer and state that this site is not affiliated with NASA. Do not add NASA logos or imply endorsement.

> Why not NASA clouds? NASA's original cloud-map download is no longer reachable at its old address, so the cloud layer uses the Solar System Scope map instead (hence the extra CC BY attribution). Swapping in a NASA cloud map later only needs a replacement `earth-clouds-1024.webp` (white RGB + the cloud density in the alpha channel).

Software: [three.js](https://threejs.org/) (MIT), [React Three Fiber](https://r3f.docs.pmnd.rs/), [drei](https://github.com/pmndrs/drei) and [@react-three/postprocessing](https://github.com/pmndrs/react-postprocessing) / [postprocessing](https://github.com/pmndrs/postprocessing) (all MIT).
