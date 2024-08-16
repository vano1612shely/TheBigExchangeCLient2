import { NextResponse } from "next/server";

export function middleware(request: any) {
  const acceptLanguage = request.headers.get("accept-language") || "";
  const supportedLanguages = ["en", "uk", "ru", "pl", "he", "ar", "kk", "de"];

  let language = "en"; // default language

  if (acceptLanguage) {
    const browserLanguages = acceptLanguage
      .split(",")
      .map((lang: any) => lang.split(";")[0]);
    language =
      browserLanguages.find((lang: any) => supportedLanguages.includes(lang)) ||
      language;
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${language}${url.pathname}`;

  return NextResponse.redirect(url);
}

// Виконуємо middleware лише для головної сторінки
export const config = {
  matcher: ["/"],
};
