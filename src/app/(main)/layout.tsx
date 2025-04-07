"use client";

import Header from "@/components/headers/Header";
import Sidebar from "@/components/sidebars/Sidebar";
import SessionValidator from "@/components/validators/SessionValidator";
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
      <SessionValidator />
      <Header className="h-18" />
      <div className="flex flex-1">
        {session.status === "authenticated" && (
          <Sidebar sidebarOffset={sidebarOffset} />
        )}
        <main className={`flex-1`} style={{paddingRight: sidebarOffset}}>{children}</main>
      </div>
    </>
  );
}
