import { NextIntlClientProvider, useMessages } from "next-intl";
import { pick } from "next/dist/lib/pick";
import React from "react";
import ReviewsPageBlock from "../../../components/ReviewsPage";
export const dynamic = "force-dynamic";
export default function ReviewsPage() {
  const messages = useMessages();
  return (
    <NextIntlClientProvider messages={pick(messages, ["Index"])}>
      <ReviewsPageBlock />
    </NextIntlClientProvider>
  );
}
