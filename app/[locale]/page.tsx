import MainPage from "../../components/MainPage";
import React from "react";
import { unstable_setRequestLocale } from "next-intl/server";
export const dynamic = "force-dynamic";

type Props = {
  params: { locale: string };
};
export default function Home({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  return <MainPage />;
}
