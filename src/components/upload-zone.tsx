'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { compressImage, formatFileSize } from '@/lib/image-utils';
import { Upload, X } from 'lucide-react';

interface UploadZoneProps {
  onImageReady: (data: {
    base64: string;
    mediaType: string;
    fileName: string;
    originalSize: number;
    compressedSize: number;
  }) => void;
  onImageRemove: () => void;
  imagePreview: string | null; // data URL for preview
}

export function UploadZone({ onImageReady, onImageRemove, imagePreview }: UploadZoneProps) {
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileInfo, setFileInfo] = useState<{
    fileName: string;
    originalSize: number;
    compressedSize: number;
    dimensions: { width: number; height: number };
  } | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[], rejectedFiles: any[]) => {
      // Clear previous errors
      setError(null);

      // Handle rejections
      if (rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0];
        if (rejection.errors[0]?.code === 'file-too-large') {
          setError('File is too large. Maximum size is 10MB.');
        } else if (rejection.errors[0]?.code === 'file-invalid-type') {
          setError('Invalid file type. Please use PNG, JPG, or WebP.');
        } else {
          setError('File rejected. Please try another image.');
        }
        // Auto-clear error after 5 seconds
        setTimeout(() => setError(null), 5000);
        return;
      }

      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];
      setIsProcessing(true);

      try {
        // Compress the image
        const { base64, mediaType } = await compressImage(file);

        // Get original file size
        const originalSize = file.size;

        // Calculate compressed size (base64 is roughly 1.33x the binary size)
        const compressedSize = Math.round((base64.length * 3) / 4);

        // Create preview URL and get dimensions
        const img = new Image();
        const previewUrl = URL.createObjectURL(file);

        img.onload = () => {
          setFileInfo({
            fileName: file.name,
            originalSize,
            compressedSize,
            dimensions: { width: img.width, height: img.height },
          });

          onImageReady({
            base64,
            mediaType,
            fileName: file.name,
            originalSize,
            compressedSize,
          });

          setIsProcessing(false);
        };

        img.src = previewUrl;
      } catch (err) {
        setError('Failed to process image. Please try again.');
        setIsProcessing(false);
        setTimeout(() => setError(null), 5000);
      }
    },
    [onImageReady]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/webp': ['.webp'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
  });

  const handleRemove = () => {
    setFileInfo(null);
    setError(null);
    onImageRemove();
  };

  // Preview state
  if (imagePreview && fileInfo) {
    return (
      <Card className="overflow-hidden">
        <div className="relative">
          <img
            src={imagePreview}
            alt="Uploaded preview"
            className="w-full h-auto max-h-96 object-contain bg-slate-50 dark:bg-slate-900"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-4 border-t bg-slate-50 dark:bg-slate-900">
          <p className="text-sm font-medium truncate">{fileInfo.fileName}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {fileInfo.dimensions.width} × {fileInfo.dimensions.height} •{' '}
            {formatFileSize(fileInfo.originalSize)} → {formatFileSize(fileInfo.compressedSize)}
          </p>
        </div>
      </Card>
    );
  }

  // Upload zone (idle, drag-active, processing, or error state)
  return (
    <Card
      {...getRootProps()}
      className={`border-2 border-dashed transition-colors cursor-pointer ${
        isDragActive
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
          : error
          ? 'border-red-500 bg-red-50 dark:bg-red-950'
          : 'border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600'
      }`}
    >
      <input {...getInputProps()} />
      <div className="p-12 text-center">
        {isProcessing ? (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-sm text-muted-foreground">Compressing...</p>
          </>
        ) : isDragActive ? (
          <>
            <Upload className="h-12 w-12 mx-auto mb-4 text-blue-600" />
            <p className="text-lg font-medium text-blue-600">Drop your image here</p>
          </>
        ) : error ? (
          <>
            <X className="h-12 w-12 mx-auto mb-4 text-red-600" />
            <p className="text-lg font-medium text-red-600">{error}</p>
          </>
        ) : (
          <>
            <Upload className="h-12 w-12 mx-auto mb-4 text-slate-400" />
            <p className="text-lg font-medium mb-1">Drag & drop your UI screenshot here</p>
            <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
            <p className="text-xs text-muted-foreground">PNG, JPG, or WebP — max 10MB</p>
          </>
        )}
      </div>
    </Card>
  );
}
