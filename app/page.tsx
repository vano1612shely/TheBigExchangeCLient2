"use client";
import { redirect } from "next/navigation";
import { locales } from "../config";

export default function RootPage() {
  let language = navigator.language;
  // @ts-ignore
  if (locales.includes(language)) {
    redirect("/" + language);
  } else {
    redirect("/uk");
  }
}
