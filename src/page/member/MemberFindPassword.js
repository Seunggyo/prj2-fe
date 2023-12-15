import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function MemberFindPassword() {
  const [member, setMember] = useState(null);
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [authenticationNum, setAuthenticationNum] = useState("");
  const [inputNum, setInputNum] = useState("");
  const [text, setText] = useState("");

  const navigate = useNavigate();

  function handleButtonClick() {
    axios.get("/api/member/info?id=" + id).then(({ data }) => setMember(data));
  }

  function SendMail() {
    if (member === null) {
      setText("아이디를 입력해 주세요");
    } else if (email === member.email) {
      axios
        .get("/mail?email=" + email)
        .then(({ data }) => setAuthenticationNum(data));
      setText("");
    } else {
      setText("아이디 또는 이메일을 확인해 주세요");
    }
  }

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex justify-center h-screen">
        <div className="hidden bg-cover lg:block lg:w-2/3">
          <div className="rounded-xl">
            {/*TODO : 백그라운드 이미지 넣고 좌우 크기 수정해야함..*/}
            <img
              src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
              alt="image 2"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="flex w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <h2 className="font-dongle text-7xl font-bold text-center text-gray-700 dark:text-white">
                비밀번호 찾기
              </h2>
              <p className="font-dongle text-4xl mt-3 text-gray-500 dark:text-gray-300">
                아이디와 이메일 인증을 입력해주세요.
              </p>
            </div>

            <div className="mt-8">
              <div>
                <label
                  form="id"
                  className="block mb-2 font-dongle text-4xl text-gray-600 dark:text-gray-200"
                >
                  아이디
                </label>
                <input
                  type="text"
                  placeholder="Your id"
                  onChange={(e) => setId(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                <button
                  className="ml-40 mt-1 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                  onClick={handleButtonClick}
                >
                  입력
                </button>
              </div>
              <div>
                <label
                  form="id"
                  className="block mb-2 font-dongle text-4xl text-gray-600 dark:text-gray-200"
                >
                  이메일
                </label>
                <input
                  type="email"
                  placeholder="your email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                <button
                  className="ml-40 mt-1 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                  onClick={SendMail}
                >
                  입력
                </button>
              </div>
              {authenticationNum !== "" && (
                <div>
                  <label className="block mb-2 font-dongle text-4xl text-gray-600 dark:text-gray-200">
                    인증번호를 입력해주세요!
                  </label>
                  <input
                    onChange={(e) => setInputNum(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
              )}
            </div>

            {text === "" || <Box>{text}</Box>}

            {parseInt(inputNum) === authenticationNum && (
              <div>
                <label
                  form="password"
                  className="block mb-2 font-dongle text-4xl text-gray-600 dark:text-gray-200"
                >
                  비 밀 번 호
                </label>
                <Input value={member.password} readOnly />
                <button
                  className="ml-40 mt-1 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                  onClick={() => navigate("/home/member/login")}
                >
                  로그인 하러 가기
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
