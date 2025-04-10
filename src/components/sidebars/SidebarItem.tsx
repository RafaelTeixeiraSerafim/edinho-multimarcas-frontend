import { styled } from "@mui/material";
import { usePathname } from "next/navigation";
import Text from "../texts/Text";

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
}

interface SidebarItemProps {
  item: SidebarItem;
  isOpen: boolean;
  className?: string;
}

interface ListItemProps {
  selected?: boolean;
}

export const ListItem = styled("li")<ListItemProps>(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: "0.75rem",
  padding: "0.5rem 1.5rem",
  cursor: "pointer",
  minHeight: "2.5rem",
  transition: "background-color 200ms",
  backgroundColor: "transparent",
  "&:hover": {
    backgroundColor:
      "color-mix(in srgb, var(--color-bluish-gray) 60%, transparent)",
  },
  variants: [
    {
      props: { selected: true },
      style: {
        backgroundColor: "var(--color-bluish-gray)",
      },
    },
  ],
}));

export const SidebarItem = ({ item, className, isOpen }: SidebarItemProps) => {
  const pathname = usePathname();

  return (
    <ListItem selected={pathname === item.href} className={className}>
      <span className="text-xl flex">{item.icon}</span>
      <Text
        className={`text-inherit`}
        align="left"
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(-10px)",
          opacity: isOpen ? 1 : 0,
          transition: "transform 0.2s ease-in-out, opacity 0.2s ease-in-out",
        }}
      >
        {item.label}
      </Text>
    </ListItem>
  );
};
