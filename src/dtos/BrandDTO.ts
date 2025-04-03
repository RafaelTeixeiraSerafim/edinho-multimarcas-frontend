import { BaseDTO } from "./BaseDTO";

export interface BrandDTO extends BaseDTO {
  id: string;
  fipeCode?: string;
  name: string;
}
