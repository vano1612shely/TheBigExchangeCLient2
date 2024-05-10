import { MetadataRoute } from "next";
import { locales, pathnames, defaultLocale, host } from "../config";

export default function sitemap(): MetadataRoute.Sitemap {
  const keys = Object.keys(pathnames) as Array<keyof typeof pathnames>;

  function getUrl(
    key: keyof typeof pathnames,
    locale: (typeof locales)[number],
  ) {
    return `${host}/${locale}${key}`;
  }

  return keys.map((key) => ({
    url: getUrl(key, defaultLocale),
    alternates: {
      languages: Object.fromEntries(
        locales.map((locale) => [locale, getUrl(key, locale)]),
      ),
    },
  }));
}
