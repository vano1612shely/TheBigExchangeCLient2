import createMiddleware from "next-intl/middleware";
import { locales, localePrefix, defaultLocale, pathnames } from "./config";

export default createMiddleware({
  defaultLocale,
  locales,
  localePrefix,
});

export const config = {
  matcher: ["/", "/(ru|ua|kk|pl|ar|he|en)/:path*"],
};
