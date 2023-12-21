import React, { useContext, useEffect, useState } from "react";
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
import axios from "axios";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleLeft,
  faAngleRight,
  faImages,
} from "@fortawesome/free-solid-svg-icons";
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

  const navigate = useNavigate();
  const location = useLocation();

  const [params, setParams] = useSearchParams();

  const { fetchLogin, login, isAuthenticated, authCheck } =
    useContext(LoginContext);

  useEffect(() => {
    axios.get("/api/cs/list?" + params).then((r) => {
      setCsList(r.data.csList);
      setPageInfo(r.data.pageInfo);
    });
  }, [location]);

  if (csList == null || pageInfo == null) {
    return <Spinner />;
  }

  function handleRowClick(id) {
    axios
      .put("/api/cs/" + id)
      .then((r) => console.log("good"))
      .catch((error) => {
        console.error("bad");
      });
    navigate("/home/cs/" + id);
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

  return (
    <Box>
      <h1 className="text-4xl font-semibold mb-8">공 지 사 항</h1>
      <Box>
        <Box p={8} bg="orange.100">
          <Box bg="white" borderRadius="xl" boxShadow="lg" p={6}>
            <Flex justify="space-between" align="center">
              {isAuthenticated() && authCheck() === "admin" && (
                <button
                  onClick={() => navigate("/home/cs/csWrite")}
                  className="relative h-12 w-40 overflow-hidden text-indigo-600 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-indigo-500 before:duration-300 before:ease-out hover:text-white  hover:before:h-40 hover:before:w-40 hover:before:opacity-80 font-dongle font-semibold font text-4xl"
                >
                  <span className="relative z-10">글쓰기</span>
                </button>
              )}
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
              <Thead className="bg-indigo-50 min-h-screen">
                <Tr>
                  <Th
                    sx={{
                      fontSize: "1.2rem",
                      lineHeight: "1.5rem",
                      borderColor: "white",
                      cursor: "pointer",
                      fontFamily: "gowun",
                      width: "80px",
                    }}
                    className="bg-red-50 border-r"
                    onClick={sortNum}
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
                      width: "110px",
                    }}
                    className="bg-red-50 border-r"
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
                    className="bg-red-50 border-r w-2/4"
                  >
                    제목
                  </Th>
                  <Th
                    sx={{
                      fontSize: "1.2rem",
                      lineHeight: "1.5rem",
                      borderColor: "white",
                      fontFamily: "gowun",
                      width: "80px",
                    }}
                    className="bg-red-50 border-r"
                  >
                    작성자
                  </Th>
                  <Th
                    sx={{
                      fontSize: "1.2rem",
                      lineHeight: "1.5rem",
                      borderColor: "white",
                      fontFamily: "gowun",
                      width: "80px",
                    }}
                    className="bg-red-50 border-r"
                  >
                    작성일
                  </Th>
                  <Th
                    sx={{
                      fontSize: "1.2rem",
                      lineHeight: "1.5rem",
                      borderColor: "white",
                      cursor: "pointer",
                      fontFamily: "gowun",
                      width: "80px",
                    }}
                    className="bg-red-50 border-r"
                    onClick={sortCount}
                  >
                    조회
                    <FontAwesomeIcon icon={faAngleDown} />
                  </Th>
                  <Th
                    sx={{
                      fontSize: "1.2rem",
                      lineHeight: "1.5rem",
                      fontFamily: "gowun",
                      width: "60px",
                    }}
                    className="bg-red-50"
                  >
                    비 고
                  </Th>
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
                    <Td>
                      {cs.csTitle}
                      {cs.countFile > 0 && (
                        <Badge className="flex items-center h-full ml-1">
                          <FontAwesomeIcon
                            icon={faImages}
                            className="mr-1 text-lg"
                          />
                        </Badge>
                      )}
                    </Td>
                    <Td>{cs.nickName}</Td>
                    <Td>{cs.ago}</Td>
                    <Td>{cs.increaseHit}</Td>
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
      </Box>
    </Box>
  );
}
