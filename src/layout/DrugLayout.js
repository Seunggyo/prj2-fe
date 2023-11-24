import {Box} from "@chakra-ui/react";
import {NavBar} from "../component/NavBar";
import {Outlet} from "react-router-dom";


export function DrugLayout () {
  return (
    <Box>
      <NavBar/>
      <Outlet />
    </Box>
  )
}