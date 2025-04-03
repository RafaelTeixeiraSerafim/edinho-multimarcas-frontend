"use client";

import { mergeClasses } from "@/utils/mergeClasses";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import LogoWhite from "@/../public/logo-white.png";
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
      {session.status !== "authenticated" ? (
        <Link className="text-xl" href={"/login"}>
          login
        </Link>
      ) : (
        <button className="text-xl cursor-pointer" onClick={() => signOut()}>
          Logout
        </button>
      )}
    </header>
  );
}
