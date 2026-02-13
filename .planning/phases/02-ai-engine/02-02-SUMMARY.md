---
phase: 02-ai-engine
plan: 02
subsystem: api
tags: [anthropic, claude, vision-api, tool-use, api-routes, nextjs]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: "Type definitions for CritiqueResult, CritiqueResponse, CritiqueError, API route structure"
  - phase: 02-01
    provides: "buildSystemPrompt, critiqueToolDefinition, prompt composition system"
provides:
  - "getCritique function calling Claude Vision API with base64 images"
  - "Live /api/critique endpoint returning real Claude-powered design critiques"
  - "Tool_use pattern for guaranteed structured JSON responses"
  - "Error handling for API key issues and general failures"
affects: [frontend-upload, critique-display, user-testing]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Claude Vision API pattern: base64 image + text message in content array"
    - "Forced tool_use with tool_choice for guaranteed structure"
    - "Tool_use response extraction from content blocks"
    - "API error handling with specific vs generic error messages"

key-files:
  created: []
  modified:
    - "src/lib/claude.ts"
    - "src/app/api/critique/route.ts"

key-decisions:
  - "Claude Sonnet 4.5 (claude-sonnet-4-5-20250929) chosen for vision analysis - best speed/quality for price"
  - "tool_choice with type='tool' forces Claude to use design_critique tool, guaranteeing structured output"
  - "Image sent as base64 with media_type parameter - no file storage needed for V1"
  - "Tool_use input property is pre-parsed JSON - no JSON.parse needed, just type assertion"
  - "Specific error message for missing API key vs generic for other failures"

patterns-established:
  - "getCritique(imageBase64, mediaType, context, tone): Promise<CritiqueResult> pattern for AI service calls"
  - "Extract tool_use block via response.content.find(block => block.type === 'tool_use')"
  - "Type assertion pattern: toolUseBlock.input as CritiqueResult (safe because tool schema matches type)"
  - "API error handling: specific errors for known issues, generic for unknown"

# Metrics
duration: 1min
completed: 2026-02-13
---

# Phase 02 Plan 02: Claude API Integration Summary

**Live /api/critique endpoint calling Claude Vision API with real base64 images, returning structured design critiques via forced tool_use**

## Performance

- **Duration:** 1 minute
- **Started:** 2026-02-12T22:43:36-08:00
- **Completed:** 2026-02-12T22:44:14-08:00
- **Tasks:** 3 (2 implementation + 1 checkpoint approved)
- **Files modified:** 2

## Accomplishments

- Built getCritique() function in Claude client that composes prompts, sends base64 images, and extracts structured critique from tool_use
- Replaced mock API response with real Claude API call using prompt engine from Plan 01
- API now returns real design critiques with industry context and tone modifiers
- Error handling covers missing API key and general failures

## Task Commits

Each task was committed atomically:

1. **Task 1: Add getCritique function to Claude client** - `cabf161` (feat)
   - Import buildSystemPrompt and critiqueToolDefinition from prompt engine
   - Add getCritique function with image + context + tone parameters
   - Use claude-sonnet-4-5-20250929 model for vision
   - Force tool_use with tool_choice to guarantee structured output
   - Extract and return CritiqueResult from tool_use response

2. **Task 2: Replace mock API response with real Claude call** - `4328ea3` (feat)
   - Import getCritique instead of getClaudeClient
   - Call getCritique with validated image, mediaType, context, tone
   - Remove entire mock critique object
   - Add specific error handling for missing API key
   - Add generic error message for other failures
   - Keep Zod validation unchanged

3. **Task 3: Checkpoint - Human Verification** - Approved
   - User verified real Claude API returns structured critiques
   - Confirmed 4 sections with 2-4 points each
   - Confirmed tone and context affect output
   - Confirmed response time under 10 seconds

## Files Created/Modified

- `src/lib/claude.ts` - Added getCritique function calling Claude Vision API with base64 images and prompt composition
- `src/app/api/critique/route.ts` - Replaced mock response with real getCritique call, added error handling

## Decisions Made

1. **Model selection**: Chose claude-sonnet-4-5-20250929 for vision analysis. Best balance of speed, quality, and cost for this use case. Opus would be too slow/expensive, Haiku would sacrifice quality on visual hierarchy analysis.

2. **Forced tool_use pattern**: Used `tool_choice: { type: 'tool', name: 'design_critique' }` to force Claude to use the tool. This guarantees structured JSON output matching CritiqueResult schema - no need for fallback parsing or error handling for malformed responses.

3. **Base64 image handling**: Images sent as base64 in message content array with media_type parameter. No file storage, no temporary files, no cleanup needed. Stateless architecture for V1.

4. **Tool_use extraction**: Tool_use block found via `response.content.find()`, then `toolUseBlock.input` is already parsed JSON (Anthropic SDK handles this). Just type assertion needed, no JSON.parse.

5. **Error granularity**: Specific error message for missing ANTHROPIC_API_KEY (500 with "API key not configured") vs generic for other failures (500 with "Failed to generate critique"). Helps users diagnose configuration vs runtime issues.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

**ANTHROPIC_API_KEY environment variable required.**

Users must add to `.env.local`:
```
ANTHROPIC_API_KEY=sk-ant-...
```

Get API key from: https://console.anthropic.com/

Verification:
```bash
curl -X POST http://localhost:3000/api/critique \
  -H "Content-Type: application/json" \
  -d '{"image":"[base64]","mediaType":"image/png","context":"saas","tone":"constructive"}'
```

Should return structured critique JSON, not "API key not configured" error.

## Next Phase Readiness

**Phase 2 (AI Engine) is complete. Ready for Phase 3 (Frontend).**

The AI engine now:
- Accepts base64 images via POST /api/critique
- Validates requests with Zod schema
- Composes prompts with industry context and tone
- Calls Claude Vision API with forced tool_use
- Returns structured CritiqueResult with 4 sections
- Handles errors gracefully

**What's ready for frontend:**
- Type-safe API contract (CritiqueRequest, CritiqueResponse, CritiqueError)
- Predictable structured output (always 4 sections, 2-4 points each)
- Industry context selection (5 options)
- Tone selection (2 options)
- Error messages suitable for user display

**Next phase needs:**
- Image upload UI with drag-and-drop
- Base64 encoding client-side
- Context and tone selector dropdowns
- Critique display components for 4 sections
- Loading state during API call (1-10 seconds)
- Error display for 400/500 responses

## Self-Check: PASSED

All modified files exist:
- ✓ src/lib/claude.ts
- ✓ src/app/api/critique/route.ts

All commits exist:
- ✓ cabf161 (Task 1: getCritique function)
- ✓ 4328ea3 (Task 2: real Claude call)

---
*Phase: 02-ai-engine*
*Completed: 2026-02-13*
