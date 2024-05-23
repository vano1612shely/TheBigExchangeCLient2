import { ReactNode } from "react";
import React from "react";

export default async function LocaleLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
