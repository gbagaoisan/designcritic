# Phase 5 Research: Display & Polish

## Current State

### Existing Code
- **page.tsx**: Has `critiqueResult` state (`CritiqueResult | null`) and `error` state. Currently NO rendering for critique results — data comes back from API but is never displayed.
- **CritiqueResult type**: 4 sections (`what_works`, `usability_risks`, `visual_hierarchy`, `improvements`), each an array of `CritiquePoint { summary, detail }`.
- **API route**: Returns `{ critique: CritiqueResult }`. Error responses return `{ error: string }`.
- **Error handling**: Currently just a `<p>` tag with `text-red-600`. No differentiation between error types.
- **Loading state**: Button text changes to "Analyzing..." but no visual feedback beyond that.
- **ShadCN components installed**: Only `button` and `card`. Need to add more for collapsible sections.

### Dependencies Available
- `lucide-react` — icons (already installed)
- `radix-ui` — primitives (already installed via ShadCN)
- `class-variance-authority` — variant styling (already installed)

## Requirements Analysis

### DISP-01: 4 Structured Sections
The JSON structure maps directly to UI sections:
| Key | Display Name | Icon Suggestion |
|-----|-------------|-----------------|
| `what_works` | What Works | CheckCircle (green) |
| `usability_risks` | Usability Risks | AlertTriangle (amber) |
| `visual_hierarchy` | Visual Hierarchy Issues | Eye (blue) |
| `improvements` | Concrete Improvements | Lightbulb (purple) |

Each section contains 2-4 `CritiquePoint` items with `summary` and `detail`.

### DISP-02: Expandable Depth (Summary → Detail)
**Recommended approach: ShadCN Collapsible or custom accordion**
- Each CritiquePoint shows `summary` as a clickable bullet
- Clicking expands to reveal `detail` below
- Use Radix Collapsible primitive (already available via radix-ui dependency)
- No need to install ShadCN collapsible component — use Radix directly or build a simple toggle with state

**Implementation pattern:**
```tsx
// Simple expandable — each point tracks its own open/close state
const [openIndex, setOpenIndex] = useState<number | null>(null);
```

### DISP-03: Loading State
**Recommended: Animated skeleton with rotating messages**
- Replace button "Analyzing..." with a full loading card below the submit area
- Show rotating messages: "Analyzing layout...", "Checking usability...", "Reviewing hierarchy...", "Crafting improvements..."
- Use `setInterval` to cycle messages every 2-3 seconds
- Skeleton pulse animation for the critique sections (shows user what's coming)
- Duration: Claude typically responds in 5-10s

### DISP-04: Error Handling
**Current errors from API route:**
1. `400`: Zod validation failure — "Invalid request: ..."
2. `500`: Missing API key — "API key not configured"
3. `500`: Claude API failure — "Failed to generate critique. Please try again."
4. Client-side: Network errors — "Network error. Please try again."

**Recommended: Replace simple `<p>` with styled error card**
- Icon + message + action button (retry)
- Different styling for recoverable (retry) vs configuration errors
- Timeout handling: fetch timeout with AbortController (Vercel 10s limit)

### DISP-05: Copy to Clipboard
**Implementation: `navigator.clipboard.writeText()`**
- Format all 4 sections as readable plaintext
- Show toast/confirmation after copy ("Copied!")
- Place copy button at top of critique results
- Fallback: `document.execCommand('copy')` for older browsers (unlikely needed)

## Component Architecture

```
page.tsx
├── UploadZone (existing)
├── CritiqueConfig (existing)
├── Submit Button (existing)
├── LoadingState (new) — animated skeleton + rotating messages
├── ErrorDisplay (new) — styled error with retry
└── CritiqueDisplay (new)
    ├── CopyButton — clipboard copy
    └── CritiqueSection × 4
        └── CritiquePointItem × N (expandable summary → detail)
```

**New components needed:**
1. `critique-display.tsx` — Main display with 4 sections + copy button
2. Loading state inline in page.tsx (or small component)
3. Error display inline in page.tsx (or small component)

**ShadCN components to add:** None required. Can build with existing Radix primitives + Tailwind.

## Technical Decisions

1. **No ShadCN accordion install** — Custom expandable with Radix Collapsible or simple useState toggle is simpler and avoids adding components we don't fully need.
2. **Copy format** — Plain text with section headers and bullet points (not markdown, not HTML).
3. **Loading skeleton** — CSS animation only, no additional library.
4. **Error retry** — Re-invoke `handleSubmit()` from error component via callback prop.
5. **AbortController timeout** — Add 30s client-side timeout (generous buffer over Vercel's 10s limit for cold starts).

## Risks

1. **Vercel 10s timeout** — If Claude takes >10s, the serverless function times out. Mitigation: Already handled by API error catch. Client shows friendly message.
2. **Large critique text** — If Claude returns very long critiques, the expanded view could be very tall. Mitigation: CSS max-height with scroll if needed.
3. **Clipboard API permission** — Some browsers require HTTPS. App is on Vercel so HTTPS is default.

## RESEARCH COMPLETE
