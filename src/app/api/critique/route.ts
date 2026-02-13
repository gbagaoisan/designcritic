import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getClaudeClient } from '@/lib/claude';
import type { CritiqueResponse, CritiqueError } from '@/types/critique';

const critiqueRequestSchema = z.object({
  image: z.string().min(1),
  mediaType: z.enum(['image/png', 'image/jpeg', 'image/webp']),
  context: z.enum(['saas', 'healthcare', 'consumer', 'ecommerce', 'fintech']),
  tone: z.enum(['constructive', 'roast']),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = critiqueRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request: ' + parsed.error.issues.map(i => i.message).join(', ') } satisfies CritiqueError,
        { status: 400 }
      );
    }

    // Verify Claude client can initialize (proves API key is configured)
    getClaudeClient();

    // Phase 2 replaces this mock with real Claude API call
    const mockCritique: CritiqueResponse = {
      critique: {
        what_works: [
          { summary: 'Clean visual hierarchy guides the eye naturally.', detail: 'The layout uses a clear top-down flow with appropriate spacing between sections, making it easy to scan.' },
        ],
        usability_risks: [
          { summary: 'Primary CTA lacks visual prominence.', detail: 'The main call-to-action button blends with surrounding elements. Consider increasing contrast or size to improve click-through rate.' },
        ],
        visual_hierarchy: [
          { summary: 'Typography scale needs more contrast between levels.', detail: 'The difference between H1 and H2 sizes is too subtle, making it harder to distinguish content sections at a glance.' },
        ],
        improvements: [
          { summary: 'Add whitespace between form fields.', detail: 'Increasing vertical spacing between input fields by 8-12px would reduce visual clutter and improve readability.' },
        ],
      },
    };

    return NextResponse.json(mockCritique);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' } satisfies CritiqueError,
      { status: 500 }
    );
  }
}
