// zod/mini: same validation as full zod, ~10x smaller in the client bundle (tree-shakable functional API)
import * as z from "zod/mini";

/**
 * Contact form schema — shared by the client form (components/sections/contact/ContactForm.tsx)
 * and the route handler (app/api/contact/route.ts).
 *
 * Error messages are *codes* (see ContactErrorCode); the UI maps them to localized strings (data/contact.ts).
 * Email is OPTIONAL: many parents in Uzbekistan prefer a phone call / Telegram, so the phone is the required channel.
 * The honeypot field ("website") is intentionally NOT part of this schema — the route drops such submissions silently.
 */
export const contactTopics = ["admission", "dorm", "general", "other"] as const;
export type ContactTopic = (typeof contactTopics)[number];

export const HONEYPOT_FIELD = "website";

export type ContactErrorCode = "required" | "nameShort" | "tooLong" | "phone" | "email" | "topic" | "messageShort";

const code = (c: ContactErrorCode) => c;

/** Keeps digits only, so "+998 (90) 123-45-67" and "998901234567" are equal. */
export const phoneDigits = (v: string) => v.replace(/\D/g, "");

const required = { error: code("required") };

export const contactSchema = z.object({
  name: z
    .string(required)
    .check(
      z.trim(),
      z.minLength(1, code("required")),
      z.minLength(2, code("nameShort")),
      z.maxLength(80, code("tooLong")),
    ),
  phone: z.pipe(
    z.transform((v: unknown) => (typeof v === "string" ? phoneDigits(v) : v)),
    z.string(required).check(z.minLength(1, code("required")), z.regex(/^998\d{9}$/, code("phone"))),
  ),
  email: z._default(
    z.optional(
      z.string({ error: code("email") }).check(
        z.trim(),
        z.maxLength(120, code("tooLong")),
        z.refine((v) => v === "" || z.email().safeParse(v).success, code("email")),
      ),
    ),
    "",
  ),
  topic: z.enum(contactTopics, { error: code("topic") }),
  message: z
    .string(required)
    .check(
      z.trim(),
      z.minLength(1, code("required")),
      z.minLength(10, code("messageShort")),
      z.maxLength(2000, code("tooLong")),
    ),
  locale: z.optional(z.enum(["uz", "en", "ru"])),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;
export type ContactField = "name" | "phone" | "email" | "topic" | "message";
export type ContactFieldErrors = Partial<Record<ContactField, ContactErrorCode>>;

/** First error code per field. */
export function fieldErrors(error: z.core.$ZodError): ContactFieldErrors {
  const out: ContactFieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as ContactField | undefined;
    if (!key || key in out) continue;
    out[key] = issue.message as ContactErrorCode;
  }
  return out;
}

/** "+998 (90) 123-45-67" from any input; keeps the +998 prefix fixed. */
export function formatUzPhone(input: string) {
  let d = phoneDigits(input);
  if (d.startsWith("998")) d = d.slice(3);
  d = d.slice(0, 9);
  let out = "+998";
  if (d.length === 0) return out + " ";
  out += " (" + d.slice(0, 2);
  if (d.length >= 2) out += ")";
  if (d.length > 2) out += " " + d.slice(2, 5);
  if (d.length > 5) out += "-" + d.slice(5, 7);
  if (d.length > 7) out += "-" + d.slice(7, 9);
  return out;
}
