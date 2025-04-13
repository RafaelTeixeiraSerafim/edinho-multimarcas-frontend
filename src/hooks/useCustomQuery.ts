import { ListResponseDTO } from "@/dtos/ListResponseDTO";
import { IUseCustomQuery } from "@/interfaces/IUseCustomQuery";
import { http } from "@/lib/apiClient";
import { useQuery } from "react-query";

interface UseCustomQueryProps extends IUseCustomQuery {
  apiPath: string;
}

export default function useCustomQuery<T>({
  page,
  pageSize,
  search,
  orderBy,
  orderByField,
  apiPath,
}: UseCustomQueryProps) {
  const getItems = async (): Promise<ListResponseDTO<T>> => {
    const { data } = await http.get(apiPath, {
      params: { page, pageSize, search, orderBy, orderByField },
    });
    return data;
  };

  const deleteItem = async (id: string): Promise<void> => {
    await http.delete(`${apiPath}/${id}`);
  };

  const {
    data: { items = [], total = 0, totalPages = 0 } = {},
    isLoading,
    error,
    refetch: refetchItems,
  } = useQuery<ListResponseDTO<T>, Error>(
    ["items", page, pageSize, search],
    getItems,
    {
      keepPreviousData: true,
    }
  );

  return {
    items,
    total,
    totalPages,
    isLoading,
    error,
    refetchItems,
    deleteItem,
  };
}
