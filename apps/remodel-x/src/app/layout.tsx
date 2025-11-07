import type { Metadata } from "next";

import { Nunito } from "next/font/google";

import "./globals.css"

import { Providers } from "@/shared/components/providers";
import { ROOTS } from "@olis/core/constants";
import { Toaster } from "@olis/ui/components/sonner";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${ROOTS.remodelX.name} | Olis Solutions`,
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
