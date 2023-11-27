import React from 'react';
import {Box} from "@chakra-ui/react";
import {Outlet} from "react-router-dom";

function HomeLayout(props) {
    return (
        <Box>
            <Outlet />
        </Box>
    );
}

export default HomeLayout;