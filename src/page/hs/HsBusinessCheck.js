import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export function HsBusinessCheck() {
  const [list, updateList] = useState([]);
  const [checkList, setCheckList] = useState([]);
  const toast = useToast();
  const [position, setPosition] = useState();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { id } = useParams();

  function handleDeleteClick() {
    if (!position) {
      return;
    }
    axios
      .delete(`/api/hospital/reservation/remove/${position}`)
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

  function handleOkClick(e, id) {
    e.stopPropagation();
    if (!id) {
      return;
    }
    axios
      .put(`/api/hospital/reservation/ok/${id}`)
      .then(() => {
        toast({
          description: "예약 확인 되었습니다.",
          status: "success",
        });
      })
      .catch(() => {
        toast({
          description: "예약 확인을 실패하였습니다.",
          status: "error",
        });
      })
      .finally(() => {
        setPosition(null);
      });
  }

  useEffect(() => {
    axios
      .get("/api/hospital/reservation/business/" + id)
      .then((e) => updateList(e.data));
    axios
      .get("/api/hospital/reservation/business/check/" + id)
      .then((e) => setCheckList(e.data));
  }, []);

  return (
    <Box>
      <Heading>예약내역</Heading>
      {list && list.length !== 0 ? (
        list.map((l) => (
          <Card key={l.id}>
            <CardHeader>예약 정보</CardHeader>
            <CardBody>
              <Box>예약자 명 : {l.nickName}</Box>
              <Box>
                예약 날짜 : {new Date(l.reservationDate).toLocaleDateString()}
              </Box>
              <Box>
                예약 시간 :{" "}
                {l.reservationHour < 13
                  ? "오전 " + l.reservationHour
                  : "오후 " + (l.reservationHour - 12)}{" "}
                :{" "}
                {l.reservationMin === 0
                  ? "0" + l.reservationMin
                  : l.reservationMin}
              </Box>
              <Box>특이사항 : {l.comment}</Box>
            </CardBody>
            <CardFooter>
              <Button
                id={l.id}
                colorScheme={"green"}
                onClick={(e) => handleOkClick(e, l.id)}
              >
                예약 확인
              </Button>
              <Button
                id={l.id}
                colorScheme={"red"}
                onClick={(e) => {
                  e.stopPropagation();
                  onOpen();
                  setPosition(l.id);
                }}
              >
                예약 취소
              </Button>
            </CardFooter>
          </Card>
        ))
      ) : (
        <Box>
          <Heading>등록된 예약이 없습니다.</Heading>
        </Box>
      )}
      <Heading>예약 확인 내역</Heading>
      {checkList && checkList.length !== 0 ? (
        checkList.map((c) => (
          <Card key={c.id}>
            <CardHeader>예약 확인 정보</CardHeader>
            <CardBody>
              <Box>예약자 명 : {c.nickName}</Box>
              <Box>
                예약 날짜 : {new Date(c.reservationDate).toLocaleDateString()}
              </Box>
              <Box>
                예약 시간 :{" "}
                {c.reservationHour < 13
                  ? "오전 " + c.reservationHour
                  : "오후 " + (c.reservationHour - 12)}{" "}
                :{" "}
                {c.reservationMin === 0
                  ? "0" + c.reservationMin
                  : c.reservationMin}
              </Box>
              <Box>특이사항 : {c.comment}</Box>
            </CardBody>
            <CardFooter>
              <Button
                id={c.id}
                colorScheme={"red"}
                onClick={(e) => {
                  e.stopPropagation();
                  onOpen();
                  setPosition(c.id);
                }}
              >
                예약 취소
              </Button>
            </CardFooter>
          </Card>
        ))
      ) : (
        <Box>
          <Heading>예약 확인된 내용이 없습니다.</Heading>
        </Box>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>예약취소</ModalHeader>
          <ModalCloseButton />

          <ModalBody>예약취소 하시겠습니까?</ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>닫기</Button>
            <Button onClick={handleDeleteClick} colorScheme="red">
              예약취소
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
