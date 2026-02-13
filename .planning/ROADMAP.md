# Roadmap: DesignCritic

## Overview

A five-phase journey delivering a working AI design critique tool. Phase 1 establishes the foundation (Next.js + Claude integration). Phase 2 builds the core AI engine with industry-specific prompt engineering. Phase 3 delivers the upload system. Phase 4 adds configuration controls for industry context and critique tone. Phase 5 completes the experience with critique display and polish.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation** - Next.js scaffolding, Claude API integration, deployment
- [ ] **Phase 2: AI Engine** - Prompt engineering, domain heuristics, structured output
- [ ] **Phase 3: Upload System** - Drag-and-drop, validation, compression, preview
- [ ] **Phase 4: Configuration** - Industry context and critique tone selection
- [ ] **Phase 5: Display & Polish** - Critique output, loading states, error handling

## Phase Details

### Phase 1: Foundation
**Goal**: Project runs locally and deploys to Vercel with secure Claude API integration
**Depends on**: Nothing (first phase)
**Requirements**: INFR-01, INFR-02, INFR-03
**Success Criteria** (what must be TRUE):
  1. Next.js app runs locally with no errors
  2. App deploys to Vercel from GitHub with zero manual config
  3. ANTHROPIC_API_KEY is stored server-side only and never exposed to client
  4. App loads in browser without sign-up or authentication
**Plans**: 3 plans

Plans:
- [x] 01-01-PLAN.md — Project scaffolding (Next.js + ShadCN + types)
- [x] 01-02-PLAN.md — API layer (Claude SDK + env config + stub route)
- [x] 01-03-PLAN.md — GitHub + Vercel deployment

### Phase 2: AI Engine
**Goal**: Claude API returns structured design critiques based on industry context and tone
**Depends on**: Phase 1
**Requirements**: AI-01, AI-02, AI-03, AI-04, AI-05, AI-06
**Success Criteria** (what must be TRUE):
  1. API route successfully sends image and prompt to Claude and receives response
  2. Critique output is structured JSON with 4 sections (What Works, Usability Risks, Visual Hierarchy Issues, Concrete Improvements)
  3. Critique content references specific visual elements in the uploaded image
  4. Industry context (SaaS, Healthcare, Consumer, Ecommerce, Fintech) changes the critique content with domain-specific heuristics
  5. Critique tone (Constructive vs Roast) adjusts the language and delivery
  6. Response completes in under 10 seconds
**Plans**: TBD

Plans:
- [ ] TBD during plan-phase

### Phase 3: Upload System
**Goal**: Designers can upload UI screenshots with validation, compression, and preview
**Depends on**: Phase 1
**Requirements**: UPLD-01, UPLD-02, UPLD-03, UPLD-04, UPLD-05
**Success Criteria** (what must be TRUE):
  1. Designer can upload image via drag-and-drop onto designated area
  2. Designer can upload image via file picker click
  3. App only accepts PNG, JPG, and WebP files and shows error for other formats
  4. App rejects files over 10MB with clear error message
  5. Images are automatically compressed/resized to max 2000px before sending to API
  6. Designer sees preview of uploaded image before submitting for critique
**Plans**: TBD

Plans:
- [ ] TBD during plan-phase

### Phase 4: Configuration
**Goal**: Designers can customize critique with industry context and tone selection
**Depends on**: Phase 2 (prompts must exist to configure)
**Requirements**: CONF-01, CONF-02
**Success Criteria** (what must be TRUE):
  1. Designer can select one industry context from 5 options (SaaS, Healthcare, Consumer, Ecommerce, Fintech)
  2. Designer can select one critique tone from 2 options (Constructive, Roast)
  3. Selected configuration is visually indicated before submission
**Plans**: TBD

Plans:
- [ ] TBD during plan-phase

### Phase 5: Display & Polish
**Goal**: Critiques display beautifully with expandable depth, loading states, and error handling
**Depends on**: Phase 2 (critique data), Phase 3 (upload flow), Phase 4 (configuration)
**Requirements**: DISP-01, DISP-02, DISP-03, DISP-04, DISP-05
**Success Criteria** (what must be TRUE):
  1. Critique displays in 4 distinct sections matching the JSON structure
  2. Each section shows scannable summary (2-4 bullets) that expands to show deeper explanations when clicked
  3. Loading state shows engaging progress feedback while waiting for Claude response
  4. API failures, timeouts, and invalid uploads display helpful error messages (not technical stack traces)
  5. Designer can copy full critique text to clipboard with one button click
**Plans**: TBD

Plans:
- [ ] TBD during plan-phase

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 3/3 | ✓ Complete | 2026-02-13 |
| 2. AI Engine | 0/TBD | Not started | - |
| 3. Upload System | 0/TBD | Not started | - |
| 4. Configuration | 0/TBD | Not started | - |
| 5. Display & Polish | 0/TBD | Not started | - |
