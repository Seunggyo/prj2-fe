import {Flex} from "@chakra-ui/react";
import {Outlet} from "react-router-dom";
import {NavBar} from "../component/Navbar";
import React from "react";

export function HomeLayout() {
    return (
        <Flex>
            <NavBar/>
            <Outlet/>
        </Flex>
    );
}