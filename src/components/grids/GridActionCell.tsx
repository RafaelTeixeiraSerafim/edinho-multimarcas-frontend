import { GridRowId } from "@mui/x-data-grid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

interface IGridActionCellProps {
  id: GridRowId;
  onDelete: (id: string) => Promise<void>;
}

export default function GridActionCell({
  id,
  onDelete: handleDelete,
}: IGridActionCellProps) {
  const pathname = usePathname();

  return (
    <div className="flex gap-1.5">
      <Link href={`${pathname}/${id}/update`}>
        <div className="rounded-full hover:bg-black/10 p-1.5">
          <FiEdit size={16} />
        </div>
      </Link>
      <button
        className="rounded-full hover:bg-black/10 p-1.5 cursor-pointer"
        onClick={() => handleDelete(id as string)}
      >
        <FiTrash2 />
      </button>
    </div>
  );
}
