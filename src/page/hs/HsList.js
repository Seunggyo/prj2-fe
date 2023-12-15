import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spacer,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { LoginContext } from "../../component/LoginProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

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
  const navigate = useNavigate();

  for (let i = pageInfo.startPageNumber; i <= pageInfo.endPageNumber; i++) {
    pageNumbers.push(i);
  }

  return (
    <Box>
      {/* 뒤로가기*/}
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

      {/*앞으로 가기*/}
      {pageInfo.nextPageNumber && (
        <PageButton variant="ghost" pageNumber={pageInfo.nextPageNumber}>
          <FontAwesomeIcon icon={faAngleRight} />
        </PageButton>
      )}
    </Box>
  );
}

function SearchComponent() {
  const [keyword, setKeyword] = useState("");
  const [list, setList] = useState("all");
  const navigate = useNavigate();

  function handleSearch() {
    const params = new URLSearchParams();

    params.set("k", keyword);
    params.set("l", list);

    navigate("?" + params);
  }

  return (
    <Box>
      <Flex>
        <Select value={list} onChange={(e) => setList(e.target.value)}>
          <option value="all">전체</option>
          <option value="name">이름</option>
          <option value="address">주소</option>
          <option value="medicalCourse">진료과목</option>
        </Select>
        <Input value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        <Button onClick={handleSearch}>검색</Button>
      </Flex>
    </Box>
  );
}

export function HsList() {
  const { isAuthenticated, isAdmin } = useContext(LoginContext);

  const navigate = useNavigate();
  const toast = useToast();
  const [params] = useSearchParams();
  const [pageInfo, setPageInfo] = useState("");

  const [list, setList] = useState([]);
  const location = useLocation();
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    axios.get("/api/hospital/listAdmin?" + params).then((r) => {
      setList(r.data.list);
      setPageInfo(r.data.pageInfo);
    });
  }, [location]);

  function handleDeleteClick() {
    if (!position) {
      return;
    }
    axios
      .delete(`/api/hospital/delete/${position}`)
      .then(() => {
        toast({
          description: "삭제가 완료되었습니다.",
          status: "success",
        });
      })
      .catch(() => {
        toast({
          description: "실패하였습니다.",
          status: "error",
        });
      })
      .finally(() => {
        setPosition(null);
        onClose();
      });
  }

  return (
    <Box>
      <Box>
        <Flex align="center">
          <Heading>병원 리스트</Heading>
          <Spacer />
          {(isAuthenticated() || isAdmin()) && (
            <Button onClick={() => navigate("/home/hospital/hospitalAdd")}>
              병원 추가
            </Button>
          )}
        </Flex>

        <Box>
          <Table>
            <Thead>
              <Tr>
                <Th>병원이름</Th>
                <Th>병원주소</Th>
                <Th>진료과목</Th>
                <Th>전화번호</Th>
                <Th>임시 삭제</Th>
              </Tr>
            </Thead>
            <Tbody>
              {list &&
                list.map((h) => (
                  <Tr
                    key={h.id}
                    _hover={{
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      navigate("/home/hospital/hospitalEdit/" + h.id)
                    }
                  >
                    <Td>
                      {h.name}
                      {h.countLike > 0 && <Badge>{h.countLike}</Badge>}
                    </Td>
                    <Td>{h.oldAddress}</Td>
                    <Td>{h.medicalCourse}</Td>
                    <Td>{h.phone}</Td>

                    <Td>
                      <Button
                        colorScheme="red"
                        id={h.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpen();
                          setPosition(h.id);
                        }}
                      >
                        삭제
                      </Button>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
      <SearchComponent />
      <Pagination pageInfo={pageInfo} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>삭제</ModalHeader>
          <ModalCloseButton />

          <ModalBody>삭제 하시겠습니까?</ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>닫기</Button>
            <Button onClick={handleDeleteClick} colorScheme="red">
              삭제
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
