import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { HomeLayout } from "./layout/HomeLayout";
import React from "react";
import { DrugChoice } from "./page/drug/DrugChoice";
import { Box } from "@chakra-ui/react";
import { DrugLayout } from "./layout/DrugLayout";
import DrugChoiceList from "./page/drug/DrugChoiceList";
import { DrugWrite } from "./page/drug/DrugWrite";
import { DrugList } from "./page/drug/DrugList";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout />}>
      <Route path="drug" element={<DrugLayout />}>
        <Route path="choice" element={<DrugChoice />} />
        <Route path="list" element={<DrugChoiceList />} />
        <Route path="write" element={<DrugWrite />} />
        <Route path="druglist" element={<DrugList />} />
      </Route>
    </Route>,
  ),
);

function App() {
  return (
    <Box>
      <RouterProvider router={router} />
    </Box>
  );
}

export default App;
