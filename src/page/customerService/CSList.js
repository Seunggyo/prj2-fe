import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

function PageButton({ variant, pageNumber, children }) {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  function handleClick() {
    params.set("p", pageNumber);
    navigate("/cs/csList?" + params);
  }

  return (
    <Button variant={variant} onClick={handleClick}>
      {children}
    </Button>
  );
}

function Pagination({ pageInfo }) {
  const pageNumbers = [];

  const navigate = useNavigate();

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

    navigate("/cs/csList?" + params);
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
export function CSList() {
  const [csList, setCsList] = useState(null);
  const [pageInfo, setPageInfo] = useState(null);
  const [orderByHit, setOrderByHit] = useState(null);
  const [orderByNum, setOrderByNum] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");

  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const location = useLocation();

  console.log(params);

  useEffect(() => {
    axios.get("/api/cs/list?" + params).then((r) => {
      setCsList(r.data.csList);
      setPageInfo(r.data.pageInfo);
    });
  }, [location]);

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
    navigate("/cs/csList" + id);
  }

  function sortNum() {
    const urlSearchParams = new URLSearchParams(params.toString());
    let nextOrderByNum = null;

    if (orderByNum === false) {
      urlSearchParams.set("n", true);
      nextOrderByNum = true;
    } else if (orderByNum === true) {
      urlSearchParams.delete("n");
      nextOrderByNum = null;
    } else {
      urlSearchParams.set("n", false);
      nextOrderByNum = false;
    }

    setParams(urlSearchParams);
    setOrderByNum(nextOrderByNum);
  }

  function sortCount() {
    const urlSearchParams = new URLSearchParams(params.toString());
    let nextOrderByHit = null;

    if (orderByHit === false) {
      urlSearchParams.set("h", true);
      nextOrderByHit = true;
    } else if (orderByNum === true) {
      urlSearchParams.delete("h");
      nextOrderByHit = null;
    } else {
      urlSearchParams.set("h", false);
      nextOrderByHit = false;
    }

    setParams(urlSearchParams);
    setOrderByHit(nextOrderByHit);
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
              <ButtonGroup>
                <Button variant="solid" colorScheme="blue">
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
                <SearchComponent />
              </Flex>
            </Flex>
            <Table mt={8} variant="simple">
              <Thead>
                <Tr>
                  <Th onClick={sortNum} style={{ cursor: "pointer" }}>
                    번호
                    <FontAwesomeIcon icon={faAngleDown} />
                  </Th>
                  <Th>카테고리</Th>
                  <Th>제목</Th>
                  <Th>작성자</Th>
                  <Th>작성일</Th>
                  <Th onClick={sortCount} style={{ cursor: "pointer" }}>
                    조회수
                    <FontAwesomeIcon icon={faAngleDown} />
                  </Th>
                  <Th>수정 / 삭제</Th>
                </Tr>
              </Thead>
              <Tbody>
                {csList
                  .filter(
                    (item) =>
                      categoryFilter === "" ||
                      item.csCategory === categoryFilter,
                  )
                  .map((cs) => (
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
