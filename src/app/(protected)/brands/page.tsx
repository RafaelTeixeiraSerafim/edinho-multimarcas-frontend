"use client";

import Button from "@/components/buttons/Button";
import Input from "@/components/inputs/Input";
import Text from "@/components/texts/Text";
import React from "react";

export default function Brands() {
  return (
    <div className="flex flex-col mt-10 gap-6">
      <Text variant="titleUnderlined" align="left">
        Marcas
      </Text>
      <div className="flex justify-between items-center">
        <Input placeholder="Procure pelo nome..." />
        <Button className="w-fit">Criar marca</Button>
      </div>
    </div>
  );
}
