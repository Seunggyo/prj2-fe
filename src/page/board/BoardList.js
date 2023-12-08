import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import {
  Badge,
  Box,
  Button,
  Center,
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
import { ChatIcon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleLeft,
  faAngleRight,
  faImages,
} from "@fortawesome/free-solid-svg-icons";

function PageButton({ variant, pageNumber, children }) {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  function handleClick() {
    params.set("p", pageNumber);
    navigate("/board/?" + params);
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
    <Center mt={5} mb={40}>
      <Box>
        {pageInfo.prevPageNumber && (
          <PageButton variant="ghost" pageNumber={pageInfo.prevPageNumber}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </PageButton>
        )}

        {pageNumbers.map((pageNumber) => (
          <PageButton
            key={pageNumber}
            variant={
              pageNumber === pageInfo.currentPageNumber ? "solid" : "ghost"
            }
            pageNumber={pageNumber}
          >
            {pageNumber}
          </PageButton>
        ))}

        {pageInfo.nextPageNumber && (
          <PageButton variant="ghost" pageNumber={pageInfo.nextPageNumber}>
            <FontAwesomeIcon icon={faAngleRight} />
          </PageButton>
        )}
      </Box>
    </Center>
  );
}

function SearchComponent() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  function handleSearch() {
    // /?k=keyword
    const params = new URLSearchParams();
    params.set("k", keyword);

    navigate("/board/?" + params);
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

export function BoardList() {
  const [boardList, setBoardList] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);
  const [orderByHit, setOrderByHit] = useState(null);
  const [orderByNum, setOrderByNum] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");

  const [params, setParams] = useSearchParams();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios.get("/api/board/list?" + params).then((response) => {
      setBoardList(response.data.boardList);
      setPageInfo(response.data.pageInfo);
    });
  }, [location]);

  if (boardList == null || pageInfo == null) {
    return <Spinner />;
  }

  function handleRowClick(id) {
    axios
      .put("/api/board/" + id)
      .then((r) => console.log("good"))
      .catch((error) => {
        console.error("bad");
      });
    navigate("/board/" + id);
  }

  function sortNum() {
    const urlSearchParams = new URLSearchParams(params.toString());
    let nextOrderByNum = null;

    urlSearchParams.delete("h");
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

    urlSearchParams.delete("n");
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
    const params = new URLSearchParams();
    console.log(e.target.value);
    params.set("f", e.target.value);

    navigate("/board/?" + params);
  }

  function handleAllClick() {
    const params = new URLSearchParams();
    params.set("b", "all");

    navigate("/board?" + params);
  }

  function handlePopClick() {
    const params = new URLSearchParams();
    params.set("b", "pop");

    navigate("/board?" + params);
  }

  return (
    <Box>
      <button
        onClick={() => navigate("/board/write")}
        className="relative h-12 w-40 overflow-hidden text-indigo-600 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-indigo-500 before:duration-300 before:ease-out hover:text-white  hover:before:h-40 hover:before:w-40 hover:before:opacity-80 font-dongle font-semibold font text-3xl"
      >
        <span className="relative z-10">글쓰기</span>
      </button>
      <button
        className="relative h-12 w-40 overflow-hidden text-indigo-600 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-indigo-500 before:duration-300 before:ease-out hover:text-white  hover:before:h-40 hover:before:w-40 hover:before:opacity-80 font-dongle font-semibold font text-3xl"
        onClick={handleAllClick}
      >
        <span className="relative z-10">전체 글</span>
      </button>
      <button
        className="relative h-12 w-40 overflow-hidden text-indigo-600 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-indigo-500 before:duration-300 before:ease-out hover:text-white  hover:before:h-40 hover:before:w-40 hover:before:opacity-80 font-dongle font-semibold font text-3xl"
        onClick={handlePopClick}
      >
        <span className="relative z-10">인기 글</span>
      </button>
      <button className="relative h-12 w-40 overflow-hidden text-indigo-600 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-indigo-500 before:duration-300 before:ease-out hover:text-white  hover:before:h-40 hover:before:w-40 hover:before:opacity-80 font-dongle font-semibold font text-3xl">
        <span className="relative z-10">공 지</span>
      </button>
      <Flex>
        <Select
          mr={4}
          placeholder="카테고리 선택"
          defaultvalue={""}
          onChange={handleCategoryChange}
        >
          <option value="">전체</option>
          <option value={"병원"}>병 원</option>
          <option value={"약국"}>약 국</option>
          <option value={"영양제"}>영양제</option>
          <option value={"자유"}>자 유</option>
        </Select>
        <SearchComponent />
      </Flex>
      <Box p={8} bg="orange.100">
        <Table bg="white" borderRadius="xl" boxShadow="lg" p={6}>
          <Thead>
            <Tr>
              <Th onClick={sortNum} style={{ cursor: "pointer" }}>
                번호
                <FontAwesomeIcon icon={faAngleDown} />
              </Th>
              <Th>카테고리</Th>
              <Th>제 목</Th>
              <Th>작성자</Th>
              <Th>작성일</Th>
              <Th onClick={sortCount} style={{ cursor: "pointer" }}>
                조회수
                <FontAwesomeIcon icon={faAngleDown} />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {boardList.map((board) => (
              <Tr
                _hover={{
                  cursor: "pointer",
                }}
                key={board.id}
                onClick={() => handleRowClick(board.id)}
              >
                <Td>
                  {board.id}
                  {board.countLike != 0 && board.countLike}
                </Td>
                <Td>{board.category}</Td>
                <Td>
                  {board.title}
                  {board.countComment > 0 && (
                    <Badge>
                      <ChatIcon />
                      {board.countComment}
                    </Badge>
                  )}
                  {board.countFile > 0 && (
                    <Badge>
                      <FontAwesomeIcon icon={faImages} />
                      {board.countFile}
                    </Badge>
                  )}
                </Td>
                <Td>{board.writer}</Td>
                <Td>{board.ago}</Td>
                <Td>{board.increaseHit}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/*<div class="flex justify-center p-6">*/}
      {/*  <nav class="flex space-x-2" aria-label="Pagination">*/}
      {/*    <a*/}
      {/*      href="#"*/}
      {/*      class="items-center px-6 py-2 text-lg bg-gradient-to-r from-violet-300 to-indigo-300 border border-fuchsia-100 hover:border-violet-100 text-white font-semibold cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10"*/}
      {/*    >*/}
      {/*      이 전*/}
      {/*    </a>*/}
      {/*    <a*/}
      {/*      href="#"*/}
      {/*      class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-fuchsia-100 hover:bg-fuchsia-200 cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10"*/}
      {/*    >*/}
      {/*      1*/}
      {/*    </a>*/}
      {/*    <a*/}
      {/*      href="#"*/}
      {/*      class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-fuchsia-100 hover:bg-fuchsia-200 cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10"*/}
      {/*    >*/}
      {/*      2*/}
      {/*    </a>*/}
      {/*    <a*/}
      {/*      href="#"*/}
      {/*      class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-fuchsia-100 hover:bg-fuchsia-200 cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10"*/}
      {/*    >*/}
      {/*      3*/}
      {/*    </a>*/}
      {/*    <a*/}
      {/*      href="#"*/}
      {/*      class="relative inline-flex items-center px-6 py-2 text-lg bg-gradient-to-r from-violet-300 to-indigo-300 border border-fuchsia-100 hover:border-violet-100 text-white font-semibold cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10"*/}
      {/*    >*/}
      {/*      다 음*/}
      {/*    </a>*/}
      {/*  </nav>*/}
      {/*</div>*/}
      <Pagination pageInfo={pageInfo} />
    </Box>
  );
}
