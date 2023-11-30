import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import React from "react";
import { NavBarDrug } from "../component/NavBarDrug";

export function DrugLayout() {
  return (
    <Box>
      <NavBarDrug />
      <Outlet />
    </Box>
  );
}
