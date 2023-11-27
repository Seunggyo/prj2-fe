import {Box} from "@chakra-ui/react";
import {NavBar} from "../component/NavBar";
import {Outlet} from "react-router-dom";
import {NavBarDrug} from "../component/NavBarDrug";


export function DrugLayout () {
  return (
    <Box>
      <NavBarDrug/>
      <Outlet />
    </Box>
  )
}