import {
  type MeetingRequest,
  type MeetingRequestField,
  type MeetingRequestInput,
  type MeetingRequestValidationError,
  meetingRequestLimits,
} from "@/business/entities/meeting-request";
import { fail, ok, type ServiceResult } from "@/types/service-result";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const VALID_PROFILES = new Set(["inversionistas", "empresas"]);

/**
 * Validates and normalises a meeting request. Pure and framework-free so the
 * same rules can run in a component, a route handler or a test.
 */
export class MeetingRequestValidator {
  validate(
    input: MeetingRequestInput,
  ): ServiceResult<MeetingRequest, MeetingRequestValidationError> {
    const fullName = input.fullName.trim().replace(/\s+/g, " ");
    const email = input.email.trim();
    const organization = input.organization.trim();
    const message = input.message.trim();

    const fieldErrors: Partial<Record<MeetingRequestField, string>> = {};

    if (fullName.length === 0) {
      fieldErrors.fullName = "Indique su nombre y apellido.";
    } else if (fullName.length < meetingRequestLimits.fullNameMin) {
      fieldErrors.fullName = `Su nombre debe tener al menos ${meetingRequestLimits.fullNameMin} caracteres.`;
    } else if (fullName.length > meetingRequestLimits.fullNameMax) {
      fieldErrors.fullName = `Su nombre no puede superar los ${meetingRequestLimits.fullNameMax} caracteres.`;
    }

    if (email.length === 0) {
      fieldErrors.email = "Indique un correo electrónico de contacto.";
    } else if (email.length > meetingRequestLimits.emailMax) {
      fieldErrors.email = `El correo no puede superar los ${meetingRequestLimits.emailMax} caracteres.`;
    } else if (!EMAIL_PATTERN.test(email)) {
      fieldErrors.email =
        "El correo no tiene un formato válido. Ejemplo: nombre@empresa.com";
    }

    if (organization.length > meetingRequestLimits.organizationMax) {
      fieldErrors.organization = `El nombre de la empresa no puede superar los ${meetingRequestLimits.organizationMax} caracteres.`;
    }

    if (message.length > meetingRequestLimits.messageMax) {
      fieldErrors.message = `Su mensaje no puede superar los ${meetingRequestLimits.messageMax} caracteres.`;
    }

    if (Object.keys(fieldErrors).length > 0) {
      return fail({
        code: "validation_failed",
        message: "Revise los campos señalados para continuar.",
        fieldErrors,
      });
    }

    const profile = VALID_PROFILES.has(input.profile)
      ? input.profile
      : "inversionistas";

    return ok({
      fullName,
      email,
      profile,
      organization: organization.length > 0 ? organization : null,
      message: message.length > 0 ? message : null,
    });
  }
}
