import { mergeClasses } from "@/utils/mergeClasses";
import React, { useState } from "react";
import { PasswordToggleIcon } from "../icons/PasswordToggleIcon";
import Text from "../texts/Text";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Ícone de começo */
  startIcon?: React.ReactNode;
  /** Ícone de final */
  endIcon?: React.ReactNode;
  /** Mensagem de erro */
  error?: string;
  /** Variantes do input */
  variant?: "default" | "password";
  /** Texto de placeholder */
  placeholder?: string;
}

/** Componente de input customizável */
export default function Input({
  startIcon,
  endIcon,
  className,
  error,
  type,
  variant = "default",
  placeholder = "Digite algo...",
  ...rest
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  if (variant === "password") {
    endIcon = (
      <PasswordToggleIcon
        isPasswordVisible={showPassword}
        toggleVisibility={() => setShowPassword(!showPassword)}
      />
    );
    type = showPassword ? "text" : "password";
  }

  return (
    <div className={className}>
      <div className="relative">
        {startIcon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
            {startIcon}
          </div>
        )}

        <input
          {...rest}
          type={type}
          placeholder={placeholder}
          className={mergeClasses(
            `py-2 border border-black/50 hover:border-black rounded-md w-full`,
            startIcon ? "pl-10" : "pl-3",
            endIcon ? "pr-10" : "pr-3"
          )}
        />

        {endIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex">
            {endIcon}
          </div>
        )}
      </div>
      {error && <Text color="error">{error}</Text>}
    </div>
  );
}

Input.displayName = "Input";
