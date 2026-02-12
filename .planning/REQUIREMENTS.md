# Requirements: DesignCritic

**Defined:** 2026-02-12
**Core Value:** Designers get actionable, structured feedback on any UI screenshot instantly

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Upload

- [ ] **UPLD-01**: Designer can upload a UI screenshot via drag-and-drop or file picker
- [ ] **UPLD-02**: App accepts PNG, JPG, and WebP formats only
- [ ] **UPLD-03**: App validates file size (max 10MB) and shows error for invalid files
- [ ] **UPLD-04**: App compresses/resizes images client-side before sending (max 2000px)
- [ ] **UPLD-05**: Designer can see a preview of the uploaded image

### Configuration

- [ ] **CONF-01**: Designer can select an industry context (SaaS, Healthcare, Consumer, Ecommerce, Fintech)
- [ ] **CONF-02**: Designer can select a critique tone (Constructive or Roast)

### AI Engine

- [ ] **AI-01**: API route sends image + assembled prompt to Claude via server-side route
- [ ] **AI-02**: System prompt uses structured tool_use for guaranteed JSON output
- [ ] **AI-03**: Prompt injects domain-specific heuristics based on selected industry context
- [ ] **AI-04**: Prompt adjusts tone based on selected critique tone
- [ ] **AI-05**: Critiques reference specific visual elements in the uploaded image
- [ ] **AI-06**: Critique returns in under 10 seconds

### Display

- [ ] **DISP-01**: Critique displays in 4 structured sections: What Works, Usability Risks, Visual Hierarchy Issues, Concrete Improvements
- [ ] **DISP-02**: Each section shows scannable summary (2-4 bullets) with expandable deeper explanations
- [ ] **DISP-03**: Loading state shows engaging progress feedback during AI processing
- [ ] **DISP-04**: Error states display gracefully for API failures, timeouts, and invalid input
- [ ] **DISP-05**: Designer can copy full critique to clipboard with one click

### Infrastructure

- [ ] **INFR-01**: ANTHROPIC_API_KEY stored server-side only (never exposed to client)
- [ ] **INFR-02**: App deploys to Vercel from GitHub with zero-config
- [ ] **INFR-03**: App works without sign-up, accounts, or saved state

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Landing Page

- **LAND-01**: Hero section with clear value proposition and CTA
- **LAND-02**: Pre-generated sample critiques showing tool quality
- **LAND-03**: All-in-one page layout (hero + samples + working tool)

### Growth

- **GROW-01**: Rate limiting per IP to prevent API abuse
- **GROW-02**: Analytics integration (Plausible or Vercel Analytics)
- **GROW-03**: SEO meta tags and OG image for social sharing

### Monetization

- **MONE-01**: User accounts with email/password signup
- **MONE-02**: Saved critique history per user
- **MONE-03**: Usage-based paywall (3 free critiques/day, Pro unlimited)
- **MONE-04**: Stripe payment integration

### Advanced Features

- **ADVF-01**: Figma plugin for in-tool critique
- **ADVF-02**: Comparison mode (upload two versions, get diff-style critique)
- **ADVF-03**: Custom style guide upload for calibrated critiques
- **ADVF-04**: Team dashboard with shared workspace

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| User accounts / sign-up | Zero friction for V1 — validate demand first |
| Database / saved history | Stateless V1 avoids privacy and storage complexity |
| Payments / Stripe | Free to validate, monetize after traction (100+ users) |
| Figma plugin | Separate development track, screenshots work fine for V1 |
| Team features / collaboration | Single player only for V1 |
| Native mobile app | Responsive web only, designers are on desktop |
| Real-time streaming responses | Adds complexity, full response is only 5-10s |
| AI-generated visual fix suggestions | Image generation unreliable for UI mockups |
| Design scoring / grading | Numbers feel arbitrary, qualitative feedback is more actionable |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| UPLD-01 | TBD | Pending |
| UPLD-02 | TBD | Pending |
| UPLD-03 | TBD | Pending |
| UPLD-04 | TBD | Pending |
| UPLD-05 | TBD | Pending |
| CONF-01 | TBD | Pending |
| CONF-02 | TBD | Pending |
| AI-01 | TBD | Pending |
| AI-02 | TBD | Pending |
| AI-03 | TBD | Pending |
| AI-04 | TBD | Pending |
| AI-05 | TBD | Pending |
| AI-06 | TBD | Pending |
| DISP-01 | TBD | Pending |
| DISP-02 | TBD | Pending |
| DISP-03 | TBD | Pending |
| DISP-04 | TBD | Pending |
| DISP-05 | TBD | Pending |
| INFR-01 | TBD | Pending |
| INFR-02 | TBD | Pending |
| INFR-03 | TBD | Pending |

**Coverage:**
- v1 requirements: 21 total
- Mapped to phases: 0
- Unmapped: 21

---
*Requirements defined: 2026-02-12*
*Last updated: 2026-02-12 after initial definition*
