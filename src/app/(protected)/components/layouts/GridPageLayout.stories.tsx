import type { Meta, StoryObj } from "@storybook/react";

import GridActionCell from "@/components/grids/GridActionCell";
import Providers from "@/providers/Providers";
import { GridColDef } from "@mui/x-data-grid";
import GridPageLayout from "./GridPageLayout";

const meta = {
  component: GridPageLayout,
} satisfies Meta<typeof GridPageLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

const columns: GridColDef[] = [
  { field: "fipeCode", headerName: "Código Fipe", flex: 1 },
  { field: "name", headerName: "Nome", flex: 1 },
  {
    field: "actions",
    headerName: "Ações",
    type: "actions",
    flex: 0.2,
    renderCell: (params) => (
      <GridActionCell id={params.id} onDelete={async () => await undefined} />
    ),
  },
];

export const Default: Story = {
  args: {
    title: "Layout",
    createButtonLabel: "Criar recurso",
    breadcrumbs: ["Layout"],
    apiPath: "",
    columns,
    useCustomQueryHook: () => ({
      items: [{ id: "123", name: "Produto", value: "R$ 1000,00" }],
      total: 2,
      totalPages: 1,
      isLoading: false,
      error: null as Error | null,
      refetchItems: async () => Promise.resolve(),
      deleteItem: async (id: string) => Promise.resolve(),
    }),
    // usePathnameHook: () => "/resource",
    // useRouterHook: () =>
    //   ({
    //     push: () => Promise.resolve(true),
    //     replace: () => Promise.resolve(true),
    //     refresh: () => {},
    //     back: () => {},
    //     forward: () => {},
    //     prefetch: () => Promise.resolve(),
    //     route: "/resource",
    //     pathname: "/resource",
    //     query: {},
    //     asPath: "/resource",
    //   } as AppRouterInstance),
    // useSearchParamsHook: () => new URLSearchParams() as ReadonlyURLSearchParams,
  },
  render: (args) => (
    <Providers>
      <GridPageLayout {...args} />
    </Providers>
  ),
};
