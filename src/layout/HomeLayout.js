import React from "react";
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../component/Navbar";

function HomeLayout(props) {
  return (
    <Box>
      <Navbar />
      <Outlet />
    </Box>
  );
}

export default HomeLayout;
