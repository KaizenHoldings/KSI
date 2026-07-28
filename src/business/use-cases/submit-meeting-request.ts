import type { MeetingRequestDispatcher } from "@/business/contracts/meeting-request-dispatcher";
import type {
  MeetingRequestInput,
  MeetingRequestReceipt,
  MeetingRequestValidationError,
} from "@/business/entities/meeting-request";
import type { MeetingRequestValidator } from "@/business/services/meeting-request-validator";
import { fail, type ServiceError, type ServiceResult } from "@/types/service-result";

export type SubmitMeetingRequestError =
  | MeetingRequestValidationError
  | ServiceError;

/**
 * Validates a meeting request and hands it to whichever channel is configured.
 * The visual layer only ever sees this use case, never the channel.
 */
export class SubmitMeetingRequest {
  constructor(
    private readonly validator: MeetingRequestValidator,
    private readonly dispatcher: MeetingRequestDispatcher,
  ) {}

  execute(
    input: MeetingRequestInput,
  ): ServiceResult<MeetingRequestReceipt, SubmitMeetingRequestError> {
    const validation = this.validator.validate(input);

    if (!validation.success) {
      return validation;
    }

    try {
      return this.dispatcher.dispatch(validation.data);
    } catch {
      return fail({
        code: "unexpected_error",
        message:
          "No pudimos procesar su solicitud. Intente nuevamente o escríbanos por WhatsApp.",
      });
    }
  }
}
