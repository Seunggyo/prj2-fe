import {
  Box,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { ChevronDownIcon } from "@chakra-ui/icons";

export function DayCheck() {
  const [dateValue, setDateValue] = useState([]);
  const [position, setPosition] = useState();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isOpen1,
    onClose: onClose1,
    onOpen: onOpen1,
  } = useDisclosure();
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

  const listReservation = list.filter(isReservationInFuture);

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

  function handleOkClick() {
    if (!position) {
      return;
    }
    axios
      .put(`/api/hospital/reservation/ok/${position}`)
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
    <Flex
      direction={"column"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
      minH={"100vh"}
      p={5}
    >
      <Stack
        spacing={6}
        mx="auto"
        maxW={1000}
        boxShadow="2xl"
        p={6}
        bg={useColorModeValue("white", "gray.700")}
        borderRadius="lg"
      >
        <Heading
          mb={6}
          textAlign="center"
          size="lg"
          color={useColorModeValue("gray.700", "white")}
        >
          예약확인하실 달을 선택해주세요
        </Heading>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            2023년
          </MenuButton>
          <MenuList>
            <MenuItem value={"2023.12"} onClick={(e) => handleClickMonth(e)}>
              2023년 12월
            </MenuItem>
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            2024년
          </MenuButton>
          <MenuList>
            <MenuItem value={"2024.01"} onClick={(e) => handleClickMonth(e)}>
              2024년 1월
            </MenuItem>
            <MenuItem value={"2024.02"} onClick={(e) => handleClickMonth(e)}>
              2023년 2월
            </MenuItem>
            <MenuItem value={"2024.03"} onClick={(e) => handleClickMonth(e)}>
              2023년 3월
            </MenuItem>
            <MenuItem value={"2024.04"} onClick={(e) => handleClickMonth(e)}>
              2023년 4월
            </MenuItem>
            <MenuItem value={"2024.05"} onClick={(e) => handleClickMonth(e)}>
              2023년 5월
            </MenuItem>
          </MenuList>
        </Menu>

        {dateButton || (
          <Box overflowX={"auto"} boxShadow={"lg"}>
            <Table size={"sm"} variant={"striped"} colorScheme={"white"}>
              <Thead>
                <Tr>
                  <Th>예약자</Th>
                  <Th>예약 날짜</Th>
                  <Th>예약 시간</Th>
                  <Th>예약 특이사항</Th>
                  <Th>예약자 전화번호</Th>
                  <Th>확인된 예약</Th>
                  <Th>예약 확인</Th>
                </Tr>
              </Thead>
              <Tbody>
                {listReservation && listReservation.length !== 0 ? (
                  listReservation.map((l) => (
                    <Tr key={l.id}>
                      <Td>{l.nickName}</Td>
                      <Td>
                        {new Date(l.reservationDate).toLocaleDateString()}
                      </Td>
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
                        {l.comment !== null
                          ? l.comment
                          : "상세 내용이 없습니다."}
                      </Td>
                      <Td>{l.phone}</Td>
                      <Td>
                        {l.isReservationCheck === true
                          ? "확인 완료"
                          : "확인이 필요합니다."}
                      </Td>
                      <Td>
                        {l.isReservationCheck === false ? (
                          <Button
                            id={l.id}
                            colorScheme={"green"}
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpen1();
                              setPosition(l.id);
                            }}
                          >
                            예약 확인
                          </Button>
                        ) : (
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
                        )}
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
            <Box>
              <Heading>예약내역</Heading>
              <Table size={"sm"} variant={"striped"} colorScheme={"white"}>
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
                  {dateValue && futureListReservations.length !== 0 ? (
                    futureListReservations.map((l) => (
                      <Tr key={l.id}>
                        <Td>{l.nickName}</Td>
                        <Td>
                          {new Date(l.reservationDate).toLocaleDateString()}
                        </Td>
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
                          {l.comment !== null
                            ? l.comment
                            : "상세 내용이 없습니다."}
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
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpen1();
                              setPosition(l.id);
                            }}
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

            <Heading mt={5} mb={3}>
              예약 확인 내역
            </Heading>
            <Box>
              <Table size={"sm"} variant={"striped"} colorScheme={"white"}>
                <Thead>
                  <Tr>
                    <Th>예약자</Th>
                    <Th>예약 날짜</Th>
                    <Th>예약 시간</Th>
                    <Th>예약 특이사항</Th>
                    <Th>예약자 전화번호</Th>
                    <Th>확인된 예약</Th>
                    <Th>예약 취소</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {dateValue && futureCheckListReservation.length !== 0 ? (
                    futureCheckListReservation.map((l) => (
                      <Tr key={l.id}>
                        <Td>{l.nickName}</Td>
                        <Td>
                          {new Date(l.reservationDate).toLocaleDateString()}
                        </Td>
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
                          {l.comment !== null
                            ? l.comment
                            : "상세 내용이 없습니다."}
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
        <Modal isOpen={isOpen1} onClose={onClose1}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>예약 확인</ModalHeader>
            <ModalCloseButton />
            <ModalBody>예약 확인하시겠습니까?</ModalBody>
            <ModalFooter>
              <Button onClick={onClose1}>닫기</Button>
              <Button onClick={handleOkClick} colorScheme="green">
                예약 확인
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Stack>
    </Flex>
  );
}
