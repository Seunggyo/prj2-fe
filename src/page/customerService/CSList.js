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

  console.log(params);

  useEffect(() => {
    axios.get("/api/cs/list?" + params).then((r) => setCsList(r.data));
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

        <div class="flex justify-center p-6">
          <nav class="flex space-x-2" aria-label="Pagination">
            <button class="items-center px-6 py-2 text-lg bg-gradient-to-r from-violet-300 to-indigo-300 border border-fuchsia-100 hover:border-violet-100 text-white font-semibold cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10">
              이 전
            </button>
            <button
              onClick={() => navigate("/cs/?p=1")}
              class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-fuchsia-100 hover:bg-fuchsia-200 cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10"
            >
              1
            </button>
            <button
              onClick={() => navigate("/cs/?p=2")}
              class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-fuchsia-100 hover:bg-fuchsia-200 cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10"
            >
              2
            </button>
            <button
              onClick={() => navigate("/cs/?p=3")}
              class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-fuchsia-100 hover:bg-fuchsia-200 cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10"
            >
              3
            </button>
            <button
              onClick={() => navigate("/cs/?p=4")}
              className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-fuchsia-100 hover:bg-fuchsia-200 cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10"
            >
              4
            </button>
            <button
              onClick={() => navigate("/cs/?p=5")}
              className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-fuchsia-100 hover:bg-fuchsia-200 cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10"
            >
              5
            </button>
            <button
              onClick={() => navigate("/cs/?p=6")}
              className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-fuchsia-100 hover:bg-fuchsia-200 cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10"
            >
              6
            </button>
            <button class="relative inline-flex items-center px-6 py-2 text-lg bg-gradient-to-r from-violet-300 to-indigo-300 border border-fuchsia-100 hover:border-violet-100 text-white font-semibold cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10">
              다 음
            </button>
          </nav>
        </div>
      </Box>
    </Box>
  );
}
