import type { Metadata } from "next";
import localFont from "next/font/local";
import { Raleway } from "next/font/google";
import "../globals.css";
import React from "react";
import { getTranslations } from "next-intl/server";
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

export async function generateMetadata() {
  return {
    title: "The Big Exchange | Блог",
    description:
      "Исследуйте мир криптовалют в Украине. Новости, советы и аналитика. Оставайтесь в курсе наших обновлений благодаря блогу TheBigExchange.",
    keywords:
      "Блог Криптовалютные новости, Обзоры рынка криптовалют, Статьи по техническому анализу, Обмен криптовалют в Украине, Инсайдерская информация о крипторынке, Советы по безопасному обмену, Актуальные тренды в мире криптовалют, Регуляторные новости в Украине, Лучшие практики для трейдеров, Аналитика рынка криптовалют в Украине.",
    icons: {
      icon: "../../icon.png",
      shortcut: "../../favicon.ico",
    },
  };
}
// export const metadata: Metadata = {
//   title: "The Big Exchange | Блог",
//   description:
//     "Исследуйте мир криптовалют в Украине. Новости, советы и аналитика. Оставайтесь в курсе наших обновлений благодаря блогу TheBigExchange.",
//   keywords:
//     "Блог Криптовалютные новости, Обзоры рынка криптовалют, Статьи по техническому анализу, Обмен криптовалют в Украине, Инсайдерская информация о крипторынке, Советы по безопасному обмену, Актуальные тренды в мире криптовалют, Регуляторные новости в Украине, Лучшие практики для трейдеров, Аналитика рынка криптовалют в Украине.",
//   icons: {
//     icon: "../../icon.png",
//   },
// };
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
