import { useNavigate, useSearchParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Map,
  MapMarker,
  useKakaoLoader,
  ZoomControl,
} from "react-kakao-maps-sdk";
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
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

export function HsList() {
  const { isAuthenticated, isAdmin } = useContext(LoginContext);
  const navigate = useNavigate();
  const toast = useToast();
  const [params] = useSearchParams();

  const [list, setList] = useState([]);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [position, setPosition] = useState();

  const [level, setLevel] = useState();

  useEffect(() => {
    axios.get("/api/hospital/list?" + params).then((r) => setList(r.data.list));
  }, []);
  // const [loading, error] = useKakaoLoader({
  //   appkey: process.env.REACT_APP_KAKAO_KEY,
  // });

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
            <Button onClick={() => navigate("/hospital/hospitalAdd")}>
              병원 추가
            </Button>
          )}
        </Flex>

        <Box>
          <Table>
            <Thead>
              <Tr>
                <Th>병원이름</Th>
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
                    onClick={() => navigate("/hospital/hospitalEdit/" + h.id)}
                  >
                    <Td>
                      {h.name}
                      {h.countLike > 0 && <Badge>{h.countLike}</Badge>}
                    </Td>
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

      {/*<Box>*/}
      {/*  <Map*/}
      {/*    center={{ lat: 36.503232, lng: 127.269971 }}*/}
      {/*    style={{ width: "100%", height: "900px" }}*/}
      {/*    level={5}*/}
      {/*  >*/}
      {/*    {list.map((m) => (*/}
      {/*      <MapMarker position={{ lat: m.lat, lng: m.lng }}></MapMarker>*/}
      {/*    ))}*/}
      {/*    <ZoomControl position={"TOPRIGHT"} />*/}
      {/*  </Map>*/}
      {/*</Box>*/}
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
