/**
 * Helpers for the mood test result (`src/pages/MoodTests.tsx` and the
 * components in `src/components/mood-tests`).
 *
 * The result is produced by the AI, so none of the fields can be trusted:
 * the response may be missing a score, may contain a score that is not a
 * number or may omit the insights and the recommendations completely. The
 * helpers below turn such a response into a result that is always safe to
 * render, and the components themselves additionally guard against missing
 * props.
 */

export interface QuizScores {
  anxiety: number;
  depression: number;
  stress: number;
  wellbeing: number;
  energy: number;
  focus: number;
}

export const SCORE_CATEGORIES: (keyof QuizScores)[] = [
  "anxiety",
  "depression",
  "stress",
  "wellbeing",
  "energy",
  "focus",
];

/** Scores that are used when the AI does not provide a usable one. */
export const FALLBACK_SCORES: QuizScores = {
  anxiety: 45,
  depression: 30,
  stress: 55,
  wellbeing: 60,
  energy: 40,
  focus: 50,
};

export const FALLBACK_INSIGHTS =
  "Based on your responses, you're experiencing some challenges but also showing resilience. Focus on self-care and don't hesitate to seek support when needed.";

export const FALLBACK_RECOMMENDATIONS: string[] = [
  "Consider practicing deep breathing exercises daily",
  "Try to maintain a regular sleep schedule",
  "Connect with supportive friends or family",
  "Consider speaking with a mental health professional",
];

/** Keep a score inside the 0-100 range that the progress bar expects. */
export function normalizeScore(value: unknown, fallback: number): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return fallback;
  }

  return Math.min(100, Math.max(0, Math.round(value)));
}

/** Build a complete score object, filling in the missing categories. */
export function normalizeScores(raw: unknown): QuizScores {
  const source =
    typeof raw === "object" && raw !== null
      ? (raw as Record<string, unknown>)
      : {};

  return SCORE_CATEGORIES.reduce((scores, category) => {
    scores[category] = normalizeScore(source[category], FALLBACK_SCORES[category]);
    return scores;
  }, {} as QuizScores);
}

/** The insights text, or the fallback text when the AI did not send any. */
export function normalizeInsights(raw: unknown): string {
  if (typeof raw === "string" && raw.trim().length > 0) {
    return raw;
  }

  return FALLBACK_INSIGHTS;
}

/** The recommendation list, or the fallback list when it is missing. */
export function normalizeRecommendations(raw: unknown): string[] {
  if (!Array.isArray(raw)) {
    return [...FALLBACK_RECOMMENDATIONS];
  }

  const recommendations = raw.filter(
    (recommendation): recommendation is string =>
      typeof recommendation === "string" && recommendation.trim().length > 0
  );

  return recommendations.length > 0
    ? recommendations
    : [...FALLBACK_RECOMMENDATIONS];
}
