"use client";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="flex min-h-screen flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        {/* <Appbar /> */}
        {children}
      </div>
    </SessionProvider>
  );
}
