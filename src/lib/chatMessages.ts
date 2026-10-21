/**
 * Helpers for the chat message ids.
 *
 * The chat appends the user message, waits for the AI reply and appends that
 * reply as well. Deriving the ids from the length of the message list breaks
 * as soon as anything is appended between those two steps: the reply then
 * reuses an id that is already taken, which breaks the React keys of the
 * message list. A dedicated generator keeps the ids unique and ordered no
 * matter how the messages are interleaved.
 */

/**
 * Create a generator that hands out strictly increasing message ids.
 *
 * @param startId the first id that is handed out
 */
export function createMessageIdGenerator(
  startId = 1
): () => number {
  let nextId = startId;

  return () => {
    const id = nextId;
    nextId += 1;
    return id;
  };
}
