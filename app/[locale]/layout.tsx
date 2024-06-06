import type { Metadata } from "next";
import localFont from "next/font/local";
import { Raleway } from "next/font/google";
import "./globals.css";
import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale,
} from "next-intl/server";
import { ReactNode } from "react";
import { locales } from "../../config";
import React from "react";
import { NextIntlClientProvider } from "next-intl";
const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
});
const xolonium = localFont({
  src: [
    {
      path: "../../public/fonts/Xolonium-Bold.woff2",
      weight: "bold",
      style: "normal",
    },
  ],

  variable: "--font-xolonium",
});

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: Omit<Props, "children">) {
  const t = await getTranslations({ locale: locale });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale);
  const messages = await getMessages();
  return (
    <div
      className={`${xolonium.variable} ${raleway.variable}`}
      style={{ fontFamily: "Raleway,sans-serif" }}
    >
      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
    </div>
  );
}
