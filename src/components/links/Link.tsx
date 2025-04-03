import React from "react";
import NextLink from "next/link";
import { mergeClasses } from "@/utils/mergeClasses";

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function Link({ href, children, className }: LinkProps) {
  return (
    <NextLink
      href={href}
      className={mergeClasses("text-primary-light", className)}
    >
      {children}
    </NextLink>
  );
}
