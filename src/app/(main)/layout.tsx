"use client";

import Header from "@/components/headers/Header";
import Sidebar from "@/components/sidebars/Sidebar";
import { useSession } from "next-auth/react";
import React from "react";

const sidebarOffset = "1.6rem";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = useSession();

  return (
    <>
      <Header className="h-18" />
      <div className="flex flex-1">
        {session.status === "authenticated" && <Sidebar sidebarOffset={sidebarOffset} />}
        <main className={`flex-1 pr-[${sidebarOffset}]`}>{children}</main>
      </div>
    </>
  );
}
