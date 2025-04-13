import React from "react";
import { Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import { FiChevronRight } from "react-icons/fi";

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: React.ReactNode[];
}) {
  return (
    <MuiBreadcrumbs
      separator={<FiChevronRight fontSize="small" />}
      aria-label="breadcrumb"
    >
      {breadcrumbs.map((breadcrumb, index) => (
        <div
          key={index}
          className="text-sm text-gray-700 hover:text-gray-900 cursor-pointer last:text-black last:cursor-text"
        >
          {breadcrumb}
        </div>
      ))}
    </MuiBreadcrumbs>
  );
}
