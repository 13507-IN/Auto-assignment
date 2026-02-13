// providers.tsx
"use client";

import { ConvexProvider } from "convex/react";
import { SessionProvider } from "next-auth/react";
import { convexReact } from "@/lib/convexReact";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ConvexProvider client={convexReact}>{children}</ConvexProvider>
    </SessionProvider>
  );
}
