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


import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import MemberSignup from "./page/member/MemberSignup";
import MemberList from "./page/member/MemberList";
import HomeLayout from "./layout/HomeLayout";
import MemberView from "./page/member/MemberView";
import LoginProvider from "./component/LoginProvider";
import MemberLogin from "./page/member/MemberLogin";
import MemberEdit from "./page/member/MemberEdit";


const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route path={"/"} element={<HomeLayout />} >
            <Route path="member/signup" element={<MemberSignup />} />
            <Route path="member/list" element={<MemberList />} />
            <Route path="member/view" element={<MemberView />} />
            <Route path="member/login" element={<MemberLogin />} />
            <Route path="member/edit" element={<MemberEdit />} />
        </ Route>
    )
)

function App() {
    return (
        <LoginProvider>
            <RouterProvider router={routes} />
        </LoginProvider>
    );
}

export default App;
