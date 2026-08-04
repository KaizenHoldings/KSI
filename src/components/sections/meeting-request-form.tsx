"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useRef, useState } from "react";

import {
  emptyMeetingRequestInput,
  meetingRequestLimits,
  type MeetingRequestField,
  type MeetingRequestInput,
} from "@/business/entities/meeting-request";
import { CreativeButton } from "@/components/ui/creative-button";
import { TextAreaField, TextField } from "@/components/ui/field";
import { Icon } from "@/components/ui/icon";
import { transitions } from "@/config/motion";
import { useHydrated } from "@/hooks/use-hydrated";
import { useMotionVariants } from "@/hooks/use-motion-variants";
import {
  meetingRequestDispatcher,
  submitMeetingRequest,
} from "@/integrations/service-registry";
import { cn } from "@/lib/cn";
import { useAudienceStore } from "@/store/audience-store";
import type { AudienceTrack } from "@/types/content";

/** The form and its success card swap places; the alert box interrupts in place. */
const swapVariants = {
  hidden: { opacity: 0, y: 12, transition: transitions.exit },
  visible: { opacity: 1, y: 0, transition: transitions.enter },
};

type FormStatus =
  | { readonly kind: "idle" }
  | { readonly kind: "submitting" }
  | { readonly kind: "success"; readonly url: string }
  | { readonly kind: "error"; readonly message: string; readonly url?: string };

const PROFILE_OPTIONS: readonly {
  readonly id: AudienceTrack;
  readonly label: string;
}[] = [
  { id: "inversionistas", label: "Deseo invertir" },
  { id: "empresas", label: "Busco financiamiento" },
];

/**
 * The site's single conversion. Submitting hands the request to the use case,
 * which validates it and opens a pre-written WhatsApp conversation with the
 * team — there is no self-serve investment flow to model.
 */
