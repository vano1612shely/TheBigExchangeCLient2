import React from "react";
import LanguageProvider from "../components/LanguageProvider";
import { useMessages } from "next-intl";
import MainPage from "../components/MainPage";
import { getTranslations } from "next-intl/server";
export default async function RootPage() {
  const t = await getTranslations({ locale: "en" });
  return <LanguageProvider></LanguageProvider>;
}
