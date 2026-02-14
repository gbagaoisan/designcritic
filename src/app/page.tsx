'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UploadZone } from '@/components/upload-zone';
import { CritiqueConfig } from '@/components/critique-config';
import { CritiqueDisplay } from '@/components/critique-display';
import { IndustryContext, CritiqueTone, CritiqueResult } from '@/types/critique';
import { AlertCircle, Copy, Check } from 'lucide-react';

type FilterKey = 'all' | 'what_works' | 'usability_risks' | 'visual_hierarchy' | 'improvements';

const FILTER_TABS: { label: string; value: FilterKey }[] = [
  { label: 'All', value: 'all' },
  { label: 'Strengths', value: 'what_works' },
  { label: 'Usability', value: 'usability_risks' },
  { label: 'Visual', value: 'visual_hierarchy' },
  { label: 'Improvements', value: 'improvements' },
];

const SECTION_LABELS: { key: keyof CritiqueResult; title: string }[] = [
  { key: 'what_works', title: 'What Works' },
  { key: 'usability_risks', title: 'Usability Risks' },
  { key: 'visual_hierarchy', title: 'Visual Hierarchy Issues' },
  { key: 'improvements', title: 'Concrete Improvements' },
];

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<{
    base64: string;
    mediaType: string;
    fileName: string;
  } | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Configuration state
  const [selectedContext, setSelectedContext] = useState<IndustryContext>('saas');
  const [selectedTone, setSelectedTone] = useState<CritiqueTone>('constructive');

  // Submit state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [critiqueResult, setCritiqueResult] = useState<CritiqueResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Filter state
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  // Copy state
  const [copied, setCopied] = useState(false);

  // Loading messages rotation
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const loadingMessages = [
    'Analyzing your design...',
    'Checking usability patterns...',
    'Reviewing visual hierarchy...',
    'Crafting improvements...',
  ];

  useEffect(() => {
    if (!isSubmitting) return;

    const interval = setInterval(() => {
      setLoadingMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [isSubmitting]);

  const handleImageReady = (data: {
    base64: string;
    mediaType: string;
    fileName: string;
    originalSize: number;
    compressedSize: number;
  }) => {
    setUploadedImage({
      base64: data.base64,
      mediaType: data.mediaType,
      fileName: data.fileName,
    });
    setImagePreview(`data:${data.mediaType};base64,${data.base64}`);
  };

  const handleImageRemove = () => {
    setUploadedImage(null);
    setImagePreview(null);
    setCritiqueResult(null);
    setError(null);
    setActiveFilter('all');
  };

  const handleCopy = async () => {
    if (!critiqueResult) return;

    const sections = SECTION_LABELS.map((section) => {
      const points = critiqueResult[section.key];
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

  const handleSubmit = async () => {
    if (!uploadedImage) return;

    setIsSubmitting(true);
    setError(null);
    setLoadingMessageIndex(0);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 90000);

    try {
      const response = await fetch('/api/critique', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: uploadedImage.base64,
          mediaType: uploadedImage.mediaType,
          context: selectedContext,
          tone: selectedTone,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to generate critique');
        return;
      }

      setCritiqueResult(data.critique);
    } catch (err) {
      clearTimeout(timeoutId);
      if (err instanceof Error && err.name === 'AbortError') {
        setError('Request timed out. Please try again.');
      } else {
        setError('Network error. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      {/* LEFT PANEL */}
      <div className="bg-white dark:bg-slate-900 px-8 py-8 lg:px-12 lg:py-12 lg:sticky lg:top-0 lg:h-screen lg:overflow-auto">
        <div className="space-y-6">
          <header>
            <h1 className="text-4xl font-bold tracking-tight">DesignCritic</h1>
            <p className="text-lg mt-2 text-muted-foreground">
              AI-powered design feedback for your UI screenshots
            </p>
          </header>

          <UploadZone
            onImageReady={handleImageReady}
            onImageRemove={handleImageRemove}
            imagePreview={imagePreview}
          />

          {uploadedImage && !critiqueResult && (
            <div className="space-y-6">
              <CritiqueConfig
                selectedContext={selectedContext}
                selectedTone={selectedTone}
                onContextChange={setSelectedContext}
                onToneChange={setSelectedTone}
              />

              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !uploadedImage}
                className="w-full"
                size="lg"
              >
                {isSubmitting ? 'Analyzing...' : 'Get Critique'}
              </Button>
            </div>
          )}

          {critiqueResult && (
            <Button onClick={handleImageRemove} size="lg" className="w-full">
              Start New Critique
            </Button>
          )}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="bg-slate-100 dark:bg-slate-800/50 px-8 py-8 lg:px-12 lg:py-12">
        <div className="space-y-6">
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2">
            {FILTER_TABS.map((tab) => (
              <Button
                key={tab.value}
                variant={activeFilter === tab.value ? 'default' : 'outline'}
                size="sm"
                className="rounded-full"
                onClick={() => setActiveFilter(tab.value)}
              >
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Critiques heading row */}
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold">Critiques</h2>
            {critiqueResult && (
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
                    Copy
                  </>
                )}
              </Button>
            )}
          </div>

          {/* Content */}
          {isSubmitting ? (
            <Card className="border-blue-500/50 bg-blue-50/50 dark:bg-blue-950/50">
              <CardContent className="flex flex-col items-center justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-center text-sm text-muted-foreground">
                  {loadingMessages[loadingMessageIndex]}
                </p>
              </CardContent>
            </Card>
          ) : critiqueResult ? (
            <CritiqueDisplay critique={critiqueResult} filter={activeFilter} />
          ) : (
            <Card className="border-dashed">
              <CardContent className="flex items-center justify-center py-16">
                <p className="text-muted-foreground">No critiques yet!</p>
              </CardContent>
            </Card>
          )}

          {error && (
            <Card className="border-red-500 bg-red-50 dark:bg-red-950">
              <CardContent className="flex items-start gap-3 py-4">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-red-900 dark:text-red-100">{error}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSubmit}
                  className="border-red-300 hover:bg-red-100 dark:hover:bg-red-900"
                >
                  Try Again
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
