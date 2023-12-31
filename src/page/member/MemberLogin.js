import React, { useContext, useState } from "react";
import { Box, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "../../component/LoginProvider";
import Snowfall from "react-snowfall";
import bgg from "../../assets/images/로그인화면.png";

export function MemberLogin(props) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const toast = useToast();
  const navigate = useNavigate();

  const { fetchLogin, login, isAuthenticated, authCheck } =
    useContext(LoginContext);

  function handleLogin() {
    axios
      .post("/api/member/login", { id, password })
      .then(() => {
        toast({
          description: "로그인 되었습니다.",
          status: "info",
        });
        navigate(-1);
      })
      .catch(() => {
        toast({
          description: "아이디와 암호를 다시 확인해주세요.",
          status: "warning",
        });
      })
      .finally(() => fetchLogin());
  }

  return (
    <div>
      <Snowfall />
      <div className="flex justify-center h-screen">
        <div className="hidden bg-cover lg:block lg:w-3/5">
          <div className="rounded-xl mr-20">
            <div className="h-full w-full object-cover bg-opacity-40"></div>

            {/*TODO : 백그라운드 이미지 넣고 좌우 크기 수정해야함..*/}
            <img src={bgg} alt="image 2" className="w-full object-cover" />
          </div>
        </div>

        <div className="flex items-center w-full max-w-md px-6  lg:w-2/6 mr-20">
          <div className="flex-1">
            <div className="text-center">
              <h2 className="font-dongle text-7xl font-bold text-center text-gray-700 dark:text-white">
                아프지마
              </h2>
              <p className="font-dongle text-4xl mt-3 text-gray-500 dark:text-gray-300">
                아이디와 패스워드를 입력해주세요.
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
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div className="mt-6">
                <label
                  form="password"
                  className="font-dongle text-4xl text-gray-600 dark:text-gray-200"
                >
                  비밀번호
                </label>
                <input
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div className="mt-6">
                <button
                  onClick={handleLogin}
                  className="font-dongle text-5xl w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                >
                  접속 하기
                </button>
              </div>

              <div className="mt-5">
                <button
                  onClick={() => navigate("/home/member/findId")}
                  className="text-md text-gray-400 focus:text-red-500 hover:text-red-500 hover:underline ml-2"
                >
                  아이디 찾기
                </button>

                <button
                  onClick={() => navigate("/home/member/findPassword")}
                  className="text-md text-gray-400 focus:text-red-500 hover:text-red-500 hover:underline ml-4"
                >
                  비밀번호 찾기
                </button>
              </div>

              <p className="mt-6 text-md text-center text-gray-400">
                아직 가입을 안하셨나요?{" "}
                <button
                  onClick={() => navigate("/home/member/signup")}
                  className="text-blue-500 hover:text-red-500 focus:outline-none focus:underline hover:underline"
                >
                  가입하기
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberLogin;
