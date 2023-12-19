import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { NavBar } from "./Navbar";
import React from "react";
import { SideBar } from "./SideBar";

export function HomeLayout() {
  return (
    <div>
      <div>
        <Box style={{ display: "flex", flexWrap: "wrap" }}>
          <SideBar style={{ minWidth: "220px" }} />
        </Box>
        <Box ml="220px">
          <NavBar />
          <Outlet />
        </Box>
      </div>
    </div>
  );
}
