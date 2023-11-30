import { Box, Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { SideBar } from "./SideBar";

export function NavBarDrug() {
  const navigate = useNavigate();

  return (
    <Flex marginLeft="256px">
      <SideBar />
      <Box border="1px solid black">
        <Button onClick={() => navigate("/drug/drugList")}>HOME</Button>
        <Button onClick={() => navigate("/drug/choice")}>기능성 영양제</Button>
        <Button onClick={() => navigate("/drug/write")}>write</Button>
      </Box>
    </Flex>
  );
}
