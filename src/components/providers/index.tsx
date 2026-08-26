"use client";

import type { ReactNode } from "react";
import { QueryProvider } from "./query-provider";
import { ThemeProvider } from "./theme-provider";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider defaultTheme="light" storageKey="wanks-theme">
      <QueryProvider>{children}</QueryProvider>
    </ThemeProvider>
  );
}

