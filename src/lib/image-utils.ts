import type { CritiqueRequest } from '@/types/critique';

/**
 * Compresses and resizes an image file to a base64 string.
 * Images larger than maxDimension are scaled down proportionally.
 *
 * @param file - The image file to compress
 * @param maxDimension - Maximum width or height (default: 2000px)
 * @returns Promise resolving to { base64, mediaType }
 */
export async function compressImage(
  file: File,
  maxDimension: number = 2000
): Promise<{ base64: string; mediaType: CritiqueRequest['mediaType'] }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      // Clean up object URL immediately after loading
      URL.revokeObjectURL(objectUrl);

      // Calculate new dimensions
      let { width, height } = img;
      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }

      // Create canvas and draw resized image
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      // Convert to base64 preserving original format
      const mediaType = file.type as CritiqueRequest['mediaType'];
      const quality = mediaType === 'image/jpeg' ? 0.85 : undefined;

      const dataUrl = canvas.toDataURL(mediaType, quality);
      const base64 = dataUrl.split(',')[1]; // Extract pure base64 without data URL prefix

      resolve({ base64, mediaType });
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Failed to load image'));
    };

    img.src = objectUrl;
  });
}

/**
 * Formats a file size in bytes to a human-readable string.
 *
 * @param bytes - File size in bytes
 * @returns Formatted string like "1.2 MB" or "450 KB"
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) {
    // Less than 1MB - show in KB
    return `${Math.round(bytes / 1024)} KB`;
  } else {
    // 1MB or more - show in MB
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
}
