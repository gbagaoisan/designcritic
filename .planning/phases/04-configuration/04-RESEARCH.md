# Phase 4 Research: Configuration

## Phase Goal
Designers can customize critique with industry context and tone selection.

## Requirements
- **CONF-01**: Designer can select an industry context (SaaS, Healthcare, Consumer, Ecommerce, Fintech)
- **CONF-02**: Designer can select a critique tone (Constructive or Roast)
- **Success Criteria 3**: Selected configuration is visually indicated before submission

## Codebase Analysis

### What Already Exists
- **Types**: `IndustryContext` (5 options) and `CritiqueTone` (2 options) defined in `src/types/critique.ts`
- **Prompt contexts**: Full industry heuristics in `src/lib/prompts/contexts.ts` (150-250 words each)
- **Tone modifiers**: Constructive and Roast tones in `src/lib/prompts/tones.ts`
- **API route**: `src/app/api/critique/route.ts` already accepts `context` and `tone` in request body with Zod validation
- **Claude integration**: `src/lib/claude.ts` `getCritique()` already takes `context` and `tone` parameters
- **Upload zone**: `src/components/upload-zone.tsx` handles image upload with preview

### What's Missing
- **No configuration UI** — `src/app/page.tsx` has upload zone only, no selectors
- **No state management** for industry/tone selection in the page
- **No submit button** — there's no way to trigger the critique API call
- **Only 2 ShadCN components installed**: Button and Card (no Select, RadioGroup, or ToggleGroup)

### Current Page Flow
`page.tsx` tracks `uploadedImage` and `imagePreview` state. It renders an `<UploadZone>` component. There is no submit trigger or configuration step.

## Implementation Approach

### UI Component Strategy
**Option A: Button-based toggles (Recommended)**
- Use existing `Button` component with variant toggling (default vs outline)
- Industry: 5 buttons in a row/wrap for industry selection
- Tone: 2 buttons for Constructive/Roast
- No new ShadCN component installation needed
- Clean, visual, immediately shows selected state

**Option B: Install ShadCN Select/RadioGroup**
- More traditional form controls
- Requires additional dependency installation
- Dropdown hides options (worse for discoverability with only 5 items)

**Recommendation: Option A** — Button toggles are more visual, more discoverable, and work with what's already installed. The small option counts (5 and 2) work perfectly as visible button groups.

### Page Layout Strategy
The configuration controls should appear **below the upload zone and above a submit button**. This creates a natural top-to-bottom flow:
1. Upload screenshot
2. Configure critique settings
3. Submit for analysis

### State Integration
- Add `selectedContext: IndustryContext` and `selectedTone: CritiqueTone` state to `page.tsx`
- Default values: `saas` (most common use case) and `constructive` (friendlier default)
- Pass selections to API call when submit is triggered
- The submit button is needed but is technically a Phase 5 concern — however, the configuration needs to be visually indicated, which requires showing the selected state

### Submit Button Note
Phase 4 success criteria require "selected configuration is visually indicated before submission." This implies a submission mechanism exists. The submit button + API call wiring connects upload (Phase 3) + configuration (Phase 4) + AI engine (Phase 2). This is the glue that makes the app functional end-to-end.

## Key Decisions Needed
1. **Defaults**: Pre-select `saas` + `constructive` as defaults (most friendly starting point)
2. **Layout**: Configuration section between upload preview and submit button
3. **Component approach**: Button toggles using existing ShadCN Button component
4. **Submit button**: Include basic submit button in this phase to make configuration testable (Phase 5 will enhance with loading states and error handling)

## Risk Assessment
- **Low risk phase** — all backend plumbing exists, this is purely UI work
- No new API endpoints needed
- No new dependencies needed (unless we want Select/RadioGroup for polish)
- Main integration point: wiring the submit action to call `/api/critique` with selected options
