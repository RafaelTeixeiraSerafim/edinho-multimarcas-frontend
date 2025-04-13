import { BrandDTO } from "@/dtos/BrandDTO";
import { ListResponseDTO } from "@/dtos/ListResponseDTO";
import { IUseCustomQuery } from "@/interfaces/IUseCustomQuery";
import { http } from "@/lib/apiClient";
import { useQuery } from "react-query";

export default function useBrands({
  page,
  pageSize,
  search,
  orderBy,
  orderByField,
}: IUseCustomQuery = {}) {
  const getBrands = async (): Promise<ListResponseDTO<BrandDTO>> => {
    const { data } = await http.get("/brands", {
      params: { page, pageSize, search, orderBy, orderByField },
    });
    return data;
  };

  const deleteBrand = async (id: string): Promise<void> => {
    await http.delete(`/brands/${id}`);
  };

  const {
    data: { items: brands = [], total = 0, totalPages = 0 } = {},
    isLoading,
    error,
    refetch: refetchBrands,
  } = useQuery<ListResponseDTO<BrandDTO>, Error>(
    ["brands", page, pageSize, search, orderBy, orderByField],
    getBrands,
    {
      keepPreviousData: true,
    }
  );

  return {
    brands,
    total,
    totalPages,
    isLoading,
    error,
    refetchBrands,
    deleteBrand,
  };
}
