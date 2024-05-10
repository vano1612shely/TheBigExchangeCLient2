import { redirect } from "next/navigation";
import MainPage from "../components/MainPage";
import React from "react";

// This page only renders when the app is built statically (output: 'export')
export default function RootPage() {
  redirect("/en");

  return <MainPage />;
}
