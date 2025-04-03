import { mergeClasses } from "@/utils/mergeClasses";
import { FiArrowLeftCircle } from "react-icons/fi";
import Link from "./Link";

interface BackLinkProps {
  href?: string;
  className?: string;
  label?: string;
}

export const BackLink = ({
  href = "/",
  className = "",
  label = "Voltar",
}: BackLinkProps) => {
  return (
    <Link href={href} className={mergeClasses("absolute top-8 flex items-center gap-1 text-lg", className)}>
      <FiArrowLeftCircle />
      {label}
    </Link>
  );
};
