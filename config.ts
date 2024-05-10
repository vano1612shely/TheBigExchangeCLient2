import { Pathnames } from "next-intl/navigation";
export const defaultLocale = "uk" as const;
export const locales = ["en", "uk", "ru", "pl", "kk", "ar", "he"] as const;

// Use the default: `always`
export const localePrefix = "always";
export const host = "https://thebigexchange.net";
export const pathnames = {
  "/": "/",
  "/blog": "/blog",
  "/reviews": "/reviews",
} satisfies Pathnames<typeof locales>;

export type AppPathnames = keyof typeof pathnames;
