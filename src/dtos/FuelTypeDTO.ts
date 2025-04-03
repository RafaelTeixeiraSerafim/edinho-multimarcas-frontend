import { BaseDTO } from "./BaseDTO";

export interface FuelTypeDTO extends BaseDTO {
  id: string;
  name: string;
  abbreviation: string;
}
