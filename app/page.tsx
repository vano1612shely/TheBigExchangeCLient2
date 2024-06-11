import React from "react";
import LanguageProvider from "../components/LanguageProvider";
import Head from "next/head";

export default function Home() {
  return (
    <LanguageProvider>
      <Head>
        <title>The Big Exchange</title>
        <meta
          name="description"
          content="LukanExchange - мгновенный обмен криптовалют в Украине. Низкие комиссии, безопасность, поддержка 24/7. Просто, быстро, надежно!"
        />
        <meta property="og:title" content="Lukan Exchange" />
        <meta
          property="og:description"
          content="LukanExchange - мгновенный обмен криптовалют в Украине. Низкие комиссии, безопасность, поддержка 24/7. Просто, быстро, надежно!"
        />
        <meta property="og:image" content="https://lukan.exchange/icon.ico" />
      </Head>
      <h1>
        LukanExchange - мгновенный обмен криптовалют в Украине. Низкие комиссии,
        безопасность, поддержка 24/7. Просто, быстро, надежно!
      </h1>
    </LanguageProvider>
  );
}
