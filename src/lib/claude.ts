import Anthropic from '@anthropic-ai/sdk';

// Singleton Claude client — server-side only
// In Phase 2, this module will add the critique function with tool_use
export function getClaudeClient(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY environment variable is not set');
  }
  return new Anthropic({ apiKey });
}
