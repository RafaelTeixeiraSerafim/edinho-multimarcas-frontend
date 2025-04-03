"use client";

import Header from "@/components/headers/Header";
import Sidebar from "@/components/sidebars/Sidebar";
import { useSession } from "next-auth/react";
import React from "react";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = useSession();

  return (
    <>
      <Header className="h-18" />
      {session.status === "authenticated" && <Sidebar />}
      <main className="flex-1">{children}</main>
    </>
  );
}
