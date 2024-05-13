import React from "react";
import LanguageProvider from "../components/LanguageProvider";
import Head from "next/head";
export default function RootPage() {
  return (
    <LanguageProvider>
      <Head>
        <title>The Big Exchange</title>
        <meta
          name="description"
          content="TheBigExchange - мгновенный обмен криптовалют в Украине. Низкие комиссии, безопасность, поддержка 24/7. Просто, быстро, надежно!"
        />
        <meta property="og:title" content="The Big Exchange" />
        <meta
          property="og:description"
          content="TheBigExchange - мгновенный обмен криптовалют в Украине. Низкие комиссии, безопасность, поддержка 24/7. Просто, быстро, надежно!"
        />
        <meta
          property="og:image"
          content="https://thebigexchange.net/icon.png"
        />
      </Head>
      <h1>
        TheBigExchange - мгновенный обмен криптовалют в Украине. Низкие
        комиссии, безопасность, поддержка 24/7. Просто, быстро, надежно!
      </h1>
    </LanguageProvider>
  );
}
