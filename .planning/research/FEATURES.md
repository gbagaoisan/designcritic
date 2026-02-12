# Feature Research

**Domain:** AI-powered design critique tools
**Researched:** 2026-02-12
**Confidence:** HIGH

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these = product feels incomplete.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Image upload (drag & drop + click) | Every modern upload tool supports DnD | LOW | Use react-dropzone. Accept PNG, JPG, WebP. |
| Loading/progress indicator | Users need feedback during 5-10s AI processing | LOW | Skeleton or animated state. Critical for perceived performance. |
| Structured critique output | Users expect organized feedback, not a wall of text | MEDIUM | 4 sections with clear headers. Cards or accordion layout. |
| Error handling | API failures, invalid files, oversized images need graceful handling | LOW | Toast notifications + inline error states. |
| Mobile-responsive layout | Designers may share links to critiques on mobile | LOW | Tailwind responsive classes. Desktop-first but mobile-usable. |
| Fast response time (<10s) | AI tools that take 30s+ feel broken | MEDIUM | Claude Sonnet is fast. Stream response if needed. |
| File size/format validation | Users will upload random files, need clear limits | LOW | Client-side validation before upload. Max 5-10MB. |

### Differentiators (Competitive Advantage)

Features that set the product apart. Not required, but valuable.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Industry context selection | Domain-specific critique (Healthcare vs SaaS vs Fintech) with tailored heuristics | MEDIUM | Prompt injection per context. This is the core moat. |
| Adjustable critique tone | "Roast" vs "Constructive" — fun + functional | LOW | Prompt variation. Low effort, high engagement. |
| Expandable critique depth | Scannable summary + detailed explanations | MEDIUM | Accordion UI per bullet. Requires structured JSON from Claude. |
| "Roast My Design" branding | Playful CTA makes it shareable/viral | LOW | Copy and UX tone, not engineering effort. |
| Sample critiques on landing | Shows value before user commits to uploading | MEDIUM | Pre-generated examples. Proves the tool works. |
| Copy critique to clipboard | Designers want to paste feedback into Figma/Slack/Notion | LOW | Single button, high utility. |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but create problems.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Real-time streaming critique | "Feels faster" | Adds complexity, partial JSON parsing issues, harder error handling | Show engaging loading animation instead. Full response is only 5-10s. |
| User accounts for V1 | "Track critique history" | Adds auth complexity, database requirement, privacy concerns, slows MVP | Ephemeral usage first. Add accounts when users ask for history. |
| Figma plugin | "Critique without leaving Figma" | Plugin dev is a separate skillset, approval process, maintenance burden | Screenshot upload is fine for V1. Plugin is a clear V2. |
| AI-suggested fixes (visual) | "Show me what it should look like" | Image generation quality is unreliable for UI mockups, expensive, slow | Text-based concrete improvements with specific CSS/layout suggestions |
| Comparison mode | "Compare before/after" | Doubles image processing cost, complex UI, prompt engineering challenge | V2 feature. Single critique is the core loop. |
| Custom scoring/grading | "Give my design a score out of 10" | Scores feel arbitrary, designers argue with numbers not feedback | Structured qualitative feedback is more actionable than a number |

## Feature Dependencies

```
[Image Upload]
    └──requires──> [File Validation]
    └──requires──> [Loading State]

[Critique Display]
    └──requires──> [Image Upload]
    └──requires──> [Claude API Integration]
    └──requires──> [Structured JSON Parsing]

[Industry Context]
    └──enhances──> [Claude API Integration] (prompt injection)

[Critique Tone]
    └──enhances──> [Claude API Integration] (prompt variation)

[Expandable Depth]
    └──requires──> [Structured JSON with nested detail]
    └──requires──> [Accordion UI component]

[Sample Critiques]
    └──requires──> [Critique Display] (same rendering component)
```

### Dependency Notes

- **Critique Display requires Claude API Integration:** The display component needs to parse structured JSON — build the API route first, then the display.
- **Industry Context enhances API Integration:** Context injection is a prompt engineering task, not a separate feature — build alongside API route.
- **Expandable Depth requires nested JSON:** Claude must return both summary and detail per bullet. Design the response schema before building the UI.

## MVP Definition

### Launch With (v1)

Minimum viable product — what's needed to validate the concept.

- [ ] Image upload with drag-and-drop — core input mechanism
- [ ] Industry context dropdown (5 options) — differentiator
- [ ] Critique tone selector (2 options) — engagement hook
- [ ] Claude API integration with structured output — the engine
- [ ] 4-section critique display with expandable depth — the output
- [ ] Loading state during processing — UX necessity
- [ ] Error handling (API failures, bad files) — prevents broken experience
- [ ] Hero section + sample critiques — landing page conversion

### Add After Validation (v1.x)

Features to add once core is working.

- [ ] Copy critique to clipboard — when users ask for it
- [ ] Rate limiting per IP — when traffic warrants protection
- [ ] Analytics (Plausible/Vercel) — when you need usage data
- [ ] SEO meta tags + OG image — when sharing matters
- [ ] More industry contexts — when users request specific verticals

### Future Consideration (v2+)

Features to defer until product-market fit is established.

- [ ] User accounts + saved history — needs database (Supabase)
- [ ] Payments (Stripe) — needs usage tracking + auth
- [ ] Figma plugin — separate development track
- [ ] Comparison mode — complex prompt engineering
- [ ] Custom style guides — needs upload + storage + RAG

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Image upload + DnD | HIGH | LOW | P1 |
| Claude API integration | HIGH | MEDIUM | P1 |
| Structured critique display | HIGH | MEDIUM | P1 |
| Industry context selection | HIGH | LOW | P1 |
| Critique tone selector | MEDIUM | LOW | P1 |
| Expandable critique depth | MEDIUM | MEDIUM | P1 |
| Loading state | HIGH | LOW | P1 |
| Error handling | MEDIUM | LOW | P1 |
| Hero section + samples | MEDIUM | MEDIUM | P1 |
| Copy to clipboard | MEDIUM | LOW | P2 |
| Rate limiting | LOW | LOW | P2 |
| Analytics | LOW | LOW | P2 |

## Competitor Feature Analysis

| Feature | Existing AI design tools | DesignCritic Approach |
|---------|--------------------------|----------------------|
| Image upload | Standard file picker | Drag-and-drop + click with preview |
| Feedback structure | Often unstructured paragraphs | 4 clear sections with expandable depth |
| Domain context | Generic feedback | Industry-specific heuristics (SaaS, Healthcare, etc.) |
| Tone control | Usually one tone | Adjustable: Constructive vs Roast |
| Speed | Often 15-30s | Target <10s with Claude Sonnet |
| Pricing | Usually freemium from day 1 | Free V1, validate demand first |

## Sources

- Analysis of AI design feedback tools (Magician, Figma AI, UIzard)
- Designer feedback patterns from design community forums
- Claude API capabilities documentation
- UX research on feedback delivery methods

---
*Feature research for: AI-powered design critique tools*
*Researched: 2026-02-12*
