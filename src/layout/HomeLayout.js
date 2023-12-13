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
          <NavBar />
          <SideBar style={{ minWidth: "200px" }} />
        </Box>
        <Box ml="200px">
          <Outlet />
        </Box>
      </div>
    </div>
  );
}
