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
          "bg-primary-main/50 py-3 px-6 rounded-sm text-xl cursor-not-allowed text-white",
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
          "flex justify-center items-center gap-2 bg-primary-main/50 py-3 px-6 rounded-sm text-xl cursor-not-allowed text-white w-full",
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
        "bg-primary-main py-3 px-6 rounded-sm text-xl text-white w-full cursor-pointer hover:shadow-lg hover:brightness-90",
        className
      )}
    >
      {children}
    </button>
  );
}
