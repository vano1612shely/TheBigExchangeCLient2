"use client";
import { redirect } from "next/navigation";
import { locales } from "../../config";
import { useEffect } from "react";

export default function RootPage() {
  useEffect(() => {
    let language = navigator.language;
    // @ts-ignore
    if (locales.includes(language)) {
      redirect("/" + language + "/blog");
    } else {
      redirect("/uk/blog");
    }
  }, []);
}
