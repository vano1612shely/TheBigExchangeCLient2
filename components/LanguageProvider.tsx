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
  const pathname = usePathname();
  useEffect(() => {
    const browserLang = navigator.language;
    let detectedLocale = "en";
    // @ts-ignore
    if (locales.includes(browserLang)) {
      detectedLocale = browserLang;
    }
    if (pathname === "/") {
      router.replace(`/${detectedLocale}`);
    }
  }, []);

  return <>{pathname == "/" ? <Loader /> : children}</>;
}
