import React, { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Heading,
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
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChatIcon } from "@chakra-ui/icons";

export function DsList() {
  const [dsList, setDsList] = useState([]);
  const [level, setLevel] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/ds/list").then((r) => setDsList(r.data));
  }, []);
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
      <Button onClick={handleMoveWrite}>추가</Button>

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
