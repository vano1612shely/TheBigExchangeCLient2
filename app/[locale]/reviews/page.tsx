import { NextIntlClientProvider, useMessages } from "next-intl";
import { pick } from "next/dist/lib/pick";
import React from "react";
import ReviewsPageBlock from "../../../components/ReviewsPage";
import { unstable_setRequestLocale } from "next-intl/server";

type Props = {
  params: { locale: string };
};
export const dynamic = "force-dynamic";
export default function ReviewsPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const messages = useMessages();
  return (
    <NextIntlClientProvider messages={pick(messages, ["Index"])}>
      <ReviewsPageBlock />
    </NextIntlClientProvider>
  );
}
