"use client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/store/store";
import "../globals.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
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
