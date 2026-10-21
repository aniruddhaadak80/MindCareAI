import { describe, expect, it } from "vitest";

import { getErrorName, getVoiceErrorMessage } from "./voiceErrors";

const domError = (name: string) => Object.assign(new Error(name), { name });

describe("getErrorName", () => {
  it("reads the name of an error", () => {
    expect(getErrorName(domError("NotAllowedError"))).toBe("NotAllowedError");
  });

  it("returns an empty name for values that are not errors", () => {
    expect(getErrorName(undefined)).toBe("");
    expect(getErrorName(null)).toBe("");
    expect(getErrorName("NotAllowedError")).toBe("");
  });
});

describe("getVoiceErrorMessage", () => {
  it("explains a denied permission", () => {
    const message = getVoiceErrorMessage(domError("NotAllowedError"));

    expect(message.reason).toBe("permission-denied");
    expect(message.title).toMatch(/denied/i);
    expect(message.description).toMatch(/text chat/i);
  });

  it("explains a missing microphone", () => {
    const message = getVoiceErrorMessage(domError("NotFoundError"));

    expect(message.reason).toBe("no-microphone");
    expect(message.title).toMatch(/microphone/i);
    expect(message.description).toMatch(/text chat/i);
  });

  it("explains an unsupported browser", () => {
    const message = getVoiceErrorMessage(domError("NotSupportedError"));

    expect(message.reason).toBe("unsupported");
    expect(message.description).toMatch(/text chat/i);
  });

  it("falls back to a generic message for an unknown error", () => {
    const message = getVoiceErrorMessage(new Error("boom"));

    expect(message.reason).toBe("unknown");
    expect(message.title).toBeTruthy();
    expect(message.description).toMatch(/text chat/i);
  });

  it("always offers the text chat as a fallback", () => {
    const errors = [
      domError("NotAllowedError"),
      domError("NotFoundError"),
      domError("NotSupportedError"),
      new Error("boom"),
      undefined,
    ];

    errors.forEach((error) => {
      expect(getVoiceErrorMessage(error).description).toMatch(/text chat/i);
    });
  });
});
