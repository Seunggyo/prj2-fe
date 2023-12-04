import { Box, Button, Flex, Select, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { SideBar } from "./SideBar";
import React from "react";

export function NavBarDrug() {
  const navigate = useNavigate();

  return (
    <Flex marginLeft="256px">
      <SideBar />
      <Box border="1px solid black">
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
              onClick={() => navigate("/drug/func/수면질 개선")}
              className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0"
              href="#"
            >
              눈건강
            </a>
            <a
              className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0"
              href="#"
            >
              간건강
            </a>
            <a
              className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0"
              href="#"
            >
              피로개선
            </a>
            <a
              className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0"
              href="#"
            >
              어린이성장
            </a>
            <a
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
              OrderList
            </a>
            <a
              onClick={() => navigate("/drug/write")}
              className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0"
              href="#"
            >
              write
            </a>
          </div>
        </nav>

        {/*<Button onClick={() => navigate("/drug/write")}>상품 등록</Button>*/}
        {/*<Button onClick={() => navigate("/drug/choice")}>ㅇㅇ</Button>*/}
        {/*<Button onClick={() => navigate("/drug/cart")}>장바구니</Button>*/}
      </Box>
    </Flex>
  );
}
