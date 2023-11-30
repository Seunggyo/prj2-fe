import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import {
  Map,
  MapMarker,
  useKakaoLoader,
  ZoomControl,
} from "react-kakao-maps-sdk";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export function DsList() {
  const [dsList, setDsList] = useState([]);
  const [level, setLevel] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/ds/list").then((r) => setDsList(r.data));
  }, []);
  // const [loading, error] = useKakaoLoader({
  //   appkey: process.env.REACT_APP_KAKAO_KEY,
  // });

  return (
    <Box>
      <Box>
        <Heading>약국 리스트</Heading>
        <Box>
          <Table>
            <Thead>
              <Tr>
                <Th>약국이름</Th>
                <Th>전화번호</Th>
              </Tr>
            </Thead>
            <Tbody>
              {dsList.map((ds) => (
                <Tr
                  key={ds.id}
                  _hover={{ cursor: "pointer" }}
                  onClick={() => navigate("/ds/view/" + ds.id)}
                >
                  <Td>{ds.name}</Td>
                  <Td>{ds.phone}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Box>
  );
}
