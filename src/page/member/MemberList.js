import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  Input,
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
import { LoginContext } from "../../component/LoginProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

function MemberList(props) {
  const [memberList, setMemberList] = useState(null);
  const [pageInfo, setPageInfo] = useState(null);

  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { authCheck, fetched } = useContext(LoginContext);
  const location = useLocation();

  useEffect(() => {
    if (fetched && authCheck() !== "admin") {
      navigate("/");
    }

    axios.get("/api/member/list?" + params).then(({ data }) => {
      setMemberList(data.memberList);
      setPageInfo(data.pageInfo);
    });
  }, [location]);

  if (memberList === null) {
    return <Spinner />;
  }

  function handleMemberClick(id) {
    const params = new URLSearchParams();
    params.set("id", id);

    navigate("/Home/member/view?" + params);
  }

  return (
    <Box>
      <MemberSearchComp />

      <Box
        bg="white"
        rounded="lg"
        shadow="md"
        overflowY="auto"
        h="450px"
        w="85vw"
      >
        <Table variant="striped" colorScheme="green" mt="5">
          <Thead>
            <Tr>
              <Th bg="orange.100" fontSize="18" style={{ textAlign: "center" }}>
                아 이 디
              </Th>
              <Th
                bg="orange.100"
                fontSize="18 "
                style={{ textAlign: "center" }}
              >
                패 스 워 드
              </Th>
              <Th bg="orange.100" fontSize="18" style={{ textAlign: "center" }}>
                닉 네 임
              </Th>
              <Th bg="orange.100" fontSize="18" style={{ textAlign: "center" }}>
                생 년 월 일
              </Th>
              <Th bg="orange.100" fontSize="18" style={{ textAlign: "center" }}>
                전 화 번 호
              </Th>
              <Th bg="orange.100" fontSize="18" style={{ textAlign: "center" }}>
                이 메 일
              </Th>
              <Th bg="orange.100" fontSize="18" style={{ textAlign: "center" }}>
                권 한
              </Th>
              <Th
                bg="orange.100"
                fontSize="18"
                style={{ textAlign: "center", padding: "20px" }}
              >
                가 입 일 자
              </Th>
            </Tr>
          </Thead>

          <Box borderBottom="1px solid #E2E8F0" />

          <Tbody>
            {memberList.map((member) => (
              <Tr key={member.id} onClick={() => handleMemberClick(member.id)}>
                <Td>
                  <Flex align="center" px={6}>
                    {member.id}
                  </Flex>
                </Td>
                <Td>
                  <Flex align="center" px={6}>
                    {member.password}
                  </Flex>
                </Td>
                <Td>
                  <Flex align="center" px={6}>
                    {member.nickName}
                  </Flex>
                </Td>
                <Td>
                  <Flex align="center" px={6}>
                    {member.birthday}
                  </Flex>
                </Td>
                <Td>
                  <Flex align="center" px={6}>
                    {member.phone}
                  </Flex>
                </Td>
                <Td>
                  <Flex align="center" px={6}>
                    {member.email}
                  </Flex>
                </Td>
                <Td>
                  <Flex align="center" px={6}>
                    {member.auth}
                  </Flex>
                </Td>
                <Td>
                  <Flex align="center" px={6}>
                    {new Date(member.inserted)
                      .toLocaleDateString()
                      .replace(/\.$/, "")}
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <MemberPagination pageInfo={pageInfo} />
    </Box>
  );
}

function MemberSearchComp() {
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  function handleMemberSearch() {
    const params = new URLSearchParams();
    params.set("k", keyword);

    navigate("/home/member/list?" + params);
  }

  return (
    <Box>
      <FormControl>
        <h1 className="text-4xl font-semibold mb-8">회 원 리 스 트</h1>
        <Flex width="400px" alignItems="center">
          <Input
            variant="filled"
            placeholder="검색어를 입력하세요"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Button ml="2" w="100px" onClick={handleMemberSearch}>
            검색
          </Button>
        </Flex>
      </FormControl>
    </Box>
  );
}

function PageButton({ variant, pageNumber, children }) {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  function handleClick() {
    params.set("p", pageNumber);
    navigate("/home/member/list?" + params);
  }

  return (
    <Button variant={variant} onClick={handleClick}>
      {children}
    </Button>
  );
}

function MemberPagination({ pageInfo }) {
  const pageNumbers = [];
  const navigate = useNavigate();

  for (let i = pageInfo.startPageNumber; i <= pageInfo.endPageNumber; i++) {
    pageNumbers.push(i);
  }

  return (
    <Center>
      <Box>
        {pageInfo.prevPageNumber && (
          <PageButton variant={"ghost"} pageNumber={pageInfo.prevPageNumber}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </PageButton>
        )}
      </Box>

      {pageNumbers.map((pageNumber) => (
        <PageButton
          key={pageNumber}
          variant={pageNumber === pageInfo.currentNumber ? "solid" : "ghost"}
          pageNumber={pageNumber}
        >
          {pageNumber}
        </PageButton>
      ))}

      <Box>
        {pageInfo.nextPageNumber && (
          <PageButton variant={"ghost"} pageNumber={pageInfo.nextPageNumber}>
            <FontAwesomeIcon icon={faAngleRight} />
          </PageButton>
        )}
      </Box>
    </Center>
  );
}

export default MemberList;
