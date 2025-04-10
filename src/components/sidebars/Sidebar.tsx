import SidebarContext from "@/contexts/SidebarContext";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useContext } from "react";
import { BiCar, BiGasPump } from "react-icons/bi";
import {
  FiChevronRight,
  FiLogOut,
  FiSearch,
  FiStar,
  FiTag,
  FiUser,
} from "react-icons/fi";
import { SidebarItem } from "./SidebarItem";

const listItems = [
  { id: "search", label: "Consultar", icon: <FiSearch />, href: "/" },
  { id: "vehicles", label: "Veículos", icon: <BiCar />, href: "/vehicles" },
  { id: "models", label: "Modelos", icon: <FiTag />, href: "/models" },
  { id: "brands", label: "Marcas", icon: <FiStar />, href: "/brands" },
  {
    id: "fuel-types",
    label: "Combustíveis",
    icon: <BiGasPump />,
    href: "/fuel-types",
  },
  { id: "users", label: "Usuários", icon: <FiUser />, href: "/users" },
];

const signOutItem = {
  id: "sign-out",
  label: "Sair",
  icon: <FiLogOut />,
};

export default function Sidebar() {
  const { isOpen, toggleOpen, openSidebarButtonOffset, width } =
    useContext(SidebarContext);

  return (
    <div
      className={`overflow-hidden `}
      style={{
        paddingRight: openSidebarButtonOffset,
        minWidth: `calc(${width} + ${openSidebarButtonOffset})`,
      }}
    >
      <aside
        id="sidebar"
        className={`relative border-r border-black/10 shadow-lg h-full flex flex-col justify-between py-15 transition-width duration-300 ease-in-out`}
        style={{
          width: width,
        }}
      >
        <ul className="flex flex-col relative transition-all duration-300 ease-in-out [&>a]:border-b [&>a]:border-solid [&>a]:border-black/10 [&>a:last-child]:border-b-0">
          <button
            onClick={toggleOpen}
            className={`cursor-pointer absolute z-1000 -top-8 -right-[1.55rem] bg-white border border-black/10 border-l-0 rounded-tr-sm rounded-br-sm shadow-[2px_3px_6px_-3px_rgba(0,0,0,0.1)]`}
          >
            <FiChevronRight
              size={"24"}
              className={`transition-transform duration-300 ease-in-out ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {listItems.map((item) => (
            <Link href={item.href} key={item.id}>
              <SidebarItem item={item} isOpen={isOpen} />
            </Link>
          ))}
        </ul>
        <button onClick={() => signOut()}>
          <SidebarItem
            item={signOutItem}
            className="text-red-500"
            isOpen={isOpen}
          />
        </button>
      </aside>
    </div>
  );
}
