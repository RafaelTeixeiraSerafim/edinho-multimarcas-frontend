import { createContext } from "react";

const SidebarContext = createContext<{
  openSidebarButtonOffset: string;
  isOpen: boolean;
  width: "13rem" | "4.25rem";
  toggleOpen: () => void;
}>({
  openSidebarButtonOffset: "1.6rem",
  isOpen: false,
  width: "4.25rem",
  toggleOpen: () => {},
});

export default SidebarContext;
