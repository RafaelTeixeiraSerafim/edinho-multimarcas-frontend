import { mergeClasses } from "@/utils/mergeClasses";
import React, { useEffect, useState } from "react";
import { FiChevronDown, FiX } from "react-icons/fi";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  placeholder?: string;
  iconVariant?: "open" | "clear";
  onClear?(): void;
}

export default function Select({
  children,
  placeholder = "Selecione uma opção",
  className = "",
  value,
  iconVariant = "open",
  onClear,
  ...rest
}: SelectProps) {
  const [isPlaceholderSelected, setIsPlaceholderSelected] = useState(true);

  useEffect(() => {
    setIsPlaceholderSelected(!value);
  }, [value]);

  return (
    <div className="relative w-full cursor-pointer">
      <select
        {...rest}
        className={mergeClasses(
          `py-2 border border-black/50 hover:border-black rounded-md w-full pl-3 pr-10 appearance-none cursor-pointer [&>option:not(:first-child)]:text-black ${
            isPlaceholderSelected ? "text-black/50" : "text-black"
          }`,
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
          <FiChevronDown />
        ) : (
          <button onClick={onClear} className="cursor-pointer">
            <FiX />
          </button>
        )}
      </div>
    </div>
  );
}
