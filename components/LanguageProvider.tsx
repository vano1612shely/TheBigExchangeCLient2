"use client";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { locales } from "@/config";
import Loader from "@/components/loader";

export default function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const userLang =
      navigator.userLanguage || navigator.language || navigator.languages[0];
    const supportedLanguages = ["en", "uk", "ru", "pl", "he", "ar", "kk"];
    const lang = supportedLanguages.find((l) => userLang.startsWith(l)) || "en";
    router.replace(`/${lang}`);
  }, [router]);

  return null;
}
