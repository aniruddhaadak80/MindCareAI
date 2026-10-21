import { describe, expect, it } from "vitest";

import {
  buildFallbackQuizQuestions,
  isQuizQuestion,
  parseQuizQuestions,
  QUIZ_QUESTION_COUNT,
} from "./moodQuiz";

describe("buildFallbackQuizQuestions", () => {
  it("returns a complete quiz", () => {
    const questions = buildFallbackQuizQuestions("anxious");

    expect(questions).toHaveLength(QUIZ_QUESTION_COUNT);
  });

  it("returns questions that match the QuizQuestion interface", () => {
    const questions = buildFallbackQuizQuestions("anxious");

    questions.forEach((question) => {
      expect(isQuizQuestion(question)).toBe(true);
      expect(question.id).toBeTruthy();
      expect(question.question.length).toBeGreaterThan(0);
      expect(question.options.length).toBeGreaterThanOrEqual(4);
    });
  });

  it("uses unique ids", () => {
    const questions = buildFallbackQuizQuestions("anxious");
    const ids = questions.map((question) => question.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it("mentions the selected mood", () => {
    const questions = buildFallbackQuizQuestions("anxious");

    expect(
      questions.some((question) => question.question.includes("anxious"))
    ).toBe(true);
  });

  it("falls back to a generic label when no mood is given", () => {
    const questions = buildFallbackQuizQuestions("");

    expect(questions).toHaveLength(QUIZ_QUESTION_COUNT);
    expect(questions[0].question).toContain("current");
  });

  it("does not share the option arrays between questions", () => {
    const questions = buildFallbackQuizQuestions("anxious");

    questions[0].options[0] = "changed";

    expect(questions[1].options[0]).not.toBe("changed");
  });

  it("covers anxiety, depression, stress and wellbeing", () => {
    const questions = buildFallbackQuizQuestions("anxious").map(
      (question) => question.question.toLowerCase()
    );

    expect(questions.some((question) => question.includes("anxious"))).toBe(true);
    expect(questions.some((question) => question.includes("depressed"))).toBe(true);
    expect(questions.some((question) => question.includes("stress"))).toBe(true);
    expect(questions.some((question) => question.includes("sleep"))).toBe(true);
    expect(questions.some((question) => question.includes("connected"))).toBe(true);
  });
});

describe("isQuizQuestion", () => {
  it("accepts a valid question", () => {
    expect(
      isQuizQuestion({ id: "1", question: "How are you?", options: ["a", "b"] })
    ).toBe(true);
  });

  it("rejects malformed questions", () => {
    expect(isQuizQuestion(null)).toBe(false);
    expect(isQuizQuestion(undefined)).toBe(false);
    expect(isQuizQuestion("question")).toBe(false);
    expect(isQuizQuestion({ id: "1", question: "How are you?" })).toBe(false);
    expect(
      isQuizQuestion({ id: "1", question: "How are you?", options: [] })
    ).toBe(false);
    expect(
      isQuizQuestion({ id: "1", question: "How are you?", options: [1, 2] })
    ).toBe(false);
    expect(
      isQuizQuestion({ question: "How are you?", options: ["a", "b"] })
    ).toBe(false);
  });
});

describe("parseQuizQuestions", () => {
  it("keeps the questions of a valid payload", () => {
    const questions = parseQuizQuestions({
      questions: [
        { id: "1", question: "First?", options: ["a", "b", "c", "d"] },
        { id: "2", question: "Second?", options: ["a", "b", "c", "d"] },
      ],
    });

    expect(questions).toHaveLength(2);
    expect(questions[0].question).toBe("First?");
  });

  it("drops the questions that do not match the interface", () => {
    const questions = parseQuizQuestions({
      questions: [
        { id: "1", question: "First?", options: ["a", "b", "c", "d"] },
        { id: "2", question: "Second?" },
        { id: "3", question: "Third?", options: ["a", "b", "c", "d"] },
      ],
    });

    expect(questions).toHaveLength(2);
  });

  it("returns an empty array for a payload without questions", () => {
    expect(parseQuizQuestions({})).toEqual([]);
    expect(parseQuizQuestions({ questions: "nope" })).toEqual([]);
    expect(parseQuizQuestions(null)).toEqual([]);
    expect(parseQuizQuestions(undefined)).toEqual([]);
  });
});
