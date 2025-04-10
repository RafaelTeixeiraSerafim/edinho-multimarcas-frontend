import SidebarContext from "@/contexts/SidebarContext";
import React, { useEffect, useState } from "react";

const openSidebarButtonOffset = "1.6rem";

type Width = "13rem" | "4.25rem";

export default function SidebarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [width, setWidth] = useState<Width>("4.25rem");

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    setWidth(isOpen ? "13rem" : "4.25rem");
  }, [isOpen]);

  return (
    <SidebarContext.Provider
      value={{ openSidebarButtonOffset, isOpen, toggleOpen, width }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
