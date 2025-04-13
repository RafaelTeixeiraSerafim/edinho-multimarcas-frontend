import { IGridRow } from "@/interfaces/IGridRow";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function useGrid() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [orderBy, setOrderBy] = useState(searchParams.get("orderBy") || "");
  const [orderByField, setOrderByField] = useState(
    searchParams.get("orderByField") || ""
  );

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 3,
    page: 0,
  });
  const [rows, setRows] = useState<IGridRow[]>([]);

  return {
    search,
    setSearch,
    paginationModel,
    setPaginationModel,
    rows,
    setRows,
    orderBy,
    setOrderBy,
    orderByField,
    setOrderByField,
  };
}
