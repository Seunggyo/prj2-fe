import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { LoginContext } from "../../component/LoginProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

export function MemberJoinList() {
  const [memberList, setMemberList] = useState(null);
  const [pageInfo, setPageInfo] = useState(null);
  const [params] = useSearchParams();
  const location = useLocation();

  const toast = useToast();
  const navigate = useNavigate();
  const { authCheck, fetched } = useContext(LoginContext);

  useEffect(() => {
    console.log(authCheck());
    if (fetched && authCheck() !== "admin") {
      navigate("/");
    }

    if (fetched) {
      updateList();
    }
  }, [fetched, location]);

  function updateList() {
    axios.get("/api/member/joinList?" + params).then(({ data }) => {
      setMemberList(data.memberList);
      setPageInfo(data.pageInfo);
    });
  }

  if (memberList === null) {
    return <Spinner />;
  }
  function handleAcceptClick(member) {
    axios
      .post("/api/member/accept", {
        id: member.id,
        password: member.password,
        nickName: member.nickName,
        birthday: "",
        phone: member.phone,
        email: member.email,
        address: member.address,
        auth: member.auth,
        fileName: member.fileName,
        profile: member.profile,
      })
      .then(() => {
        toast({
          position: "top",
          description: "가입이 승인되었습니다.",
          status: "success",
        });
      })
      .catch(() => {
        toast({
          position: "top",
          description: "오류가 발생했습니다.",
          status: "error",
        });
      })
      .finally(() => updateList());
  }

  function handleCancelClick(member) {
    axios
      .post("/api/member/cancel", {
        id: member.id,
      })
      .then(() => {
        toast({
          position: "top",
          description: "가입이 거절되었습니다.",
          status: "success",
        });
      })
      .catch(() => {
        toast({
          position: "top",
          description: "오류가 발생했습니다.",
          status: "error",
        });
      })
      .finally(() => updateList());
  }

  return (
    <Box>
      <h1>가입 대기 목록</h1>
      <MemberSearchComp />
      {/*<MemberSearchComp />*/}
      <Table>
        <Thead>
          <Tr>
            <Th>id</Th>
            <Th>password</Th>
            <Th>nickName</Th>
            <Th>phone</Th>
            <Th>email</Th>
            <Th>auth</Th>
            <Th>inserted</Th>
          </Tr>
        </Thead>
        <Tbody>
          {memberList.map((member) => (
            <Tr key={member.id}>
              <Td>{member.id}</Td>
              <Td>{member.password}</Td>
              <Td>{member.nickName}</Td>
              <Td>{member.phone}</Td>
              <Td>{member.email}</Td>
              <Td>{member.auth}</Td>
              <Td>{member.inserted}</Td>
              <Td>
                <Button onClick={() => handleAcceptClick(member)}>수락</Button>
              </Td>
              <Td>
                <Button onClick={() => handleCancelClick(member)}>거절</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

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

    navigate("?" + params);
  }

  return (
    <Box>
      <FormControl>
        <FormLabel>멤버 조회</FormLabel>
        <Flex width={"300px"}>
          <Input onChange={(e) => setKeyword(e.target.value)} />
          <Button onClick={handleMemberSearch}>검색</Button>
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
    navigate("?" + params);
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
