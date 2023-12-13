import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
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
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export function DayCheck() {
  const navigate = useNavigate();
  const [dateValue, setDateValue] = useState([]);
  const [position, setPosition] = useState();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const toast = useToast();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");
  const [list, setList] = useState([]);
  const [dateButton, setDateButton] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/hospital/reservation/month?id=${id}`)
      .then((e) => setList(e.data));
  }, []);

  function handleClickMonth(e) {
    setDateButton(true);
    const value = e.currentTarget.value;
    const [year, month] = value.split(".");
    const startDate = `${year}.${month}.01.`;
    const nextMonth = (parseInt(month) % 12) + 1;
    const nextYear = parseInt(month) === 12 ? parseInt(year) + 1 : year;
    const endDate = `${nextYear}.${
      nextMonth < 10 ? "0" + nextMonth : nextMonth
    }.01.`;
    axios
      .get(
        `/api/hospital/reservation/month?id=${id}&startDate=${startDate}&endDate=${endDate}`,
      )
      .then((e) => setDateValue(e.data));
  }

  function isReservationInFuture(reservation) {
    const todaysDate = new Date();
    todaysDate.setHours(0, 0, 0, 0);
    const reservationDate = new Date(reservation.reservationDate);
    reservationDate.setHours(0, 0, 0, 0);
    return reservationDate >= todaysDate;
  }

  const listReservation = list
    .filter(isReservationInFuture)
    .filter((c) => c.isReservationCheck === false);

  const futureListReservations = dateValue
    .filter(isReservationInFuture)
    .filter((c) => c.isReservationCheck === false);
  const futureCheckListReservation = dateValue
    .filter(isReservationInFuture)
    .filter((r) => r.isReservationCheck === true);

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
    console.log(id);
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

  return (
    <Box>
      <Heading>예약확인하실 날짜를 선택해주세요</Heading>
      <Flex>
        <Button value={"2023.12"} onClick={(e) => handleClickMonth(e)}>
          2023년 12월
        </Button>
        <Button value={"2024.01"} onClick={(e) => handleClickMonth(e)}>
          2024년 1월
        </Button>
        <Button value={"2024.02"} onClick={(e) => handleClickMonth(e)}>
          2023년 2월
        </Button>
        <Button value={"2024.03"} onClick={(e) => handleClickMonth(e)}>
          2023년 3월
        </Button>
        <Button value={"2024.04"} onClick={(e) => handleClickMonth(e)}>
          2023년 4월
        </Button>
        <Button value={"2024.05"} onClick={(e) => handleClickMonth(e)}>
          2023년 5월
        </Button>
      </Flex>
      {dateButton || (
        <Box>
          <Table>
            <Thead>
              <Tr>
                <Th>예약자</Th>
                <Th>예약 날짜</Th>
                <Th>예약 시간</Th>
                <Th>예약 특이사항</Th>
                <Th>예약자 전화번호</Th>
                <Th>확인된 예약</Th>
                <Th>예약 확인</Th>
                <Th>예약 취소</Th>
              </Tr>
            </Thead>
            <Tbody>
              {listReservation && listReservation.length !== 0 ? (
                listReservation.map((l) => (
                  <Tr key={l.id}>
                    <Td>{l.nickName}</Td>
                    <Td>{new Date(l.reservationDate).toLocaleDateString()}</Td>
                    <Td>
                      {l.reservationHour < 13
                        ? "오전 " + l.reservationHour
                        : "오후 " + (l.reservationHour - 12)}
                      :
                      {l.reservationMin === 0
                        ? "0" + l.reservationMin
                        : l.reservationMin}
                    </Td>
                    <Td>
                      {l.comment !== null ? l.comment : "상세 내용이 없습니다."}
                    </Td>
                    <Td>{l.phone}</Td>
                    <Td>
                      {l.isReservationCheck === true
                        ? "확인 완료"
                        : "확인이 필요합니다."}
                    </Td>
                    <Td>
                      <Button
                        id={l.id}
                        colorScheme={"green"}
                        onClick={(e) => handleOkClick(e, l.id)}
                      >
                        예약 확인
                      </Button>
                    </Td>
                    <Td>
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
                    </Td>
                  </Tr>
                ))
              ) : (
                <Text>예약정보가 없습니다.</Text>
              )}
            </Tbody>
          </Table>
        </Box>
      )}
      {dateButton && (
        <Box>
          <Heading>예약내역</Heading>
          {dateValue && futureListReservations.length !== 0 ? (
            futureListReservations.map((l) => (
              <Card key={l.id}>
                <CardHeader>예약 정보</CardHeader>
                <CardBody>
                  <Box>예약자 명 : {l.nickName}</Box>
                  <Box>
                    예약 날짜 :
                    {new Date(l.reservationDate).toLocaleDateString()}
                  </Box>
                  <Box>
                    예약 시간 :
                    {l.reservationHour < 13
                      ? "오전 " + l.reservationHour
                      : "오후 " + (l.reservationHour - 12)}
                    :
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
          {dateValue && futureCheckListReservation.length !== 0 ? (
            futureCheckListReservation.map((c) => (
              <Card key={c.id}>
                <CardHeader>예약 확인 정보</CardHeader>
                <CardBody>
                  <Box>예약자 명 : {c.nickName}</Box>
                  <Box>
                    예약 날짜 :{" "}
                    {new Date(c.reservationDate).toLocaleDateString()}
                  </Box>
                  <Box>
                    예약 시간 :
                    {c.reservationHour < 13
                      ? "오전 " + c.reservationHour
                      : "오후 " + (c.reservationHour - 12)}
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
      )}
    </Box>
  );
}
