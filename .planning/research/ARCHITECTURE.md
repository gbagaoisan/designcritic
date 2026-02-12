# Architecture Research

**Domain:** AI-powered design critique web app
**Researched:** 2026-02-12
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │ Upload   │  │ Context  │  │ Loading  │  │ Critique │    │
│  │ Zone     │  │ Picker   │  │ State    │  │ Display  │    │
│  └────┬─────┘  └────┬─────┘  └──────────┘  └──────────┘    │
│       │              │                                       │
├───────┴──────────────┴───────────────────────────────────────┤
│                      API LAYER                               │
│  ┌───────────────────────────────────────────────────────┐   │
│  │            /api/critique (POST)                        │   │
│  │  Validate → Build Prompt → Call Claude → Parse JSON    │   │
│  └───────────────────────────────────────────────────────┘   │
├──────────────────────────────────────────────────────────────┤
│                    PROMPT ENGINE                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                   │
│  │ System   │  │ Context  │  │ Tone     │                   │
│  │ Prompt   │  │ Heurist. │  │ Modifier │                   │
│  └──────────┘  └──────────┘  └──────────┘                   │
├──────────────────────────────────────────────────────────────┤
│                  EXTERNAL: Claude API                         │
│  Image + Assembled Prompt → Structured JSON Response          │
└──────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| Upload Zone | Accept image file, validate type/size, convert to base64 | React component with react-dropzone, client-side validation |
| Context Picker | Select industry + tone, pass to API | ShadCN Select + RadioGroup/ToggleGroup components |
| Loading State | Show progress while Claude processes | Animated skeleton or progress indicator component |
| Critique Display | Render structured JSON as scannable cards with expandable sections | ShadCN Card + Accordion components |
| API Route | Receive image + params, build prompt, call Claude, return structured JSON | Next.js Route Handler at `/api/critique` |
| Prompt Engine | Assemble system prompt + context heuristics + tone modifier | TypeScript module with prompt templates and context maps |
| Hero Section | Landing page content, sample critiques, CTA | Static React component with pre-generated examples |

## Recommended Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout (fonts, metadata)
│   ├── page.tsx            # Main page (hero + upload + critique)
│   └── api/
│       └── critique/
│           └── route.ts    # POST endpoint for critique
├── components/
│   ├── ui/                 # ShadCN components (auto-generated)
│   ├── upload-zone.tsx     # Drag-and-drop upload area
│   ├── context-picker.tsx  # Industry + tone selectors
│   ├── critique-display.tsx # Structured critique output
│   ├── critique-section.tsx # Individual section with accordion
│   ├── loading-state.tsx   # Processing animation
│   ├── hero-section.tsx    # Landing page hero
│   └── sample-critique.tsx # Pre-generated example critique
├── lib/
│   ├── prompts/
│   │   ├── system.ts       # Base system prompt
│   │   ├── contexts.ts     # Industry-specific heuristics map
│   │   └── tones.ts        # Tone modifier prompts
│   ├── claude.ts           # Claude API client wrapper
│   ├── schemas.ts          # Zod schemas for request/response
│   └── utils.ts            # Shared utilities (image conversion, etc.)
└── types/
    └── critique.ts         # TypeScript types for critique structure
```

### Structure Rationale

- **app/api/critique/**: Single API endpoint. Next.js Route Handler — no separate server needed.
- **components/**: Flat structure with clear naming. No deep nesting for a small app.
- **lib/prompts/**: Prompt engineering is the product moat — isolate it for iteration.
- **lib/schemas.ts**: Zod schemas shared between API validation and front-end typing.

## Architectural Patterns

### Pattern 1: Prompt Composition

**What:** Build the final Claude prompt by composing base system prompt + industry context heuristics + tone modifier.
**When to use:** Every API call — this is the core pattern.
**Trade-offs:** More complex prompt assembly, but enables per-context quality without separate endpoints.

**Example:**
```typescript
function buildPrompt(context: IndustryContext, tone: CritiqueTone): string {
  return [
    SYSTEM_PROMPT,
    CONTEXT_HEURISTICS[context],
    TONE_MODIFIERS[tone],
    OUTPUT_FORMAT_INSTRUCTIONS,
  ].join('\n\n');
}
```

### Pattern 2: Structured Output via tool_use

**What:** Use Claude's tool_use feature to guarantee structured JSON responses instead of parsing free-text.
**When to use:** For the critique API response — ensures predictable front-end rendering.
**Trade-offs:** Slightly more setup, but eliminates JSON parsing failures.

**Example:**
```typescript
const response = await anthropic.messages.create({
  model: 'claude-sonnet-4-5-20250929',
  max_tokens: 4096,
  system: assembledPrompt,
  tools: [critiqueToolDefinition],
  tool_choice: { type: 'tool', name: 'design_critique' },
  messages: [{ role: 'user', content: [{ type: 'image', source: { type: 'base64', media_type, data } }] }],
});
```

### Pattern 3: Client-Side Image Handling

**What:** Convert uploaded image to base64 on the client, send as JSON body to API route.
**When to use:** V1 stateless architecture — no server-side file storage needed.
**Trade-offs:** Larger request payloads (~1.5x file size as base64), but avoids multipart form data complexity and file storage.

## Data Flow

### Request Flow

```
[User drops image + picks context/tone]
    ↓
