import Button from "@/components/buttons/Button";
import { VehicleDTO } from "@/dtos/VehicleDTO";
import { formatPrice } from "@/utils/formatPrice";
import React from "react";
import { Filters } from "../types/filters";

interface SearchButtonProps {
  modelVehicles: VehicleDTO[];
  filters: Filters;
  setPrice: (price: string) => void;
}

export default function SearchButton({
  modelVehicles,
  filters,
  setPrice,
}: SearchButtonProps) {
  const handleSearch = () => {
    const price = modelVehicles.find(
      (vehicle) =>
        vehicle.vehicleYear === parseInt(filters.vehicleYear) &&
        vehicle.fuelType.name === filters.fuelTypeName &&
        vehicle.referenceMonth === parseInt(filters.referenceMonth) &&
        vehicle.referenceYear === parseInt(filters.referenceYear)
    )?.value;
    setPrice(price ? formatPrice(price) : "-");
  };

  const isButtonEnabled = () => {
    return (
      filters.fuelTypeName &&
      filters.referenceMonth &&
      filters.referenceYear &&
      filters.vehicleYear
    );
  };

  return (
    <Button
      variant={isButtonEnabled() ? "default" : "disabled"}
      className="w-fit self-center"
      onClick={handleSearch}
    >
      Buscar
    </Button>
  );
}
