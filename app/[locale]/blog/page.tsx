import BlogPageComponent from "../../../components/BlogPage";
import { pick } from "next/dist/lib/pick";
import { NextIntlClientProvider, useMessages } from "next-intl";
import React from "react";
import { unstable_setRequestLocale } from "next-intl/server";
export const dynamic = "force-dynamic";

type Props = {
  params: { locale: string };
};
export default function BlogPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  return <BlogPageComponent />;
}
