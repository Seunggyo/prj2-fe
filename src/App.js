import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {HomeLayout} from "./layout/HomeLayout";
import React, {createContext, useEffect, useState} from "react";
import {Drug} from "./page/Drug";
import {Box} from "@chakra-ui/react";
import {Hs} from "./page/Hs";
import axios from "axios";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<HomeLayout/>}>
            <Route path='hospital' element={<Hs/>}/>
            <Route path="nutraceutical" element={<Drug/>}/>
        </Route>
    )
);


function App() {
    const [key, setKey] = useState(null)
    useEffect(() => {
        axios.get("/hospital")
            .then(response => setKey(response.data));
    }, []);

    return (
        <Box>
            <KakaoMapAppContext.Provider value={key}>
                <RouterProvider router={router}/>
            </KakaoMapAppContext.Provider>


        </Box>
    );
}

export const KakaoMapAppContext = createContext(null)

export default App;
