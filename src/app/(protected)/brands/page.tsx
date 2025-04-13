"use client";

import GridActionCell from "@/components/grids/GridActionCell";
import useCustomQuery from "@/hooks/useCustomQuery";
import { GridColDef } from "@mui/x-data-grid";
import GridPageLayout from "../components/layouts/GridPageLayout";

export default function Brands() {
  const { deleteItem } = useCustomQuery({
    apiPath: "/brands",
  });

  const columns: GridColDef[] = [
    { field: "fipeCode", headerName: "Código Fipe", flex: 1 },
    { field: "name", headerName: "Nome", flex: 1 },
    {
      field: "actions",
      headerName: "Ações",
      type: "actions",
      flex: 0.2,
      renderCell: (params) => (
        <GridActionCell id={params.id} onDelete={deleteItem} />
      ),
    },
  ];

  return (
    <GridPageLayout
      breadcrumbs={["Marcas"]}
      columns={columns}
      createButtonLabel={"Criar marca"}
      title={"Marcas"}
      apiPath="/brands"
    />
  );
}
