"use client";

import Header from "@/components/headers/Header";
import Sidebar from "@/components/sidebars/Sidebar";
import SessionValidator from "@/components/validators/SessionValidator";
import SidebarContext from "@/contexts/SidebarContext";
import { useSession } from "next-auth/react";

import { redirect } from "next/navigation";
import { useContext } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const session = useSession();
  const { openSidebarButtonOffset, width } = useContext(SidebarContext);

  if (session.status === "unauthenticated") redirect("/login");

  return (
    <>
      <SessionValidator />
      <Header className="h-18" />
      <div className="flex flex-1 w-full">
        <Sidebar />
        <main
          style={{
            width: `calc(100% - ${width} - ${openSidebarButtonOffset})`,
            paddingInline: `4rem`,
            paddingRight: `calc(4rem + ${openSidebarButtonOffset})`,
          }}
        >
          {children}
        </main>
      </div>
    </>
  );
}
