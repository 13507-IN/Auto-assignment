// providers.tsx
"use client";

import { ThemeProvider } from "next-themes";
import { ConvexProvider } from "convex/react";
import { SessionProvider } from "next-auth/react";
import { convexReact } from "@/lib/convexReact";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ConvexProvider client={convexReact}>{children}</ConvexProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
