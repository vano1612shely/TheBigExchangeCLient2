"use client";

import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import localFont from "next/font/local";
import { Raleway } from "next/font/google";
import Container from "@/components/container";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/store/store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ru'>
      <body style={{ fontFamily: "Raleway,sans-serif" }}>
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={null}>
            {children}
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
