import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { HomeLayout } from "./layout/HomeLayout";
import React, { createContext, useEffect, useState } from "react";
import { Drug } from "./page/Drug";
import { Box } from "@chakra-ui/react";
import { Hs } from "./page/Hs";
import DsWrite from "./page/DrugStore/DsWrite";
import { DsList } from "./page/DrugStore/DsList";
import DsView from "./page/DrugStore/DsView";
import { DsEdit } from "./page/DrugStore/DsEdit";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout />}>
      <Route path="dslist" element={<DsList />} />
      <Route path="dswrite" element={<DsWrite />} />
      <Route path="dsview/:id" element={<DsView />} />
      <Route path="edit/:id" element={<DsEdit />} />
      <Route path="hospital" element={<Hs />} />
      <Route path="nutraceutical" element={<Drug />} />
    </Route>,
  ),
);

function App() {
  const [key, setKey] = useState(null);
  useEffect(() => {
    // axios.get("/hospital")
    //     .then(response => setKey(response.data));
  }, []);

  return (
    <Box>
      <KakaoMapAppContext.Provider value={key}>
        <RouterProvider router={router} />
      </KakaoMapAppContext.Provider>
    </Box>
  );
}

export const KakaoMapAppContext = createContext(null);

export default App;
