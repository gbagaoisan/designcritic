'use client';

import { useState } from 'react';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UploadZone } from '@/components/upload-zone';
import { CritiqueConfig } from '@/components/critique-config';
import { IndustryContext, CritiqueTone, CritiqueResult } from '@/types/critique';

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
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to generate critique');
        return;
      }

      setCritiqueResult(data.critique);
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <main className="w-full max-w-2xl">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-4xl font-bold tracking-tight">DesignCritic</CardTitle>
          <CardDescription className="text-lg mt-2">
            AI-powered design feedback for your UI screenshots
          </CardDescription>
        </CardHeader>

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

            {error && (
              <p className="text-sm text-red-600 text-center">{error}</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
