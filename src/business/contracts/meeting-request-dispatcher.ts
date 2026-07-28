import type {
  MeetingRequest,
  MeetingRequestReceipt,
} from "@/business/entities/meeting-request";
import type { ServiceResult } from "@/types/service-result";

/**
 * Contract every delivery channel must satisfy. The business layer depends on
 * this interface only; the concrete channel lives in `integrations/`.
 */
export interface MeetingRequestDispatcher {
  dispatch(request: MeetingRequest): ServiceResult<MeetingRequestReceipt>;
}
