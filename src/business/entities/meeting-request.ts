import type { AudienceTrack } from "@/types/content";
import type { ServiceError } from "@/types/service-result";

/**
 * A request to book a meeting with the KFG team. There is no self-serve
 * investment flow: this is the only conversion the site models.
 */

export type MeetingRequestField =
  | "fullName"
  | "email"
  | "organization"
  | "message";

/** Raw values as typed by the visitor. */
export interface MeetingRequestInput {
  readonly fullName: string;
  readonly email: string;
  readonly profile: AudienceTrack;
  readonly organization: string;
  readonly message: string;
}

/** Validated and normalised request, safe for the rest of the application. */
export interface MeetingRequest {
  readonly fullName: string;
  readonly email: string;
  readonly profile: AudienceTrack;
  readonly organization: string | null;
  readonly message: string | null;
}

export interface MeetingRequestValidationError extends ServiceError {
  readonly code: "validation_failed";
  readonly fieldErrors: Partial<Record<MeetingRequestField, string>>;
}

export type MeetingRequestChannel = "whatsapp";

/** Proof that the request left the application, plus a way to retry by hand. */
export interface MeetingRequestReceipt {
  readonly channel: MeetingRequestChannel;
  /** Direct link to the conversation, so the visitor is never stuck. */
  readonly url: string;
}

export const emptyMeetingRequestInput: MeetingRequestInput = {
  fullName: "",
  email: "",
  profile: "inversionistas",
  organization: "",
  message: "",
};

export const meetingRequestLimits = {
  fullNameMin: 3,
  fullNameMax: 80,
  emailMax: 120,
  organizationMax: 90,
  messageMax: 600,
} as const;
