/**
 * Scoring helpers for the standalone mental health assessment
 * (`src/pages/Assessment.tsx`).
 *
 * The questions are answered one by one, so a question can be skipped and
 * simply have no answer at all. Every helper in this module therefore treats
 * a missing answer as "unanswered" and never lets it reach the score, which
 * is what used to turn the total into `NaN`.
 */

export const ASSESSMENT_QUESTIONS: string[] = [
  "Over the last 2 weeks, how often have you felt down, depressed, or hopeless?",
  "How often have you felt nervous, anxious, or on edge?",
  "How often have you had trouble falling or staying asleep?",
  "How often have you felt tired or had little energy?",
  "How often have you had trouble concentrating on things?",
  "How often have you felt good about yourself?",
  "How often have you been able to cope with stress?",
  "How often have you felt overwhelmed by your responsibilities?",
];

export const ASSESSMENT_OPTIONS: { text: string; value: number }[] = [
  { text: "Not at all", value: 0 },
  { text: "Several days", value: 1 },
  { text: "More than half the days", value: 2 },
  { text: "Nearly every day", value: 3 },
];

/** Highest total that is still considered a low risk. */
export const LOW_RISK_MAX_TOTAL = 8;
/** Highest total that is still considered a moderate risk. */
export const MODERATE_RISK_MAX_TOTAL = 16;

export type RiskLevel = "Low Risk" | "Moderate Risk" | "High Risk";

export interface AssessmentOutcome {
  level: RiskLevel;
  color: string;
  message: string;
  gradient: string;
  /** How many questions actually carry an answer. */
  answeredCount: number;
  /** How many questions were asked in total. */
  totalQuestions: number;
}

/** An answer is only usable when it is a finite number. */
export function isAnswered(
  answer: number | null | undefined
): answer is number {
  return typeof answer === "number" && Number.isFinite(answer);
}

/**
 * Sum of the answers that were actually given.
 *
 * Skipped (undefined/null) and invalid answers are excluded, so the total can
 * never become `NaN`.
 */
export function computeAssessmentTotal(
  answers: readonly (number | null | undefined)[]
): number {
  return answers
    .filter(isAnswered)
    .reduce((total, answer) => total + answer, 0);
}

/** Number of questions that carry a usable answer. */
export function countAnsweredAnswers(
  answers: readonly (number | null | undefined)[]
): number {
  return answers.filter(isAnswered).length;
}

/**
 * Risk level for the given answers.
 *
 * The total only takes the answered questions into account, exactly like the
 * issue asks for. The number of answered questions is part of the result so the
 * UI can tell the user that skipped questions were left out of the score.
 */
export function getAssessmentOutcome(
  answers: readonly (number | null | undefined)[],
  totalQuestions: number = ASSESSMENT_QUESTIONS.length
): AssessmentOutcome {
  const total = computeAssessmentTotal(answers);
  const answeredCount = countAnsweredAnswers(answers);

  if (total <= LOW_RISK_MAX_TOTAL) {
    return {
      level: "Low Risk",
      color: "emerald",
      message:
        "Your responses suggest minimal mental health concerns. You're doing great!",
      gradient: "from-emerald-500 to-teal-500",
      answeredCount,
      totalQuestions,
    };
  }

  if (total <= MODERATE_RISK_MAX_TOTAL) {
    return {
      level: "Moderate Risk",
      color: "amber",
      message:
        "You may benefit from speaking with a mental health professional for additional support.",
      gradient: "from-amber-500 to-orange-500",
      answeredCount,
      totalQuestions,
    };
  }

  return {
    level: "High Risk",
    color: "red",
    message:
      "We strongly recommend seeking professional help immediately. You're not alone in this journey.",
    gradient: "from-red-500 to-pink-500",
    answeredCount,
    totalQuestions,
  };
}
