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
          <div className="flex flex-col sm:flex-row">
            <a
              onClick={() => navigate("/drug/drugList")}
              className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0"
              href="#"
            >
              Home
            </a>
            <a
              onClick={() => navigate("/drug/choice")}
              className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0"
              href="#"
            >
              FunctionDrug
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
            <a
              className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0"
              href="#"
            >
              About
            </a>
          </div>
        </nav>

        {/*<Button onClick={() => navigate("/drug/write")}>상품 등록</Button>*/}
        {/*<Button onClick={() => navigate("/drug/choice")}>ㅇㅇ</Button>*/}
        {/*<Button onClick={() => navigate("/drug/cart")}>장바구니</Button>*/}
        <Button onClick={() => navigate("/drug/aaa")}>테스트</Button>
      </Box>
    </Flex>
  );
}
