import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { MemberSignup } from "./page/member/MemberSignup";
import MemberList from "./page/member/MemberList";
import HomeLayout from "./layout/HomeLayout";
import MemberView from "./page/member/MemberView";
import LoginProvider from "./component/LoginProvider";
import { BoardWrite } from "./page/board/BoardWrite";
import { BoardView } from "./page/board/BoardView";
import { BoardList } from "./page/board/BoardList";
import { MemberLogin } from "./page/member/MemberLogin";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path={"/"} element={<HomeLayout />}>
      <Route path="write" element={<BoardWrite />} />
      <Route path="board/:id" element={<BoardView />} />
      <Route path="board/:id" element={<BoardList />}></Route>
      <Route path="member/signup" element={<MemberSignup />} />
      <Route path="member/list" element={<MemberList />} />
      <Route path="member/view" element={<MemberView />} />
      <Route path="login" element={<MemberLogin />}></Route>
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
