import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next.js 16: `middleware` is now `proxy`.
export default createMiddleware(routing);

export const config = {
  // everything except API, Next internals and files with an extension
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
