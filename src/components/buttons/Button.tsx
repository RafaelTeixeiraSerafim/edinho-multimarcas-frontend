import { mergeClasses } from "@/utils/mergeClasses";
import React from "react";
import Loading from "../loadings/Loading";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "disabled" | "loading";
}

export default function Button({
  children,
  className = "",
  variant = "default",
   ...rest
}: ButtonProps) {
  
  if (variant === "disabled")
    return (
      <button
        {...rest}
        className={mergeClasses(
          "bg-primary-main/50 py-3 px-6 rounded-sm text-xl cursor-not-allowed text-white text-nowrap",
          className
        )}
        disabled
      >
        {children}
      </button>
    );

  if (variant === "loading")
    return (
      <button
        {...rest}
        className={mergeClasses(
          "bg-primary-main/50 py-3 px-6 rounded-sm text-xl cursor-not-allowed text-white w-full text-nowrap flex justify-center items-center gap-2",
          className
        )}
        disabled
      >
        <Loading />
        {children}...
      </button>
    );

  return (
    <button
      {...rest}
      className={mergeClasses(
        "bg-primary-main py-3 px-6 rounded-sm text-xl cursor-pointer text-white w-full text-nowrap shadow-sm hover:shadow-lg hover:brightness-90",
        className
      )}
    >
      {children}
    </button>
  );
}
