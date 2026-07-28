import { MeetingRequestValidator } from "@/business/services/meeting-request-validator";
import { SubmitMeetingRequest } from "@/business/use-cases/submit-meeting-request";
import { contactConfig } from "@/config/site";
import { WhatsAppMeetingDispatcher } from "@/integrations/adapters/whatsapp-meeting-dispatcher";

/**
 * Composition root. Wiring lives here so components never construct their own
 * dependencies and the channel can be swapped without touching the interface.
 */

export const meetingRequestDispatcher = new WhatsAppMeetingDispatcher(
  contactConfig.whatsapp.number,
);

export const submitMeetingRequest = new SubmitMeetingRequest(
  new MeetingRequestValidator(),
  meetingRequestDispatcher,
);
