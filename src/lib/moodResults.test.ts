import { describe, expect, it } from "vitest";

import {
  FALLBACK_RECOMMENDATIONS,
  FALLBACK_SCORES,
  normalizeInsights,
  normalizeRecommendations,
  normalizeScore,
  normalizeScores,
  SCORE_CATEGORIES,
} from "./moodResults";

describe("normalizeScore", () => {
  it("keeps a valid score", () => {
    expect(normalizeScore(42, 0)).toBe(42);
  });

  it("clamps a score to the 0-100 range", () => {
    expect(normalizeScore(140, 0)).toBe(100);
    expect(normalizeScore(-20, 0)).toBe(0);
  });

  it("falls back when the score is not a usable number", () => {
    expect(normalizeScore(undefined, 45)).toBe(45);
    expect(normalizeScore(null, 45)).toBe(45);
    expect(normalizeScore("60", 45)).toBe(45);
    expect(normalizeScore(NaN, 45)).toBe(45);
  });
});

describe("normalizeScores", () => {
  it("keeps every score of a complete response", () => {
    const scores = normalizeScores({
      anxiety: 10,
      depression: 20,
      stress: 30,
      wellbeing: 40,
      energy: 50,
      focus: 60,
    });

    expect(scores).toEqual({
      anxiety: 10,
      depression: 20,
      stress: 30,
      wellbeing: 40,
      energy: 50,
      focus: 60,
    });
  });

  it("fills in the missing categories", () => {
    const scores = normalizeScores({ anxiety: 10 });

    expect(scores.anxiety).toBe(10);
    expect(scores.depression).toBe(FALLBACK_SCORES.depression);
    expect(scores.focus).toBe(FALLBACK_SCORES.focus);
    expect(Object.keys(scores).sort()).toEqual([...SCORE_CATEGORIES].sort());
  });

  it("returns the fallback scores for a missing response", () => {
    expect(normalizeScores(undefined)).toEqual(FALLBACK_SCORES);
    expect(normalizeScores(null)).toEqual(FALLBACK_SCORES);
    expect(normalizeScores("nope")).toEqual(FALLBACK_SCORES);
  });
});

describe("normalizeInsights", () => {
  it("keeps the insights of the AI", () => {
    expect(normalizeInsights("You are doing well.")).toBe("You are doing well.");
  });

  it("falls back when the insights are missing", () => {
    expect(normalizeInsights(undefined)).toBeTruthy();
    expect(normalizeInsights(null)).toBeTruthy();
    expect(normalizeInsights("   ")).toBeTruthy();
    expect(normalizeInsights(42)).toBeTruthy();
  });
});

describe("normalizeRecommendations", () => {
  it("keeps the recommendations of the AI", () => {
    expect(normalizeRecommendations(["Rest more", "Talk to someone"])).toEqual([
      "Rest more",
      "Talk to someone",
    ]);
  });

  it("drops the empty recommendations", () => {
    expect(normalizeRecommendations(["Rest more", "", "  "])).toEqual([
      "Rest more",
    ]);
  });

  it("falls back when the recommendations are missing", () => {
    expect(normalizeRecommendations(undefined)).toEqual(
      FALLBACK_RECOMMENDATIONS
    );
    expect(normalizeRecommendations([])).toEqual(FALLBACK_RECOMMENDATIONS);
    expect(normalizeRecommendations(["", "  "])).toEqual(
      FALLBACK_RECOMMENDATIONS
    );
  });
});
