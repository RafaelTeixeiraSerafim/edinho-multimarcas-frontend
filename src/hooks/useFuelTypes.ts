import { FuelTypeDTO } from "@/dtos/FuelTypeDTO";
import { ListResponseDTO } from "@/dtos/ListResponseDTO";
import { IUseCustomQuery } from "@/interfaces/IUseCustomQuery";
import { http } from "@/lib/apiClient";
import { useQuery } from "react-query";

export default function useFuelTypes({
  page,
  pageSize,
  search,
  orderBy,
  orderByField,
}: IUseCustomQuery = {}) {
  const getFuelTypes = async (): Promise<ListResponseDTO<FuelTypeDTO>> => {
    const { data } = await http.get("/fuel-types", {
      params: { page, pageSize, search, orderBy, orderByField },
    });
    return data;
  };

  const deleteFuelType = async (id: string): Promise<void> => {
    await http.delete(`/fuel-types/${id}`);
  };

  const {
    data: { items: fuelTypes = [], total = 0, totalPages = 0 } = {},
    isLoading,
    error,
    refetch: refetchFuelTypes,
  } = useQuery<ListResponseDTO<FuelTypeDTO>, Error>(
    ["fuelTypes", page, pageSize, search, orderBy, orderByField],
    getFuelTypes,
    {
      keepPreviousData: true,
    }
  );

  return {
    fuelTypes,
    total,
    totalPages,
    isLoading,
    error,
    refetchFuelTypes,
    deleteFuelType,
  };
}
