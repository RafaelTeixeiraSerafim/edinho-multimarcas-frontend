import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import Button from "@/components/buttons/Button";
import Container from "@/components/containers/Container";
import Grid from "@/components/grids/Grid";
import Input from "@/components/inputs/Input";
import Text from "@/components/texts/Text";
import { BaseDTO } from "@/dtos/BaseDTO";
import useCustomQuery from "@/hooks/useCustomQuery";
import { useDebounce } from "@/hooks/useDebounce";
import { IGridRow } from "@/interfaces/IGridRow";
import { GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "#lib/next-navigation";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

interface GridPageLayoutProps {
  title: string;
  createButtonLabel: string;
  breadcrumbs: React.ReactNode[];
  columns: GridColDef[];
  apiPath: string;
  searchPlaceholder?: string;
  // useCustomQueryHook?: typeof useCustomQuery;
  // useRouterHook?: typeof useRouter;
  // usePathnameHook?: typeof usePathname;
  // useSearchParamsHook?: typeof useSearchParams;
}

export default function GridPageLayout({
  title,
  createButtonLabel,
  breadcrumbs,
  columns,
  apiPath,
  searchPlaceholder = "Pesquisar...",
  // useCustomQueryHook = useCustomQuery,
  // usePathnameHook = usePathname,
  // useRouterHook = useRouter,
  // useSearchParamsHook = useSearchParams,
}: GridPageLayoutProps) {
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
  const { items, total, refetchItems } = useCustomQuery<BaseDTO>({
    page: paginationModel.page,
    pageSize: paginationModel.pageSize,
    search,
    orderBy,
    orderByField,
    apiPath,
  });
  const router = useRouter();
  const pathname = usePathname();

  const [searchInput, setSearchInput] = useState(search);
  const debouncedSearch = useDebounce(searchInput, 300);

  useEffect(() => {
    setSearch(debouncedSearch);
  }, [debouncedSearch]);

  useEffect(() => {
    let url = `${pathname}?`;
    if (search) {
      url += `search=${search}&`;
    }
    if (orderBy) {
      url += `orderBy=${orderBy}&`;
    }
    if (orderByField) {
      url += `orderByField=${orderByField}&`;
    }

    router.push(url.slice(0, -1));
  }, [search, orderBy, orderByField, router, pathname]);

  useEffect(() => {
    const formattedRows = items.map((item) => {
      const row: IGridRow = { id: item.id };
      columns.forEach((col) => {
        if (col.field === "actions") return;

        row[col.field as keyof IGridRow] = item[
          col.field as keyof BaseDTO
        ] as string;
      });

      return row;
    });
    setRows(formattedRows);
  }, [items, setRows, columns]);

  useEffect(() => {
    refetchItems();
  }, [orderBy, orderByField, refetchItems]);

  return (
    <div className="flex flex-col mt-10 gap-6 w-full">
      <div className="flex flex-col gap-1">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <Text variant="titleUnderlined" align="left">
          {title}
        </Text>
      </div>
      <div className="flex justify-between items-center gap-8">
        <Input
          placeholder={searchPlaceholder}
          className="w-100"
          startIcon={<FiSearch className="text-black/50" />}
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        <Link href={`${pathname}/create`}>
          <Button className="w-fit text-md">{createButtonLabel}</Button>
        </Link>
      </div>
      <Container className="w-full rounded-sm border-none shadow-sm">
        <Grid
          columns={columns}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          orderByField={orderByField}
          setOrderByField={setOrderByField}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
          rows={rows}
          total={total}
        />
      </Container>
    </div>
  );
}
