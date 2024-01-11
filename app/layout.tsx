import type { Metadata } from "next";
import localFont from "next/font/local";
import { Raleway } from "next/font/google";
import "./globals.css";
const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
});
const xolonium = localFont({
  src: [
    {
      path: "../public/fonts/Xolonium-Bold.woff2",
      weight: "bold",
      style: "normal",
    },
  ],

  variable: "--font-xolonium",
});

export const metadata: Metadata = {
  title: "The Big Exchange",
  description:
    "TheBigExchange - мгновенный обмен криптовалют в Украине. Низкие комиссии, безопасность, поддержка 24/7. Просто, быстро, надежно!",
  keywords:
    "Обмен криптовалют в Украине, Моментальный обмен цифровых активов, Надежный обменник крипты, Лучшие курсы обмена в Украине, Безопасный обмен криптовалюты, Обмен Bitcoin, Ethereum, и других монет, Удобный процесс покупки и продажи крипты, Круглосуточная поддержка обмена, Низкие комиссии за обмен, Обменник с прозрачными условиями",
  viewport: "content='width=device-width, initial-scale=1.0'",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ru'>
      <body
        className={`${xolonium.variable} ${raleway.variable}`}
        style={{ fontFamily: "Raleway,sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
