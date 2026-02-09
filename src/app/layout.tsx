import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { Nunito_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import SessionProvider from "../providers/nextAuthSessionProvider";
import SignOutHandler from "./(auth)/signOut";
import { ThemeProvider } from "@/providers/theme-provider";
const nunito_Sans = Nunito_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "jobportal -  Test Academy",
    template: "%s | jobportal -  Test Academy",
  },
  description: "jobportal - Test Academy",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="referrer" content="origin" />
      </head>
      <body className={nunito_Sans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          // disableTransitionOnChange
        >
          <Toaster position="top-center" />
          <SessionProvider>
            <SignOutHandler />
            {children}
            <ToastContainer position="top-right" />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
