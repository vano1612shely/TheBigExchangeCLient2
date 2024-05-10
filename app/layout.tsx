import React, { ReactNode } from "react";
import "./globals.css";
import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import Head from "next/head";

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: "The Big Exchange",
  description:
    "TheBigExchange - мгновенный обмен криптовалют в Украине. Низкие комиссии, безопасность, поддержка 24/7. Просто, быстро, надежно!",
  keywords:
    "Обмен криптовалют в Украине, Моментальный обмен цифровых активов, Надежный обменник крипты, Лучшие курсы обмена в Украине, Безопасный обмен криптовалюты, Обмен Bitcoin, Ethereum, и других монет, Удобный процесс покупки и продажи крипты, Круглосуточная поддержка обмена, Низкие комиссии за обмен, Обменник с прозрачными условиями",
};
export default function RootLayout({ children }: Props) {
  return (
    <html lang="ru">
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <body>{children}</body>
    </html>
  );
}
