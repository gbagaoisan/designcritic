# Stack Research

**Domain:** AI-powered design critique web app
**Researched:** 2026-02-12
**Confidence:** HIGH

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Next.js | 15.x (App Router) | Full-stack React framework | Unified front-end + API routes in one codebase. App Router gives server components, streaming, and edge runtime. Perfect for single-page apps with an API layer. |
| Tailwind CSS | 4.x | Utility-first styling | Rapid UI development, no context-switching to CSS files. Pairs perfectly with ShadCN components. |
| ShadCN/ui | latest | Component library | Copy-paste accessible components built on Radix UI + Tailwind. Not a dependency — components live in your codebase. Perfect for upload areas, dropdowns, cards, accordions. |
| Claude API (Sonnet) | claude-sonnet-4-5-20250929 | AI vision + critique | Best price/performance for image analysis. Native vision support. Structured JSON output via tool_use. |
| Vercel | - | Hosting + deployment | Zero-config Next.js deployment. Free tier handles MVP traffic. Automatic edge functions for API routes. |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @anthropic-ai/sdk | ^0.39.x | Claude API client | Required — official TypeScript SDK for Anthropic API calls |
| react-dropzone | ^14.x | File upload DnD | Drag-and-drop upload area with file validation. Mature, accessible. |
| lucide-react | latest | Icons | Clean icon set that ShadCN uses by default. Consistent with component library. |
| zod | ^3.x | Schema validation | Validate API request/response shapes. Use with Claude's structured output. |
| framer-motion | ^11.x | Animations | Loading states, critique reveal animations. Optional but adds polish. |
| sonner | latest | Toast notifications | Error/success messages. ShadCN-compatible. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| TypeScript | Type safety | Non-negotiable for API contracts and Claude response types |
| ESLint + Prettier | Code quality | Next.js includes ESLint config out of the box |
| `npx shadcn@latest init` | ShadCN setup | Initialize with New York style + default theme |

## Installation

```bash
# Create Next.js project
npx create-next-app@latest designcritic --typescript --tailwind --eslint --app --src-dir

# ShadCN init
npx shadcn@latest init

# Core dependencies
npm install @anthropic-ai/sdk react-dropzone zod

# ShadCN components (add as needed)
npx shadcn@latest add button card select accordion badge separator

# Optional polish
npm install framer-motion sonner lucide-react
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Next.js App Router | Vite + React | If you don't need SSR/API routes — but we do need API routes for Claude proxy |
| ShadCN/ui | Radix UI direct | If you want more control and less styling — ShadCN is Radix + Tailwind pre-styled |
| react-dropzone | Native HTML input | If upload is simple click-only — but we want drag-and-drop |
| Claude Sonnet | GPT-4o | If you need faster response times — but Claude Sonnet has better structured output and vision quality for design critique |
| Vercel | Netlify | If you prefer Netlify's UI — but Vercel has native Next.js optimization |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Pages Router (Next.js) | Legacy pattern, App Router is the standard | App Router with server components |
| Material UI / Chakra UI | Heavy bundle, opinionated styling conflicts with Tailwind | ShadCN/ui (Tailwind-native) |
| axios | Unnecessary for simple API calls, adds bundle weight | Native fetch (built into Next.js with caching) |
| OpenAI API for vision | Weaker structured output, less reliable for design critique | Claude API (Sonnet) with tool_use for structured JSON |
| Firebase / Supabase | No database needed for V1, adds complexity | Nothing — stateless for now |
| CSS Modules / styled-components | Slower development velocity than Tailwind | Tailwind CSS utility classes |

## Stack Patterns by Variant

**If adding streaming responses later:**
- Use Vercel AI SDK (`ai` package) for streaming Claude responses
- Because it handles SSE/streaming natively with React hooks

**If adding rate limiting:**
- Use Vercel KV (Redis) or `next-rate-limit` with in-memory store
- Because Vercel KV is free tier compatible and persists across serverless invocations

**If adding database later (V2):**
- Use Supabase (PostgreSQL + Auth)
- Because free tier is generous, pairs well with Vercel, and has built-in auth

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| Next.js 15.x | Tailwind CSS 4.x | Built-in support via `create-next-app` |
| ShadCN/ui | Tailwind 4.x + Next.js 15 | Requires `npx shadcn@latest init` (not older `shadcn-ui`) |
| @anthropic-ai/sdk | Node 18+ | Required for Vercel serverless functions |
| react-dropzone 14.x | React 18/19 | Works with both React versions |

## Sources

- Next.js official docs — App Router, API Routes
- Anthropic API docs — Vision, structured output, tool_use
- ShadCN/ui docs — Installation, component catalog
- Vercel docs — Deployment, environment variables, serverless limits

---
*Stack research for: AI-powered design critique web app*
*Researched: 2026-02-12*
