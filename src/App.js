import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
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
import { Ds } from "./layout/Ds";
import { Member } from "./layout/Member";
import { CS } from "./layout/CS";
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
import { Hs } from "./layout/Hs";
import { HsList } from "./page/hs/HsList";
import { HsReservation } from "./page/hs/HsReservation";
import { QAView } from "./page/customerService/QA/QAView";
import { QAEdit } from "./page/customerService/QA/QAEdit";
import { DrugBuy } from "./page/drug/DrugBuy";
import { HsReservationCheck } from "./page/hs/HsReservationCheck";
import { HsView } from "./page/hs/HsView";
import { HsBusinessCheck } from "./page/hs/HsBusinessCheck";
import { WelcomePage } from "./layout/WelcomePage";
import DsKakaoContainer from "./layout/map/DsKakaoContainer";
import HsKakaoContainer from "./layout/map/HsKakaoContainer";
import { Fail } from "./page/tossPay/Fail";
import { Success } from "./page/tossPay/Success";
import { Payment } from "./page/tossPay/Payment";
import { PaymentHistory } from "./page/member/PaymentHistory";
import { PaymentDetail } from "./page/member/PaymentDetail";
import { BusinessList } from "./page/hs/BusinessList";
import { DayCheck } from "./page/hs/DayCheck";
import { MemberBusinessEdit } from "./page/hs/MemberBussinessEdit";
import { HistoryAll } from "./page/member/HistoryAll";
import { Board } from "./layout/Board";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Outlet />}>
      <Route index element={<WelcomePage />} />
      <Route path="home" element={<HomeLayout />}>
        <Route path="ds" element={<Ds />}>
          <Route index element={<DsKakaoContainer />} />
          <Route path="list" element={<DsList />} />
          <Route path="write" element={<DsWrite />} />
          <Route path="view/:id" element={<DsView />} />
          <Route path="edit/:id" element={<DsEdit />} />
        </Route>
        <Route path="drug" element={<DrugLayout />}>
          <Route index element={<DrugList />} />
          <Route path="write" element={<DrugWrite />} />
          <Route path=":id" element={<DrugView />} />
          <Route path="edit/:id" element={<DrugEdit />} />
          <Route path="cart" element={<Cart />} />
          <Route path="func/:func" element={<DrugFuncList />} />
          <Route path="buy" element={<DrugBuy />} />
        </Route>
        <Route path="hospital" element={<Hs />}>
          <Route index element={<HsKakaoContainer />} />
          <Route path="hospitalList" element={<HsList />} />
          <Route path="hospitalAdd" element={<HsAdd />} />
          <Route path="hospitalView/:id" element={<HsView />} />
          <Route path="hospitalEdit/:id" element={<HsEdit />} />
          <Route path="hospitalReservation/:id" element={<HsReservation />} />
          <Route path="reservationCheck" element={<HsReservationCheck />} />
          <Route path="businessCheck/:id" element={<HsBusinessCheck />} />
          <Route path="businessList" element={<BusinessList />} />
          <Route path="businessDayCheck" element={<DayCheck />} />
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
          <Route path="businessedit" element={<MemberBusinessEdit />} />
          <Route path="paymentHistory" element={<PaymentHistory />} />
          <Route path="paymentDetail" element={<PaymentDetail />} />
          <Route path="membersPaymentHistory" element={<HistoryAll />} />
        </Route>
        <Route path="board" element={<Board />}>
          <Route index element={<BoardList />} />
          <Route path="write" element={<BoardWrite />} />
          <Route path=":id" element={<BoardView />} />
          <Route path="edit/:id" element={<BoardEdit />}></Route>
        </Route>
        <Route path="cs" element={<CS />}>
          <Route index element={<CSList />} />
          <Route path="csWrite" element={<CSWrite />}></Route>
          <Route path=":id" element={<CSView />}></Route>
          <Route path="csEdit/:id" element={<CSEdit />}></Route>
          <Route path="qaList" element={<QAList />}></Route>
          <Route path="qaWrite" element={<QAWrite />}></Route>
          <Route path="qaList/:id" element={<QAView />}></Route>
          <Route path="qaEdit/:id" element={<QAEdit />}></Route>
        </Route>
      </Route>
      <Route path="payment" element={<Payment />} />
      <Route path="success" element={<Success />} />
      <Route path="fail" element={<Fail />} />
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
