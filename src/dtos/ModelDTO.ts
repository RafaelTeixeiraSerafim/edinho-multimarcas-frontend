import { BaseDTO } from "./BaseDTO";

export interface ModelDTO extends BaseDTO {
  fipeCode?: string;
  name: string;
  brandId: string;
}
