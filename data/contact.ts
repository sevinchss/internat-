// Contact page copy + form labels. Contact details themselves come from lib/site.ts (`school`, placeholders there).
import type { ContactErrorCode, ContactTopic } from "@/lib/contact-schema";
import type { L10n } from "@/lib/utils";

export const contactPage = {
  title: { uz: "Bogʻlanish", en: "Contact us", ru: "Контакты" } satisfies L10n,
  lead: {
    uz: "Qabul, yotoqxona yoki oʻquv jarayoni boʻyicha savolingiz boʻlsa — qoʻngʻiroq qiling yoki yozing. Ish kunlari bir kun ichida javob berishga harakat qilamiz.",
    en: "Questions about admissions, boarding or school life? Call us or write — on working days we try to reply within one day.",
    ru: "Вопросы о приёме, интернате или учёбе? Позвоните или напишите — в рабочие дни мы стараемся ответить в течение суток.",
  } satisfies L10n, // TODO: replace with real data (confirm the reply time)
  detailsTitle: { uz: "Aloqa maʼlumotlari", en: "Contact details", ru: "Контактные данные" } satisfies L10n,
  socialsTitle: { uz: "Ijtimoiy tarmoqlarda", en: "Follow us", ru: "Мы в соцсетях" } satisfies L10n,
  placeholderNote: {
    uz: "Aloqa maʼlumotlari vaqtincha — tez orada yangilanadi.",
    en: "Contact details are temporary and will be updated soon.",
    ru: "Контактные данные временные и скоро будут обновлены.",
  } satisfies L10n,
  admissionNote: {
    uz: "Ariza faqat ariza.piima.uz va my.gov.uz orqali topshiriladi — bu shakl orqali emas.",
    en: "Applications are submitted only via ariza.piima.uz and my.gov.uz — not through this form.",
    ru: "Заявки на поступление подаются только через ariza.piima.uz и my.gov.uz — не через эту форму.",
  } satisfies L10n,
  mapTitle: { uz: "Maktab xaritada", en: "The school on the map", ru: "Школа на карте" } satisfies L10n,
  mapOpen: { uz: "Google Mapsʼda ochish", en: "Open in Google Maps", ru: "Открыть в Google Maps" } satisfies L10n,

  form: {
    title: { uz: "Bizga yozing", en: "Write to us", ru: "Напишите нам" } satisfies L10n,
    required: { uz: "* — majburiy maydonlar", en: "* required fields", ru: "* — обязательные поля" } satisfies L10n,
    name: { uz: "Ismingiz", en: "Your name", ru: "Ваше имя" } satisfies L10n,
    phone: { uz: "Telefon raqamingiz", en: "Phone number", ru: "Номер телефона" } satisfies L10n,
    phoneHint: {
      uz: "Masalan: +998 (90) 123-45-67",
      en: "For example: +998 (90) 123-45-67",
      ru: "Например: +998 (90) 123-45-67",
    } satisfies L10n,
    email: { uz: "Elektron pochta", en: "Email", ru: "Эл. почта" } satisfies L10n,
    optional: { uz: "ixtiyoriy", en: "optional", ru: "необязательно" } satisfies L10n,
    topic: { uz: "Murojaat mavzusi", en: "Topic", ru: "Тема обращения" } satisfies L10n,
    topicPlaceholder: { uz: "Mavzuni tanlang", en: "Choose a topic", ru: "Выберите тему" } satisfies L10n,
    topics: {
      admission: { uz: "Qabul", en: "Admissions", ru: "Приём" },
      dorm: { uz: "Yotoqxona", en: "Boarding", ru: "Интернат" },
      general: { uz: "Umumiy savol", en: "General question", ru: "Общий вопрос" },
      other: { uz: "Boshqa", en: "Other", ru: "Другое" },
    } satisfies Record<ContactTopic, L10n>,
    message: { uz: "Xabaringiz", en: "Your message", ru: "Сообщение" } satisfies L10n,
    honeypot: {
      uz: "Bu maydonni toʻldirmang",
      en: "Leave this field empty",
      ru: "Не заполняйте это поле",
    } satisfies L10n,
    submit: { uz: "Yuborish", en: "Send message", ru: "Отправить" } satisfies L10n,
    submitting: { uz: "Yuborilmoqda…", en: "Sending…", ru: "Отправляем…" } satisfies L10n,
    privacy: {
      uz: "Maʼlumotlaringiz faqat murojaatingizga javob berish uchun ishlatiladi.",
      en: "Your details are used only to reply to your message.",
      ru: "Ваши данные используются только для ответа на обращение.",
    } satisfies L10n,
    successTitle: {
      uz: "Rahmat, xabaringiz yuborildi",
      en: "Thank you, your message has been sent",
      ru: "Спасибо, сообщение отправлено",
    } satisfies L10n,
    successText: {
      uz: "Mutaxassisimiz koʻrsatgan telefon raqamingiz orqali siz bilan bogʻlanadi.",
      en: "A member of our team will get back to you on the phone number you gave.",
      ru: "Наш специалист свяжется с вами по указанному номеру телефона.",
    } satisfies L10n,
    again: { uz: "Yana xabar yozish", en: "Send another message", ru: "Написать ещё" } satisfies L10n,
    errorSummary: {
      uz: "Iltimos, belgilangan maydonlarni tekshiring.",
      en: "Please check the highlighted fields.",
      ru: "Пожалуйста, проверьте отмеченные поля.",
    } satisfies L10n,
    serverError: {
      uz: "Xabarni yuborib boʻlmadi. Birozdan soʻng qayta urinib koʻring yoki bizga qoʻngʻiroq qiling.",
      en: "We couldn’t send your message. Please try again in a moment or give us a call.",
      ru: "Не удалось отправить сообщение. Попробуйте ещё раз чуть позже или позвоните нам.",
    } satisfies L10n,
    errors: {
      required: { uz: "Bu maydonni toʻldiring", en: "Please fill in this field", ru: "Заполните это поле" },
      nameShort: {
        uz: "Ism kamida 2 ta harfdan iborat boʻlsin",
        en: "Name should be at least 2 letters",
        ru: "Имя — минимум 2 буквы",
      },
      tooLong: { uz: "Matn juda uzun", en: "This is too long", ru: "Слишком длинный текст" },
      phone: {
        uz: "Raqamni toʻliq kiriting: +998 va 9 ta raqam",
        en: "Enter the full number: +998 and 9 digits",
        ru: "Введите номер полностью: +998 и 9 цифр",
      },
      email: {
        uz: "Elektron pochta manzili notoʻgʻri",
        en: "This email address doesn’t look right",
        ru: "Проверьте адрес эл. почты",
      },
      topic: { uz: "Mavzuni tanlang", en: "Please choose a topic", ru: "Выберите тему" },
      messageShort: {
        uz: "Xabar kamida 10 ta belgidan iborat boʻlsin",
        en: "Please write at least 10 characters",
        ru: "Минимум 10 символов",
      },
    } satisfies Record<ContactErrorCode, L10n>,
  },
};
