import { ListItem, styled } from "@mui/material";
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
  sx?: React.CSSProperties;
}

const IconWrapper = styled("span")({
  fontSize: "1.25rem",
  display: "flex",
});

export const SidebarItem = ({ item, sx, isOpen }: SidebarItemProps) => {
  const pathname = usePathname();

  return (
    <ListItem
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        padding: "0.5rem 1.5rem",
        cursor: "pointer",
        minHeight: "2.5rem",
        transition: "background-color 0.2s",
        "&:hover": {
          backgroundColor:
            "color-mix(in srgb, var(--color-bluish-gray) 60%, transparent)",
        },
        backgroundColor:
          pathname === item.href ? "var(--color-bluish-gray)" : "transparent",
        ...sx,
      }}
    >
      <IconWrapper>{item.icon}</IconWrapper>
      <Text
        className={`text-inherit whitespace-nowrap}`}
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