[Client validates file type/size]
    ↓
[Client converts image to base64]
    ↓
[POST /api/critique { image, context, tone }]
    ↓
[API Route validates request with Zod]
    ↓
[Prompt Engine assembles system + context + tone prompt]
    ↓
[Claude API call with image + assembled prompt]
    ↓
[Parse tool_use response → structured critique JSON]
    ↓
[Return critique JSON to client]
    ↓
[Client renders 4 sections with expandable detail]
```

### State Management

```
[React useState]
    ├── uploadedFile: File | null
    ├── context: IndustryContext
    ├── tone: CritiqueTone
    ├── isLoading: boolean
    ├── critique: CritiqueResult | null
    └── error: string | null
```

No global state management needed. React useState is sufficient for a single-page stateless app.

### Key Data Flows

1. **Upload → Critique:** Image file → base64 → API route → Claude → structured JSON → rendered cards
2. **Context/Tone → Prompt:** User selections → prompt composition → injected into Claude system prompt

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0-1k users/day | Current architecture is fine. Vercel free tier handles this. |
| 1k-10k users/day | Add rate limiting (per-IP). Consider Vercel Pro for higher function limits. |
| 10k+ users/day | Add caching for identical images (hash-based). Consider queue-based processing. |

### Scaling Priorities

1. **First bottleneck:** Claude API cost at scale. Mitigation: rate limiting per IP, then usage-based pricing.
2. **Second bottleneck:** Vercel serverless function duration (default 10s timeout on free tier). Mitigation: upgrade to Pro for 60s timeout or use edge functions.

## Anti-Patterns

### Anti-Pattern 1: Server-Side File Storage

**What people do:** Store uploaded images on the server or in cloud storage before sending to Claude.
**Why it's wrong:** Adds storage costs, privacy concerns, and complexity for a stateless V1.
**Do this instead:** Client-side base64 conversion, pass through API route to Claude, discard after response.

### Anti-Pattern 2: Parsing Free-Text AI Responses

**What people do:** Ask Claude to return markdown/text and regex-parse it into sections.
**Why it's wrong:** Fragile parsing, inconsistent structure, breaks front-end display.
**Do this instead:** Use Claude's tool_use for guaranteed structured JSON output.

### Anti-Pattern 3: Global State Management

**What people do:** Add Redux/Zustand for a simple single-page app.
**Why it's wrong:** Massive over-engineering for a single-page upload → response flow.
**Do this instead:** React useState/useReducer. Add state management only if app grows to multiple pages.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Claude API (Anthropic) | REST via @anthropic-ai/sdk | Server-side only (API key in env vars). 10s typical response. |
| Vercel | Git push → auto deploy | Environment variables via Vercel dashboard. |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Client ↔ API Route | JSON over fetch POST | Zod validates both sides. Image as base64 string. |
| API Route ↔ Prompt Engine | Direct function import | Same codebase, no network boundary. |
| API Route ↔ Claude | HTTP via SDK | Server-side only. ANTHROPIC_API_KEY in env. |

## Sources

- Next.js App Router documentation
- Anthropic Claude API — Vision, tool_use, structured output
- Vercel deployment architecture docs
- ShadCN/ui component library patterns

---
*Architecture research for: AI-powered design critique web app*
*Researched: 2026-02-12*
