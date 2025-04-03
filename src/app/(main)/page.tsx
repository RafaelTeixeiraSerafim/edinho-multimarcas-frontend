"use client";

import Button from "@/components/buttons/Button";
import Container from "@/components/containers/Container";
import Select from "@/components/inputs/Select";
import Text from "@/components/texts/Text";
import { VehicleDTO } from "@/dtos/VehicleDTO";
import useBrands from "@/hooks/useBrands";
import useModels from "@/hooks/useModels";
import useVehicles from "@/hooks/useVehicles";
import { formatPrice } from "@/utils/formatPrice";
import { getUniqueArray } from "@/utils/getUniqueArray";
import { useCallback, useEffect, useState } from "react";

const emptySelectValues: ISelectValues = {
  vehicleYear: "",
  fuelTypeName: "",
  referenceMonth: "",
  referenceYear: "",
};

const emptyFilteredData: IFilteredData = {
  vehicleYears: [],
  fuelTypeNames: [],
  referenceMonths: [],
  referenceYears: [],
};

type Selects =
  | "vehicleYear"
  | "fuelTypeName"
  | "referenceMonth"
  | "referenceYear";

type FilteredDataKeys = `${Selects}s`;

type IFilteredData = {
  [K in FilteredDataKeys]: K extends `${infer Single}s`
    ? Single extends Selects
      ? Single extends "fuelTypeName"
        ? string[]
        : number[]
      : never
    : never;
};

type ISelectValues = {
  [K in Selects]: string;
};

