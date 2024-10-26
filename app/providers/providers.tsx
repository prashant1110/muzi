"use client";
import { Appbar } from "@/components/Appbar";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <Appbar />
        {children}
      </div>
    </SessionProvider>
  );
}
