/**
 * Error messages for the microphone access of the voice chat.
 *
 * `getUserMedia` rejects with different errors depending on the reason the
 * microphone is not available. Telling the user that "something went wrong"
 * for a permission that was simply denied is not helpful, so every known
 * reason gets its own message and a way to continue with the text chat.
 */

export type VoiceErrorReason =
  | "permission-denied"
  | "no-microphone"
  | "unsupported"
  | "unknown";

export interface VoiceErrorMessage {
  reason: VoiceErrorReason;
  title: string;
  description: string;
}

/** Read the `name` of a DOMException/Error, e.g. `NotAllowedError`. */
export function getErrorName(error: unknown): string {
  if (error && typeof error === "object" && "name" in error) {
    return String((error as { name?: unknown }).name ?? "");
  }

  return "";
}

/** The message that explains why the microphone could not be used. */
export function getVoiceErrorMessage(error: unknown): VoiceErrorMessage {
  switch (getErrorName(error)) {
    case "NotAllowedError":
    case "PermissionDeniedError":
      return {
        reason: "permission-denied",
        title: "Microphone access was denied",
        description:
          "Allow microphone access in your browser settings, or continue with text chat.",
      };
    case "NotFoundError":
    case "DevicesNotFoundError":
      return {
        reason: "no-microphone",
        title: "No microphone was found",
        description:
          "We could not find a microphone on this device. You can continue with text chat instead.",
      };
    case "NotSupportedError":
    case "SecurityError":
      return {
        reason: "unsupported",
        title: "Voice chat is not supported",
        description:
          "This browser does not allow microphone access. You can continue with text chat instead.",
      };
    default:
      return {
        reason: "unknown",
        title: "Could not access microphone",
        description:
          "Something went wrong while starting the microphone. You can continue with text chat instead.",
      };
  }
}
