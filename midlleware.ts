import createMiddleware from "next-intl/middleware";
import { locales, localePrefix, defaultLocale } from "./config";

export default createMiddleware({
  defaultLocale,
  locales,
  localePrefix,
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
