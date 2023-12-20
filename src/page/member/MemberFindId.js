import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Snowfall from "react-snowfall";

export function MemberFindId() {
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [text, setText] = useState("");

  const navigate = useNavigate();

  function handleButtonClick() {
    axios.post("/api/member/findId", { email }).then(({ data }) => {
      if (data === "") {
        setText("이메일을 확인해주세요");
      } else {
        !(email === "") && setId(data);
      }
    });
  }

  return (
    <div>
      <Snowfall />
      <div className="bg-white dark:bg-gray-900">
        <div className="flex justify-center h-screen">
          <div className="hidden bg-cover lg:block lg:w-2/3">
            <div className="rounded-xl">
              {/*TODO : 백그라운드 이미지 넣고 좌우 크기 수정해야함..*/}
              <img
                src="https://image.idus.com/image/files/361c932c88bf402ab08f19d8afda9e31_720.jpg"
                style={{ height: "800px", width: "1100px" }}
              />
            </div>
          </div>

          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
              <div className="text-center">
                <h2 className="font-dongle text-7xl font-bold text-center text-gray-700 dark:text-white">
                  아이디를 잊으셨나요?
                </h2>
                <p className="mt-2 text-md text-gray-600 dark:text-gray-400">
                  기억나셨나요?
                  <button className="text-blue-600 hover:text-red-500 decoration-2 hover:underline font-medium">
                    로그인
                  </button>
                </p>
              </div>
              <div className="mt-8">
                <div className="mt-5">
                  <p className="font-dongle text-4xl mt-3 text-gray-500 dark:text-gray-300">
                    가입 시 이메일을 입력해주세요.
                  </p>
                  <form>
                    <div className="grid gap-y-4">
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          placeHolder="Your Email"
                          onChange={(e) => setEmail(e.target.value)}
                          className="mb-2 block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                      </div>
                    </div>
                  </form>
                  <button
                    type="submit"
                    onClick={handleButtonClick}
                    className="w-full mt-1 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                  >
                    인 증 하 기
                  </button>
                </div>

                {/*아이디 인증 성공 시 출력*/}
                {text !== "" && <Box>{text}</Box>}
                {id && (
                  <div className="w-full max-w-md mx-auto p-6">
                    <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
                      <div className="p-4 sm:p-7">
                        <div className="text-center">
                          <h1 className="block text-3xl font-bold text-gray-800 dark:text-white">
                            인증 성공!
                          </h1>
                          <label className="block text-lg font-bold ml-1 mb-2 dark:text-white">
                            아이디는 <Input value={id} readOnly /> 입니다.
                          </label>
                        </div>
                        <div className="grid gap-y-4 mt-5">
                          <button
                            type="submit"
                            onClick={() => navigate("/home/member/login")}
                            className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                          >
                            로그인 하러 가기
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <p className="mt-3 flex justify-center items-center text-center">
                <button
                  onClick={() => navigate("/")}
                  className="pr-3.5 inline-flex items-center gap-x-2 text-md text-gray-600 decoration-2 hover:underline hover:text-red-600"
                >
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                  홈으로 가기
                </button>
                /
                <button
                  onClick={() => navigate("/home/member/findPassword")}
                  className="pl-3 inline-flex items-center gap-x-2 text-md text-gray-600 decoration-2 hover:underline hover:text-red-600"
                >
                  비밀번호 찾기
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
