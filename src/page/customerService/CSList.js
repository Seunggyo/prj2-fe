import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleLeft,
  faAngleRight,
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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  const location = useLocation();

  const { fetchLogin, login, isAuthenticated, authCheck } =
    useContext(LoginContext);
  const toast = useToast();

  const { id } = useParams();

  useEffect(() => {
    axios.get("/api/cs/list?" + params).then((r) => {
      setCsList(r.data.csList);
      setPageInfo(r.data.pageInfo);
    });
  }, [location]);

  if (csList == null || pageInfo == null) {
    return <Spinner />;
  }

  function handleDelete() {
    axios
      .delete("/api/cs/remove/" + id)
      .then((response) => {
        toast({
          description: id + "번 공지글이 삭제되었습니다.",
          status: "success",
        });
        navigate("/home/cs");
      })
      .catch((error) => {
        toast({
          description: "삭제 중 문제가 발생하였습니다.",
          status: "error",
        });
      })
      .finally(() => onClose());
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
              <Tooltip
                isDisabled={isAuthenticated()}
                hasArrow
                label={"로그인이 필요합니다!"}
              >
                <Button
                  disabled={!isAuthenticated()}
                  variant="solid"
                  colorScheme="green"
                  onClick={() => navigate("/home/cs/csWrite")}
                >
                  글 쓰 기
                </Button>
              </Tooltip>

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
                  <Th onClick={sortNum} style={{ cursor: "pointer" }}>
                    번호
                    <FontAwesomeIcon icon={faAngleDown} />
                  </Th>
                  <Th>카테고리</Th>
                  <Th className="w-2/5">제목</Th>
                  <Th>작성자</Th>
                  <Th>작성일</Th>
                  <Th onClick={sortCount} style={{ cursor: "pointer" }}>
                    조회수
                    <FontAwesomeIcon icon={faAngleDown} />
                  </Th>
                  <Th>비 고</Th>
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
                    <Td>{cs.ago}</Td>
                    <Td>{cs.csHit}</Td>

                    {/*TODO: admin 계정으로만으로 바꿔야댐.*/}
                    <Td>
                      <Box>
                        <Button
                          colorScheme="purple"
                          onClick={() => navigate("/home/cs/edit/" + id)}
                          mr={2}
                        >
                          수정
                        </Button>
                        <Button colorScheme="red" onClick={onOpen}>
                          삭제
                        </Button>
                      </Box>
                    </Td>
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
      {/* 공지글 삭제 모달 */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>삭제 확인</ModalHeader>
          <ModalCloseButton />
          <ModalBody>삭제 하시겠습니까?</ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>닫기</Button>
            <Button onClick={handleDelete} colorScheme="red">
              삭제
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
