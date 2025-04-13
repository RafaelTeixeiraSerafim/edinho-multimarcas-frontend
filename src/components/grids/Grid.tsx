import { IGridRow } from "@/interfaces/IGridRow";
import { DataGrid, GridColDef, GridSortDirection } from "@mui/x-data-grid";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface IPaginationModel {
  pageSize: number;
  page: number;
}

interface GridProps {
  columns: GridColDef[];
  rows: IGridRow[];
  paginationModel: IPaginationModel;
  setPaginationModel: (model: IPaginationModel) => void;
  total: number;
  orderBy: string;
  setOrderBy: (orderBy: string) => void;
  orderByField: string;
  setOrderByField: (orderByField: string) => void;
}

export default function Grid({
  columns,
  rows,
  paginationModel,
  setPaginationModel,
  total,
  orderBy,
  setOrderBy,
  orderByField,
  setOrderByField,
}: GridProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      pageSizeOptions={[2, 3]}
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      paginationMode="server"
      rowCount={total}
      onRowClick={(row) => {
        router.push(`${pathname}/${row.id}`);
      }}
      sortingMode="server"
      onSortModelChange={(model) => {
        if (model.length) {
          setOrderBy(model[0].sort || "");
          setOrderByField(model[0].field || "");
        } else {
          setOrderBy("");
          setOrderByField("");
        }
      }}
      initialState={{
        sorting: {
          sortModel: [
            {
              field: orderByField,
              sort: orderBy as GridSortDirection,
            },
          ],
        },
      }}
      rowSelection={false}
      sx={{
        fontSize: "1rem",
        width: "100%",
        "& .MuiDataGrid-columnHeaderTitle": {
          fontWeight: "600",
        },
        "& .MuiDataGrid-cell:focus-within": {
          outline: "none",
        },
        "& .MuiDataGrid-row": {
          "&:hover": {
            cursor: "pointer",
          },
          "&:focus-within": {
            border: "1px solid var(--color-primary-light)",
          },
        },
        "& .MuiDataGrid-columnHeaders ": {
          "& > div:first-child": {
            bgcolor: "rgba(0, 0, 0, 0.05)",
          },
          "& .MuiIconButton-root": {
            color: "rgba(0, 0, 0, 0.7)",
          },
        },
      }}
      localeText={{
        footerRowSelected: (count) =>
          count === 1
            ? `${count} linha selecionada`
            : `${count} linhas selecionadas`,
        MuiTablePagination: {
          labelRowsPerPage: "Linhas por página:",
          labelDisplayedRows: ({ from, to, count }) =>
            `${from} - ${to} de ${count !== -1 ? count : `mais de ${to}`}`,
        },
        noRowsLabel: "Nenhum resultado encontrado",
      }}
      disableColumnMenu
    />
  );
}
