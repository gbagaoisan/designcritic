import Anthropic from '@anthropic-ai/sdk';
import { buildSystemPrompt } from '@/lib/prompts/system';
import { critiqueToolDefinition } from '@/lib/prompts/tool-definition';
import type { IndustryContext, CritiqueTone, CritiqueResult } from '@/types/critique';

// Singleton Claude client — server-side only
export function getClaudeClient(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY environment variable is not set');
  }
  return new Anthropic({ apiKey });
}

export async function getCritique(
  imageBase64: string,
  mediaType: 'image/png' | 'image/jpeg' | 'image/webp',
  context: IndustryContext,
  tone: CritiqueTone
): Promise<CritiqueResult> {
  const client = getClaudeClient();
  const systemPrompt = buildSystemPrompt(context, tone);

  const response = await client.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 4096,
    system: systemPrompt,
    tools: [critiqueToolDefinition],
    tool_choice: { type: 'tool', name: 'design_critique' },
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'image',
            source: {
              type: 'base64',
              media_type: mediaType,
              data: imageBase64,
            },
          },
          {
            type: 'text',
            text: 'Please analyze this UI design and provide a detailed critique.',
          },
        ],
      },
    ],
  });

  // Extract tool_use response
  const toolUseBlock = response.content.find(
    (block) => block.type === 'tool_use'
  );

  if (!toolUseBlock || toolUseBlock.type !== 'tool_use') {
    throw new Error('Claude did not return a tool_use response');
  }

  return toolUseBlock.input as CritiqueResult;
}
