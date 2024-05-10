import { Pathnames } from "next-intl/navigation";
export const defaultLocale = "uk" as const;
export const locales = ["en", "uk", "ru", "pl", "kk", "ar", "he"] as const;

// Use the default: `always`
export const localePrefix = "always";

export const paths = ["/", "/blog", "/reviews"];
