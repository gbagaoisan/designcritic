# Phase 1 Research: Foundation

**Phase:** 1 — Foundation
**Goal:** Project runs locally and deploys to Vercel with secure Claude API integration
**Researched:** 2026-02-12

## What This Phase Needs

Phase 1 sets up the project scaffolding. Three requirements:
- **INFR-01**: ANTHROPIC_API_KEY stored server-side only
- **INFR-02**: App deploys to Vercel from GitHub
- **INFR-03**: App works without sign-up or saved state

## Key Implementation Details

### Next.js 15 Project Setup
- Use `create-next-app` with App Router, TypeScript, Tailwind, ESLint, `src/` directory
- Command: `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --use-npm`
- App Router is the default — no Pages Router config needed

### ShadCN/ui Initialization
- Run `npx shadcn@latest init` after Next.js setup
- Select "New York" style (cleaner, more professional)
- This creates `components/ui/` directory and `lib/utils.ts`
- Add initial components: `npx shadcn@latest add button card`

### Environment Variables
- Create `.env.local` with `ANTHROPIC_API_KEY=your-key-here`
- Add `.env.local` to `.gitignore` (Next.js does this by default)
- **CRITICAL**: Do NOT use `NEXT_PUBLIC_` prefix — this exposes to client bundle
- For Vercel: set env var in dashboard under Project Settings → Environment Variables

### Vercel Deployment
- Connect GitHub repo to Vercel
- Next.js is auto-detected — zero config needed
- Framework preset: Next.js (automatic)
- Build command: `next build` (default)
- Output directory: `.next` (default)

### Minimal API Route (Smoke Test)
- Create `/api/health` route to verify server-side code works
- Create `/api/critique` stub that returns mock data (proves API route pattern works)
- This validates the API route → Claude pattern without needing a full prompt yet

### Project Structure (Foundation)
```
src/
├── app/
│   ├── layout.tsx         # Root layout with fonts, metadata
│   ├── page.tsx           # Minimal home page (placeholder)
│   └── api/
│       └── critique/
│           └── route.ts   # Stub API route (mock response)
├── components/
│   └── ui/                # ShadCN components
├── lib/
│   └── utils.ts           # ShadCN utility (auto-generated)
└── types/
    └── critique.ts        # TypeScript types for critique structure
```

## Dependencies to Install

```bash
# Core (via create-next-app)
# next, react, react-dom, typescript, tailwindcss, eslint

# Claude API client
npm install @anthropic-ai/sdk

# Validation
npm install zod
```

## Gotchas
- `create-next-app` will ask if you want to use Turbopack — say yes for faster dev
- ShadCN init may ask about `globals.css` path — it's `src/app/globals.css` with src dir
- The `.env.local` file must be at project root, not inside `src/`
- Vercel auto-deploys on git push — ensure no secrets in committed code

## What NOT to Build Yet
- No upload component (Phase 3)
- No prompt engineering (Phase 2)
- No full Claude integration (Phase 2)
- No UI beyond a minimal placeholder page
- Just: scaffolding + env config + API stub + deploy pipeline

---
*Research for Phase 1: Foundation*
