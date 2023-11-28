import { Outlet } from "react-router-dom";
import React from "react";
import { Box } from "@chakra-ui/react";
import { SideBar } from "./component/SideBar";

export function Board() {
  return (
    <Box>
      <SideBar />
      <Outlet />
    </Box>
  );
}
