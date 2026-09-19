"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AlertCircle, ChevronDown, CircleCheck, Loader2 } from "lucide-react";
import { useLocale } from "next-intl";
import { contactPage } from "@/data/contact";
import {
  contactSchema,
  contactTopics,
  fieldErrors,
  formatUzPhone,
  HONEYPOT_FIELD,
  phoneDigits,
  type ContactField,
  type ContactFieldErrors,
} from "@/lib/contact-schema";
import { buttonClass } from "@/components/ui/Button";
import { cn, pick, type L10n } from "@/lib/utils";

type Values = Record<ContactField, string> & { website: string };
const empty: Values = { name: "", phone: "", email: "", topic: "", message: "", website: "" };
const ORDER: ContactField[] = ["name", "phone", "email", "topic", "message"];
const MAX_MESSAGE = 2000;

// Minimal fields: a soft fill with a hairline underline. Focus draws a 2px primary underline and lifts the fill;
// errors turn the underline red and tint the fill. Both states are carried by more than colour (icon + message).
const control =
  "w-full rounded-t-xl rounded-b-none border-0 border-b bg-ink/[0.035] px-4 text-ink placeholder:text-ink-3 transition-[background-color,box-shadow,border-color] duration-200 focus:outline-none focus:bg-surface focus:shadow-[inset_0_-2px_0_var(--primary-ink),0_0_0_1px_color-mix(in_oklab,var(--primary-ink)_22%,transparent)] dark:bg-white/[0.045] dark:focus:bg-white/[0.08]";
const errText = "text-[#b30000] dark:text-[#ff8a80]";

