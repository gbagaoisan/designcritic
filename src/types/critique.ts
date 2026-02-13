// Industry contexts for domain-specific heuristics
export type IndustryContext = 'saas' | 'healthcare' | 'consumer' | 'ecommerce' | 'fintech';

// Critique tone options
export type CritiqueTone = 'constructive' | 'roast';

// A single critique point with summary and expandable detail
export interface CritiquePoint {
  summary: string;    // 1-2 sentence scannable bullet
  detail: string;     // Deeper explanation with specifics
}

// The 4 critique sections
export interface CritiqueResult {
  what_works: CritiquePoint[];
  usability_risks: CritiquePoint[];
  visual_hierarchy: CritiquePoint[];
  improvements: CritiquePoint[];
}

// API request shape
export interface CritiqueRequest {
  image: string;              // base64-encoded image
  mediaType: 'image/png' | 'image/jpeg' | 'image/webp';
  context: IndustryContext;
  tone: CritiqueTone;
}

// API response shape
export interface CritiqueResponse {
  critique: CritiqueResult;
}

// API error response
export interface CritiqueError {
  error: string;
}
