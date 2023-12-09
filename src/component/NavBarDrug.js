import { Box, Button, Flex, Select, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { SideBar } from "../layout/SideBar";
import React, { useContext } from "react";
import { LoginContext } from "./LoginProvider";

export function NavBarDrug() {
  const navigate = useNavigate();
  const { isAdmin } = useContext(LoginContext);

  return (
    <Flex marginLeft="370px">
      <SideBar />
      <Box>
        <nav className="sm:flex sm:justify-center sm:items-center mt-4">
          <div className="flex flex-col sm:flex-row ">
            <a
              onClick={() => navigate("/drug/drugList")}
              className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0"
              href="#"
            >
              전체상품
            </a>
            <a
              onClick={() => navigate("/drug/func/stomach")}
              className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0"
              href="#"
            >
              위건강
            </a>
            <a
              onClick={() => navigate("/drug/func/눈 건강")}
              className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0"
              href="#"
            >
              눈건강
            </a>
            <a
              onClick={() => navigate("/drug/func/간 건강")}
              className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0"
              href="#"
            >
              간건강
            </a>
            <a
              onClick={() => navigate("/drug/func/피로 개선")}
              className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0"
              href="#"
            >
              피로개선
            </a>
            <a
              onClick={() => navigate("/drug/func/어린이 성장")}
              className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0"
              href="#"
            >
              어린이성장
            </a>
            <a
              onClick={() => navigate("/drug/func/수면질 개선")}
              className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0"
              href="#"
            >
              수면질개선
            </a>
            <a
              onClick={() => navigate("/drug/cart")}
              className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0"
              href="#"
            >
              장바구니
            </a>
            {isAdmin() && (
              <a
                onClick={() => navigate("/drug/write")}
                className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0"
                href="#"
              >
                제품등록
              </a>
            )}
          </div>
        </nav>
      </Box>
    </Flex>
  );
}
