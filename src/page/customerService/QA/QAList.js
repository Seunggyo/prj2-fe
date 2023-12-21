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
  faAngleLeft,
  faAngleRight,
  faImages,
} from "@fortawesome/free-solid-svg-icons";
import { LoginContext } from "../../../component/LoginProvider";

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

function SearchComponent({ login }) {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  function handleSearch() {
    // /?k=keyword
    const params = new URLSearchParams();
    params.set("k", keyword);

    params.set("id", login.id);
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

  const navigate = useNavigate();

  const [params, setParams] = useSearchParams();
  const location = useLocation();

  const { login, isAuthenticated, authCheck } = useContext(LoginContext);

  useEffect(() => {
    if (
      authCheck() === "user" ||
      authCheck() === "ds" ||
      authCheck() === "hs"
    ) {
      axios.get("/api/qa/qaList?" + params).then((r) => {
        setQaList(r.data.qaList);
        setPageInfo(r.data.pageInfo);
      });
    }
    if (authCheck() === "admin") {
      axios.get("/api/qa/adminQaList?" + params).then((r) => {
        setQaList(r.data.qaList);
        setPageInfo(r.data.pageInfo);
      });
    }
  }, [location]);

  if (qaList == null || pageInfo == null) {
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
    const params = new URLSearchParams();
    params.set("f", e.target.value);

    params.set("id", login.id);
    navigate("?" + params);
  }

  return (
    <div>
      <h1 className="text-4xl font-semibold mb-8">1:1 응답</h1>
      <Box>
        <Flex>
          <Box p={8} bg="orange.100" className="w-full h-full">
            <Box bg="white" borderRadius="xl" boxShadow="lg" p={6}>
              <Flex justify="space-between" align="center">
                <Tooltip
                  isDisabled={isAuthenticated()}
                  hasArrow
                  label={"로그인이 필요합니다!"}
                >
                  <button
                    disabled={!isAuthenticated()}
                    onClick={() => navigate("/home/cs/qaWrite")}
                    className="relative h-12 w-40 overflow-hidden text-indigo-600 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-indigo-500 before:duration-300 before:ease-out hover:text-white  hover:before:h-40 hover:before:w-40 hover:before:opacity-80 font-dongle font-semibold font text-4xl"
                  >
                    <span className="relative z-10">글쓰기</span>
                  </button>
                </Tooltip>

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
                  <SearchComponent login={login} />
                </Flex>
              </Flex>

              <Table mt={8} variant="simple">
                <Thead>
                  <Tr>
                    <Th
                      sx={{
                        fontSize: "1.2rem",
                        lineHeight: "1.5rem",
                        borderColor: "white",
                        fontFamily: "gowun",
                      }}
                      className="bg-red-50 border-r"
                    >
                      번 호
                    </Th>
                    <Th
                      sx={{
                        fontSize: "1.2rem",
                        lineHeight: "1.5rem",
                        borderColor: "white",
                        fontFamily: "gowun",
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
                      제 목
                    </Th>
                    <Th
                      sx={{
                        fontSize: "1.2rem",
                        lineHeight: "1.5rem",
                        borderColor: "white",
                        fontFamily: "gowun",
                      }}
                      className="bg-red-50 border-r"
                    >
                      작성자
                    </Th>
                    <Th
                      sx={{
                        fontSize: "1.2rem",
                        lineHeight: "1.5rem",
                        fontFamily: "gowun",
                      }}
                      className="bg-red-50"
                    >
                      작성일
                    </Th>
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
                      <Td>
                        {qa.qaTitle}
                        {qa.countComment > 0 && (
                          <Badge className="flex items-center h-full ml-3">
                            <ChatIcon className="mr-1 text-lg" />
                            <span className="text-lg">{qa.countComment}</span>
                          </Badge>
                        )}
                        {qa.countFile > 0 && (
                          <Badge className="flex items-center h-full ml-1">
                            <FontAwesomeIcon
                              icon={faImages}
                              className="mr-1 text-lg"
                            />
                            <span className="mr-1 text-lg">{qa.countFile}</span>
                          </Badge>
                        )}
                      </Td>
                      <Td>{qa.nickName}</Td>
                      <Td>{qa.ago}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Pagination pageInfo={pageInfo} />
            </Box>
          </Box>
        </Flex>
      </Box>
    </div>
  );
}
