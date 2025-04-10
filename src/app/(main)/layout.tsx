"use client";

import Header from "@/components/headers/Header";
import Sidebar from "@/components/sidebars/Sidebar";
import SessionValidator from "@/components/validators/SessionValidator";
import SidebarContext from "@/contexts/SidebarContext";
import { useSession } from "next-auth/react";
import React, { useContext } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = useSession();
  const { openSidebarButtonOffset, width } = useContext(SidebarContext);

  return (
    <>
      <SessionValidator />
      <Header className="h-18" />
      <div className="flex flex-1 w-full">
        {session.status === "authenticated" && !session.data.error && <Sidebar />}
        <main
          className={`flex-1`}
          style={{
            paddingRight: openSidebarButtonOffset,
            width: `calc(100% - ${width})`,
            transition: "width 0.3s ease-in-out",
          }}
        >
          {children}
        </main>
      </div>
    </>
  );
}
