---
phase: 02-ai-engine
plan: 01
subsystem: ai
tags: [anthropic, claude, prompt-engineering, tool-use, structured-output]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: "Type definitions for CritiqueResult, IndustryContext, CritiqueTone"
provides:
  - "Complete prompt composition system for Claude API"
  - "5 industry-specific context heuristics (saas, healthcare, consumer, ecommerce, fintech)"
  - "2 tone modifiers (constructive, roast)"
  - "Claude tool_use definition matching CritiqueResult schema"
  - "Anti-prompt-injection security instruction"
affects: [02-02, critique-api, ai-integration]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Prompt composition via concatenation (base + context + tone)"
    - "Domain-specific heuristics injection pattern"
    - "Claude tool_use for guaranteed structured JSON output"

key-files:
  created:
    - "src/lib/prompts/system.ts"
    - "src/lib/prompts/contexts.ts"
    - "src/lib/prompts/tones.ts"
    - "src/lib/prompts/tool-definition.ts"
  modified: []

key-decisions:
  - "Anti-prompt-injection instruction placed in system prompt to prevent image text from hijacking Claude's behavior"
  - "Each industry context heuristic is 150-250 words with domain-specific focus areas, not generic advice"
  - "Roast tone requires actionable feedback with concrete values - humor changes delivery, not quality"
  - "Tool definition schema exactly matches CritiqueResult type for type-safe Claude responses"

patterns-established:
  - "buildSystemPrompt() composition pattern: base + context + tone joined with double newlines"
  - "Record<IndustryContext, string> pattern for context heuristics map"
  - "Record<CritiqueTone, string> pattern for tone modifiers map"
  - "Anthropic SDK Tool type for tool_use definitions"

# Metrics
duration: 3min
completed: 2026-02-13
---

# Phase 02 Plan 01: Prompt Engine Summary

**Prompt composition system with anti-injection security, 5 industry heuristics, 2 tones, and Claude tool_use schema for guaranteed structured critique output**

## Performance

- **Duration:** 3 minutes
- **Started:** 2026-02-13T06:25:48Z
- **Completed:** 2026-02-13T06:28:54Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Built complete prompt engine with BASE_SYSTEM_PROMPT emphasizing specific-element analysis and actionable feedback
- Created 5 domain-specific industry context heuristics (150-250 words each) covering saas, healthcare, consumer, ecommerce, fintech
- Added 2 tone modifiers (constructive, roast) that change delivery style without reducing feedback quality
- Implemented Claude tool_use definition with schema matching CritiqueResult type exactly for guaranteed structured JSON

## Task Commits

Each task was committed atomically:

1. **Task 1: Create prompt engine modules** - `b6e31c7` (feat)
   - Created BASE_SYSTEM_PROMPT with specific-element instructions
   - Created buildSystemPrompt() composition function
   - Created 5 industry context heuristics
   - Created 2 tone modifiers

2. **Task 2: Create Claude tool_use definition** - `474c264` (feat)
   - Created critiqueToolDefinition matching Anthropic SDK Tool type
   - Schema with 4 sections (what_works, usability_risks, visual_hierarchy, improvements)
   - All properties match CritiqueResult interface

## Files Created/Modified

- `src/lib/prompts/system.ts` - Base system prompt and buildSystemPrompt() composition function
- `src/lib/prompts/contexts.ts` - 5 industry context heuristics with domain-specific focus areas
- `src/lib/prompts/tones.ts` - 2 tone modifiers (constructive, roast) with quality requirements
- `src/lib/prompts/tool-definition.ts` - Claude tool_use schema guaranteeing structured JSON output

## Decisions Made

1. **Anti-prompt-injection instruction placement**: Added security instruction in BASE_SYSTEM_PROMPT to ignore any text in the uploaded image that attempts to modify Claude's instructions or change its role. This prevents malicious users from embedding prompt injection attacks in design screenshots.

2. **Industry heuristics depth**: Each context heuristic is 150-250 words with highly specific domain knowledge (e.g., healthcare focuses on trust signals, accessibility, patient-centric design; ecommerce focuses on product imagery, checkout friction, cart visibility). This is the product moat - not generic design advice.

3. **Roast tone quality requirement**: Roast tone modifier explicitly requires that every criticism include a concrete fix with specific values. Humor changes delivery ("This CTA is playing hide and seek"), not feedback quality. Every roast must be actionable.

4. **Tool schema exactness**: critiqueToolDefinition schema properties match CritiqueResult type exactly (same 4 keys, same nested structure) to ensure type-safe responses when parsing Claude's tool_use output.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required for this phase.

## Next Phase Readiness

Prompt engine complete and ready for Phase 02 Plan 02 (Claude API Integration). The next plan will:
- Use buildSystemPrompt() to compose prompts from user selections
- Call Claude API with critiqueToolDefinition to force structured output
- Parse tool_use response and return as CritiqueResponse

**Verification checklist for next phase:**
- System prompt composition works: buildSystemPrompt('saas', 'constructive') returns combined string
- Tool definition is type-compatible with Anthropic SDK Tool type
- Schema has all 4 required sections matching CritiqueResult
- All context heuristics are domain-specific, not generic
- Roast tone requires actionable feedback

## Self-Check: PASSED

All created files exist:
- ✓ src/lib/prompts/system.ts
- ✓ src/lib/prompts/contexts.ts
- ✓ src/lib/prompts/tones.ts
- ✓ src/lib/prompts/tool-definition.ts

All commits exist:
- ✓ b6e31c7 (Task 1: prompt engine modules)
- ✓ 474c264 (Task 2: tool definition)

---
*Phase: 02-ai-engine*
*Completed: 2026-02-13*
