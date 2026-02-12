# DesignCritic

## What This Is

A single-page web app where designers upload a UI screenshot, pick an industry context and critique tone, and get a structured senior-level design critique back in seconds. Think of it as having a senior designer on call 24/7 — no sign-up, no waiting for peer feedback, no posting in Slack and hoping someone responds.

## Core Value

Designers get actionable, structured feedback on any UI screenshot instantly — the upload-to-critique loop must work fast and feel useful.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Designer can upload a UI screenshot (PNG, JPG) via drag-and-drop or file picker
- [ ] Designer can select an industry context (SaaS, Healthcare, Consumer, Ecommerce, Fintech)
- [ ] Designer can select a critique tone (Constructive or Roast)
- [ ] Critique returns structured into 4 sections: What Works, Usability Risks, Visual Hierarchy Issues, Concrete Improvements
- [ ] Each section shows a scannable summary (2-4 bullets) with expandable deeper explanations per point
- [ ] Critique returns in under 10 seconds
- [ ] Single page with hero section, sample critiques, and the working upload tool all-in-one
- [ ] Works without sign-up, accounts, or saved state
- [ ] Loading state while critique is being generated
- [ ] Error handling for failed API calls or invalid uploads

### Out of Scope

- User accounts or sign-up — zero friction for V1, validate demand first
- Saved critique history — ephemeral for V1, add database later
- Payments / Stripe — free to validate, monetize after traction
- Figma plugin — screenshots work fine, plugin is a V2 convenience feature
- Team features / collaboration — single player only for V1
- Native mobile app — responsive web only, designers are on desktop
- Comparison mode (upload two versions) — V2 feature
- Custom style guides — V2 feature

## Context

- Weekend MVP — optimized for speed-to-ship
- Target users: solo designers, junior designers, freelancers, design contractors
- The real product moat is prompt quality, not code — domain-specific context injection (e.g., Healthcare gets accessibility/trust signal heuristics) and critique structure are what make feedback useful vs. generic
- System prompt uses a "senior product designer with 15+ years experience" persona
- Context injection means each industry dropdown option adds domain-specific design heuristics to the prompt
- V1 is stateless — image goes to Claude, critique comes back, nothing stored

## Constraints

- **Tech stack**: Next.js + Tailwind CSS + ShadCN + Claude API (Sonnet) — decided, not negotiable for V1
- **Hosting**: Vercel free tier — one-click deploy from GitHub
- **No database**: Stateless for V1 to avoid privacy/storage complexity
- **Budget**: ~$0-30 to launch (free tiers + Claude API pay-per-use at ~$0.01-0.03 per critique)
- **Image handling**: Client-side only — images sent directly to Claude API via backend, not stored

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js + Tailwind + ShadCN | Fast to build, great DX, polished accessible components out of the box | -- Pending |
| Claude Sonnet for vision | Best vision model for the price, native image analysis | -- Pending |
| No database for V1 | Ship fast, avoid privacy/storage headaches, validate demand first | -- Pending |
| Adjustable critique tone | Lets users choose between playful roast and professional feedback — differentiator | -- Pending |
| Expandable critique depth | Quick summary for scanning + deeper explanations for learning — best of both | -- Pending |
| All-in-one page | Hero + samples + working tool on single page reduces friction | -- Pending |

---
*Last updated: 2026-02-12 after initialization*