export default function Home() {
  const [filteredData, setFilteredData] = useState(emptyFilteredData);
  const [prevFilteredData, setPrevFilteredData] = useState(emptyFilteredData);
  const [selectValues, setSelectValues] = useState(emptySelectValues);
  const [brandValue, setBrandValue] = useState("");
  const [modelValue, setModelValue] = useState("");
  const [price, setPrice] = useState("-");
  const [prevSelected, setPrevSelected] = useState<Selects | null>(null);
  const [hasBeenSelectedBeforePrev, setHasBeenSelectedBeforePrev] = useState({
    vehicleYear: false,
    fuelTypeName: false,
    referenceMonth: false,
    referenceYear: false,
  });
  const { brands } = useBrands();
  const { brandModels } = useModels(brandValue);
  const { modelVehicles } = useVehicles(modelValue);

  const filterVehicles = (name: Selects, value: string) => {
    if (name === "fuelTypeName")
      return modelVehicles.filter((vehicle) => vehicle.fuelType.name === value);

    return modelVehicles.filter(
      (vehicle) => vehicle[name as keyof VehicleDTO] === parseInt(value)
    );
  };

  const mapVehiclesToSelects = (
    select: Selects,
    filteredVehicles: VehicleDTO[]
  ) => {
    if (select === "fuelTypeName")
      return filteredVehicles.map((vehicle) => vehicle.fuelType.name);

    return filteredVehicles.map(
      (vehicle) => vehicle[select as keyof VehicleDTO]
    );
  };

  const getFilteredSelect = (
    select: Selects,
    name: Selects,
    filteredData: IFilteredData,
    filteredVehicles: VehicleDTO[]
  ) => {
    if (select !== name) {
      const mappedSelect = mapVehiclesToSelects(select, filteredVehicles);

      console.log({ mappedSelect });

      return filteredData[`${select}s`].filter((value) =>
        mappedSelect.includes(value)
      );
    }
    return filteredData[`${select}s`];
  };

  const refreshFilters = ({
    name,
    value = "",
    prevSelected,
    prevFilteredData,
  }: {
    name: Selects;
    value?: string;
    prevSelected?: Selects | null;
    prevFilteredData?: IFilteredData;
  }) => {
    console.log(
      `refreshing filters by ${prevSelected ? "old select" : "clear"}`
    );
    let loopFilteredData = getFilterlessData();

    for (const key in selectValues) {
      const select = key as Selects;

      if (!value && select === name) continue;

      console.log({ select });

      const data = getFilteredData(
        select,
        select === name ? value : selectValues[select],
        loopFilteredData
      );

      loopFilteredData = data.newFilteredData;
      console.log({ data });
    }

    setFilteredData(loopFilteredData);
    setPrevFilteredData(prevFilteredData ?? getFilterlessData());
    if (prevSelected) setPrevSelected(prevSelected);
    setSelectValues({ ...selectValues, [name]: value });
  };

  const getFilteredData = (
    name: Selects,
    value: string,
    filteredData: IFilteredData,
    prevFilteredData?: IFilteredData
  ) => {
    const newFilteredData = { ...emptyFilteredData };
    const usedFilteredData = prevFilteredData || filteredData;

    const filteredVehicles = value
      ? filterVehicles(name, value)
      : modelVehicles;

    console.log({ filteredVehicles });
    console.log({ usedFilteredData });

    for (const key in selectValues) {
      const select = key as Selects;

      newFilteredData[`${select}s`] = getFilteredSelect(
        select,
        name,
        usedFilteredData,
        filteredVehicles
      ) as number[] & string[];
    }

    return { newFilteredData, usedFilteredData };
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const name = e.target.name as Selects;

    console.log(`normal filter with name = ${name} and value = ${value}`);

    let optionalPrevFilteredData: IFilteredData | undefined;

    const hasBeenSelectedObj = {
      ...hasBeenSelectedBeforePrev,
    };

    if (prevSelected === name) {
      optionalPrevFilteredData = prevFilteredData;
    } else if (prevSelected) hasBeenSelectedObj[prevSelected] = true;

    if (hasBeenSelectedObj[name]) {
      refreshFilters({
        name,
        value,
        prevSelected: name,
        prevFilteredData: filteredData,
      });
      setHasBeenSelectedBeforePrev({
        ...hasBeenSelectedObj,
        [name]: false,
      });
      return;
    }

    const { newFilteredData, usedFilteredData } = getFilteredData(
      name,
      value,
      filteredData,
      optionalPrevFilteredData
    );

    setSelectValues({ ...selectValues, [name]: value });
    setPrevFilteredData(usedFilteredData);
    setFilteredData(newFilteredData);
    setPrevSelected(name);
    setHasBeenSelectedBeforePrev(hasBeenSelectedObj);
  };

  const getFilterlessData = useCallback((): IFilteredData => {
    return {
      vehicleYears: getUniqueArray(
        modelVehicles.map((vehicle) => vehicle.vehicleYear)
      ),
      fuelTypeNames: getUniqueArray(
        modelVehicles.map((vehicle) => vehicle.fuelType.name)
      ),
      referenceMonths: getUniqueArray(
        modelVehicles.map((vehicle) => vehicle.referenceMonth)
      ),
      referenceYears: getUniqueArray(
        modelVehicles.map((vehicle) => vehicle.referenceYear)
      ),
    };
  }, [modelVehicles]);

  const handleSearch = () => {
    const price = modelVehicles.find(
      (vehicle) =>
        vehicle.vehicleYear === parseInt(selectValues.vehicleYear) &&
        vehicle.fuelType.name === selectValues.fuelTypeName &&
        vehicle.referenceMonth === parseInt(selectValues.referenceMonth) &&
        vehicle.referenceYear === parseInt(selectValues.referenceYear)
    )?.value;
    setPrice(price ? formatPrice(price) : "-");
  };

  const isButtonEnabled = () => {
    return (
      selectValues.fuelTypeName &&
      selectValues.referenceMonth &&
      selectValues.referenceYear &&
      selectValues.vehicleYear
    );
  };

  useEffect(() => {
    setFilteredData(getFilterlessData());
  }, [getFilterlessData]);

  // useEffect(() => {
  //   console.log(hasBeenSelectedBeforePrev);
  // }, [hasBeenSelectedBeforePrev]);

  // useEffect(() => {
  //   console.log(prevSelected);
  // }, [prevSelected]);

  return (
    <Container className="w-4/5 mx-auto overflow-hidden mt-8">
      <div className="mx-40 flex flex-col gap-11 py-12">
        <Text variant="titleUnderlined">Consulta de Veículos</Text>
        <div className="flex flex-col gap-6">
          <Select
            placeholder="Marca"
            onChange={async (e) => {
              setSelectValues(emptySelectValues);
              setBrandValue(e.target.value);
              setModelValue("");
            }}
            value={brandValue}
          >
            {brands.map((brand) => (
              <option value={brand.id} key={brand.id}>
                {brand.name}
              </option>
            ))}
          </Select>
          <Select
            placeholder="Modelo"
            onChange={async (e) => {
              setSelectValues(emptySelectValues);
              setModelValue(e.target.value);
            }}
            value={modelValue}
          >
            {brandModels.map((model) => (
              <option value={model.id} key={model.id}>
                {model.name}
              </option>
            ))}
          </Select>
          <Select
            name="vehicleYear"
            placeholder="Ano"
            value={selectValues.vehicleYear}
            onChange={handleFilterChange}
            iconVariant={selectValues.vehicleYear ? "clear" : "open"}
            onClear={() => refreshFilters({ name: "vehicleYear" })}
          >
            {filteredData.vehicleYears.map((vehicleYear) => (
              <option value={vehicleYear} key={vehicleYear}>
                {vehicleYear}
              </option>
            ))}
          </Select>
          <Select
            name="fuelTypeName"
            placeholder="Tipo de combustível"
            value={selectValues.fuelTypeName}
            onChange={handleFilterChange}
            iconVariant={selectValues.fuelTypeName ? "clear" : "open"}
            onClear={() => refreshFilters({ name: "fuelTypeName" })}
          >
            {filteredData.fuelTypeNames.map((fuelTypeName) => (
              <option value={fuelTypeName} key={fuelTypeName}>
                {fuelTypeName}
              </option>
            ))}
          </Select>
          <div className="flex gap-6 w-full">
            <Select
              name="referenceMonth"
              placeholder="Mês de referência"
              value={selectValues.referenceMonth}
              onChange={handleFilterChange}
              iconVariant={selectValues.referenceMonth ? "clear" : "open"}
              onClear={() => refreshFilters({ name: "referenceMonth" })}
            >
              {filteredData.referenceMonths.map((month) => (
                <option value={month} key={month}>
                  {month}
                </option>
              ))}
            </Select>
            <Select
              name="referenceYear"
              placeholder="Ano de referência"
              value={selectValues.referenceYear}
              onChange={handleFilterChange}
              iconVariant={selectValues.referenceYear ? "clear" : "open"}
              onClear={() => refreshFilters({ name: "referenceYear" })}
            >
              {filteredData.referenceYears.map((year) => (
                <option value={year} key={year}>
                  {year}
                </option>
              ))}
            </Select>
          </div>
        </div>
        <Button
          variant={isButtonEnabled() ? "default" : "disabled"}
          className="w-fit self-center"
          onClick={handleSearch}
        >
          Buscar
        </Button>
      </div>
      <div className="bg-primary-main flex justify-center py-8">
        <Text className="text-4xl font-medium text-white ">Preço: {price}</Text>
      </div>
    </Container>
  );
}
