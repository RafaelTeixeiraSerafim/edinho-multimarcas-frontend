"use client";

import Container from "@/components/containers/Container";
import Select from "@/components/selects/Select";
import Text from "@/components/texts/Text";
import { VehicleDTO } from "@/dtos/VehicleDTO";
import useBrands from "@/hooks/useBrands";
import useModels from "@/hooks/useModels";
import useVehicles from "@/hooks/useVehicles";
import { getUniqueArray } from "@/utils/getUniqueArray";
import { useCallback, useEffect, useState } from "react";
import SearchButton from "./components/SearchButton";
import {
  Filters,
  FilteredData,
  FilterNames,
  FilteredDataKeys,
} from "./types/filters";

const filtersPlaceholderMap = {
  vehicleYear: "Ano",
  fuelTypeName: "Tipo de combustível",
  referenceMonth: "Mês de referência",
  referenceYear: "Ano de referência",
};

const selectsPlaceholderMap = {
  brand: "Marca",
  model: "Modelo",
};

const emptyFilters: Filters = {
  vehicleYear: "",
  fuelTypeName: "",
  referenceMonth: "",
  referenceYear: "",
};

const emptyFilteredData: FilteredData = {
  vehicleYears: [],
  fuelTypeNames: [],
  referenceMonths: [],
  referenceYears: [],
};

export default function Home() {
  const [filteredData, setFilteredData] = useState(emptyFilteredData);
  const [prevFilteredData, setPrevFilteredData] = useState(emptyFilteredData);
  const [filters, setFilters] = useState(emptyFilters);
  const [selects, setSelects] = useState({
    brand: "",
    model: "",
  });
  const [price, setPrice] = useState("-");
  const [prevSelected, setPrevSelected] = useState<FilterNames | null>(null);
  const [hasBeenSelectedBeforePrev, setHasBeenSelectedBeforePrev] = useState({
    vehicleYear: false,
    fuelTypeName: false,
    referenceMonth: false,
    referenceYear: false,
  });

  const { brands } = useBrands();
  const { brandModels } = useModels(selects.brand);
  const { modelVehicles } = useVehicles(selects.model);

  const filterVehicles = (name: FilterNames, value: string) => {
    if (name === "fuelTypeName")
      return modelVehicles.filter((vehicle) => vehicle.fuelType.name === value);

    return modelVehicles.filter(
      (vehicle) => vehicle[name as keyof VehicleDTO] === parseInt(value)
    );
  };

  const mapVehiclesToSelects = (
    filter: FilterNames,
    filteredVehicles: VehicleDTO[]
  ) => {
    if (filter === "fuelTypeName")
      return filteredVehicles.map((vehicle) => vehicle.fuelType.name);

    return filteredVehicles.map(
      (vehicle) => vehicle[filter as keyof VehicleDTO]
    );
  };

  const getFilteredSelect = (
    filter: FilterNames,
    name: FilterNames,
    filteredData: FilteredData,
    filteredVehicles: VehicleDTO[]
  ) => {
    if (filter !== name) {
      const mappedSelect = mapVehiclesToSelects(filter, filteredVehicles);

      console.log({ mappedSelect });

      return filteredData[`${filter}s`].filter((value) =>
        mappedSelect.includes(value)
      );
    }
    return filteredData[`${filter}s`];
  };

  const refreshFilters = ({
    name,
    value = "",
    prevSelected,
    prevFilteredData,
  }: {
    name: FilterNames;
    value?: string;
    prevSelected?: FilterNames | null;
    prevFilteredData?: FilteredData;
  }) => {
    console.log(
      `refreshing filters by ${prevSelected ? "old select" : "clear"}`
    );
    let loopFilteredData = getFilterlessData();

    for (const key in filters) {
      const filter = key as FilterNames;

      if (!value && filter === name) continue;

      console.log({ select: filter });

      const data = getFilteredData(
        filter,
        filter === name ? value : filters[filter],
        loopFilteredData
      );

      loopFilteredData = data.newFilteredData;
      console.log({ data });
    }

    setFilteredData(loopFilteredData);
    setPrevFilteredData(prevFilteredData ?? getFilterlessData());
    if (prevSelected) setPrevSelected(prevSelected);
    setFilters({ ...filters, [name]: value });
  };

  const getFilteredData = (
    name: FilterNames,
    value: string,
    filteredData: FilteredData,
    prevFilteredData?: FilteredData
  ) => {
    const newFilteredData = { ...emptyFilteredData };
    const usedFilteredData = prevFilteredData || filteredData;

    const filteredVehicles = value
      ? filterVehicles(name, value)
      : modelVehicles;

    console.log({ filteredVehicles });
    console.log({ usedFilteredData });

    for (const key in filters) {
      const filters = key as FilterNames;

      newFilteredData[`${filters}s`] = getFilteredSelect(
        filters,
        name,
        usedFilteredData,
        filteredVehicles
      ) as number[] & string[];
    }

    return { newFilteredData, usedFilteredData };
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const name = e.target.name as FilterNames;

    console.log(`normal filter with name = ${name} and value = ${value}`);

    let optionalPrevFilteredData: FilteredData | undefined;

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

    setFilters({ ...filters, [name]: value });
    setPrevFilteredData(usedFilteredData);
    setFilteredData(newFilteredData);
    setPrevSelected(name);
    setHasBeenSelectedBeforePrev(hasBeenSelectedObj);
  };

  const getFilterlessData = useCallback((): FilteredData => {
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

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(emptyFilters);
    if (e.target.name === "brand")
      setSelects({ [e.target.name]: e.target.value, model: "" });
    else setSelects((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const filterSelect = (key: FilterNames) => (
    <Select
      name={key}
      placeholder={filtersPlaceholderMap[key]}
      value={filters[key]}
      onChange={handleFilterChange}
      iconVariant={filters[key] ? "clear" : "open"}
      onClear={() => refreshFilters({ name: key })}
      disabled={!selects.brand || !selects.model}
      key={key}
    >
      {filteredData[`${key}s` as FilteredDataKeys].map((option) => (
        <option value={option} key={option}>
          {option}
        </option>
      ))}
    </Select>
  );

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
    <Container className="w-1/2 mx-auto overflow-hidden mt-10">
      <div className="mx-40 flex flex-col gap-11 py-12">
        <Text variant="titleUnderlined">Consulta de Veículos</Text>
        <div className="flex flex-col gap-6">
          {["brand", "model"].map((key) => (
            <Select
              placeholder={selectsPlaceholderMap[key as keyof typeof selects]}
              name={key}
              onChange={handleSelectChange}
              value={selects[key as keyof typeof selects]}
              disabled={key === "model" && !selects.brand}
              key={key}
            >
              {(key === "brand" ? brands : brandModels).map((value) => (
                <option value={value.id} key={value.id}>
                  {value.name}
                </option>
              ))}
            </Select>
          ))}
          {["vehicleYear", "fuelTypeName"].map((key) =>
            filterSelect(key as FilterNames)
          )}
          <div className="flex gap-6 w-full">
            {["referenceMonth", "referenceYear"].map((key) =>
              filterSelect(key as FilterNames)
            )}
          </div>
        </div>
        <SearchButton
          filters={filters}
          modelVehicles={modelVehicles}
          setPrice={setPrice}
        />
      </div>
      <div className="bg-primary-main flex justify-center py-8">
        <Text className="text-4xl font-medium text-white ">Preço: {price}</Text>
      </div>
    </Container>
  );
}
