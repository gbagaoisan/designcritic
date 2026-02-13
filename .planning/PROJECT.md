# DesignCritic

## What This Is

A single-page web app where designers upload a UI screenshot, pick an industry context and critique tone, and get a structured senior-level design critique back in seconds. Built with Next.js 15, Tailwind CSS 4, ShadCN/ui, and Claude Sonnet 4.5 Vision API. No sign-up, no waiting for peer feedback.

## Core Value

Designers get actionable, structured feedback on any UI screenshot instantly — the upload-to-critique loop must work fast and feel useful.

## Requirements

### Validated

- ✓ Designer can upload a UI screenshot (PNG, JPG, WebP) via drag-and-drop or file picker — v1.0
- ✓ App validates file format and size (max 10MB) with clear error messages — v1.0
- ✓ Images auto-compressed client-side (max 2000px) before API submission — v1.0
- ✓ Designer sees preview of uploaded image — v1.0
- ✓ Designer can select industry context (SaaS, Healthcare, Consumer, Ecommerce, Fintech) — v1.0
- ✓ Designer can select critique tone (Constructive or Roast) — v1.0
- ✓ Critique returns structured JSON with 4 sections via forced tool_use — v1.0
- ✓ Each section shows scannable summary with expandable deeper explanations — v1.0
- ✓ Industry-specific domain heuristics (150-250 words each) inject into prompt — v1.0
- ✓ Critique tone adjusts language and delivery — v1.0
- ✓ Loading state with rotating progress messages during AI processing — v1.0
- ✓ Error handling for API failures, timeouts, and invalid uploads — v1.0
- ✓ Copy full critique to clipboard with one click — v1.0
- ✓ ANTHROPIC_API_KEY stored server-side only — v1.0
- ✓ App deploys from GitHub (Vercel connection pending user action) — v1.0
- ✓ Works without sign-up, accounts, or saved state — v1.0

### Active

(None — next milestone requirements defined via `/gsd:new-milestone`)

### Out of Scope

- User accounts / sign-up — zero friction validated, add when demand proven
- Database / saved history — stateless V1 avoids privacy and storage complexity
- Payments / Stripe — free to validate, monetize after traction (100+ users)
- Figma plugin — separate development track, screenshots work fine for V1
- Team features / collaboration — single player only for V1
- Native mobile app — responsive web only, designers are on desktop
- Real-time streaming responses — full response is only 5-10s, complexity not justified
- AI-generated visual fix suggestions — image generation unreliable for UI mockups
- Design scoring / grading — qualitative feedback is more actionable than numbers
- Landing page / hero / samples — deferred to v1.1, pure core loop validated first

## Context

Shipped v1.0 MVP with 1,190 LOC TypeScript in 2 days.
Tech stack: Next.js 15, Tailwind CSS 4, ShadCN/ui, Claude Sonnet 4.5 Vision API.
GitHub repo: gbagaoisan/designcritic (public).
Vercel deployment ready (user needs to connect dashboard + set ANTHROPIC_API_KEY env var).
Stateless architecture — images sent as base64, nothing stored.
Product moat is prompt quality: 5 industry-specific heuristic sets (150-250 words each) with domain-specific focus areas.

## Constraints

- **Tech stack**: Next.js 15 + Tailwind CSS 4 + ShadCN/ui + Claude API (Sonnet 4.5) — decided, not negotiable for V1
- **Hosting**: Vercel free tier — one-click deploy from GitHub
- **No database**: Stateless for V1 to avoid privacy/storage complexity
- **Budget**: ~$0-30 to launch (free tiers + Claude API pay-per-use at ~$0.01-0.03 per critique)
- **Image handling**: Client-side only — images sent directly to Claude API via backend, not stored

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js 15 + Tailwind 4 + ShadCN | Fast to build, great DX, polished accessible components | ✓ Good — shipped in 2 days |
| Claude Sonnet 4.5 for vision | Best vision model for speed/quality/price balance | ✓ Good — structured output via tool_use works perfectly |
| No database for V1 | Ship fast, avoid privacy/storage headaches | ✓ Good — stateless architecture is simpler |
| Adjustable critique tone | Differentiator — playful roast vs professional feedback | ✓ Good — roast mode still requires actionable feedback |
| Expandable critique depth | Quick summary + deeper explanations for learning | ✓ Good — multiple expandable points, not accordion |
| No landing page in V1 | Pure core loop — validate the tool before marketing | ✓ Good — reduced scope, shipped faster |
| Forced tool_use for structured output | Guarantees JSON schema compliance, no parsing needed | ✓ Good — zero fallback/parsing code needed |
| Anti-prompt-injection in system prompt | Prevents image text from hijacking Claude's behavior | ✓ Good — security without complexity |
| Canvas API for client-side compression | No server processing, 2000px max, JPEG 0.85 quality | ✓ Good — balances quality vs payload size |
| Progressive disclosure UI | Config appears after upload, critique replaces upload | ✓ Good — cleaner flow, less cognitive load |
| Vercel deployment deferred | User action needed, not blocking development | ⚠️ Revisit — user needs to connect Vercel |

---
*Last updated: 2026-02-13 after v1.0 milestone*
