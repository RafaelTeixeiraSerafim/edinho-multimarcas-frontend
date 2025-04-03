import Providers from "@/providers/Providers";
import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Edinho Multimarcas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={`h-screen flex flex-col ${inter.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