export function ContactForm() {
  const locale = useLocale();
  const f = contactPage.form;
  const L = (v: L10n) => pick(v, locale);
  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;

  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const refs = useRef<Partial<Record<ContactField, HTMLElement | null>>>({});
  const successRef = useRef<HTMLHeadingElement>(null);

  // move focus to the confirmation so screen-reader and keyboard users hear/see it
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const validate = (v: Values) => {
    const r = contactSchema.safeParse({ ...v, locale });
    return r.success ? {} : fieldErrors(r.error);
  };

  const set = (k: keyof Values, value: string) => {
    const next = { ...values, [k]: value };
    setValues(next);
    // after the first submit attempt, errors update live as the user fixes them
    if (submitted && k !== "website") setErrors(validate(next));
  };

  const onBlur = (k: ContactField) => {
    if (k === "phone" && phoneDigits(values.phone).length <= 3) setValues((v) => ({ ...v, phone: "" }));
    if (!submitted && values[k].trim() !== "" && !(k === "phone" && phoneDigits(values.phone).length <= 3)) {
      const e = validate(values)[k];
      setErrors((prev) => ({ ...prev, [k]: e }));
    }
  };

  const onPhoneChange = (raw: string) => {
    const prev = values.phone;
    let next = formatUzPhone(raw);
    // deleting a formatting character ("-", ")", " ") should delete the digit before it
    if (raw.length < prev.length && phoneDigits(raw) === phoneDigits(prev)) {
      next = formatUzPhone(phoneDigits(prev).slice(0, -1));
    }
    set("phone", next);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;
    setSubmitted(true);
    const errs = validate(values);
    setErrors(errs);
    const first = ORDER.find((k) => errs[k]);
    if (first) {
      refs.current[first]?.focus();
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; errors?: ContactFieldErrors };
      if (res.ok && data.ok) {
        setStatus("success");
        setValues(empty);
        setSubmitted(false);
        setErrors({});
        return;
      }
      if (res.status === 400 && data.errors) {
        setErrors(data.errors);
        setStatus("idle");
        const firstServer = ORDER.find((k) => data.errors?.[k]);
        if (firstServer) refs.current[firstServer]?.focus();
        return;
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="glass flex min-h-[420px] flex-col items-start justify-center rounded-[24px] p-8 sm:p-12">
        <CircleCheck className="size-10 text-green dark:text-[#4cc59f]" strokeWidth={1.6} aria-hidden="true" />
        <h2 ref={successRef} tabIndex={-1} className="mt-6 text-display-s outline-none">
          {L(f.successTitle)}
        </h2>
        <p className="mt-3 max-w-[44ch] text-ink-2">{L(f.successText)}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className={buttonClass("outline", "mt-8")}
        >
          {L(f.again)}
        </button>
      </div>
    );
  }

  const hasErrors = ORDER.some((k) => errors[k]);
  const fieldProps = (k: ContactField, hint?: boolean) => ({
    id: id(k),
    name: k,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": cn(hint && id(`${k}-hint`), errors[k] && id(`${k}-error`)) || undefined,
    onBlur: () => onBlur(k),
    className: cn(
      control,
      errors[k]
        ? "border-[#b30000] bg-[#b30000]/[0.045] shadow-[inset_0_-1px_0_#b30000] focus:shadow-[inset_0_-2px_0_#b30000,0_0_0_1px_rgb(179_0_0/0.25)] dark:border-[#ff8a80] dark:bg-[#ff8a80]/[0.07] dark:shadow-[inset_0_-1px_0_#ff8a80] dark:focus:shadow-[inset_0_-2px_0_#ff8a80,0_0_0_1px_rgb(255_138_128/0.3)]"
        : "border-ink/25 hover:border-ink/50 dark:border-white/25 dark:hover:border-white/50",
    ),
  });
  const errorLine = (k: ContactField) =>
    errors[k] ? (
      <p id={id(`${k}-error`)} className={cn("mt-2 flex items-start gap-1.5 text-sm font-semibold", errText)}>
        <AlertCircle className="mt-0.5 size-4 shrink-0" strokeWidth={1.8} aria-hidden="true" />
        {L(f.errors[errors[k]!])}
      </p>
    ) : null;
  const label = (k: ContactField, children: React.ReactNode, optional?: boolean) => (
    <label htmlFor={id(k)} className="mb-2 flex items-baseline gap-2 text-[15px] font-medium text-ink">
      {children}
      {optional ? <span className="text-sm font-medium text-ink-3">({L(f.optional)})</span> : <span aria-hidden="true" className="text-ink-3">*</span>}
    </label>
  );

  return (
    <form noValidate onSubmit={onSubmit} aria-labelledby={id("title")} className="glass relative rounded-[24px] p-6 sm:p-10 lg:p-12">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id={id("title")} className="text-display-s">
          {L(f.title)}
        </h2>
        <p className="text-sm text-ink-3">{L(f.required)}</p>
      </div>

      <div aria-live="assertive" className="empty:hidden">
        {submitted && hasErrors && (
          <p className={cn("mt-6 flex items-start gap-2 border-l-2 border-current bg-current/[0.06] px-4 py-3 text-[15px] font-medium", errText)}>
            <AlertCircle className="mt-0.5 size-[18px] shrink-0" strokeWidth={1.8} aria-hidden="true" />
            {L(f.errorSummary)}
          </p>
        )}
        {status === "error" && (
          <p className={cn("mt-6 flex items-start gap-2 border-l-2 border-current bg-current/[0.06] px-4 py-3 text-[15px] font-medium", errText)}>
            <AlertCircle className="mt-0.5 size-[18px] shrink-0" strokeWidth={1.8} aria-hidden="true" />
            {L(f.serverError)}
          </p>
        )}
      </div>

      <div className="mt-10 grid gap-x-6 gap-y-7 sm:grid-cols-2">
        <div>
          {label("name", L(f.name))}
          <input
            {...fieldProps("name")}
            ref={(el) => {
              refs.current.name = el;
            }}
            type="text"
            autoComplete="name"
            required
            maxLength={80}
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            className={cn(fieldProps("name").className, "h-12")}
          />
          {errorLine("name")}
        </div>

        <div>
          {label("phone", L(f.phone))}
          <input
            {...fieldProps("phone", true)}
            ref={(el) => {
              refs.current.phone = el;
            }}
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            required
            placeholder="+998 (__) ___-__-__"
            value={values.phone}
            onFocus={() => !values.phone && setValues((v) => ({ ...v, phone: "+998 " }))}
            onChange={(e) => onPhoneChange(e.target.value)}
            className={cn(fieldProps("phone").className, "h-12 tabular-nums")}
          />
          <p id={id("phone-hint")} className="mt-2 text-sm text-ink-3">
            {L(f.phoneHint)}
          </p>
          {errorLine("phone")}
        </div>

        <div>
          {label("email", L(f.email), true)}
          <input
            {...fieldProps("email")}
            ref={(el) => {
              refs.current.email = el;
            }}
            type="email"
            autoComplete="email"
            maxLength={120}
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            className={cn(fieldProps("email").className, "h-12")}
          />
          {errorLine("email")}
        </div>

        <div>
          {label("topic", L(f.topic))}
          <div className="relative">
            <select
              {...fieldProps("topic")}
              ref={(el) => {
                refs.current.topic = el;
              }}
              required
              value={values.topic}
              onChange={(e) => set("topic", e.target.value)}
              className={cn(fieldProps("topic").className, "h-12 appearance-none pr-11", !values.topic && "text-ink-3")}
            >
              <option value="" disabled>
                {L(f.topicPlaceholder)}
              </option>
              {contactTopics.map((t) => (
                <option key={t} value={t} className="text-ink">
                  {L(f.topics[t])}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-ink-3" strokeWidth={1.8} aria-hidden="true" />
          </div>
          {errorLine("topic")}
        </div>

        <div className="sm:col-span-2">
          {label("message", L(f.message))}
          <textarea
            {...fieldProps("message", true)}
            ref={(el) => {
              refs.current.message = el;
            }}
            required
            rows={5}
            maxLength={MAX_MESSAGE}
            value={values.message}
            onChange={(e) => set("message", e.target.value)}
            className={cn(fieldProps("message").className, "min-h-36 resize-y py-3 leading-relaxed")}
          />
          <p id={id("message-hint")} className="mt-2 text-right text-sm tabular-nums text-ink-3">
            {values.message.length} / {MAX_MESSAGE}
          </p>
          {errorLine("message")}
        </div>
      </div>

      {/* Honeypot — invisible to people and assistive tech; bots that fill every field get silently dropped by the API. */}
      <div aria-hidden="true" className="absolute -left-[10000px] top-auto size-px overflow-hidden">
        <label htmlFor={id("website")}>{L(f.honeypot)}</label>
        <input id={id("website")} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => set("website", e.target.value)} />
      </div>

      <div className="mt-10 flex flex-col gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[40ch] text-sm text-ink-3">{L(f.privacy)}</p>
        <button
          type="submit"
          disabled={status === "submitting"}
          aria-disabled={status === "submitting"}
          className={buttonClass("primary", "shrink-0 px-8 disabled:cursor-progress disabled:opacity-80")}
        >
          {status === "submitting" && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
          {status === "submitting" ? L(f.submitting) : L(f.submit)}
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {status === "submitting" ? L(f.submitting) : ""}
      </p>
    </form>
  );
}
