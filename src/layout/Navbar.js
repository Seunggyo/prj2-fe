import React, { useContext, useEffect } from "react";
import { Box, Button, Flex, Input, useToast } from "@chakra-ui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../component/LoginProvider";

export function NavBar() {
  const navigate = useNavigate();
  const toast = useToast();

  const { fetchLogin, login, isAuthenticated, authCheck } =
    useContext(LoginContext);

  const urlParams = new URLSearchParams();

  const location = useLocation();

  useEffect(() => {
    fetchLogin();
  }, [location]);

  if (login !== null) {
    urlParams.set("id", login.id);
  }

  return (
    <Box className="w-full">
      <div className="w-full text-gray-700 bg-white">
        <div className="w-full flex flex-col  px-4 mx-auto md:items-center md:justify-between md:flex-row ">
          <div className="p-4 flex flex-row items-center justify-between mr-auto">
            <button
              className="text-4xl font-semibold tracking-widest "
              onClick={() => navigate("/")}
            >
              아프지마
            </button>
          </div>
          {isAuthenticated() && (
            <Flex className="text-2xl font-bold text-teal-500 ml-40">
              {login.nickName} 님 환영합니다!{" "}
            </Flex>
          )}
          <nav class="flex-col mr-20 pb-4 md:pb-0 hidden md:flex md:justify-end md:flex-row">
            <button
              className="px-4 py-2 mt-2 text-xl font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              onClick={() => navigate("/home/member/signup")}
            >
              회원가입
            </button>

            <button
              className="px-4 py-2 mt-2 text-xl font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              onClick={() => navigate("/home/cs")}
            >
              고객센터
            </button>
            {/*{isAuthenticated() || (*/}
            {/*  <button*/}
            {/*    className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"*/}
            {/*    onClick={() => navigate("/home/member/login")}*/}
            {/*  >*/}
            {/*    로그인*/}
            {/*  </button>*/}
            {/*)}*/}
            {authCheck() === "admin" && (
              <button
                className="px-4 py-2 mt-2 text-xl font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                onClick={() => navigate("/home/member/list")}
              >
                회원목록
              </button>
            )}
            {/*{isAuthenticated() && (*/}
            {/*  <button*/}
            {/*    onClick={onOpen}*/}
            {/*    className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"*/}
            {/*  >*/}
            {/*    로그아웃*/}
            {/*  </button>*/}
            {/*)}*/}
          </nav>
        </div>
      </div>
    </Box>
  );
}
