import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Input,
  Select,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import axios from "axios";

export function CSList() {
  const [csList, setCsList] = useState(null);
  const [orderByHit, setOrderByHit] = useState(null);
  const [orderByTitle, setOrderByTitle] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    axios
      .get("/api/cs/list?" + params.toString())
      .then((r) => setCsList(r.data));
  }, [params]);

  if (csList == null) {
    return <Spinner />;
  }

  function handleRowClick(id) {
    axios
      .put("/api/cs/" + id)
      .then((r) => console.log("good"))
      .catch((error) => {
        console.error("bad");
      });
    navigate("/cs/" + id);
  }

  function sortTitle() {
    const urlSearchParams = new URLSearchParams(params.toString());
    let nextOrderByTitle = null;
    urlSearchParams.delete("h");
    if (orderByTitle === false) {
      urlSearchParams.set("t", true);
      nextOrderByTitle = true;
    } else if (orderByTitle === true) {
      urlSearchParams.delete("t");
      nextOrderByTitle = null;
    } else {
      urlSearchParams.set("t", false);
      nextOrderByTitle = false;
    }

    setParams(urlSearchParams);
    setOrderByTitle(nextOrderByTitle);
  }

  function sortCount() {
    const urlSearchParams = new URLSearchParams(params.toString());
    let nextOrderByHit = null;
    urlSearchParams.delete("t");
    if (orderByHit === false) {
      urlSearchParams.set("h", true);
      nextOrderByHit = true;
    } else if (orderByHit === true) {
      urlSearchParams.delete("h");
      nextOrderByHit = null;
    } else {
      urlSearchParams.set("h", false);
      nextOrderByHit = false;
    }

    setParams(urlSearchParams);
    setOrderByHit(nextOrderByHit);
  }

  function handleCategoryChange(event) {
    setCategoryFilter(event.target.value);
  }

  function handleSearchChange(event) {
    setSearchQuery(event.target.value);
  }

  return (
    <Box p={8} bg="gray.100">
      <Box bg="white" borderRadius="xl" boxShadow="lg" p={6}>
        <Flex justify="space-between" align="center">
          <ButtonGroup>
            <Button variant="solid" colorScheme="green">
              여기 공지사항
            </Button>
            <Button variant="solid" colorScheme="green">
              인기 글
            </Button>
            <Button
              variant="solid"
              colorScheme="green"
              onClick={() => navigate("/cs/csWrite")}
            >
              글 쓰 기
            </Button>
          </ButtonGroup>

          <Flex>
            <Select
              mr={4}
              placeholder="카테고리 선택"
              defaultvalue={""}
              onChange={handleCategoryChange}
            >
              <option value="">전체</option>
              <option value={"안내사항"}>안내사항</option>
              <option value={"긴급안내"}>긴급안내</option>
              <option value={"출시소식"}>출시소식</option>
              <option value={"이벤트"}>이벤트</option>
              <option value={"당첨자발표"}>당첨자발표</option>
            </Select>
            <Input
              type="text"
              placeholder="검색어 입력"
              defaultvalue={""}
              onChange={handleSearchChange}
            />
          </Flex>
        </Flex>
        <Table mt={8} variant="simple">
          <Thead>
            <Tr>
              <Th>번호</Th>
              <Th>카테고리</Th>
              <Th onClick={sortTitle} style={{ cursor: "pointer" }}>
                제목
              </Th>
              <Th>작성자</Th>
              <Th>작성일</Th>
              <Th onClick={sortCount} style={{ cursor: "pointer" }}>
                조회수
              </Th>
              <Th>수정 / 삭제</Th>
            </Tr>
          </Thead>
          <Tbody>
            {csList.map((cs) => (
              <Tr
                _hover={{
                  bg: "gray.200",
                  cursor: "pointer",
                }}
                key={cs.id}
                onClick={() => handleRowClick(cs.id)}
              >
                <Td>{cs.id}</Td>
                <Td>{cs.csCategory}</Td>
                <Td>{cs.csTitle}</Td>
                <Td>{cs.csWriter}</Td>
                <Td>{cs.inserted}</Td>
                <Td>{cs.csHit}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Flex justify="center" mt={8}>
          <ButtonGroup spacing={4}>
            <Button
              bgGradient="linear(to-r, violet.300, indigo.300)"
              color="white"
              _hover={{
                bgGradient: "linear(to-r, violet.400, indigo.400)",
              }}
            >
              이 전
            </Button>
            <Button variant="outline">1</Button>
            <Button variant="outline">2</Button>
            <Button variant="outline">3</Button>
            <Button
              bgGradient="linear(to-r, violet.300, indigo.300)"
              color="white"
              _hover={{
                bgGradient: "linear(to-r, violet.400, indigo.400)",
              }}
            >
              다 음
            </Button>
          </ButtonGroup>
        </Flex>
      </Box>
    </Box>
  );
}
