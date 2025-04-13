"use client";

import GridActionCell from "@/components/grids/GridActionCell";
import useCustomQuery from "@/hooks/useCustomQuery";
import { GridColDef } from "@mui/x-data-grid";
import GridPageLayout from "../components/layouts/GridPageLayout";

export default function FuelTypes() {
  const { deleteItem } = useCustomQuery({
    apiPath: "/fuel-types",
  });

  const columns: GridColDef[] = [
    { field: "name", headerName: "Nome", flex: 1 },
    { field: "abbreviation", headerName: "Abreviação", flex: 1 },
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
      title="Combustíveis"
      breadcrumbs={["Combustíveis"]}
      columns={columns}
      createButtonLabel={"Criar combustível"}
      apiPath="/fuel-types"
    />
  );
}
