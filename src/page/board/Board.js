import { Outlet } from "react-router-dom";
import React from "react";
import { Box } from "@chakra-ui/react";

export function Board() {
  return (
    <Box p={{ base: "20px", lg: "40px" }}>
      <Outlet />
    </Box>
  );
}
