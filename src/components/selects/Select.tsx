import { mergeClasses } from "@/utils/mergeClasses";
import React, { useEffect, useState } from "react";
import { FiChevronDown, FiX } from "react-icons/fi";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  placeholder?: string;
  iconVariant?: "open" | "clear";
  onClear?: () => void;
}

export default function Select({
  children,
  placeholder = "Selecione uma opção",
  className = "",
  value,
  iconVariant = "open",
  onClear,
  disabled = false,
  ...rest
}: SelectProps) {
  const [isPlaceholderSelected, setIsPlaceholderSelected] = useState(true);

  useEffect(() => {
    setIsPlaceholderSelected(!value);
  }, [value]);

  return (
    <div className={`relative w-full ${disabled ? "cursor-default" : "cursor-pointer"}`}>
      <select
        {...rest}
        className={mergeClasses(
          `py-2 border  rounded-md w-full pl-3 pr-10 appearance-none cursor-pointer [&>option:not(:first-child)]:text-black `,
          isPlaceholderSelected ? "text-black/55" : "text-black",
          disabled
            ? "text-black/30 pointer-events-none select-none border-black/30"
            : "border-black/50 hover:border-black",
          className
        )}
        value={value}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {children}
      </select>

      <div
        className={`absolute right-2 top-1/2 -translate-y-1/2 flex p-1 rounded-full ${
          iconVariant === "open" ? "pointer-events-none" : "hover:bg-black/5"
        }`}
      >
        {iconVariant === "open" ? (
          <FiChevronDown className={disabled ? "text-black/35" : ""} />
        ) : (
          <button onClick={onClear} className="cursor-pointer">
            <FiX />
          </button>
        )}
      </div>
    </div>
  );
}
