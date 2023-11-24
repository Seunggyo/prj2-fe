import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { HomeLayout } from "./layout/HomeLayout";
import React from "react";
import { DrugWrite } from "./page/DrugWrite";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { Box } from "@chakra-ui/react";
import { DrugLayout } from "./layout/DrugLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout />}>
      <Route path="drug" element={<DrugLayout />}>
        <Route path="ns" element={<DrugWrite />} />
      </Route>
    </Route>,
  ),
);

function App() {
  return (
    <Box>
      <RouterProvider router={router} />
      <Map
        center={{ lat: 36.503232, lng: 127.269971 }}
        style={{ width: "100%", height: "900px" }}
        level={5}
      >
        <MapMarker position={{ lat: 36.503232, lng: 127.269971 }} />
      </Map>
    </Box>
  );
}

export default App;
