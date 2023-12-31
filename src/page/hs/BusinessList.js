import {
  Flex,
  Heading,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export function BusinessList() {
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [params] = useSearchParams();
  useEffect(() => {
    axios
      .get("/api/hospital/reservation/list?" + params)
      .then((e) => setList(e.data));
  }, []);

  return (
    <Flex
      direction={"column"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("white", "gray.800")}
      h={"100vh"}
      p={5}
    >
      <Stack
        spacing={6}
        mx={"auto"}
        maxW={600}
        boxShadow={"2xl"}
        p={6}
        bg={useColorModeValue("white", "gray.700")}
        borderRadius={"lg"}
        h={"80vh"}
        overflowY={"auto"}
      >
        <Heading
          mb={6}
          textAlign={"center"}
          size={"lg"}
          color={useColorModeValue("gray.700", "white")}
        >
          예약 내역을 확인하실 병원을 선택해주세요
        </Heading>

        <Table variant={"striped"} colorScheme={"white"}>
          <Thead>
            <Tr>
              <Th color={useColorModeValue("gray.700", "white")}>병원 이름</Th>
            </Tr>
          </Thead>

          <Tbody>
            {list && list !== null ? (
              list.map((l) => (
                <Tr
                  id={l.id}
                  _hover={{
                    cursor: "pointer",
                    bg: useColorModeValue("teal.50", "gray.600"),
                  }}
                  onClick={() =>
                    navigate("/home/hospital/businessDayCheck?id=" + l.id)
                  }
                >
                  <Td>{l.name}</Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td>병원정보가 없습니다.</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Stack>
    </Flex>
  );
}
