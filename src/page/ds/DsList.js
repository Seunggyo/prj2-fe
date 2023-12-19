import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
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
import { faHeart } from "@fortawesome/free-regular-svg-icons";
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
  const [category, setCategory] = useState("all");
  const navigate = useNavigate();

  function handleSearch() {
    const params = new URLSearchParams();

    params.set("k", keyword);
    params.set("c", category);

    navigate("?" + params);
  }

  return (
    <Box>
      <Flex>
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">전체</option>
          <option value="name">이름</option>
          <option value="address">주소</option>
        </Select>
        <Input value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        <Button onClick={handleSearch}>검색</Button>
      </Flex>
    </Box>
  );
}

export function DsList() {
  const [dsList, setDsList] = useState([]);
  const [pageInfo, setPageInfo] = useState("");
  const [level, setLevel] = useState();

  const [params] = useSearchParams();

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    axios.get("/api/ds/list?" + params).then((r) => {
      setDsList(r.data.dsList);
      setPageInfo(r.data.pageInfo);
    });
  }, [location]);

  if (dsList === null) {
    return <Spinner />;
  }

  function handleMoveWrite() {
    navigate("/home/ds/write");
  }

  return (
    <Box>
      <Box>
        <Flex>
          <Heading>약국 리스트</Heading>
          {/* TODO : 리스트에서 추가하는게 아니라 비지니스 유저 정보창에서 추가 하는 식으로 가는게 좋을뜻*/}
          <Button onClick={handleMoveWrite}>추가</Button>
        </Flex>
        <Box>
          <Table>
            <Thead>
              <Tr>
                <Th>약국이름</Th>
                <Th>
                  <FontAwesomeIcon icon={faHeart} color="red" />
                </Th>
                <Th>전화번호</Th>
                <Th>약국주소</Th>
                <Th>운영시간</Th>
                <Th>휴무일</Th>
              </Tr>
            </Thead>
            <Tbody>
              {dsList.map((ds) => (
                <Tr
                  key={ds.id}
                  _hover={{ cursor: "pointer" }}
                  onClick={() => navigate("/home/ds/edit/" + ds.id)}
                >
                  <Td>{ds.name}</Td>
                  <Td>{ds.likeCount}</Td>
                  <Td>{ds.phone}</Td>
                  <Td>{ds.oldAddress}</Td>
                  <Td>
                    {
                      <Box>
                        {ds.openHour}:{ds.openMin === 0 ? "00" : ds.openMin}~
                        {ds.closeHour}:{ds.closeMin === 0 ? "00" : ds.closeMin}
                        <Box display={ds.restHour === 0 ? "none" : "block"}>
                          ※휴게시간: {ds.restHour}:
                          {ds.restMin === 0 ? "00" : ds.restMin}~
                          {ds.restCloseHour}:
                          {ds.restCloseMin === 0 ? "00" : ds.restCloseMin}
                        </Box>
                      </Box>
                    }
                  </Td>
                  <Td>
                    {ds.holidays &&
                      ds.holidays.map((holiday, index) => (
                        <React.Fragment key={index}>
                          {holiday.holiday}
                          {index < ds.holidays.length - 1 && ", "}
                        </React.Fragment>
                      ))}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
      {/*검색 창*/}
      <SearchComponent />
      {/*페이지 번호칸*/}
      <Box>
        <Pagination pageInfo={pageInfo} />
      </Box>
    </Box>
  );
}
