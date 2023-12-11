import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { HomeLayout } from "./layout/HomeLayout";
import React from "react";

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
import { DrugLayout } from "./layout/DrugLayout";
import { DrugWrite } from "./page/drug/DrugWrite";
import { DrugList } from "./page/drug/DrugList";
import { DrugView } from "./page/drug/DrugView";
import { DrugEdit } from "./page/drug/DrugEdit";
import { HsAdd } from "./page/hs/HsAdd";
import { HsEdit } from "./page/hs/HsEdit";
import { Ds } from "./Ds";
import { Member } from "./Member";
import { Board } from "./page/board/Board";
import { CS } from "./page/customerService/CS";
import { CSList } from "./page/customerService/CSList";
import { CSWrite } from "./page/customerService/CSWrite";
import { CSView } from "./page/customerService/CSView";
import { CSEdit } from "./page/customerService/CSEdit";
import { QAList } from "./page/customerService/QA/QAList";
import { QAWrite } from "./page/customerService/QA/QAWrite";
import { MemberFindId } from "./page/member/MemberFindId";
import { MemberFindPassword } from "./page/member/MemberFindPassword";
import { MemberJoinList } from "./page/member/MemberJoinList";
import { Cart } from "./page/drug/Cart";
import { DrugFuncList } from "./page/drug/DrugFuncList";
import KakaoContainer from "./layout/map/KakaoContainer";
import { Hs } from "./Hs";
import { HsList } from "./page/hs/HsList";
import { HsReservation } from "./page/hs/HsReservation";
import { QAView } from "./page/customerService/QA/QAView";
import { QAEdit } from "./page/customerService/QA/QAEdit";
import { DrugBuy } from "./page/drug/DrugBuy";
import { HsReservationCheck } from "./page/hs/HsReservationCheck";
import { HsView } from "./page/hs/HsView";
import HsKakaoContainer from "./layout/map/HsKakaoContainer";
import DsKakaoContainer from "./layout/map/DsKakaoContainer";

const routes = createBrowserRouter(
  createRoutesFromElements(
    // <Route path="/" element={<WelcomePage />}>
    <Route path="/" element={<HomeLayout />}>
      <Route path="ds" element={<Ds />}>
        <Route index element={<DsKakaoContainer />} />
        <Route path="list" element={<DsList />} />
        <Route path="write" element={<DsWrite />} />
        <Route path="view/:id" element={<DsView />} />
        <Route path="edit/:id" element={<DsEdit />} />
      </Route>
      <Route path="drug" element={<DrugLayout />}>
        <Route path="write" element={<DrugWrite />} />
        <Route path="drugList" element={<DrugList />} />
        <Route path=":id" element={<DrugView />} />
        <Route path="edit/:id" element={<DrugEdit />} />
        <Route path="cart" element={<Cart />} />
        <Route path="func/:func" element={<DrugFuncList />} />
        <Route path="buy/:id" element={<DrugBuy />} />
      </Route>
      <Route path="hospital" element={<Hs />}>
        <Route index element={<HsKakaoContainer />} />
        <Route path="hospitalList" element={<HsList />} />
        <Route path="hospitalAdd" element={<HsAdd />} />
        <Route path="hospitalView/:id" element={<HsView />} />
        <Route path="hospitalEdit/:id" element={<HsEdit />} />
        <Route path="hospitalReservation/:id" element={<HsReservation />} />
        <Route path="reservationCheck" element={<HsReservationCheck />} />
      </Route>
      <Route path="member" element={<Member />}>
        <Route path="signup" element={<MemberSignup />} />
        <Route path="list" element={<MemberList />} />
        <Route path={"joinList"} element={<MemberJoinList />} />
        <Route path="view" element={<MemberView />} />
        <Route path="login" element={<MemberLogin />} />
        <Route path="edit" element={<MemberEdit />} />
        <Route path="findId" element={<MemberFindId />} />
        <Route path="findPassword" element={<MemberFindPassword />} />
      </Route>
      <Route path="board" element={<Board />}>
        <Route index element={<BoardList />} />
        <Route path="write" element={<BoardWrite />} />
        <Route path=":id" element={<BoardView />} />
        <Route path="edit/:id" element={<BoardEdit />}></Route>
      </Route>
      <Route path="cs" element={<CS />}>
        <Route path="csList" element={<CSList />} />
        <Route path="csWrite" element={<CSWrite />}></Route>
        <Route path="csList/:id" element={<CSView />}></Route>
        <Route path="csEdit/:id" element={<CSEdit />}></Route>
        <Route path="qaList" element={<QAList />}></Route>
        <Route path="qaWrite" element={<QAWrite />}></Route>
        <Route path="qaList/:id" element={<QAView />}></Route>
        <Route path="qaEdit/:id" element={<QAEdit />}></Route>
      </Route>
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
