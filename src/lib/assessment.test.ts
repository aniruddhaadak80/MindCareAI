import { describe, expect, it } from "vitest";

import {
  ASSESSMENT_QUESTIONS,
  computeAssessmentTotal,
  countAnsweredAnswers,
  getAssessmentOutcome,
  isAnswered,
} from "./assessment";

describe("computeAssessmentTotal", () => {
  it("sums every answered question", () => {
    expect(computeAssessmentTotal([3, 2, 1, 0, 3, 2, 1, 0])).toBe(12);
  });

  it("ignores skipped questions instead of producing NaN", () => {
    const answers = [3, undefined, 2, null, 1];

    const total = computeAssessmentTotal(answers);

    expect(total).toBe(6);
    expect(Number.isNaN(total)).toBe(false);
  });

  it("ignores sparse arrays", () => {
    // eslint-disable-next-line no-sparse-arrays
    const answers = [3, , 2];

    expect(computeAssessmentTotal(answers)).toBe(5);
  });

  it("ignores values that are not finite numbers", () => {
    expect(computeAssessmentTotal([3, NaN, Infinity, 2])).toBe(5);
  });

  it("returns 0 when nothing was answered", () => {
    expect(computeAssessmentTotal([])).toBe(0);
    expect(computeAssessmentTotal([undefined, null])).toBe(0);
  });
});

describe("countAnsweredAnswers", () => {
  it("counts only the answered questions", () => {
    expect(countAnsweredAnswers([3, undefined, 2, null])).toBe(2);
  });

  it("returns 0 when nothing was answered", () => {
    expect(countAnsweredAnswers([undefined, null, NaN])).toBe(0);
  });
});

describe("isAnswered", () => {
  it("only accepts finite numbers", () => {
    expect(isAnswered(0)).toBe(true);
    expect(isAnswered(3)).toBe(true);
    expect(isAnswered(undefined)).toBe(false);
    expect(isAnswered(null)).toBe(false);
    expect(isAnswered(NaN)).toBe(false);
  });
});

describe("getAssessmentOutcome", () => {
  it("returns the low risk level for a low total", () => {
    const outcome = getAssessmentOutcome([1, 1, 1, 1, 1, 1, 1, 1]);

    expect(outcome.level).toBe("Low Risk");
    expect(outcome.color).toBe("emerald");
  });

  it("returns the moderate risk level for a medium total", () => {
    const outcome = getAssessmentOutcome([3, 3, 2, 2, 2, 2, 1, 1]);

    expect(outcome.level).toBe("Moderate Risk");
    expect(outcome.color).toBe("amber");
  });

  it("returns the high risk level for a high total", () => {
    const outcome = getAssessmentOutcome([3, 3, 3, 3, 3, 3, 3, 3]);

    expect(outcome.level).toBe("High Risk");
    expect(outcome.color).toBe("red");
  });

  it("never reports a risk level for skipped questions", () => {
    const outcome = getAssessmentOutcome([undefined, undefined, undefined]);

    expect(outcome.level).toBe("Low Risk");
    expect(outcome.answeredCount).toBe(0);
    expect(outcome.totalQuestions).toBe(ASSESSMENT_QUESTIONS.length);
  });

  it("reports how many questions were answered", () => {
    const outcome = getAssessmentOutcome([3, undefined, 2, null, 1]);

    expect(outcome.answeredCount).toBe(3);
    expect(outcome.totalQuestions).toBe(ASSESSMENT_QUESTIONS.length);
  });
});
