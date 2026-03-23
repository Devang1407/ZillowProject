# Project Context: Sales Compensation Fairness Dashboard

## Business Problem
Raw attainment figures can be highly misleading when market difficulty varies widely among territories or segments. Top-line numbers alone can misread performance, causing organizations to unfairly penalize highly effective reps in tough markets, or over-credit average reps in easy markets.

## Dashboard Goal
Build a clean, executive-style dashboard that visualizes how sales rep performance changes when market difficulty is factored into the equation. It must quickly highlight under-credited reps, at-risk reps, and provide recommended actions, giving management a clear lens on true "fair" performance.

## Target Audience
Zillow hiring managers, RevOps leaders, and Compensation leaders. The dashboard must feel highly credible, polished, minimal, and capable of conveying its core message within 10 seconds.

## Single-Source-of-Truth Dataset
The application data will be sourced exclusively from a Supabase view: `public.v_dashboard_rep_fairness`. There should be no frontend joints or raw table queries; this view contains all necessary and pre-calculated information.

## UI Principles
- **Executive Elegance:** Clean lines, ample whitespace, and a polished visual hierarchy.
- **Minimal Clutter:** Avoid the "generic admin dashboard" feel (no excessive navigation sidebars, overwhelming toggles, or dense datagrids).
- **Focus:** Drive attention immediately to the insights (who needs help, who is overperforming).
- **Subtle Polish:** Use minimal animations (e.g., Framer Motion) to guide attention, not to distract.
