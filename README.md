# Aditya Gambhir — Portfolio

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**A bold, modern single-page portfolio — Software Engineer & Applied AI.**

[🌐 Live](https://aditya-gambhir-portfolio.vercel.app/)

</div>

---

## Overview

A single-page portfolio (`/`) with a dedicated projects page (`/projects`). Sections: **Hero → About → Skills → Projects → Experience → Contact**. Electric-violet→indigo identity in OKLCH, full light/dark themes (no flash), Geist typography, an animated gradient-mesh background, glassmorphism, cursor-spotlight cards, an animated nav pill, count-up stats, a scroll-driven timeline, a résumé modal, and a working contact form. All motion is `prefers-reduced-motion` aware, and content is visible without JS.

## Tech stack

| Area      | Choice                                                                      |
| --------- | --------------------------------------------------------------------------- |
| Framework | **Next.js 16** (App Router, Turbopack, **React Compiler**)                  |
| UI        | **React 19**, TypeScript (strict)                                           |
| Styling   | **Tailwind CSS v4** (OKLCH tokens via `@theme inline`), Geist (Sans + Mono) |
| Theming   | **next-themes** (class-based, blocking anti-flash script)                   |
| Contact   | **Resend** email API + honeypot spam trap                                   |
| Deploy    | Vercel                                                                      |

## Getting started

Requires **Node ≥ 20.9**.

```bash
npm install
cp .env.example .env.local   # add your RESEND_API_KEY
npm run dev                  # http://localhost:3000
```

### Environment

```env
RESEND_API_KEY=re_...                              # required for the contact form
CONTACT_FROM=Portfolio Contact <you@yourdomain>    # verified Resend sender
CONTACT_TO=gambhir.aditya19@gmail.com              # where messages are delivered
```

Without `RESEND_API_KEY`, the contact API returns a graceful `503` and the rest of the site works.

## Scripts

| Script                        | Purpose                  |
| ----------------------------- | ------------------------ |
| `npm run dev`                 | Dev server (Turbopack)   |
| `npm run build` / `npm start` | Production build / serve |
| `npm run type-check`          | `tsc --noEmit`           |
| `npm run lint`                | ESLint                   |
| `npm run format`              | Prettier                 |

## Structure

```
src/
├── app/                  # App Router (layout, page, /projects, api/contact, robots, sitemap)
├── components/           # PortfolioClient (the page), ProjectsGrid, theme-provider
├── data/                 # All content: about, projects, resume, socials, metadata
├── lib/                  # logger, validation (contact API)
└── app/globals.css       # design tokens + animations
```

Content lives in `src/data/*` — editing copy is a data change, not a component hunt.

## License

MIT.
