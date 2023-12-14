import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const LoginContext = createContext(null);

function LoginProvider({ children }) {
  const [login, setLogin] = useState("");
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    fetchLogin();
  }, []);

  // 로그인 가져오기
  function fetchLogin() {
    axios.get("/api/member/login").then(({ data }) => {
      setLogin(data);
      setFetched(true);
    });
  }

  function idCheck() {
    return login.id;
  }

  // 인증
  function isAuthenticated() {
    return login !== "";
  }

  function hasAccess(userId) {
    return login.id === userId;
  }

  function authCheck() {
    return login.auth;
  }

  // TODO: 임시 admin 추가함
  function isAdmin() {
    return login.auth === "admin";
  }

  return (
    <LoginContext.Provider
      value={{
        login,
        fetchLogin,
        isAuthenticated,
        hasAccess,
        authCheck,
        idCheck,
        isAdmin,
        fetched,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;
