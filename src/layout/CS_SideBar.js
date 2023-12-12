import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

export function CS_SideBar() {
  const navigate = useNavigate();

  return (
    <Box
      p={4}
      border="1px"
      borderColor="white"
      mr={4}
      flexShrink={0}
      width={{ base: "100%", md: "15%" }}
      display="inline-block"
    >
      <Box mb={8} mt={3} textAlign="center">
        <Text
          fontSize="3xl"
          fontWeight="bold"
          border="1px"
          borderColor="white"
          p={2}
        >
          고객센터
        </Text>
        <Box borderBottom="4px" mt={8} borderColor="rosybrown"></Box>
        {/* 여기에 공지사항 내용 추가 */}
      </Box>
      <Box mb={8} textAlign="center">
        <Text
          fontSize="xl"
          fontWeight="bold"
          border="1px"
          borderColor="white"
          cursor="pointer"
          p={2}
          onClick={() => navigate("/home/cs")}
        >
          자주하는 질문
        </Text>
        {/* 여기에 자주하는 질문 내용 추가 */}
      </Box>
      <Box borderBottom="4px" mt={8} borderColor="rosybrown"></Box>
      <Box mb={4} mt={8} textAlign="center">
        <Text
          fontSize="xl"
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
    </Box>
  );
}
