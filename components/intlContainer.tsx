import { NextIntlClientProvider, useMessages } from "next-intl";
import { pick } from "next/dist/lib/pick";

export default function IntlContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = useMessages();
  return (
    <NextIntlClientProvider messages={pick(messages, ["Index"])}>
      {children}
    </NextIntlClientProvider>
  );
}
