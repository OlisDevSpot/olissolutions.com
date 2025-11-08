"use client";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ThemeProvider } from "@olis/ui/components/global/providers/theme-provider";
import { TooltipProvider } from "@olis/ui/components/tooltip";

import { TRPCReactProvider } from "./trpc-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TRPCReactProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider delayDuration={0}>
          {children}
        </TooltipProvider>
      </ThemeProvider>
      <ReactQueryDevtools />
    </TRPCReactProvider>
  );
}
