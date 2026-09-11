"use client";

import type { ReactNode } from "react";
import { QueryProvider } from "./query-provider";
import { ThemeProvider } from "./theme-provider";
import { SmoothScrollHandler } from "./smooth-scroll-handler";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider defaultTheme="light" storageKey="wanks-theme">
      <QueryProvider>
        <SmoothScrollHandler />
        {children}
      </QueryProvider>
    </ThemeProvider>
  );
}

