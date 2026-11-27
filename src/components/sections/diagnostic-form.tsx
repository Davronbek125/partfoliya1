"use client";

import React, { useState, useSyncExternalStore } from "react";
import { Check, Loader2, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CONTACT_CHANNELS, TELEGRAM_DIRECT_URL } from "@/lib/contact";
import {
  getDiagnosticContextServerSnapshot,
  getDiagnosticContextSnapshot,
  mapContextToDefaultAnswers,
  setDiagnosticContext,
  subscribeDiagnosticContext,
} from "@/lib/diagnostic-context";
import type { Dictionary, Locale } from "@/lib/i18n";

interface DiagnosticFormProps {
  locale: Locale;
  dict: Dictionary;
}

type SubmitPhase = "idle" | "loading" | "success" | "completed";

export function DiagnosticForm({ locale, dict }: DiagnosticFormProps) {
  const prefersReducedMotion = useReducedMotion();
  const contextData = useSyncExternalStore(
    subscribeDiagnosticContext,
    getDiagnosticContextSnapshot,
    getDiagnosticContextServerSnapshot
  );

  const questions = [
    { key: "q1" as const, data: dict.diagnostic.q1 },
    { key: "q2" as const, data: dict.diagnostic.q2 },
    { key: "q3" as const, data: dict.diagnostic.q3 },
    { key: "q4" as const, data: dict.diagnostic.q4 },
  ];

  const totalSteps = questions.length + 1;
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactTelegram, setContactTelegram] = useState("");
  const [company, setCompany] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [nameInvalid, setNameInvalid] = useState(false);
  const [contactInvalid, setContactInvalid] = useState(false);
  const [phase, setPhase] = useState<SubmitPhase>("idle");

  const defaultFromContext = mapContextToDefaultAnswers(
    contextData,
    dict.diagnostic.q1.options,
    dict.diagnostic.q3.options
  );
  const resolvedAnswers: Record<string, string> = {
    ...(defaultFromContext.q1 ? { q1: defaultFromContext.q1 } : {}),
    ...(defaultFromContext.q3 ? { q3: defaultFromContext.q3 } : {}),
    ...answers,
  };

  const isContactStep = stepIndex === questions.length;
  const currentQuestion = !isContactStep ? questions[stepIndex] : null;
  const currentValue = currentQuestion
    ? resolvedAnswers[currentQuestion.key] ?? ""
    : "";

  const telegramDisplay =
    CONTACT_CHANNELS.find((c) => c.id === "telegram")?.display ?? "@ab123455";

  const handleSelectOption = (option: string) => {
    if (!currentQuestion) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.key]: option }));
    setErrorMessage(null);
  };

  const handleBack = () => {
    setErrorMessage(null);
    setNameInvalid(false);
    setContactInvalid(false);
    setStepIndex((prev) => Math.max(0, prev - 1));
  };

  const handleJumpToStep = (targetIdx: number) => {
    if (phase !== "idle" || targetIdx < 0 || targetIdx >= totalSteps) return;
    const canJump =
      targetIdx <= stepIndex ||
      questions.slice(0, targetIdx).every((q) => Boolean(resolvedAnswers[q.key]));
    if (!canJump) return;
    setErrorMessage(null);
    setNameInvalid(false);
    setContactInvalid(false);
    setStepIndex(targetIdx);
  };

  const handleNext = () => {
    if (currentQuestion && !currentValue) {
      setErrorMessage(dict.diagnostic.errorValidation);
      return;
    }
    setErrorMessage(null);
    setStepIndex((prev) => Math.min(totalSteps - 1, prev + 1));
  };

  const handleSubmit = async () => {
    if (phase !== "idle") return;

    if (
      !resolvedAnswers.q1 ||
      !resolvedAnswers.q2 ||
      !resolvedAnswers.q3 ||
      !resolvedAnswers.q4
    ) {
      setErrorMessage(dict.diagnostic.errorValidation);
      return;
    }

    const trimmedName = contactName.trim();
    const trimmedPhone = contactPhone.trim();
    const trimmedTelegram = contactTelegram.trim();

    const missingName = trimmedName.length < 2;
    const missingContact = trimmedPhone.length < 3 && trimmedTelegram.length < 2;

    if (missingName || missingContact) {
      setNameInvalid(missingName);
      setContactInvalid(missingContact);
      setErrorMessage(
        missingName ? dict.diagnostic.q5.nameError : dict.diagnostic.q5.contactError
      );
      return;
    }

    setErrorMessage(null);
    setNameInvalid(false);
    setContactInvalid(false);
    setPhase("loading");
    const startedAt = Date.now();

    try {
      const response = await fetch("/api/send-diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          industry: resolvedAnswers.q1,
          challenge: resolvedAnswers.q2,
          interest: resolvedAnswers.q3,
          team_size: resolvedAnswers.q4,
          contact_name: trimmedName,
          contact_phone: trimmedPhone || undefined,
          contact_telegram: trimmedTelegram || undefined,
          company: company.trim() || undefined,
          selected_context: contextData?.label || undefined,
          language: locale,
          website: honeypot,
        }),
      });

      if (response.status === 429) {
        setPhase("idle");
        setErrorMessage(dict.diagnostic.errorRateLimit);
        return;
      }

      if (!response.ok) {
        setPhase("idle");
        setErrorMessage(dict.diagnostic.errorNetwork);
        return;
      }

      const minSpinMs = prefersReducedMotion ? 150 : 600;
      const elapsed = Date.now() - startedAt;
      const remainingSpin = Math.max(0, minSpinMs - elapsed);
      if (remainingSpin > 0) {
        await new Promise((resolve) => window.setTimeout(resolve, remainingSpin));
      }

      setPhase("success");
      const successHoldMs = prefersReducedMotion ? 600 : 1500;
      await new Promise((resolve) => window.setTimeout(resolve, successHoldMs));
      setPhase("completed");
    } catch {
      setPhase("idle");
      setErrorMessage(dict.diagnostic.errorNetwork);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setDiagnosticContext(null);
    setContactName("");
    setContactPhone("");
    setContactTelegram("");
    setCompany("");
    setStepIndex(0);
    setErrorMessage(null);
    setNameInvalid(false);
    setContactInvalid(false);
    setPhase("idle");
  };

  const handleStep5KeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      void handleSubmit();
    }
  };

  const isValidationError =
    errorMessage === dict.diagnostic.errorValidation ||
    errorMessage === dict.diagnostic.errorContact ||
    errorMessage === dict.diagnostic.q5.nameError ||
    errorMessage === dict.diagnostic.q5.contactError;

  return (
    <div
      className="dtai-surface-bevel relative w-full max-w-[640px] rounded-[24px] border p-6 md:p-10 lg:p-12 theme-surface-transition"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-border)",
      }}
    >
      {/* 5-segment interactive progress indicator */}
      <div
        className="grid grid-cols-5 gap-2"
        role="progressbar"
        aria-valuenow={phase === "completed" ? totalSteps : stepIndex + 1}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
      >
        {Array.from({ length: totalSteps }).map((_, idx) => {
          const isFilled = phase === "completed" || idx <= stepIndex;
          const canClick =
            phase === "idle" &&
            idx !== stepIndex &&
            (idx < stepIndex ||
              questions
                .slice(0, idx)
                .every((q) => Boolean(resolvedAnswers[q.key])));
          return (
            <button
              key={idx}
              type="button"
              disabled={!canClick}
              onClick={() => handleJumpToStep(idx)}
              aria-label={`${dict.common.stepLabel} ${idx + 1}`}
              className={`h-1.5 rounded-full transition-colors duration-300 ${canClick ? "hover:opacity-80" : "cursor-default"
                }`}
              style={{
                backgroundColor: isFilled
                  ? "var(--color-accent-blue)"
                  : "var(--color-border)",
              }}
            />
          );
        })}
      </div>

      {/* Selected context pill if navigated from Package / Service / Industry CTA */}
      {contextData && phase !== "completed" && (
        <div
          className="mt-5 inline-flex max-w-full items-center gap-2 rounded-full border px-3 py-1 text-[12px]"
          style={{
            borderColor: "var(--color-accent-blue)",
            backgroundColor: "var(--color-accent-tint)",
            color: "var(--color-text-primary)",
          }}
        >
          <span
            className="font-semibold"
            style={{ color: "var(--color-accent-blue-text)" }}
          >
            {dict.diagnostic.selectedContextLabel}:
          </span>
          <span className="truncate font-medium">{contextData.label}</span>
          <button
            type="button"
            disabled={phase !== "idle"}
            onClick={() => setDiagnosticContext(null)}
            aria-label={dict.diagnostic.clearContext}
            className="ml-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition-colors hover:opacity-75"
            style={{ color: "var(--color-text-secondary)" }}
          >
            <X size={12} strokeWidth={2} />
          </button>
        </div>
      )}

      {/* Hidden anti-spam honeypot */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="pointer-events-none absolute h-0 w-0 opacity-0"
      />

      <AnimatePresence mode="wait">
        {phase === "completed" ? (
          <motion.div
            key="completed"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-col items-center py-6 text-center"
          >
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full border-2"
              style={{
                borderColor: "var(--color-accent-cyan)",
                backgroundColor: "var(--color-surface-raised)",
                color: "var(--color-accent-cyan)",
              }}
            >
              <Check size={28} strokeWidth={2} />
            </div>

            <p
              className="mt-6 text-[20px] font-semibold leading-[1.4] md:text-[24px]"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-text-primary)",
              }}
            >
              {dict.diagnostic.success}
            </p>

            <button
              type="button"
              onClick={handleReset}
              className="dtai-btn-secondary mt-8"
            >
              {dict.diagnostic.reset}
            </button>
          </motion.div>
        ) : isContactStep ? (
          <motion.div
            key="q5-contact"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7"
          >
            <p
              className="text-[12px] font-semibold uppercase tracking-[0.06em]"
              style={{ color: "var(--color-accent-blue)" }}
            >
              05 / 05 · {dict.diagnostic.q5.label}
            </p>

            <h3
              className="mt-2 text-[22px] font-semibold leading-[1.3] md:text-[26px]"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-text-primary)",
              }}
            >
              {dict.diagnostic.q5.title}
            </h3>

            <p
              className="mt-2 text-[14px] leading-[1.55]"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {dict.diagnostic.q5.subtitle}
            </p>

            {/* Clickable summary pills allowing one-click return to edit an answer */}
            <div className="mt-4 flex flex-wrap gap-2">
              {questions.map((q, qIdx) => {
                const val = resolvedAnswers[q.key];
                if (!val) return null;
                return (
                  <button
                    key={q.key}
                    type="button"
                    disabled={phase !== "idle"}
                    onClick={() => handleJumpToStep(qIdx)}
                    title={dict.diagnostic.editStepHint}
                    className="rounded-full border px-3 py-1 text-[12px] font-medium transition-colors hover:border-[var(--color-accent-blue)]"
                    style={{
                      backgroundColor: "var(--color-surface-raised)",
                      borderColor: "var(--color-border)",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {val}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="diag-name"
                  className="block text-[12px] font-semibold uppercase tracking-[0.04em]"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {dict.diagnostic.q5.nameLabel} *
                </label>
                <input
                  id="diag-name"
                  type="text"
                  autoComplete="name"
                  enterKeyHint="next"
                  maxLength={120}
                  disabled={phase !== "idle"}
                  aria-invalid={nameInvalid}
                  value={contactName}
                  onChange={(e) => {
                    setContactName(e.target.value);
                    setNameInvalid(false);
                    setErrorMessage(null);
                  }}
                  onKeyDown={handleStep5KeyDown}
                  placeholder={dict.diagnostic.q5.namePlaceholder}
                  className="mt-1.5 w-full rounded-none border-b bg-transparent py-2.5 text-[16px] outline-none transition-colors focus:border-b-2 focus:border-[var(--color-accent-blue)]"
                  style={{
                    borderColor: nameInvalid
                      ? "var(--color-accent-error)"
                      : "var(--color-border)",
                    color: "var(--color-text-primary)",
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="diag-company"
                  className="block text-[12px] font-semibold uppercase tracking-[0.04em]"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {dict.diagnostic.q5.companyLabel}
                </label>
                <input
                  id="diag-company"
                  type="text"
                  autoComplete="organization"
                  enterKeyHint="next"
                  maxLength={120}
                  disabled={phase !== "idle"}
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  onKeyDown={handleStep5KeyDown}
                  placeholder={dict.diagnostic.q5.companyPlaceholder}
                  className="mt-1.5 w-full rounded-none border-b bg-transparent py-2.5 text-[16px] outline-none transition-colors focus:border-b-2 focus:border-[var(--color-accent-blue)]"
                  style={{
                    borderColor: "var(--color-border)",
                    color: "var(--color-text-primary)",
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="diag-phone"
                  className="block text-[12px] font-semibold uppercase tracking-[0.04em]"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {dict.diagnostic.q5.phoneLabel}
                </label>
                <input
                  id="diag-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  enterKeyHint="next"
                  maxLength={40}
                  disabled={phase !== "idle"}
                  aria-invalid={contactInvalid}
                  value={contactPhone}
                  onChange={(e) => {
                    setContactPhone(e.target.value);
                    setContactInvalid(false);
                    setErrorMessage(null);
                  }}
                  onKeyDown={handleStep5KeyDown}
                  placeholder={dict.diagnostic.q5.phonePlaceholder}
                  className="mt-1.5 w-full rounded-none border-b bg-transparent py-2.5 text-[16px] outline-none transition-colors focus:border-b-2 focus:border-[var(--color-accent-blue)]"
                  style={{
                    borderColor: contactInvalid
                      ? "var(--color-accent-error)"
                      : "var(--color-border)",
                    color: "var(--color-text-primary)",
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="diag-telegram"
                  className="block text-[12px] font-semibold uppercase tracking-[0.04em]"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {dict.diagnostic.q5.telegramLabel}
                </label>
                <input
                  id="diag-telegram"
                  type="text"
                  autoCapitalize="none"
                  autoCorrect="off"
                  enterKeyHint="send"
                  maxLength={64}
                  disabled={phase !== "idle"}
                  aria-invalid={contactInvalid}
                  value={contactTelegram}
                  onChange={(e) => {
                    setContactTelegram(e.target.value);
                    setContactInvalid(false);
                    setErrorMessage(null);
                  }}
                  onKeyDown={handleStep5KeyDown}
                  placeholder={dict.diagnostic.q5.telegramPlaceholder}
                  className="mt-1.5 w-full rounded-none border-b bg-transparent py-2.5 text-[16px] outline-none transition-colors focus:border-b-2 focus:border-[var(--color-accent-blue)]"
                  style={{
                    borderColor: contactInvalid
                      ? "var(--color-accent-error)"
                      : "var(--color-border)",
                    color: "var(--color-text-primary)",
                  }}
                />
              </div>
            </div>

            <p
              className="mt-4 text-[12px]"
              style={{ color: "var(--color-text-muted)" }}
            >
              {dict.diagnostic.q5.contactHint}
            </p>

            {errorMessage && (
              <div
                role="alert"
                className="mt-4 flex flex-wrap items-center gap-2 text-[14px] font-medium"
                style={{ color: "var(--color-accent-error)" }}
              >
                <span>{errorMessage}</span>
                {!isValidationError && (
                  <a
                    href={TELEGRAM_DIRECT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                    style={{ color: "var(--color-accent-blue-text)" }}
                  >
                    Telegram: {telegramDisplay}
                  </a>
                )}
              </div>
            )}

            <div className="mt-8 flex items-center justify-between gap-4">
              <button
                type="button"
                disabled={phase !== "idle"}
                onClick={handleBack}
                className="px-4 py-3 text-[15px] font-semibold transition-colors disabled:opacity-50"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {dict.diagnostic.navBack}
              </button>

              <button
                type="button"
                disabled={phase !== "idle"}
                aria-busy={phase === "loading"}
                onClick={handleSubmit}
                className={`inline-flex min-w-[160px] items-center justify-center gap-2 rounded-xl px-8 py-4 text-[15px] font-semibold transition-all duration-300 ${phase === "idle" ? "dtai-btn-primary" : ""
                  }`}
                style={
                  phase === "idle"
                    ? undefined
                    : {
                      backgroundImage:
                        phase === "success" ? "none" : "var(--gradient-primary)",
                      backgroundColor:
                        phase === "success"
                          ? "var(--color-accent-cyan)"
                          : "transparent",
                      color:
                        phase === "success"
                          ? "var(--color-on-success)"
                          : "var(--color-on-accent)",
                      boxShadow: "var(--shadow-glow-pulse-base)",
                    }
                }
              >
                {phase === "loading" && (
                  <Loader2 size={18} className="animate-spin" />
                )}
                {phase === "success" && <Check size={18} strokeWidth={2.5} />}
                {phase === "idle" && <span>{dict.diagnostic.navSubmit}</span>}
              </button>
            </div>
          </motion.div>
        ) : (
          currentQuestion && (
            <motion.div
              key={currentQuestion.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7"
            >
              <p
                className="text-[12px] font-semibold uppercase tracking-[0.06em]"
                style={{ color: "var(--color-accent-blue)" }}
              >
                0{stepIndex + 1} / 05 · {currentQuestion.data.label}
              </p>

              <h3
                className="mt-2 text-[22px] font-semibold leading-[1.3] md:text-[26px]"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-text-primary)",
                }}
              >
                {currentQuestion.data.title}
              </h3>

              <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
                {currentQuestion.data.options.map((option) => {
                  const isSelected = currentValue === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      disabled={phase !== "idle"}
                      onClick={() => handleSelectOption(option)}
                      aria-pressed={isSelected}
                      className="flex items-center justify-between gap-3 rounded-xl p-5 text-left text-[15px] font-medium transition-all duration-200 hover:border-[var(--color-accent-blue)] focus-visible:outline-2 focus-visible:outline-offset-2"
                      style={{
                        backgroundColor: isSelected
                          ? "var(--color-accent-tint)"
                          : "var(--color-surface-raised)",
                        border: isSelected
                          ? "2px solid var(--color-accent-blue)"
                          : "1px solid var(--color-border)",
                        color: "var(--color-text-primary)",
                        outlineColor: "var(--color-accent-blue)",
                      }}
                    >
                      <span>{option}</span>
                      {isSelected && (
                        <Check
                          size={18}
                          strokeWidth={2}
                          className="shrink-0"
                          style={{ color: "var(--color-accent-blue)" }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {errorMessage && (
                <p
                  role="alert"
                  className="mt-4 text-[14px] font-medium"
                  style={{ color: "var(--color-accent-error)" }}
                >
                  {errorMessage}
                </p>
              )}

              <div className="mt-8 flex items-center justify-between gap-4">
                {stepIndex > 0 ? (
                  <button
                    type="button"
                    disabled={phase !== "idle"}
                    onClick={handleBack}
                    className="px-4 py-3 text-[15px] font-semibold transition-colors disabled:opacity-50"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {dict.diagnostic.navBack}
                  </button>
                ) : (
                  <span />
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  className="dtai-btn-primary min-w-[140px]"
                >
                  <span>{dict.diagnostic.navNext}</span>
                </button>
              </div>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </div>
  );
}
