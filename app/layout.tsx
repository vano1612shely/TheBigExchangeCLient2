import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Big Exchange",
  description:
    "TheBigExchange - мгновенный обмен криптовалют в Украине. Низкие комиссии, безопасность, поддержка 24/7. Просто, быстро, надежно!",
  verification: {
    google: "883Yo746r1Ku6Sc7oeYcmYdiwaeDX0oAMInIu3Tujb4",
  },
  keywords:
    "Обмен криптовалют в Украине, Моментальный обмен цифровых активов, Надежный обменник крипты, Лучшие курсы обмена в Украине, Безопасный обмен криптовалюты, Обмен Bitcoin, Ethereum, и других монет, Удобный процесс покупки и продажи крипты, Круглосуточная поддержка обмена, Низкие комиссии за обмен, Обменник с прозрачными условиями",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
