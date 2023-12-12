import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { NavBar } from "./Navbar";
import React from "react";
import { SideBar } from "./SideBar";

export function HomeLayout() {
  return (
    <div>
      <Box>
        <NavBar />
      </Box>
      <div>
        <Box>
          <SideBar />
        </Box>
        <Box ml="250px">
          <Outlet />
        </Box>
      </div>
    </div>
  );
}
