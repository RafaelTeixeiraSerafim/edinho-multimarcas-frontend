"use client";
import Loading from "@/components/loadings/Loading";
import { useSession } from "next-auth/react";

import { Inter } from "next/font/google";
import { redirect } from "next/navigation";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();

  if (session.status === "loading") return <Loading />;
  if (session.status === "authenticated") redirect("/");

  return (
    <div className="flex h-full bg-white">
      <div className="overflow-y-auto" style={{ scrollbarWidth: "none" }}></div>
      <div className="flex-1 overflow-auto px-4">
        <div className="flex h-full justify-center items-center py-10">{children}</div>
      </div>
    </div>
  );
}
