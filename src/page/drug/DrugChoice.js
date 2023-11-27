import { Box, Flex } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function DrugChoice() {
  const navigate = useNavigate();
  function handleStomach() {
    navigate("/drug/list", {
      state: "stomach",
    });
  }

  return (
    <Box>
      <Box width="100%" height="50px">
        <h1>기능성 영양제</h1>
      </Box>
      <Flex>
        <Box width="200px" height="250px" border="1px solid #ffd6d1">
          <Box
            height="100px"
            width="100px"
            margin="50px"
            onClick={handleStomach}
          >
            <img src="/images/firstScreen/up.jpg" height="100%" width="100%" />
            <h1>위 건강</h1>
          </Box>
        </Box>

        <Box width="200px" height="250px" border="1px solid #ffd6d1">
          <Box height="100px" width="100px" margin="50px">
            <img src="/images/firstScreen/i.jpg" height="100%" width="100%" />
            <h1>눈 건강</h1>
          </Box>
        </Box>

        <Box width="200px" height="250px" border="1px solid #ffd6d1">
          <Box height="100px" width="100px" margin="50px">
            <img
              src="/images/firstScreen/Liver.jpg"
              height="100%"
              width="100%"
            />
            <h1>간 건강</h1>
          </Box>
        </Box>
        <Box width="200px" height="250px" border="1px solid #ffd6d1">
          <Box height="100px" width="100px" margin="50px">
            <img src="/images/firstScreen/ti.jpg" height="100%" width="100%" />
            <h1>피로 개선</h1>
          </Box>
        </Box>
        <Box width="200px" height="250px" border="1px solid #ffd6d1">
          <Box height="100px" width="100px" margin="50px">
            <img src="/images/firstScreen/ch.jpg" height="100%" width="100%" />
            <h1>어린이 성장</h1>
          </Box>
        </Box>
        <Box width="200px" height="250px" border="1px solid #ffd6d1">
          <Box height="200px" width="100px" margin="50px">
            <img src="/images/firstScreen/sel.jpg" height="100%" width="100%" />
            <h1>수면질 개선</h1>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
