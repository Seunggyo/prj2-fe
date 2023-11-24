import React, {createContext, useEffect, useState} from 'react';
import axios from "axios";

export const LoginContext = createContext(null);
function LoginProvider({children}) {
    const [login, setLogin] = useState("");

    useEffect(() => {
        fetchLogin();
    }, []);

    // 로그인 가져오기
    function fetchLogin() {
        axios.get("/api/member/login")
            .then(({data}) => setLogin(data));
    }

    // 인증
    function isAthenticated() {
        return login !== "";
    }

    function hasAccess(userId) {
        return login.id === userId;
    }

    function authCheck() {
        return login.auth;
    }


    return (
        <LoginContext.Provider
            value={{login, fetchLogin, isAthenticated, hasAccess, authCheck}}>
            {children}
        </LoginContext.Provider>
    );
}

export default LoginProvider;