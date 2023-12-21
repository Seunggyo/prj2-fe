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
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { LoginContext } from "../../component/LoginProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

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
    <Box marginTop="20px">
      <Flex>
        <Select
          marginRight="20px"
          w="20%"
          value={list}
          onChange={(e) => setList(e.target.value)}
        >
          <option value="all">전체</option>
          <option value="name">이름</option>
          <option value="address">주소</option>
          <option value="medicalCourse">진료과목</option>
        </Select>
        <Input
          w="60%"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button colorScheme="blue" onClick={handleSearch}>
          검색
        </Button>
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
          {/*<Spacer />*/}
          {/*{(isAuthenticated() || isAdmin()) && (*/}
          {/*<Button onClick={() => navigate("/home/hospital/hospitalAdd")}>*/}
          {/*  병원 추가*/}
          {/*</Button>*/}
          {/*)}*/}
        </Flex>

        <Box>
          <Table>
            <Thead>
              <Tr>
                <Th w="15%">병원이름</Th>
                <Th w="10%">전화번호</Th>
                <Th w="30%">병원주소</Th>
                <Th>운영시간</Th>
                <Th>진료과목</Th>
                <Th>휴무일</Th>
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
                    <Td>{h.name}</Td>
                    <Td>{h.phone}</Td>
                    <Td>{h.address}</Td>
                    <Td>
                      {
                        <Box>
                          {h.openHour}:
                          {h.openMin === 0 || h.openMin === null
                            ? "00"
                            : h.openMin}
                          ~{h.closeHour}:{h.closeMin === 0 ? "00" : h.closeMin}
                          <Box display={h.restHour === 0 ? "none" : "block"}>
                            <Text fontSize="14px">휴게시간</Text>
                            {h.restHour}:{h.restMin === 0 ? "00" : h.restMin}~
                            {h.restCloseHour}:
                            {h.restCloseMin === 0 ? "00" : h.restCloseMin}
                          </Box>
                        </Box>
                      }
                    </Td>
                    <Td>
                      {h.medicalCourse &&
                        h.medicalCourse.map((medicalCourse, index) => (
                          <React.Fragment key={index}>
                            {medicalCourse.medicalCourseCategory}
                            {index < h.medicalCourse.length - 1 && ", "}
                          </React.Fragment>
                        ))}
                    </Td>
                    <Td>
                      {h.holidays &&
                        h.holidays.map((holiday, index) => (
                          <React.Fragment key={index}>
                            {holiday.holiday}
                            {index < h.holidays.length - 1 && ", "}
                          </React.Fragment>
                        ))}
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
      <SearchComponent />
      <Pagination pageInfo={pageInfo} />
    </Box>
  );
}
