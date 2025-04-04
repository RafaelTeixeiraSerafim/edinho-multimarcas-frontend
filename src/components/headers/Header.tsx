"use client";

import { mergeClasses } from "@/utils/mergeClasses";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Logo from "../logos/Logo";

interface HeaderProps {
  className?: string;
}

export default function Header({ className = "" }: HeaderProps) {
  const session = useSession();

  return (
    <header
      className={mergeClasses(
        "bg-primary-dark text-white flex justify-between items-center px-5 h-18 w-full",
        className
      )}
    >
      <Link href="/" className="text-4xl">
        <Logo size="small" variant="blue" />
      </Link>
      {session.status !== "authenticated" && (
        <Link className="text-xl" href={"/login"}>
          Entrar
        </Link>
      )}
    </header>
  );
}
