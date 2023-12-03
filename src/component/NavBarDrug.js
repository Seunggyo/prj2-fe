import { Box, Button, Flex, Select, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { SideBar } from "./SideBar";

export function NavBarDrug() {
  const navigate = useNavigate();

  return (
    <Flex marginLeft="256px">
      <SideBar />
      <Box border="1px solid black">
        <Button onClick={() => navigate("/drug/drugList")}>
          기능별 추천❤
        </Button>

        <Button onClick={() => navigate("/drug/write")}>상품 등록</Button>
        <Button onClick={() => navigate("/drug/choice")}>ㅇㅇ</Button>
      </Box>
    </Flex>
  );
}
