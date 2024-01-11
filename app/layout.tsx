import type { Metadata } from "next";
import localFont from "next/font/local";
import { Raleway } from "next/font/google";
import "./globals.css";
const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
});
const xolonium = localFont({
  src: [
    {
      path: "../public/fonts/Xolonium-Bold.woff2",
      weight: "bold",
      style: "normal",
    },
  ],

  variable: "--font-xolonium",
});

export const metadata: Metadata = {
  title: "The big exchange test",
  description: "The big exchange",
  viewport: "content='width=device-width, initial-scale=1.0'",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ru'>
      <body
        className={`${xolonium.variable} ${raleway.variable}`}
        style={{ fontFamily: "Raleway,sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
