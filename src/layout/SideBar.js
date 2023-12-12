import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faHospital,
  faSquarePlus,
} from "@fortawesome/free-regular-svg-icons";
import { faCapsules } from "@fortawesome/free-solid-svg-icons";
import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { LoginContext } from "../component/LoginProvider";
import axios from "axios";

export function SideBar() {
  const navigate = useNavigate();

  const toast = useToast();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const urlParams = new URLSearchParams();

  const { fetchLogin, login, isAuthenticated, authCheck } =
    useContext(LoginContext);

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
      .finally(() => onClose());
  }

  return (
    <Box>
      <div className="fixed flex flex-col top-24 left-0 w-14 hover:w-64 md:w-64 bg-white h-full text-gray-600 transition-all duration-300 border-none z-10 sidebar">
        <div className="fixed flex flex-col top-15 left-0 w-48 bg-white h-full border-r">
          <div className="overflow-y-auto overflow-x-hidden flex-grow">
            <ul className="flex flex-col py-7 space-y-2">
              <li className="px-5">
                <div className="flex flex-row items-center h-8">
                  <div className="text-lg font-bold tracking-wide text-gray-500">
                    메 뉴
                  </div>
                </div>
              </li>
              <li>
                <p
                  onClick={() => navigate("/home/hospital/hospitalList")}
                  className="mb-3 relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 cursor-pointer text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    <FontAwesomeIcon icon={faHospital} />
                  </span>
                  <span className="ml-2 text-4xl font-dongle font-semibold">
                    병 원
                  </span>
                </p>
              </li>
              <li>
                <p
                  onClick={() => navigate("/home/ds")}
                  className="mb-3 relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 cursor-pointer text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    <FontAwesomeIcon icon={faCapsules} />
                  </span>
                  <span className="ml-2 text-4xl font-dongle font-semibold tracking-wide truncate">
                    약 국
                  </span>
                  <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-indigo-500 bg-indigo-50 rounded-full">
                    New
                  </span>
                </p>
              </li>

              <li>
                {/*내꺼*/}
                <p
                  onClick={() => navigate("/home/drug")}
                  className="mb-3 relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 cursor-pointer text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    <FontAwesomeIcon icon={faSquarePlus} />
                  </span>
                  <span className="ml-2 text-4xl font-dongle font-semibold  tracking-wide truncate">
                    건강 마켓
                  </span>
                </p>
              </li>

              <li>
                <p
                  onClick={() => navigate("/home/board")}
                  className="mb-3 relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 cursor-pointer text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    <FontAwesomeIcon icon={faSquarePlus} />
                  </span>
                  <span className="ml-2 text-4xl font-dongle font-semibold tracking-wide truncate">
                    자유 게시판
                  </span>
                </p>
              </li>

              <li>
                <p className="relative flex flex-row items-center h-11 focus:outline-none cursor-pointer hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                  <span className="inline-flex justify-center items-center ml-4">
                    <FontAwesomeIcon icon={faBell} />
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    알 림
                  </span>
                  <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-500 bg-red-50 rounded-full">
                    1.2k
                  </span>
                </p>
              </li>

              <Box borderBottom="2px" mt={8} borderColor="rosybrown"></Box>

              <li className="px-5">
                <div className="flex flex-row items-center h-8">
                  <div className="text-xl font-bold font-semibold tracking-wide text-gray-500">
                    설 정
                  </div>
                </div>
              </li>

              <li>
                <p
                  className="mb-3 relative flex flex-row items-center h-11 focus:outline-none
                  cursor-pointer hover:bg-gray-50 text-gray-600 hover:text-gray-800
                  border-l-4 border-transparent hover:border-indigo-500 pr-6"
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      ></path>
                    </svg>
                  </span>
                  <Menu>
                    <MenuButton
                      rightIcon={<ChevronDownIcon />}
                      className="ml-2 text-4xl font-dongle font-semibold tracking-wide text-gray-500"
                    >
                      개인 정보
                    </MenuButton>
                    <MenuList>
                      <MenuItem>
                        {" "}
                        {isAuthenticated() && (
                          <button
                            className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                            onClick={() =>
                              navigate("/home/member/view?" + urlParams)
                            }
                          >
                            회원 정보
                          </button>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {" "}
                        <button className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                          결제 내역
                        </button>
                      </MenuItem>
                      <MenuItem>
                        {" "}
                        <button
                            onClick={() => navigate("/home/hospital/reservationCheck?" + urlParams)}
                            className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                          {" "}
                          예약 내역
                        </button>
                      </MenuItem>
                      <MenuItem>
                        {" "}
                        <button className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                          문의 답변
                        </button>
                      </MenuItem>
                      {/*TODO: 아래 3개는 admin 전용*/}
                      아래 3개는 admin
                      <MenuItem>
                        {" "}
                        <button className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                          회원 목록
                        </button>
                      </MenuItem>
                      <MenuItem>
                        {" "}
                        <button className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                          병원 리스트
                        </button>
                      </MenuItem>
                      <MenuItem>
                        {" "}
                        <button className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                          약국 리스트
                        </button>
                      </MenuItem>
                        <MenuItem>
                            {" "}
                            <button
                                onClick={() => navigate("/home/hospital/businessList?" + urlParams)}
                                className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                                기관에서 보는 예약 페이지
                            </button>
                        </MenuItem>
                        <MenuItem>
                            {" "}
                            <button
                                onClick={() => navigate("/home/hospital/businessList?" + urlParams)}
                                className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                                기관정보 변경
                            </button>
                        </MenuItem>
                    </MenuList>
                  </Menu>
                </p>
              </li>
              <li>
                <p className=" mb-3 relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 cursor-pointer border-l-4 border-transparent hover:border-indigo-500 pr-6">
                  <span className="inline-flex justify-center items-center ml-4">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      ></path>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                  </span>
                  <span className="ml-2 text-4xl font-dongle font-semibold tracking-wide truncate">
                    옵 션
                  </span>
                </p>
              </li>
              <li>
                <p className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 cursor-pointer border-l-4 border-transparent hover:border-indigo-500 pr-6">
                  <span className="inline-flex justify-center items-center ml-4">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      ></path>
                    </svg>
                  </span>

                  {isAuthenticated() || (
                    <Box>
                      <button
                        class="ml-2 text-4xl font-dongle font-semibold tracking-wide truncate"
                        onClick={() => {
                          navigate("/home/member/login");
                        }}
                      >
                        로그인
                      </button>
                    </Box>
                  )}

                  {isAuthenticated() && (
                    <Box>
                      <button
                        class="ml-2 text-4xl font-dongle font-semibold tracking-wide truncate"
                        onClick={onOpen}
                      >
                        로그아웃
                      </button>
                    </Box>
                  )}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/*로그아웃 모달*/}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>로그아웃 확인</ModalHeader>
          <ModalCloseButton />
          <ModalBody>로그아웃 하시겠습니까?</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>취소</Button>
            <Button onClick={handleLogout} colorScheme="blue">
              확인
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
