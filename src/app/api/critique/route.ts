import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getCritique } from '@/lib/claude';
import type { CritiqueResponse, CritiqueError } from '@/types/critique';

// Allow up to 60s for Claude vision API (Vercel Pro required for >10s)
export const maxDuration = 60;

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

    const { image, mediaType, context, tone } = parsed.data;

    const critique = await getCritique(image, mediaType, context, tone);

    return NextResponse.json({ critique } satisfies CritiqueResponse);
  } catch (error) {
    console.error('Critique API error:', error);

    if (error instanceof Error && error.message.includes('ANTHROPIC_API_KEY')) {
      return NextResponse.json(
        { error: 'API key not configured' } satisfies CritiqueError,
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to generate critique. Please try again.' } satisfies CritiqueError,
      { status: 500 }
    );
  }
}
