import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function MemberFindId() {
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [text, setText] = useState("");

  const navigate = useNavigate();

  function handleButtonClick() {
    axios.post("/api/member/findId", { email }).then(({ data }) => {
      if (data === "") {
        setText("이메일 확인 요망");
      } else {
        !(email === "") && setId(data);
      }
    });
  }

  return (
    <Box>
      <div className="w-full max-w-md mx-auto p-6">
        <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-3xl font-bold text-gray-800 dark:text-white">
                아이디를 잊으셨나요?
              </h1>
              <p className="mt-2 text-md text-gray-600 dark:text-gray-400">
                기억나셨나요?
                <button className="text-blue-600 hover:text-red-500 decoration-2 hover:underline font-medium">
                  로그인
                </button>
              </p>
            </div>

            <div className="mt-5">
              <form>
                <div className="grid gap-y-4">
                  <div>
                    <label className="block text-lg font-bold ml-1 mb-2 dark:text-white">
                      가입 시 Email을 입력해 주세요.
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                        required
                        aria-describedby="이메일 인증에러"
                      />
                    </div>
                    <p
                      className="hidden text-xs text-red-600 mt-2"
                      id="이메일 인증에러"
                    >
                      입력하신 이메일 주소가 일치하지 않습니다.
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                  >
                    인증 하기
                  </button>
                </div>
              </form>
            </div>
          </div>
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
    </Box>
  );
}
