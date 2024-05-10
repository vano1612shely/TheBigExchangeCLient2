import BlogPageComponent from "../../../components/BlogPage";
import { pick } from "next/dist/lib/pick";
import { NextIntlClientProvider, useMessages } from "next-intl";
import React from "react";
export const dynamic = "force-dynamic";
export default function BlogPage() {
  const messages = useMessages();
  return (
    <NextIntlClientProvider messages={pick(messages, ["Index"])}>
      <BlogPageComponent />
    </NextIntlClientProvider>
  );
}
