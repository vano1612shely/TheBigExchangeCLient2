import BlogPageComponent from "../../../components/BlogPage";
import { pick } from "next/dist/lib/pick";
import { NextIntlClientProvider, useMessages } from "next-intl";

export default function BlogPage() {
  const messages = useMessages();
  return (
    <NextIntlClientProvider messages={pick(messages, ["Index"])}>
      <BlogPageComponent />
    </NextIntlClientProvider>
  );
}
