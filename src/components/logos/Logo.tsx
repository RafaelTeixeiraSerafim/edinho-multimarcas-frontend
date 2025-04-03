import Image from "next/image";
import React from "react";
import LogoBgWhite from "@/../public/logo-bg-white.png";
import { mergeClasses } from "@/utils/mergeClasses";
import LogoBgBlue from "@/../public/logo-bg-blue.png";

interface LogoProps {
  size?: "small" | "medium";
  variant?: "white" | "blue";
}

export default function Logo({
  size = "medium",
  variant = "white",
}: LogoProps) {
  const sizeMap = {
    small: "w-40",
    medium: "w-sm",
  };

  const logoMap = {
    white: LogoBgWhite,
    blue: LogoBgBlue,
  };

  return (
    <Image
      src={logoMap[variant]}
      alt="Logo"
      className={mergeClasses("mx-auto", sizeMap[size])}
    />
  );
}
