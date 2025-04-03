import { mergeClasses } from "@/utils/mergeClasses";
import React from "react";

interface TextProps extends React.HTMLAttributes<HTMLHeadingElement> {
  variant?: "default" | "title" | "titleUnderlined";
  color?: "default" | "primary" | "error";
}

export default function Text({
  children,
  variant = "default",
  className = "",
  color = "default",
  ...rest
}: TextProps) {
  const pVariantMap = {
    default: "",
    title: "text-5xl text-primary-main font-semibold",
    titleUnderlined: "text-5xl font-medium",
  };

  const pColorMap = {
    default: "text-black",
    primary: "text-primary-light",
    error: "text-red-500",
  };

  return (
    <div
      className={`${
        variant === "titleUnderlined"
          ? "border-b-primary-main border-b-3 mx-auto"
          : ""
      } w-fit`}
    >
      <p
        {...rest}
        className={mergeClasses(
          `text-center`,
          pVariantMap[variant],
          pColorMap[color],
          className
        )}
      >
        {children}
      </p>
    </div>
  );
}
