import { BaseDTO } from "./BaseDTO";

export interface ModelDTO extends BaseDTO {
  id: string;
  fipeCode?: string;
  name: string;
  brandId: string;
}
