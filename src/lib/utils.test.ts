import { describe, expect, it } from "vitest";

import { cn } from "./utils";

describe("cn", () => {
  it("joins class names", () => {
    expect(cn("px-2", "py-1")).toBe("px-2 py-1");
  });

  it("ignores falsy values", () => {
    expect(cn("px-2", false, undefined, null, "", "py-1")).toBe("px-2 py-1");
  });

  it("supports conditional class objects and arrays", () => {
    expect(cn(["px-2", { "py-1": true, "mt-2": false }])).toBe("px-2 py-1");
  });

  it("keeps the last conflicting tailwind utility", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
    expect(cn("text-sm text-gray-600", "text-lg")).toBe("text-gray-600 text-lg");
  });

  it("resolves conflicts across different tailwind groups independently", () => {
    expect(cn("p-2", "p-4", "m-2")).toBe("p-4 m-2");
  });

  it("returns an empty string when no class name is provided", () => {
    expect(cn()).toBe("");
    expect(cn(undefined)).toBe("");
  });
});
