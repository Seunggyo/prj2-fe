import React, { useContext, useEffect } from "react";
import {
  Avatar,
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
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
          {isAuthenticated() && (
            <Flex className="text-2xl font-bold text-teal-500 ml-40">
              <Avatar src={login.profile}></Avatar>
              {login.nickName} 님 환영합니다!{" "}
            </Flex>
          )}
          <nav class="z-50 flex-col mr-20 pb-4 md:pb-0 hidden md:flex md:justify-end md:flex-row">
            {isAuthenticated() && authCheck() === "admin" && (
              <Menu>
                <MenuButton className="px-4 py-2 mt-2 text-xl font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                  admin 전용
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    {" "}
                    <button className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                      회원 목록
                    </button>
                  </MenuItem>
                  <MenuItem>
                    {" "}
                    <button
                      onClick={() => navigate("/home/hospital/hospitalList")}
                      className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                    >
                      병원 리스트
                    </button>
                  </MenuItem>
                  <MenuItem>
                    {" "}
                    <button
                      onClick={() => navigate("/home/ds/list")}
                      className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                    >
                      약국 리스트
                    </button>
                  </MenuItem>
                  <MenuItem>
                    {" "}
                    <button
                      onClick={() =>
                        navigate("/home/hospital/businessList?" + urlParams)
                      }
                      className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                    >
                      기관에서 보는 예약 페이지
                    </button>
                  </MenuItem>
                  <MenuItem>
                    {" "}
                    <button
                      onClick={() =>
                        navigate("/home/hospital/businessList?" + urlParams)
                      }
                      className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                    >
                      기관정보 변경
                    </button>
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
            {isAuthenticated() || (
              <button
                className="px-4 py-2 mt-2 text-xl font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                onClick={() => navigate("/home/member/signup")}
              >
                회원가입
              </button>
            )}
            <button
              className="px-4 py-2 mt-2 text-xl font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              onClick={() => navigate("/home/cs")}
            >
              고객센터
            </button>

            {authCheck() === "admin" && (
              <button
                className="px-4 py-2 mt-2 text-xl font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                onClick={() => navigate("/home/member/list")}
              >
                회원목록
              </button>
            )}
          </nav>
        </div>
      </div>
    </Box>
  );
}
