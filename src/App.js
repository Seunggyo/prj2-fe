import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { HomeLayout } from "./layout/HomeLayout";
import React from "react";
import { Hs } from "./page/hs/Hs";
import DsWrite from "./page/ds/DsWrite";
import { DsList } from "./page/ds/DsList";
import DsView from "./page/ds/DsView";
import { DsEdit } from "./page/ds/DsEdit";
import { MemberSignup } from "./page/member/MemberSignup";
import MemberList from "./page/member/MemberList";
import MemberView from "./page/member/MemberView";
import LoginProvider from "./component/LoginProvider";
import { MemberLogin } from "./page/member/MemberLogin";
import MemberEdit from "./page/member/MemberEdit";

import { BoardWrite } from "./page/board/BoardWrite";
import { BoardView } from "./page/board/BoardView";
import { BoardList } from "./page/board/BoardList";
import { BoardEdit } from "./page/board/BoardEdit";
import { DrugChoice } from "./page/drug/DrugChoice";
import { DrugLayout } from "./layout/DrugLayout";
import DrugChoiceList from "./page/drug/DrugChoiceList";
import { DrugWrite } from "./page/drug/DrugWrite";
import { DrugList } from "./page/drug/DrugList";
import { DrugView } from "./page/drug/DrugView";
import { DrugEdit } from "./page/drug/DrugEdit";
import { HsAdd } from "./page/hs/HsAdd";
import { HsEdit } from "./page/hs/HsEdit";
import { Ds } from "./Ds";
import { Member } from "./Member";
import { Board } from "./Board";
import { MapScreen } from "./MapScreen";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout />}>
      <Route path="main" element={<MapScreen />} />
      <Route path="ds" element={<Ds />}>
        <Route path="list" element={<DsList />} />
        <Route path="write" element={<DsWrite />} />
        <Route path="view/:id" element={<DsView />} />
        <Route path="edit/:id" element={<DsEdit />} />
      </Route>
      <Route path="drug" element={<DrugLayout />}>
        <Route path="choice" element={<DrugChoice />} />
        <Route path="choiceList" element={<DrugChoiceList />} />
        <Route path="write" element={<DrugWrite />} />
        <Route path="drugList" element={<DrugList />} />
        <Route path=":id" element={<DrugView />} />
        <Route path="edit:id" element={<DrugEdit />} />
      </Route>
      <Route path="hospital" element={<Hs />}>
        <Route path="hospitalAdd" element={<HsAdd />} />
        <Route path="hospitalEdit/:id" element={<HsEdit />} />
      </Route>
      <Route path="member" element={<Member />}>
        <Route path="signup" element={<MemberSignup />} />
        <Route path="list" element={<MemberList />} />
        <Route path="view" element={<MemberView />} />
        <Route path="login" element={<MemberLogin />} />
        <Route path="edit" element={<MemberEdit />} />
      </Route>
      <Route path="board" element={<Board />}>
        <Route index element={<BoardList />} />
        <Route path="write" element={<BoardWrite />} />
        <Route path=":id" element={<BoardView />} />
        <Route path="edit/:id" element={<BoardEdit />}></Route>
      </Route>
      ,
    </Route>,
  ),
);

function App() {
  return (
    <LoginProvider>
      <RouterProvider router={routes} />
    </LoginProvider>
  );
}

export default App;
