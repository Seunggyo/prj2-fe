import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../component/NavBar";

export function HomeLayout() {
  return (
    <Flex>
      <NavBar />
      <Outlet />
    </Flex>
  );
}
