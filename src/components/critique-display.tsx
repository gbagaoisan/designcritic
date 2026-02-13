'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CritiqueResult, CritiquePoint } from '@/types/critique';
import {
  CheckCircle,
  AlertTriangle,
  Eye,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
} from 'lucide-react';

interface CritiqueDisplayProps {
  critique: CritiqueResult;
  onNewCritique: () => void;
}

interface SectionConfig {
  key: keyof CritiqueResult;
  title: string;
  icon: typeof CheckCircle;
  iconColor: string;
}

const SECTIONS: SectionConfig[] = [
  { key: 'what_works', title: 'What Works', icon: CheckCircle, iconColor: 'text-green-500' },
  { key: 'usability_risks', title: 'Usability Risks', icon: AlertTriangle, iconColor: 'text-amber-500' },
  { key: 'visual_hierarchy', title: 'Visual Hierarchy Issues', icon: Eye, iconColor: 'text-blue-500' },
  { key: 'improvements', title: 'Concrete Improvements', icon: Lightbulb, iconColor: 'text-purple-500' },
];

export function CritiqueDisplay({ critique, onNewCritique }: CritiqueDisplayProps) {
  const [expandedPoints, setExpandedPoints] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState(false);

  const togglePoint = (sectionKey: string, pointIndex: number) => {
    const pointId = `${sectionKey}-${pointIndex}`;
    setExpandedPoints((prev) => {
      const next = new Set(prev);
      if (next.has(pointId)) {
        next.delete(pointId);
      } else {
        next.add(pointId);
      }
      return next;
    });
  };

  const handleCopy = async () => {
    // Format the entire critique as plain text
    const sections = SECTIONS.map((section) => {
      const points = critique[section.key];
      const pointsText = points
        .map((point) => `  - ${point.summary}: ${point.detail}`)
        .join('\n');
      return `${section.title.toUpperCase()}\n${pointsText}`;
    });

    const fullText = sections.join('\n\n');

    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="space-y-4">
      {/* Copy button at top-right */}
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="gap-2"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy Critique
            </>
          )}
        </Button>
      </div>

      {/* Render all 4 sections */}
      {SECTIONS.map((section) => {
        const Icon = section.icon;
        const points = critique[section.key];

        return (
          <Card key={section.key}>
            <CardHeader className="flex flex-row items-center gap-3 pb-4">
              <Icon className={`h-6 w-6 ${section.iconColor}`} />
              <h2 className="text-xl font-semibold">{section.title}</h2>
            </CardHeader>
            <CardContent className="space-y-2">
              {points.map((point, index) => {
                const pointId = `${section.key}-${index}`;
                const isExpanded = expandedPoints.has(pointId);

                return (
                  <div key={index} className="border-b last:border-b-0 pb-3 last:pb-0">
                    <button
                      onClick={() => togglePoint(section.key, index)}
                      className="w-full flex items-start justify-between gap-2 text-left cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 p-2 rounded transition-colors"
                    >
                      <p className="font-medium flex-1">{point.summary}</p>
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      )}
                    </button>
                    {isExpanded && (
                      <div className="pl-4 pr-2 pt-2 text-sm text-muted-foreground">
                        {point.detail}
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        );
      })}

      {/* New Critique button */}
      <div className="flex justify-center pt-4">
        <Button onClick={onNewCritique} size="lg">
          Start New Critique
        </Button>
      </div>
    </div>
  );
}
