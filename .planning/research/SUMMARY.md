# Research Summary

**Project:** DesignCritic — AI-Powered Design Review
**Researched:** 2026-02-12

## Key Findings

### Stack
Next.js 15 (App Router) + Tailwind CSS 4 + ShadCN/ui + Claude API (Sonnet) + Vercel. Supporting: @anthropic-ai/sdk, react-dropzone, zod for validation. Use Claude's `tool_use` for guaranteed structured JSON output — do NOT parse free-text responses.

### Table Stakes Features
- Image upload with drag-and-drop
- Loading state with progress feedback
- Structured 4-section critique output
- Error handling for API failures and bad files
- File validation (type, size)
- Mobile-responsive layout

### Differentiators
- **Industry context selection** (SaaS, Healthcare, Consumer, Ecommerce, Fintech) — domain-specific heuristics injected into prompt. This is the core moat.
- **Adjustable critique tone** (Constructive vs Roast) — low effort, high engagement
- **Expandable critique depth** — scannable summary + detailed explanations per point
- **Copy to clipboard** — designers paste feedback into Figma/Slack/Notion

### Critical Watch-Outs
1. **Generic critiques are the #1 risk.** Prompt engineering is the product. Test with 10+ real designs per industry context. Critiques must reference specific visual elements, not generic advice.
2. **Use tool_use for structured output.** Free-text JSON parsing is fragile and will break the front-end.
3. **Compress images client-side.** Uncompressed 5MB+ screenshots cause slow responses and high API costs. Resize to max 2000px before base64 encoding.
4. **Never expose the API key.** All Claude calls through server-side API route. No `NEXT_PUBLIC_` prefix.
5. **Vercel free tier has 10s function timeout.** Optimize prompt length and image size to stay under limit, or plan for Pro tier.

### Architecture
Three-layer sandwich: Presentation (React components) → API Layer (Next.js Route Handler at `/api/critique`) → Claude API. Prompt Engine composes base system prompt + industry heuristics + tone modifier. Stateless — no database, no file storage. Client handles image-to-base64 conversion.

### Build Order Implications
1. Project setup (Next.js + ShadCN + env config)
2. Prompt engineering (system prompt + context heuristics + tone modifiers) — this is the product
3. API route (Claude integration with tool_use)
4. Upload component (drag-and-drop + validation + base64 conversion)
5. Critique display (4-section cards with expandable depth)
6. Landing page (hero + sample critiques)
7. Polish (loading states, error handling, responsive)

### Anti-Features (Don't Build)
- Real-time streaming (adds complexity, full response is only 5-10s)
- User accounts for V1 (validate demand first)
- AI-generated visual fix suggestions (unreliable for UI mockups)
- Design scoring/grading (numbers feel arbitrary, qualitative feedback is more actionable)
- Figma plugin (separate development track, V2)

---
*Research summary for: DesignCritic*
*Synthesized: 2026-02-12*
