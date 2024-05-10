import type { Metadata } from "next";
import localFont from "next/font/local";
import { Raleway } from "next/font/google";
import "./globals.css";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { ReactNode } from "react";
import { locales } from "../../config";
import React from "react";
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

// export const metadata: Metadata = {
//   title: "The Big Exchange",
//   description:
//     "TheBigExchange - мгновенный обмен криптовалют в Украине. Низкие комиссии, безопасность, поддержка 24/7. Просто, быстро, надежно!",
//   keywords:
//     "Обмен криптовалют в Украине, Моментальный обмен цифровых активов, Надежный обменник крипты, Лучшие курсы обмена в Украине, Безопасный обмен криптовалюты, Обмен Bitcoin, Ethereum, и других монет, Удобный процесс покупки и продажи крипты, Круглосуточная поддержка обмена, Низкие комиссии за обмен, Обменник с прозрачными условиями",
//   viewport: "content='width=device-width, initial-scale=1.0'",
// };
type Props = {
  children: ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// export async function generateMetadata({
//   params: { locale },
// }: Omit<Props, "children">) {
//   const t = await getTranslations({ locale: locale });
//
//   return {
//     title: t("title"),
//     description: t("description"),
//     keywords: t("keywords"),
//     viewport: "content='width=device-width, initial-scale=1.0'",
//     icons: {
//       icon: "../icon.png",
//     },
//   };
// }

export default async function LocaleLayout({
  children,
  params: { locale },
}: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body
        className={`${xolonium.variable} ${raleway.variable}`}
        style={{ fontFamily: "Raleway,sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
