import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { reducer } from "./use-toast";

const createToast = (id: string, title: string) => ({
  id,
  title,
  open: true,
});

describe("toast reducer", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("adds a toast to the state", () => {
    const toast = createToast("1", "Hello");

    const state = reducer({ toasts: [] }, { type: "ADD_TOAST", toast });

    expect(state.toasts).toHaveLength(1);
    expect(state.toasts[0]).toMatchObject({ id: "1", title: "Hello" });
  });

  it("updates an existing toast without touching the others", () => {
    const first = createToast("1", "First");
    const second = createToast("2", "Second");

    const state = reducer(
      { toasts: [first, second] },
      { type: "UPDATE_TOAST", toast: { id: "2", title: "Updated" } }
    );

    expect(state.toasts[0]).toMatchObject({ id: "1", title: "First" });
    expect(state.toasts[1]).toMatchObject({ id: "2", title: "Updated" });
  });

  it("closes a single toast on dismiss", () => {
    const toast = { ...createToast("1", "Hello"), open: true };

    const state = reducer({ toasts: [toast] }, { type: "DISMISS_TOAST", toastId: "1" });

    expect(state.toasts[0].open).toBe(false);
  });

  it("closes every toast when dismiss is called without an id", () => {
    const toasts = [createToast("1", "First"), createToast("2", "Second")];

    const state = reducer({ toasts }, { type: "DISMISS_TOAST" });

    expect(state.toasts.every((toast) => toast.open === false)).toBe(true);
  });

  it("removes a single toast", () => {
    const toasts = [createToast("1", "First"), createToast("2", "Second")];

    const state = reducer({ toasts }, { type: "REMOVE_TOAST", toastId: "1" });

    expect(state.toasts).toHaveLength(1);
    expect(state.toasts[0].id).toBe("2");
  });

  it("removes every toast when no id is given", () => {
    const toasts = [createToast("1", "First"), createToast("2", "Second")];

    const state = reducer({ toasts }, { type: "REMOVE_TOAST" });

    expect(state.toasts).toHaveLength(0);
  });

  it("does not mutate the previous state", () => {
    const toasts = [createToast("1", "First")];
    const previousState = { toasts };

    reducer(previousState, { type: "ADD_TOAST", toast: createToast("2", "Second") });

    expect(previousState.toasts).toHaveLength(1);
  });
});
