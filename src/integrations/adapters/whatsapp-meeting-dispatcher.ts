import type { MeetingRequestDispatcher } from "@/business/contracts/meeting-request-dispatcher";
import type {
  MeetingRequest,
  MeetingRequestReceipt,
} from "@/business/entities/meeting-request";
import { fail, ok, type ServiceResult } from "@/types/service-result";

const PROFILE_LABELS: Record<MeetingRequest["profile"], string> = {
  inversionistas: "Inversionista",
  empresas: "Empresa",
};

/**
 * Delivers meeting requests through WhatsApp, the channel KFG already uses.
 * No credentials are involved: the request becomes a pre-written message in a
 * conversation the visitor opens and sends themselves.
 */
export class WhatsAppMeetingDispatcher implements MeetingRequestDispatcher {
  constructor(private readonly phoneNumber: string) {}

  dispatch(request: MeetingRequest): ServiceResult<MeetingRequestReceipt> {
    const url = this.buildConversationUrl(request);

    const opened =
      typeof window !== "undefined"
        ? window.open(url, "_blank", "noopener,noreferrer")
        : null;

    if (!opened) {
      // Expected outcome when the browser blocks programmatic tabs. The link
      // still travels back so the visitor can complete the request manually.
      return fail({
        code: "channel_blocked",
        message:
          "Su navegador bloqueó la apertura de WhatsApp. Abra la conversación con el botón que aparece a continuación.",
      });
    }

    return ok({ channel: "whatsapp", url });
  }

  /** Exposed so the interface can offer a manual link after a blocked tab. */
  buildConversationUrl(request: MeetingRequest): string {
    const lines = [
      "Hola, deseo agendar una reunión con KFG Sociedad de Inversión.",
      "",
      `Nombre: ${request.fullName}`,
      `Perfil: ${PROFILE_LABELS[request.profile]}`,
      `Correo: ${request.email}`,
    ];

    if (request.organization) {
      lines.push(`Empresa: ${request.organization}`);
    }

    if (request.message) {
      lines.push("", `Objetivo: ${request.message}`);
    }

    return `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
  }
}
