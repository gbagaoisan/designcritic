import type { Tool } from '@anthropic-ai/sdk/resources/messages';

export const critiqueToolDefinition: Tool = {
  name: 'design_critique',
  description: 'Provide a structured design critique of the uploaded UI screenshot. Each section should contain 2-4 specific, actionable points.',
  input_schema: {
    type: 'object' as const,
    properties: {
      what_works: {
        type: 'array',
        description: 'What the design does well — specific positive elements',
        items: {
          type: 'object',
          properties: {
            summary: { type: 'string', description: 'A 1-2 sentence scannable highlight of what works' },
            detail: { type: 'string', description: 'A 2-4 sentence deeper explanation referencing specific visual elements' },
          },
          required: ['summary', 'detail'],
        },
      },
      usability_risks: {
        type: 'array',
        description: 'Usability issues that could confuse or frustrate users',
        items: {
          type: 'object',
          properties: {
            summary: { type: 'string', description: 'A 1-2 sentence scannable risk summary' },
            detail: { type: 'string', description: 'A 2-4 sentence explanation of the risk and its user impact' },
          },
          required: ['summary', 'detail'],
        },
      },
      visual_hierarchy: {
        type: 'array',
        description: 'Issues with visual hierarchy, layout flow, and element prominence',
        items: {
          type: 'object',
          properties: {
            summary: { type: 'string', description: 'A 1-2 sentence scannable hierarchy issue' },
            detail: { type: 'string', description: 'A 2-4 sentence explanation with specific layout/hierarchy suggestions' },
          },
          required: ['summary', 'detail'],
        },
      },
      improvements: {
        type: 'array',
        description: 'Concrete, actionable improvements with specific values (colors, spacing, sizes)',
        items: {
          type: 'object',
          properties: {
            summary: { type: 'string', description: 'A 1-2 sentence improvement recommendation' },
            detail: { type: 'string', description: 'A 2-4 sentence explanation with concrete CSS/layout values' },
          },
          required: ['summary', 'detail'],
        },
      },
    },
    required: ['what_works', 'usability_risks', 'visual_hierarchy', 'improvements'],
  },
};