export function MeetingRequestForm() {
  const baseId = useId();
  const hydrated = useHydrated();
  const storedAudience = useAudienceStore((state) => state.audience);
  const setAudience = useAudienceStore((state) => state.setAudience);

  const [values, setValues] = useState<Omit<MeetingRequestInput, "profile">>({
    fullName: emptyMeetingRequestInput.fullName,
    email: emptyMeetingRequestInput.email,
    organization: emptyMeetingRequestInput.organization,
    message: emptyMeetingRequestInput.message,
  });
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<MeetingRequestField, string>>
  >({});
  const [status, setStatus] = useState<FormStatus>({ kind: "idle" });

  const formRef = useRef<HTMLFormElement>(null);

  const profile: AudienceTrack = hydrated
    ? storedAudience
    : PROFILE_OPTIONS[0].id;
  const isCompany = profile === "empresas";

  const fieldId = (name: string) => `${baseId}-${name}`;

  const updateValue = (name: keyof typeof values, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
    setFieldErrors((current) => {
      if (!(name in current)) return current;
      const next = { ...current };
      delete next[name as MeetingRequestField];
      return next;
    });
  };

  const focusFirstError = (errors: Partial<Record<MeetingRequestField, string>>) => {
    const order: MeetingRequestField[] = [
      "fullName",
      "email",
      "organization",
      "message",
    ];
    const first = order.find((name) => errors[name]);
    if (!first) return;
    formRef.current
      ?.querySelector<HTMLElement>(`#${CSS.escape(fieldId(first))}`)
      ?.focus();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus({ kind: "submitting" });

    const input: MeetingRequestInput = { ...values, profile };
    const result = submitMeetingRequest.execute(input);

    if (result.success) {
      setFieldErrors({});
      setStatus({ kind: "success", url: result.data.url });
      return;
    }

    if (result.error.code === "validation_failed") {
      const errors =
        "fieldErrors" in result.error ? result.error.fieldErrors : {};
      setFieldErrors(errors);
      setStatus({ kind: "error", message: result.error.message });
      focusFirstError(errors);
      return;
    }

    // The channel refused to open (usually a blocked tab). Hand the visitor the
    // same link so the request is never lost.
    setStatus({
      kind: "error",
      message: result.error.message,
      url:
        result.error.code === "channel_blocked"
          ? meetingRequestDispatcher.buildConversationUrl({
              fullName: values.fullName.trim(),
              email: values.email.trim(),
              profile,
              organization: values.organization.trim() || null,
              message: values.message.trim() || null,
            })
          : undefined,
    });
  };

  const resetForm = () => {
    setValues({
      fullName: "",
      email: "",
      organization: "",
      message: "",
    });
    setFieldErrors({});
    setStatus({ kind: "idle" });
  };

  const isSubmitting = status.kind === "submitting";
  const swap = useMotionVariants(swapVariants);
  const alert = useMotionVariants(swapVariants);

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status.kind === "success" ? (
        <motion.div
          key="success"
          variants={swap}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="rounded-lg border border-line bg-white p-7 shadow-[var(--shadow-raised)] sm:p-8"
        >
          <span
            aria-hidden="true"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-tint text-green"
          >
            <Icon name="check" className="h-6 w-6" strokeWidth={2.2} />
          </span>

          <h3 className="mt-5 text-[1.15rem] font-bold">
            Su solicitud está lista para enviarse
          </h3>
          <p className="mt-2 max-w-[46ch] text-[0.95rem] leading-relaxed text-content-secondary">
            Abrimos una conversación de WhatsApp con el mensaje ya redactado.
            Envíelo y nuestro equipo le responderá para coordinar la reunión.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <CreativeButton
              href={status.url}
              target="_blank"
              rel="noopener noreferrer"
              label="Abrir la conversación"
              variant="light"
              size="md"
            />

            <CreativeButton
              label="Enviar otra solicitud"
              variant="light"
              tone="subtle"
              size="md"
              onClick={resetForm}
            />
          </div>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          variants={swap}
          initial="hidden"
          animate="visible"
          exit="hidden"
          ref={formRef}
          onSubmit={handleSubmit}
          noValidate
          aria-labelledby={`${baseId}-title`}
          className="rounded-lg border border-line bg-white p-6 shadow-[var(--shadow-raised)] sm:p-8"
        >
          <h3 id={`${baseId}-title`} className="text-[1.15rem] font-bold">
            Solicite una reunión
          </h3>
          <p className="mt-2 text-[0.92rem] leading-relaxed text-content-secondary">
            Complete sus datos y prepararemos la conversación con el equipo.
          </p>

          <fieldset className="mt-7">
            <legend className="font-display text-[0.82rem] font-semibold text-navy">
              ¿Cuál es su interés?
            </legend>

            <div
              role="radiogroup"
              aria-label="Perfil"
              className="mt-3 grid gap-2 sm:grid-cols-2"
            >
              {PROFILE_OPTIONS.map((option) => {
                const checked = option.id === profile;

                return (
                  <label
                    key={option.id}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-sm border px-4 py-3",
                      "font-display text-[0.9rem] font-medium transition-colors duration-200",
                      "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-teal-dark",
                      checked
                        ? "border-teal-dark bg-tint text-navy"
                        : "border-line text-muted hover:border-line-strong hover:text-navy",
                    )}
                  >
                    <input
                      type="radio"
                      name={`${baseId}-profile`}
                      value={option.id}
                      checked={checked}
                      onChange={() => setAudience(option.id)}
                      className="sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className={cn(
                        "flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-200",
                        checked ? "border-teal-dark" : "border-line-strong",
                      )}
                    >
                      <span
                        className={cn(
                          "h-2 w-2 rounded-full bg-teal-dark transition-transform duration-200",
                          checked ? "scale-100" : "scale-0",
                        )}
                      />
                    </span>
                    {option.label}
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-6 grid gap-5">
            <TextField
              id={fieldId("fullName")}
              name="fullName"
              label="Nombre y apellido"
              autoComplete="name"
              required
              maxLength={meetingRequestLimits.fullNameMax}
              value={values.fullName}
              error={fieldErrors.fullName}
              onChange={(event) => updateValue("fullName", event.target.value)}
            />

            <TextField
              id={fieldId("email")}
              name="email"
              type="email"
              inputMode="email"
              label="Correo electrónico"
              autoComplete="email"
              required
              maxLength={meetingRequestLimits.emailMax}
              value={values.email}
              error={fieldErrors.email}
              hint="Lo usamos únicamente para dar seguimiento a su solicitud."
              onChange={(event) => updateValue("email", event.target.value)}
            />

            <TextField
              id={fieldId("organization")}
              name="organization"
              label={isCompany ? "Empresa" : "Empresa u organización"}
              autoComplete="organization"
              optional
              maxLength={meetingRequestLimits.organizationMax}
              value={values.organization}
              error={fieldErrors.organization}
              onChange={(event) => updateValue("organization", event.target.value)}
            />

            <TextAreaField
              id={fieldId("message")}
              name="message"
              label={
                isCompany
                  ? "Necesidad de financiamiento"
                  : "Objetivo de inversión"
              }
              optional
              maxLength={meetingRequestLimits.messageMax}
              value={values.message}
              error={fieldErrors.message}
              hint={`Máximo ${meetingRequestLimits.messageMax} caracteres.`}
              onChange={(event) => updateValue("message", event.target.value)}
            />
          </div>

          <AnimatePresence initial={false}>
            {status.kind === "error" ? (
              <motion.div
                key="alert"
                variants={alert}
                initial="hidden"
                animate="visible"
                exit="hidden"
                role="alert"
                className="mt-6 rounded-sm border border-red/35 bg-red/6 px-4 py-3.5"
              >
                <p className="text-[0.88rem] leading-relaxed text-red">
                  {status.message}
                </p>
                {status.url ? (
                  <CreativeButton
                    href={status.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    label="Abrir WhatsApp manualmente"
                    variant="light"
                    tone="subtle"
                    size="md"
                    className="mt-3"
                  />
                ) : null}
              </motion.div>
            ) : null}
          </AnimatePresence>

          <CreativeButton
            type="submit"
            label={isSubmitting ? "Preparando su solicitud…" : "Solicitar la reunión"}
            variant="light"
            size="lg"
            disabled={isSubmitting}
            className="mt-7 w-full"
          />

          <p className="mt-4 text-[0.78rem] leading-relaxed text-muted">
            Sus datos se utilizan únicamente para coordinar esta reunión. No
            constituyen una solicitud de inversión ni un compromiso de las partes.
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
