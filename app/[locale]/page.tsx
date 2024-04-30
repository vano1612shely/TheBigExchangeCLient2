import { NextIntlClientProvider, useMessages } from "next-intl";
import MainPage from "../../components/MainPage";
import { pick } from "next/dist/lib/pick";
export default function Home() {
  const messages = useMessages();
  return (
    <NextIntlClientProvider messages={pick(messages, ["Index"])}>
      <MainPage />
    </NextIntlClientProvider>
  );
}
