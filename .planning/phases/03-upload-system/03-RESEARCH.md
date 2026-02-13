# Phase 3 Research: Upload System

**Phase:** 3 — Upload System
**Goal:** Designers can upload UI screenshots with validation, compression, and preview
**Researched:** 2026-02-13

## What This Phase Needs

Phase 3 builds the upload UI. Five requirements:
- **UPLD-01**: Designer can upload via drag-and-drop or file picker
- **UPLD-02**: App accepts PNG, JPG, and WebP formats only
- **UPLD-03**: App validates file size (max 10MB) and shows error for invalid files
- **UPLD-04**: App compresses/resizes images client-side before sending (max 2000px)
- **UPLD-05**: Designer can see a preview of the uploaded image

## What Already Exists

- `src/app/page.tsx` — Minimal placeholder with Card component
- `src/app/api/critique/route.ts` — Working POST endpoint accepting `{ image, mediaType, context, tone }`
- `src/types/critique.ts` — CritiqueRequest type with image as base64 string
- ShadCN components: Button, Card
- react-dropzone is NOT yet installed (listed in STACK.md research)

## Key Implementation Details

### react-dropzone for Upload

```bash
npm install react-dropzone
```

react-dropzone provides:
- Drag-and-drop zone with `useDropzone` hook
- File picker on click (built-in)
- Accept filter: `{ 'image/png': ['.png'], 'image/jpeg': ['.jpg', '.jpeg'], 'image/webp': ['.webp'] }`
- maxSize: 10 * 1024 * 1024 (10MB)
- onDrop callback with accepted and rejected files

### Client-Side Image Compression

Use the HTML Canvas API — no additional library needed:

```typescript
async function compressImage(file: File, maxDimension: number = 2000): Promise<{ base64: string; mediaType: string }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let { width, height } = img;

      // Scale down if larger than maxDimension
      if (width > maxDimension || height > maxDimension) {
        const ratio = Math.min(maxDimension / width, maxDimension / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, width, height);

      // Output as JPEG for smaller size (unless PNG with transparency)
      const outputType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
      const quality = 0.85;
      const dataUrl = canvas.toDataURL(outputType, quality);
      const base64 = dataUrl.split(',')[1];

      resolve({ base64, mediaType: outputType });
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}
```

### Upload Zone Component

- "use client" directive (client component for file handling)
- Drag-and-drop area with dashed border
- Click to browse fallback
- Show accepted formats and size limit in the zone
- Visual feedback: idle → drag-over → uploading → preview
- Error display for rejected files (wrong format, too large)

### Image Preview

- After compression, show the preview from the canvas/blob
- Display alongside upload zone or replacing it
- Show file name, dimensions, and compressed size
- "Remove" button to clear and start over

### Page Layout Update

Update `page.tsx` to integrate the upload component:
- Import UploadZone component
- Add state management: uploadedFile, imageData (base64 + mediaType)
- Page remains a simple single-column layout
- No configuration UI yet (Phase 4) — use defaults for now
- No critique display yet (Phase 5) — just upload + preview

### Component Structure

```
src/components/
├── ui/                    # ShadCN (existing)
├── upload-zone.tsx        # Drag-and-drop upload area
└── image-preview.tsx      # Uploaded image preview with remove
src/lib/
└── image-utils.ts         # compressImage, validateFile helpers
```

## Dependencies to Install

```bash
npm install react-dropzone
```

## Gotchas

- `useDropzone` requires "use client" — Next.js App Router server components can't use hooks
- `URL.createObjectURL` needs cleanup with `URL.revokeObjectURL` to avoid memory leaks
- Canvas `toDataURL` returns a data URL — split on comma to get pure base64
- WebP files may not be supported in all browsers for Canvas output — keep original format for WebP
- File.type may be empty for some files — validate extension as fallback
- Base64 encoding increases size ~33% — compress BEFORE converting to base64

## What NOT to Build Yet

- No context/tone selectors (Phase 4)
- No critique display (Phase 5)
- No submit button wired to API (Phase 4/5 integration)
- No loading states (Phase 5)
- Just: upload → validate → compress → preview

---
*Research for Phase 3: Upload System*
