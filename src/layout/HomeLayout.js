import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../component/Navbar";
import React from "react";
import { SideBar } from "../component/SideBar";

export function HomeLayout() {
  return (
    <div>
      <Box>
        <NavBar />
        <Outlet />
      </Box>
    </div>
  );
}
