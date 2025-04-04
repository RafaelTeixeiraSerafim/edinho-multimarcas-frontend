"use client";

import Header from "@/components/headers/Header";
import Sidebar from "@/components/sidebars/Sidebar";
import { useSession } from "next-auth/react";

import { redirect } from "next/navigation";

const sidebarOffset = "1.6rem";

export default function Layout({ children }: { children: React.ReactNode }) {
  const session = useSession();

  if (session.status === "unauthenticated") redirect("/login");

  return (
    <>
      <Header className="h-18" />
      <div className="flex flex-1">
        <Sidebar sidebarOffset={sidebarOffset} />
        <main
          className={`flex-1`}
          style={{ paddingInline: `4rem calc(4rem + ${sidebarOffset})` }}
        >
          {children}
        </main>
      </div>
    </>
  );
}
