import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Koxy AI",
  description: "Build your AI-powered backend with no code.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" data-rounded="xlarge" data-palette="trust">
      <body
        className={cn(
          "min-h-screen antialiased leading-normal [--btn-radius:theme(borderRadius.lg)] [--ui-border-color:theme(colors.gray.800)] selection:bg-info-600 selection:text-white selection:bg-info-900 selection:text-info-200 before:fixed before:inset-0 before:-z-40 before:[background-image:url('/grainy-bg.svg')] before:opacity-[0.025] dark",
          inter.className
        )}
        data-rounded="xlarge"
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
