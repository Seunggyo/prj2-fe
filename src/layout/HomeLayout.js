import {Box, Flex} from "@chakra-ui/react";
import {Outlet} from "react-router-dom";
import React from "react";
import {NavBar} from "../component/Navbar";

export function HomeLayout() {
    return (
        <Flex>
            <NavBar/>
            <Outlet/>
        </Flex>
    );
}