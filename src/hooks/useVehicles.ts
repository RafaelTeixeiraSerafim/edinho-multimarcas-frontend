import { VehicleDTO } from "@/dtos/VehicleDTO";
import { http } from "@/lib/apiClient";
import { useQuery } from "react-query";

export default function useVehicles(modelId?: string) {
  const getVehiclesByModelId = async (): Promise<VehicleDTO[]> => {
    if (!modelId) return [];

    const { data } = await http.get(`/models/${modelId}/vehicles`);
    return data.vehicles;
  };

  const {
    data: modelVehicles = [],
    isLoading,
    error,
    refetch: refetchVehicles,
  } = useQuery<VehicleDTO[], Error>(
    ["modelVehicles", modelId],
    getVehiclesByModelId,
    {
      initialData: [],
      enabled: !!modelId,
    }
  );

  return {
    modelVehicles,
    isLoading,
    error,
    refetchVehicles,
  };
}
