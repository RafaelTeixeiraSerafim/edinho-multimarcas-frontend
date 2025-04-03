"use client";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export function PasswordToggleIcon({
  isPasswordVisible,
  toggleVisibility,
}: {
  isPasswordVisible: boolean;
  toggleVisibility: () => void;
}) {
  return (
    <button
      type="button"
      onClick={toggleVisibility}
      className="text-black/50 hover:text-black/70 transition-colors cursor-pointer"
      aria-label={isPasswordVisible ? "Hide password" : "Show password"}
    >
      {isPasswordVisible ? <FiEyeOff size={18} /> : <FiEye size={18} />}
    </button>
  );
}