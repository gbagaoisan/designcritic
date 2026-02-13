'use client';

import { Button } from '@/components/ui/button';
import { IndustryContext, CritiqueTone } from '@/types/critique';

interface CritiqueConfigProps {
  selectedContext: IndustryContext;
  selectedTone: CritiqueTone;
  onContextChange: (context: IndustryContext) => void;
  onToneChange: (tone: CritiqueTone) => void;
}

const INDUSTRY_OPTIONS: { value: IndustryContext; label: string }[] = [
  { value: 'saas', label: 'SaaS' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'consumer', label: 'Consumer' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'fintech', label: 'Fintech' },
];

const TONE_OPTIONS: { value: CritiqueTone; label: string }[] = [
  { value: 'constructive', label: 'Constructive' },
  { value: 'roast', label: 'Roast' },
];

export function CritiqueConfig({
  selectedContext,
  selectedTone,
  onContextChange,
  onToneChange,
}: CritiqueConfigProps) {
  return (
    <div className="space-y-6">
      {/* Industry Context Selector */}
      <div>
        <label className="text-sm font-medium text-muted-foreground block mb-2">
          Industry Context
        </label>
        <p className="text-xs text-muted-foreground mb-3">
          Tailors feedback to your domain
        </p>
        <div className="flex flex-wrap gap-2">
          {INDUSTRY_OPTIONS.map((option) => (
            <Button
              key={option.value}
              variant={selectedContext === option.value ? 'default' : 'outline'}
              onClick={() => onContextChange(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Critique Tone Selector */}
      <div>
        <label className="text-sm font-medium text-muted-foreground block mb-2">
          Critique Tone
        </label>
        <div className="flex flex-wrap gap-2">
          {TONE_OPTIONS.map((option) => (
            <Button
              key={option.value}
              variant={selectedTone === option.value ? 'default' : 'outline'}
              onClick={() => onToneChange(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
