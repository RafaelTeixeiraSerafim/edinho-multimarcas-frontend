import { BaseDTO } from "./BaseDTO";
import { FuelTypeDTO } from "./FuelTypeDTO";

export interface VehicleDTO extends BaseDTO {
  fipeCode?: string;
  value: number;
  referenceMonth: number;
  referenceYear: number;
  vehicleYear: number;
  modelId: string;
  fuelTypeId: string;
  fuelType: FuelTypeDTO;
}
