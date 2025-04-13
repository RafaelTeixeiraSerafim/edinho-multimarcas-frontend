export type FilterNames =
  | "vehicleYear"
  | "fuelTypeName"
  | "referenceMonth"
  | "referenceYear";

export type FilteredDataKeys = `${FilterNames}s`;

export type FilteredData = {
  [K in FilteredDataKeys]: K extends `${infer Single}s`
    ? Single extends FilterNames
      ? Single extends "fuelTypeName"
        ? string[]
        : number[]
      : never
    : never;
};

export type Filters = {
  [K in FilterNames]: string;
};
