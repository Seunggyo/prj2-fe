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
