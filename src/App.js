import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {HomeLayout} from "./layout/HomeLayout";
import React from "react";
import {Map} from "./page/Map";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<HomeLayout/>}>
            <Route path="map" element={<Map/>}/>
        </Route>
    )
);


function App() {
    return (
        <RouterProvider router={router}/>
    );
}

export default App;
