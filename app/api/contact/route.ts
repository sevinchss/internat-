import { contactSchema, fieldErrors, HONEYPOT_FIELD, type ContactData } from "@/lib/contact-schema";

const topicLabel: Record<ContactData["topic"], string> = {
  admission: "Qabul",
  dorm: "Yotoqxona",
  general: "Umumiy savol",
  other: "Boshqa",
};

const escapeHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function formatPhone(d: string) {
  // 998901234567 → +998 90 123 45 67
  return `+${d.slice(0, 3)} ${d.slice(3, 5)} ${d.slice(5, 8)} ${d.slice(8, 10)} ${d.slice(10, 12)}`;
}

function telegramText(d: ContactData) {
  const lines = [
    "<b>Yangi murojaat — sayt</b>",
    "",
    `<b>Mavzu:</b> ${escapeHtml(topicLabel[d.topic])}`,
    `<b>Ism:</b> ${escapeHtml(d.name)}`,
    `<b>Telefon:</b> ${escapeHtml(formatPhone(d.phone))}`,
    d.email ? `<b>Email:</b> ${escapeHtml(d.email)}` : null,
    d.locale ? `<b>Til:</b> ${d.locale}` : null,
    "",
    escapeHtml(d.message),
  ];
  return lines.filter((l) => l !== null).join("\n");
}

export async function POST(request: Request) {
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > 16_000) return Response.json({ ok: false, error: "too_large" }, { status: 413 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }
  if (!body || typeof body !== "object") return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });

  // Honeypot: real users never see this field. Pretend success, do nothing.
  const trap = (body as Record<string, unknown>)[HONEYPOT_FIELD];
  if (typeof trap === "string" && trap.trim() !== "") return Response.json({ ok: true });

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ ok: false, errors: fieldErrors(parsed.error) }, { status: 400 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const text = telegramText(parsed.data);

  if (!token || !chatId) {
    console.log("[contact] Telegram is not configured — submission:\n" + text);
    return Response.json({ ok: true });
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", disable_web_page_preview: true }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      console.error("[contact] Telegram error", res.status, await res.text().catch(() => ""));
      return Response.json({ ok: false, error: "delivery_failed" }, { status: 500 });
    }
    return Response.json({ ok: true });
  } catch (e) {
    console.error("[contact] Telegram request failed", e);
    return Response.json({ ok: false, error: "delivery_failed" }, { status: 500 });
  }
}
