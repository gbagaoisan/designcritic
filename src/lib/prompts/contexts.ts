import type { IndustryContext } from '@/types/critique';

export const CONTEXT_HEURISTICS: Record<IndustryContext, string> = {
  saas: `When critiquing this SaaS design, pay special attention to:

**Onboarding & Feature Discovery**: Evaluate how easily new users can understand what the product does and discover key features. Look for progressive disclosure patterns that introduce complexity gradually. Check if navigation labels are task-oriented ("Create Report" vs "Reports"). Assess whether empty states provide clear next steps rather than dead ends.

**Pricing & Conversion Patterns**: Examine pricing page hierarchy — is the recommended plan visually prominent? Are CTAs consistent in color and placement? Check for free-trial-to-paid conversion nudges (trial countdown, upgrade prompts). Evaluate if feature comparison tables are scannable and emphasize differentiation clearly.

**Navigation Efficiency**: Analyze information architecture — can users accomplish core tasks in 3 clicks or less? Check if primary navigation is persistent and categorized logically. Evaluate whether the most frequent user actions have prominent, always-accessible shortcuts.

**Trust & Professionalism**: Look for credibility signals (customer logos, testimonials, case studies) and whether they feel authentic rather than stock. Assess if the visual style conveys reliability and competence appropriate to the business software context.`,

  healthcare: `When critiquing this healthcare design, pay special attention to:

**Trust & Credentialing**: Evaluate placement and visibility of trust signals like medical credentials, certifications (HIPAA, board certifications), hospital affiliations, and provider photos. Check if these signals feel prominent without being overwhelming. Assess whether the visual design conveys medical professionalism through typography, color choices, and layout formality.

**Accessibility & Inclusive Design**: Examine color contrast ratios for WCAG AA compliance minimum. Check if text is readable at smaller sizes for users with vision impairments. Evaluate if interactive elements have sufficient touch targets (44px minimum). Look for clear visual focus states for keyboard navigation. Assess if critical information uses multiple signals beyond just color.

**Navigation for Non-Technical Users**: Analyze whether navigation labels use plain language instead of medical jargon. Check if the information hierarchy matches patient mental models (symptoms → treatments, not medical taxonomy). Evaluate if forms break complex processes into clear steps with progress indicators.

**Calming & Patient-Centric Design**: Look for color palette choices — are colors calming (blues, greens, neutrals) rather than alarming (heavy reds, harsh contrasts)? Assess whitespace usage for reducing cognitive load. Check if information density is managed — critical details prominent, supporting details available but not overwhelming. Evaluate if visual design reduces anxiety rather than amplifying it.`,

  consumer: `When critiquing this consumer design, pay special attention to:

**Emotional Engagement & Brand Personality**: Evaluate whether the visual design creates an emotional connection appropriate to the brand (playful, aspirational, rebellious, comforting). Check if typography and color choices consistently express the brand personality. Assess whether imagery style (photography vs illustration, formal vs casual) aligns with target audience expectations. Look for moments of surprise and delight that create memorable experiences.

**Social Proof & Trust Signals**: Examine placement and authenticity of reviews, testimonials, user-generated content, and popularity indicators. Check if social proof feels organic and credible rather than forced. Evaluate if trust badges (secure checkout, money-back guarantees, press mentions) are visible but not dominating the design.

**Mobile-First Interaction Patterns**: Assess whether the layout prioritizes thumb-reachable zones for key actions. Check if tap targets are sized appropriately (minimum 44px). Evaluate whether content hierarchy works on narrow viewports without horizontal scrolling. Look for mobile-optimized patterns like bottom navigation, sticky CTAs, and card-based layouts.

**Content Hierarchy for Scanning**: Analyze whether users can understand the value proposition in 3 seconds of scanning. Check if headlines are short and benefit-focused. Evaluate visual rhythm — does the layout guide the eye through a clear reading flow? Look for effective use of size, weight, and color to create scannable content layers.

**Virality & Sharing Affordances**: Check for clear, accessible sharing mechanisms where appropriate. Evaluate if key content (quotes, stats, visuals) is designed to be excerpt-friendly for social sharing. Assess whether CTAs encourage community actions (invite friends, share results, tag others).`,

  ecommerce: `When critiquing this ecommerce design, pay special attention to:

**Product Imagery & Prominence**: Evaluate whether product photos are high-quality, properly lit, and show products from multiple angles. Check if images are large enough to see detail but load quickly. Assess whether product photography is consistent in style, background, and lighting. Look for zoom functionality or gallery views for detailed inspection.

**Checkout Friction Reduction**: Examine the path from product to purchase — how many clicks and form fields? Check if guest checkout is clearly available. Evaluate if cart visibility is persistent (icon with count). Look for inline validation on forms to catch errors early. Assess whether shipping costs are revealed early to prevent cart abandonment.

**Trust & Security Indicators**: Check for security badges near payment fields (Norton, SSL, verified payment processors). Evaluate placement of money-back guarantees, return policies, and customer support contact info. Look for customer reviews and ratings visibility. Assess whether trust signals feel credible rather than excessive.

**Pricing Clarity & Transparency**: Evaluate if prices are prominently displayed with clear currency. Check for any hidden costs or surprise fees at checkout. Look for price comparison patterns (was/now, savings percentage, bulk discounts) presented clearly. Assess whether shipping and tax estimates are easy to discover before checkout.

**Cart Visibility & Cross-Sell Placement**: Check if the cart icon is persistent and shows item count. Evaluate if "Add to Cart" CTAs are consistently colored and positioned. Look for cross-sell and upsell opportunities (related products, bundles, "complete the look") placed strategically but not intrusively. Assess whether urgency indicators (low stock, time-limited offers) feel authentic versus dark pattern manipulation.`,

  fintech: `When critiquing this fintech design, pay special attention to:

**Data Visualization Clarity**: Evaluate whether charts and graphs use clear axes, labels, and legends. Check if data visualizations prioritize accuracy over decoration. Assess whether numbers are formatted consistently with appropriate precision (2 decimals for currency). Look for color choices that work for colorblind users in charts. Check if visual hierarchy emphasizes the most important metrics.

**Security & Trust Signals**: Examine placement of security badges (bank-level encryption, regulatory compliance, two-factor authentication indicators). Check for visual cues that sensitive data is protected (lock icons, masked numbers). Evaluate whether the visual design conveys institutional credibility through conservative typography and professional color schemes. Look for clear data privacy and security policy links.

**Regulatory Compliance Indicators**: Check for required disclosure text (APR, fees, terms) and whether it's legible without being dominating. Evaluate if disclaimers and risk warnings are present and readable. Look for accessibility of legal documents and privacy policies. Assess whether compliance requirements are integrated into the design rather than feeling tacked on.

**Progressive Disclosure of Complexity**: Analyze whether complex financial information is layered — essential details up front, comprehensive data available on interaction. Check if forms reveal fields progressively rather than overwhelming users. Evaluate whether educational tooltips or help icons explain jargon. Look for clear visual separation between simple and advanced features.

**Transaction Flow Clarity**: Evaluate if multi-step financial actions (transfers, investments, payments) show clear progress and allow review before submission. Check if confirmation screens summarize transaction details clearly. Look for explicit "confirm" actions before irreversible operations. Assess whether users can easily understand what will happen when they click a button.

**Confidence-Building Visual Patterns**: Check for use of visual patterns that reduce anxiety — generous whitespace, calm colors, clear labeling, readable type sizes. Evaluate whether error states are helpful and non-alarming. Look for success confirmations that reassure users. Assess whether the overall design feels stable and trustworthy rather than flashy or experimental.`,
};
