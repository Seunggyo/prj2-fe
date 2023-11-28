import { Flex } from "@chakra-ui/react";
import { NavBar } from "../component/Navbar";
import { Outlet } from "react-router-dom";
import React from "react";

export function HomeLayout() {
  return (
    <Flex>
      <NavBar />
      <Outlet />
    </Flex>
  );
}
