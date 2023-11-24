import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import MemberSignup from "./page/member/MemberSignup";
import MemberList from "./page/member/MemberList";
import HomeLayout from "./page/layout/HomeLayout";
import MemberView from "./page/member/MemberView";
import LoginProvider from "./component/LoginProvider";


const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route path={"/"} element={<HomeLayout />} >
            <Route path="member/signup" element={<MemberSignup />} />
            <Route path="member/list" element={<MemberList />} />
            <Route path="member/view" element={<MemberView />} />
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
