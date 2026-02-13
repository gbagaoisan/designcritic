'use client';

import { useState } from 'react';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UploadZone } from '@/components/upload-zone';

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<{
    base64: string;
    mediaType: string;
    fileName: string;
  } | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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
      </main>
    </div>
  );
}
