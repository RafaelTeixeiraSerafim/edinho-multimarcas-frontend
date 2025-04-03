import { BrandDTO } from "@/dtos/BrandDTO";
import { http } from "@/lib/apiClient";
import { useQuery } from "react-query";

export default function useBrands() {
  const getBrands = async (): Promise<BrandDTO[]> => {
    const { data } = await http.get("/brands");
    return data.brands;
  };

  const {
    data: brands = [],
    isLoading,
    error,
    refetch: refetchBrands,
  } = useQuery<BrandDTO[], Error>("brands", getBrands, { initialData: [] });

  return {
    brands,
    isLoading,
    error,
    refetchBrands,
  };
}
