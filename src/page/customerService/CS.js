import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import React from "react";
import { CS_SideBar } from "../../layout/CS_SideBar";

export function CS() {
  return (
    <Box p={{ base: "20px", lg: "80px" }}>
      <Flex direction={{ base: "column", lg: "row" }}>
        <CS_SideBar mb={{ base: "20px", lg: "0" }} />
        <Box flex="1" p={4}>
          <Outlet />
        </Box>
      </Flex>
    </Box>
  );
}
