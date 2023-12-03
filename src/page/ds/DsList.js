import React, { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Heading,
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
import {
  Map,
  MapMarker,
  useKakaoLoader,
  ZoomControl,
} from "react-kakao-maps-sdk";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChatIcon } from "@chakra-ui/icons";
import * as PropTypes from "prop-types";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

function PageButton({ variant, pageNumber, children }) {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  function handleClick() {
    params.set("p", pageNumber);

    navigate("/ds/list?" + params);
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
  const navigate = useNavigate();
  function handleSearch() {
    const params = new URLSearchParams();
    params.set("k", keyword);
    // params.set("c", category);
    navigate("/ds/list?" + params);
  }

  return (
    <Box>
      <Input value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      <Button onClick={handleSearch}>검색</Button>
    </Box>
  );
}

export function DsList() {
  const [dsList, setDsList] = useState([]);
  const [pageInfo, setPageInfo] = useState("");
  const [level, setLevel] = useState();

  const [params] = useSearchParams();

  const navigate = useNavigate();

  // react 사용서에서 useEffect의 dependency가 변경될 시 값이 유지될려면 location 사용 권장
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
  // const [loading, error] = useKakaoLoader({
  //   appkey: process.env.REACT_APP_KAKAO_KEY,
  // });

  function handleMoveWrite() {
    navigate("/ds/write");
  }

  return (
    <Box>
      <Box>
        <Heading>약국 리스트</Heading>
        <Button onClick={handleMoveWrite}>추가</Button>
        <Box>
          <Table>
            <Thead>
              <Tr>
                <Th>약국이름</Th>
                <Th>
                  <FontAwesomeIcon icon={faHeart} color="red" />
                </Th>
                <Th>댓글 수</Th>
                <Th>전화번호</Th>
                <Th>약국주소</Th>
              </Tr>
            </Thead>
            <Tbody>
              {dsList.map((ds) => (
                <Tr
                  key={ds.id}
                  _hover={{ cursor: "pointer" }}
                  onClick={() => navigate("/ds/view/" + ds.id)}
                >
                  <Td>{ds.name}</Td>
                  <Td>{ds.likeCount}</Td>
                  <Td>{ds.commentCount > 0 && ds.commentCount}</Td>
                  <Td>{ds.phone}</Td>
                  <Td>{ds.address}</Td>
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

      {/*<Box>*/}
      {/*  <Pagination pageInfo={pageInfo} />*/}
      {/*</Box>*/}

      {/*<Box>*/}
      {/*  {list &&*/}
      {/*    list.map((m) => (*/}
      {/*      <Map*/}
      {/*        key={m.id}*/}
      {/*        center={{ lat: 36.503232, lng: 127.269971 }}*/}
      {/*        style={{ width: "100%", height: "900px" }}*/}
      {/*        level={5}*/}
      {/*        onZoomChanged={(m) => setLevel(m.getLevel())}*/}
      {/*        onDragEnd={(m) =>*/}
      {/*          setPosition({*/}
      {/*            lat: m.getCenter().getLat(),*/}
      {/*            lng: m.getCenter().getLng(),*/}
      {/*          })*/}
      {/*        }*/}
      {/*      >*/}
      {/*        <MapMarker position={{ lat: m.lat, lng: m.lng }} />*/}
      {/*        <ZoomControl />*/}
      {/*      </Map>*/}
      {/*    ))}*/}
      {/*</Box>*/}
    </Box>
  );
}
