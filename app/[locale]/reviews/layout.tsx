import type { Metadata } from "next";
import localFont from "next/font/local";
import { Raleway } from "next/font/google";
import "../globals.css";
import React, { ReactNode } from "react";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
});
const xolonium = localFont({
  src: [
    {
      path: "../../../public/fonts/Xolonium-Bold.woff2",
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
export default function RootLayout({ children, params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  return (
    <html lang="ru">
      <body
        className={`${xolonium.variable} ${raleway.variable}`}
        style={{ fontFamily: "Raleway,sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
