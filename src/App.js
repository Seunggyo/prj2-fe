import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {HomeLayout} from "./layout/HomeLayout";
import React from "react";
import {Drug} from "./page/Drug";
import {Box} from "@chakra-ui/react";
import {Hs} from "./page/Hs";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<HomeLayout/>}>
            <Route path='hospital' element={<Hs/>}/>
            <Route path="nutraceutical" element={<Drug/>}/>
        </Route>
    )
);

// async function loadKakaoMapKey() {
//     return await axios.get("/api/hospital")
//         .then(response => response.data)
//         ;
// }

function App() {
    // const [key, setKey] = useState(null);
    // useEffect(() => {
    //     axios.get("/api/hospital")
    //         .then(response => setKey(response.data));
    // }, []);
    //
    // console.log(key);
    // if (key === null) {
    //     return null;
    // }
    return (
        <Box>
            {/*<KakaoMapAppContext.Provider value={key}>*/}
            <RouterProvider router={router}/>
            {/*</KakaoMapAppContext.Provider>*/}


        </Box>
    );
}

// export const KakaoMapAppContext = createContext(null);

export default App;
