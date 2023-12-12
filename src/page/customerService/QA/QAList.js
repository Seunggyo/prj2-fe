import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
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

function PageButton({ variant, pageNumber, children }) {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  function handleClick() {
    params.set("p", pageNumber);
    navigate("?" + params);
  }

  return (
    <Button variant={variant} onClick={handleClick}>
      {children}
    </Button>
  );
}

function Pagination({ pageInfo }) {
  const pageNumbers = [];

  for (let i = pageInfo.startPageNumber; i <= pageInfo.endPageNumber; i++) {
    pageNumbers.push(i);
  }

  return (
    <Box>
      {pageInfo.prevPageNumber && (
        <button
          pageNumber={pageInfo.prevPageNumber}
          className="items-center px-6 py-2 text-lg bg-gradient-to-r from-violet-300
          to-indigo-300 border border-fuchsia-100 hover:border-violet-100 text-white
          font-semibold cursor-pointer leading-5 rounded-md transition duration-150
          ease-in-out focus:outline-none focus:shadow-outline-blue
          focus:border-blue-300 focus:z-10"
        >
          이 전
        </button>
      )}

      {pageNumbers.map((pageNumber) => (
        <PageButton
          key={pageNumber}
          variant={
            pageNumber === pageInfo.currentPageNumber ? "solid" : "ghost"
          }
          pageNumber={pageNumber}
          className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-fuchsia-100 hover:bg-fuchsia-200 cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10"
        >
          {pageNumber}
        </PageButton>
      ))}

      {pageInfo.nextPageNumber && (
        <button
          pageNumber={pageInfo.nextPageNumber}
          className="relative inline-flex items-center px-6 py-2 text-lg bg-gradient-to-r
            from-violet-300 to-indigo-300 border border-fuchsia-100 hover:border-violet-100
            text-white font-semibold cursor-pointer leading-5 rounded-md transition
            duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue
            focus:border-blue-300 focus:z-10"
        >
          다 음
        </button>
      )}
    </Box>
  );
}

function SearchComponent() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  function handleSearch() {
    // /?k=keyword
    const params = new URLSearchParams();
    params.set("k", keyword);

    navigate("?" + params);
  }
  return (
    <Flex>
      <Input
        w="300px"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button onClick={handleSearch}>검색</Button>
    </Flex>
  );
}

export function QAList() {
  const [qaList, setQaList] = useState(null);
  const [pageInfo, setPageInfo] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("건의사항");

  const navigate = useNavigate();

  const [params, setParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    axios.get("/api/qa/qaList?" + params).then((r) => {
      setQaList(r.data.qaList);
      setPageInfo(r.data.pageInfo);
    });
  }, [location]);

  if (qaList == null) {
    return <Spinner />;
  }

  function handleRowClick(id) {
    axios
      .put("/api/qa/" + id)
      .then((r) => console.log("good"))
      .catch((error) => {
        console.error("bad");
      });
    navigate("/home/cs/qaList/" + id);
  }

  function handleCategoryChange(e) {
    setCategoryFilter(e.target.value);
  }

  return (
    <Box>
      <Flex>
        <Box p={8} bg="orange.100">
          <Box bg="white" borderRadius="xl" boxShadow="lg" p={6}>
            <Flex justify="space-between" align="center">
              <Button
                variant="solid"
                colorScheme="green"
                onClick={() => navigate("/home/cs/qaWrite")}
              >
                글 쓰 기
              </Button>

              <Flex>
                <Select
                  mr={4}
                  placeholder="카테고리 선택"
                  defaultvalue={"건의사항"}
                  onChange={handleCategoryChange}
                >
                  <option value={"건의사항"}>건의사항</option>
                  <option value={"이벤트관련"}>이벤트관련</option>
                  <option value={"물품관련"}>물품관련</option>
                  <option value={"기타"}>기타</option>
                </Select>
                <SearchComponent />
              </Flex>
            </Flex>
            <Table mt={8} variant="simple">
              <Thead className="bg-red-100 min-h-screen">
                <Tr>
                  <Th>번호</Th>
                  <Th>카테고리</Th>
                  <Th>제목</Th>
                  <Th>작성자</Th>
                  <Th>수정 / 삭제</Th>
                </Tr>
              </Thead>
              <Tbody>
                {qaList.map((qa) => (
                  <Tr
                    _hover={{
                      bg: "gray.200",
                      cursor: "pointer",
                    }}
                    key={qa.id}
                    onClick={() => handleRowClick(qa.id)}
                  >
                    <Td>{qa.id}</Td>
                    <Td>{qa.qaCategory}</Td>
                    <Td>{qa.qaTitle}</Td>
                    <Td>{qa.qaWriter}</Td>
                    <Td>{qa.inserted}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>

            <div class="flex justify-center p-6">
              <nav class="flex space- x-2" aria-label="Pagination">
                <Pagination pageInfo={pageInfo} />
              </nav>
            </div>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
