import type { Metadata } from "next";
import React from "react";
import { Barriecito } from "next/font/google";
import "./globals.css";

const barriecitoStatic = Barriecito({
  variable: "--font-barriecito",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "DigiGoGo",
  description: "Digital Circuit Simulator",
  icons: "/icons/favicon.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={barriecitoStatic.variable}>
      <body>{children}</body>
    </html>
  );
}
