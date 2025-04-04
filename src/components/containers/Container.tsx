import { mergeClasses } from "@/utils/mergeClasses";
import React, { CSSProperties } from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

export default function Container({
  children,
  className,
  style,
}: ContainerProps) {
  return (
    <div
      className={mergeClasses("shadow-lg rounded-2xl border border-black/10", className)}
      style={style}
    >
      {children}
    </div>
  );
}
