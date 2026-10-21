import { describe, expect, it } from "vitest";

import { createMessageIdGenerator } from "./chatMessages";

describe("createMessageIdGenerator", () => {
  it("hands out increasing ids", () => {
    const nextId = createMessageIdGenerator();

    expect(nextId()).toBe(1);
    expect(nextId()).toBe(2);
    expect(nextId()).toBe(3);
  });

  it("starts at the given id", () => {
    const nextId = createMessageIdGenerator(2);

    expect(nextId()).toBe(2);
    expect(nextId()).toBe(3);
  });

  it("never hands out the same id twice", () => {
    const nextId = createMessageIdGenerator();
    const ids = Array.from({ length: 100 }, () => nextId());

    expect(new Set(ids).size).toBe(ids.length);
  });

  it("keeps the ids unique when a message is appended while a reply is pending", () => {
    // The greeting the chat starts with.
    const messages = [{ id: 1 }];
    const nextId = createMessageIdGenerator(2);

    // The user sends a message and the request is still pending.
    messages.push({ id: nextId() });
    // Another message is appended before the reply arrives.
    messages.push({ id: nextId() });
    // The reply arrives last.
    messages.push({ id: nextId() });

    expect(messages.map((message) => message.id)).toEqual([1, 2, 3, 4]);
    expect(new Set(messages.map((message) => message.id)).size).toBe(
      messages.length
    );
  });

  it("does not repeat an id when the generator is used from two interleaved requests", () => {
    const nextId = createMessageIdGenerator(2);
    const ids = [nextId(), nextId(), nextId(), nextId()];

    expect(ids).toEqual([2, 3, 4, 5]);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
