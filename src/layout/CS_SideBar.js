import { Box, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../component/LoginProvider";

export function CS_SideBar() {
  const navigate = useNavigate();

  const { fetchLogin, login, isAuthenticated, idCheck, hasAccess } =
    useContext(LoginContext);

  return (
    <Box mt="50px" border="1px" borderColor="white" display="inline-block">
      <Box mb={8} mt={3} textAlign="center">
        <Text
          className="font-gowun"
          fontSize="4xl"
          fontWeight="bold"
          border="1px"
          borderColor="white"
          p={2}
        >
          고객센터
        </Text>
        <Box borderBottom="4px" mt={8} borderColor="rosybrown"></Box>
      </Box>
      <Box mb={8} textAlign="center">
        <Text
          className="font-gowun"
          fontSize="2xl"
          fontWeight="bold"
          border="1px"
          borderColor="white"
          cursor="pointer"
          p={2}
          onClick={() => navigate("/home/cs")}
        >
          공 지 사 항
        </Text>
        {/* 여기에 공지사항 내용 추가 */}
      </Box>
      <Box borderBottom="4px" mt={8} borderColor="rosybrown"></Box>
      {/*<Box mb={8} mt={8} textAlign="center">*/}
      {/*  <Text*/}
      {/*    className="font-gowun"*/}
      {/*    fontSize="2xl"*/}
      {/*    fontWeight="bold"*/}
      {/*    border="1px"*/}
      {/*    borderColor="white"*/}
      {/*    cursor="pointer"*/}
      {/*    p={2}*/}
      {/*    onClick={() => navigate("/home/cs")}*/}
      {/*  >*/}
      {/*    자주하는 질문*/}
      {/*  </Text>*/}
      {/*  /!* 여기에 자주하는 질문 내용 추가 *!/*/}
      {/*</Box>*/}
      {/*<Box borderBottom="4px" mt={8} borderColor="rosybrown"></Box>*/}
      {/*{(hasAccess(qa.qaWriter) || authCheck() === "admin") && (*/}
      {/*{idCheck(login.id)(*/}
      <Box mb={4} mt={8} textAlign="center">
        <Text
          className="font-gowun"
          fontSize="2xl"
          fontWeight="bold"
          border="1px"
          borderColor="white"
          cursor="pointer"
          onClick={() => navigate("/home/cs/qaList")}
          p={2}
        >
          1:1 응답
        </Text>
        {/* 여기에 1:1 질문 내용 추가 */}

        <Box borderBottom="4px" mt={8} borderColor="rosybrown"></Box>
      </Box>
      {/*)}*/}
    </Box>
  );
}
