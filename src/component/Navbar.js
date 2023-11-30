import React, { useContext, useEffect } from "react";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "./LoginProvider";

export function NavBar() {
  const navigate = useNavigate();
  const toast = useToast();

  const { fetchLogin, login, isAuthenticated, isAdmin, authCheck } =
    useContext(LoginContext);

  const urlParams = new URLSearchParams();

  const location = useLocation();

  useEffect(() => {
    fetchLogin();
  }, [location]);

  if (login !== null) {
    urlParams.set("id", login.id);
  }
  function handleLogout() {
    axios
      .post("/api/member/logout")
      .then(() => {
        toast({
          description: "로그아웃 되었습니다.",
          status: "info",
        });
        navigate("/");
      })
      .finally(() => fetchLogin());
  }

  return (
    <div className="w-full text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800">
      <div className="flex flex-col max-w-screen-2xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-14">
        <div className="p-4 flex flex-row items-center justify-between">
          <button
            className="text-3xl font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline"
            onClick={() => navigate("/")}
          >
            아프지마 UI
          </button>
        </div>
        <nav class="flex-col flex-grow pb-4 md:pb-0 hidden md:flex md:justify-end md:flex-row">

          <button
              className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              onClick={() => navigate("/board")}
          >
            커뮤니티
          </button>

          {isAuthenticated() || (
            <button
              className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              onClick={() => navigate("/member/login")}
            >
              로그인
            </button>
          )}

          {isAuthenticated() || (
              <button
                  className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                  onClick={() => navigate("/member/signup")}
              >
                회원가입
              </button>
          )}

          {(authCheck() === "admin") && (
              <button
                  className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                  onClick={() => navigate("/member/list")}
              >
                회원목록
              </button>
          )}

          {isAuthenticated() && (
            <button
              className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              onClick={() => navigate("/member/view?" + urlParams)}
            >
              회원정보
            </button>
          )}

          {isAdmin() && (
            <button
              className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              onClick={() => navigate("/member/list")}
            >
              회원목록
            </button>
          )}

          {isAuthenticated() && (
            <button
              className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          )}
        </nav>

        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            colorScheme="teal"
            variant="link"
            className="px-4 py-2 mt-2 text-xl font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
          >
            메뉴
          </MenuButton>
          <MenuList>
            <MenuItem>
              {" "}
              <a
                className="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                href="#"
              >
                영양제쇼핑몰
              </a>
            </MenuItem>
            <MenuItem>
              {" "}
              <a
                className="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                href="#"
              >
                공 백
              </a>
            </MenuItem>
            <MenuItem>
              {" "}
              <a
                className="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                href="#"
              >
                공 백
              </a>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
}

{
  /*// <div>*/
}
{
  /*//   <Flex direction="column" align="start" width="150px" height="300px">*/
}
{
  /*//     <Button width="100%" bgColor="red.100" onClick={() => navigate("/")}>*/
}
{
  /*//       <FontAwesomeIcon icon={faHospital} />*/
}
{
  /*//     </Button>*/
}
{
  /*//     <Button width="100%" bgColor="red.200" onClick={() => navigate("map")}>*/
}
{
  /*//       병원*/
}
{
  /*//     </Button>*/
}
{
  /*//     <Button*/
}
{
  /*//         width="100%"*/
}
{
  /*//         bgColor="red.300"*/
}
{
  /*//         onClick={() => navigate("/drug")}*/
}
{
  /*//     >*/
}
{
  /*//       영양제*/
}
{
  /*//     </Button>*/
}
{
  /*//   </Flex>*/
}
{
  /*// </div>*/
}
