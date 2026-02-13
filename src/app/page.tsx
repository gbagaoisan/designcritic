'use client';

import { useState, useEffect } from 'react';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UploadZone } from '@/components/upload-zone';
import { CritiqueConfig } from '@/components/critique-config';
import { CritiqueDisplay } from '@/components/critique-display';
import { IndustryContext, CritiqueTone, CritiqueResult } from '@/types/critique';
import { AlertCircle } from 'lucide-react';

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
    // Create preview URL from base64
    setImagePreview(`data:${data.mediaType};base64,${data.base64}`);
  };

  const handleImageRemove = () => {
    setUploadedImage(null);
    setImagePreview(null);
    setCritiqueResult(null);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!uploadedImage) return;

    setIsSubmitting(true);
    setError(null);
    setLoadingMessageIndex(0);

    // Create AbortController with 90-second timeout (vision API can take 30-60s)
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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <main className={`w-full ${critiqueResult ? 'max-w-3xl' : 'max-w-2xl'}`}>
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-4xl font-bold tracking-tight">DesignCritic</CardTitle>
          <CardDescription className="text-lg mt-2">
            AI-powered design feedback for your UI screenshots
          </CardDescription>
        </CardHeader>

        {/* Show critique display when ready */}
        {critiqueResult && !isSubmitting ? (
          <CritiqueDisplay critique={critiqueResult} onNewCritique={handleImageRemove} />
        ) : (
          <>
            <UploadZone
              onImageReady={handleImageReady}
              onImageRemove={handleImageRemove}
              imagePreview={imagePreview}
            />

            {uploadedImage && (
              <div className="mt-6 space-y-6">
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

                {/* Loading state */}
                {isSubmitting && (
                  <Card className="border-blue-500/50 bg-blue-50/50 dark:bg-blue-950/50">
                    <CardContent className="flex flex-col items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                      <p className="text-center text-sm text-muted-foreground">
                        {loadingMessages[loadingMessageIndex]}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Error display */}
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
            )}
          </>
        )}
      </main>
    </div>
  );
}
