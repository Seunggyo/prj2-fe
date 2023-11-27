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
import { DrugView } from "./page/drug/DrugView";
import { DrugEdit } from "./page/drug/DrugEdit";
import {Drug} from "./page/Drug";
import {Box} from "@chakra-ui/react";
import {Hs} from "./page/Hs";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout />}>
      <Route path="drug" element={<DrugLayout />}>
        <Route path="choice" element={<DrugChoice />} />
        <Route path="choiceList" element={<DrugChoiceList />} />
        <Route path="write" element={<DrugWrite />} />
        <Route path="drugList" element={<DrugList />} />
        <Route path=":id" element={<DrugView />} />
        <Route path="edit:id" element={<DrugEdit />} />
      </Route>
    </Route>,
  ),
    createRoutesFromElements(
        <Route path="/" element={<HomeLayout/>}>
            <Route path='hospital' element={<Hs/>}/>
            <Route path="nutraceutical" element={<Drug/>}/>
        </Route>
    )
);

function App() {
  return (
    <Box>
      <RouterProvider router={router} />
    </Box>
  );
}

export default App;
