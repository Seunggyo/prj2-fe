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
      <Route path="dslist" element={<DsList />} />
      <Route path="dswrite" element={<DsWrite />} />
      <Route path="dsview/:id" element={<DsView />} />
      <Route path="edit/:id" element={<DsEdit />} />
      <Route path="hospital" element={<Hs />} />
      <Route path="nutraceutical" element={<Drug />} />
    </Route>,
  ),
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

export const KakaoMapAppContext = createContext(null)

export default App;
