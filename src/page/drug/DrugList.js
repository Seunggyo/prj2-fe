import {
  Box,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function DrugList() {
  const [drugList, setDrugList] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/drug/drugList")
      .then((response) => setDrugList(response.data));
  }, []);

  if (drugList === null) {
    return <Spinner />;
  }

  return (
    <Box>
      <h1>영양제 목록</h1>
      <Box>
        <Table>
          <Thead>
            <Tr>
              <Th>id</Th>
              <Th>영양제</Th>
              <Th>기능</Th>
              <Th>상세 정보</Th>
              <Th>가격</Th>
              <Th>사진</Th>
              <Th>시간</Th>
            </Tr>
          </Thead>
          <Tbody>
            {drugList.map((drug) => (
              <Tr
                _hover={{
                  cursor: "pointer",
                }}
                key={drug.id}
                onClick={() => navigate("/drug/" + drug.id)}
              >
                <Td>{drug.id}</Td>
                <Td>{drug.name}</Td>
                <Td>{drug.func}</Td>
                <Td>{drug.content}</Td>
                <Td>{drug.price}</Td>
                <Td>{drug.fileName}</Td>
                <Td>{drug.inserted}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
