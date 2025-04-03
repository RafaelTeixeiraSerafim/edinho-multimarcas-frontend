import { BrandDTO } from "@/dtos/BrandDTO";
import { ModelDTO } from "@/dtos/ModelDTO";
import { http } from "@/lib/apiClient";
import { useQuery } from "react-query";

export default function useModels(brandId?: string) {
  const getModelsByBrandId = async (): Promise<ModelDTO[]> => {
    if (!brandId) return [];

    const { data } = await http.get(`/brands/${brandId}/models`);
    return data.models;
  };

  const {
    data: brandModels = [],
    isLoading,
    error,
    refetch: refetchModels,
  } = useQuery<BrandDTO[], Error>(
    ["brandModels", brandId],
    getModelsByBrandId,
    {
      initialData: [],
      enabled: !!brandId,
    }
  );

  return {
    brandModels,
    isLoading,
    error,
    refetchModels,
  };
}
