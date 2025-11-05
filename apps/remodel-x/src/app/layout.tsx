import type { Metadata } from "next";

import { ROOTS } from "@olis/core/constants";

import "./globals.css"

import { Nunito } from "next/font/google";

import { Providers } from "@/shared/components/providers";
import { Toaster } from "@olis/ui/components/sonner";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${ROOTS.saleos.name} | Olis Solutions`,
  description: "The one-stop shop for all your construction sales needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${nunito.variable} ${nunito.className} antialiased`}
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
