import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import React from "react";
export function CS() {
  return (
    <Box>
      <Outlet />
    </Box>
  );
}
