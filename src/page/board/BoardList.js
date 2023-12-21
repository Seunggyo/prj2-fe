import React, { useContext, useEffect, useState } from "react";
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
  Tooltip,
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
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { LoginContext } from "../../component/LoginProvider";

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

    navigate("?" + params);
  }
  return (
    <Flex>
      <Input
        w="200px"
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

  const { fetchLogin, login, isAuthenticated, authCheck } =
    useContext(LoginContext);

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
    axios.put("/api/board/" + id);

    navigate("/home/board/" + id);
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
    params.set("f", e.target.value);

    navigate("?" + params);
  }

  function handleAllClick() {
    const params = new URLSearchParams();
    params.set("b", "all");

    navigate("?" + params);
  }

  function handlePopClick() {
    const params = new URLSearchParams();
    params.set("b", "pop");

    navigate("?" + params);
  }

  return (
    <Box>
      <h1 className="text-4xl font-semibold mb-8">자유 게시판</h1>
      <Box className="flex justify-between">
        <Box>
          <Tooltip
            isDisabled={isAuthenticated()}
            hasArrow
            label={"로그인이 필요합니다!"}
          >
            <button
              disabled={!isAuthenticated()}
              onClick={() => navigate("/home/board/write")}
              className="relative h-12 w-40 overflow-hidden text-indigo-600 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-indigo-500 before:duration-300 before:ease-out hover:text-white  hover:before:h-40 hover:before:w-40 hover:before:opacity-80 font-dongle font-semibold text-3xl"
            >
              <span className="relative z-10">글쓰기</span>
            </button>
          </Tooltip>
          <button
            className="relative h-12 w-40 overflow-hidden text-indigo-600 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-indigo-500 before:duration-300 before:ease-out hover:text-white  hover:before:h-40 hover:before:w-40 hover:before:opacity-80 font-dongle font-semibold text-3xl"
            onClick={handleAllClick}
          >
            <span className="relative z-10">전체 글</span>
          </button>
          <button
            className="relative h-12 w-40 overflow-hidden text-indigo-600 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-indigo-500 before:duration-300 before:ease-out hover:text-white  hover:before:h-40 hover:before:w-40 hover:before:opacity-80 font-dongle font-semibold text-3xl"
            onClick={handlePopClick}
          >
            <span className="relative z-10">인기 글</span>
          </button>
          <button
            className="relative h-12 w-40 overflow-hidden text-indigo-600 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-indigo-500 before:duration-300 before:ease-out hover:text-white  hover:before:h-40 hover:before:w-40 hover:before:opacity-80 font-dongle font-semibold font text-3xl"
            onClick={() => navigate("/home/cs")}
          >
            <span className="relative z-10">공 지</span>
          </button>
        </Box>

        <Box className="flex">
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
        </Box>
      </Box>

      <Box p={6} bg="orange.100" borderRadius="xl">
        <Table bg="white" borderRadius="xl" boxShadow="lg" p={6}>
          <Thead>
            <Tr>
              <Th
                onClick={sortNum}
                sx={{
                  fontSize: "1.2rem",
                  lineHeight: "1.5rem",
                  borderColor: "white",
                  cursor: "pointer",
                  fontFamily: "gowun",
                  width: "110px",
                }}
                className="bg-indigo-50 border-r"
              >
                번호
                <FontAwesomeIcon icon={faAngleDown} />
              </Th>
              <Th
                sx={{
                  fontSize: "1.2rem",
                  lineHeight: "1.5rem",
                  borderColor: "white",
                  fontFamily: "gowun",
                  width: "150px",
                }}
                className="bg-indigo-50 border-r"
              >
                카테고리
              </Th>
              <Th
                sx={{
                  fontSize: "1.2rem",
                  lineHeight: "1.5rem",
                  borderColor: "white",
                  fontFamily: "gowun",
                }}
                className="bg-indigo-50 w-1/3 border-r"
              >
                제 목
              </Th>
              <Th
                sx={{
                  fontSize: "1.2rem",
                  lineHeight: "1.5rem",
                  borderColor: "white",
                  fontFamily: "gowun",
                  width: "110px",
                }}
                className="bg-indigo-50 border-r"
              >
                작성자
              </Th>
              <Th
                sx={{
                  fontSize: "1.2rem",
                  lineHeight: "1.5rem",
                  borderColor: "white",
                  fontFamily: "gowun",
                  width: "110px",
                }}
                className="bg-indigo-50 border-r"
              >
                작성일
              </Th>
              <Th
                onClick={sortCount}
                sx={{
                  fontSize: "1.2rem",
                  lineHeight: "1.5rem",
                  borderColor: "white",
                  cursor: "pointer",
                  fontFamily: "gowun",
                  width: "110px",
                }}
                className="bg-indigo-50 border-r"
              >
                조회
                <FontAwesomeIcon icon={faAngleDown} />
              </Th>
              <Th sx={{ width: "90px" }} className="bg-indigo-50"></Th>
            </Tr>
          </Thead>
          <Tbody>
            {boardList.map((board) => (
              <Tr
                _hover={{
                  bg: "gray.200",
                  cursor: "pointer",
                }}
                key={board.id}
                onClick={() => handleRowClick(board.id)}
              >
                <Td>{board.id}</Td>
                <Td>{board.category}</Td>
                <Td className="h-16">
                  {board.title}
                  {board.countComment > 0 && (
                    <Badge className="flex items-center h-full ml-1">
                      <ChatIcon className="mr-1 text-lg" />
                      <span className="text-lg">{board.countComment}</span>
                    </Badge>
                  )}
                  {board.countFile > 0 && (
                    <Badge className="flex items-center h-full ml-1">
                      <FontAwesomeIcon
                        icon={faImages}
                        className="mr-1 text-lg"
                      />
                      <span className="mr-1 text-lg">{board.countFile}</span>
                    </Badge>
                  )}
                </Td>
                <Td>{board.nickName}</Td>
                <Td>{board.ago}</Td>
                <Td>{board.increaseHit}</Td>
                <Td>
                  <FontAwesomeIcon icon={faThumbsUp} className="mr-2" />
                  {board.countLike != 0 && board.countLike}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Pagination pageInfo={pageInfo} />
    </Box>
  );
}
