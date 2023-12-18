import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Stack,
  Textarea,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useImmer } from "use-immer";

export function HsReservation() {
  const [dateValue, setDateValue] = useState(new Date());
  const [changeDay, setChangeDay] = useState(false);
  const [list, updateList] = useImmer([]);
  const [reservationHour, setReservationHour] = useState(0);
  const [reservationMin, setReservationMin] = useState(0);
  const [changeTime, setChangeTime] = useState(false);
  const [comment, setComment] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get("/api/hospital/reservation/" + id)
      .then((r) => updateList(r.data));
  }, []);

  function handleDayChange(e) {
    const year = e.getFullYear();
    const month = (e.getMonth() + 1).toString().padStart(2, "0");
    const day = e.getDate().toString().padStart(2, "0");

    const formatDate = `${year}-${month}-${day}`;

    setDateValue(formatDate);
    setChangeDay(true);
  }

  function handleSetTimeClick(t, m) {
    setReservationHour(t);
    setReservationMin(m);
    setChangeDay(false);
    setChangeTime(true);
  }

  function handleReservationCancelClick() {
    setChangeTime(false);
  }

  function handleReservationClick() {
    axios
      .post("/api/hospital/reservation/add", {
        businessId: id,
        reservationDate: dateValue,
        reservationHour,
        reservationMin,
        comment,
      })
      .then(() => {
        toast({
          description: "예약이 완료되었습니다.",
          status: "success",
        });
        navigate(-1);
      })
      .catch(() => {
        toast({
          description: "예약에 실패하였습니다.",
          status: "error",
        });
      });
  }

  const tileDisable = ({ date, view }) => {
    const today = new Date();
    return date < today;
  };

  function handleCommentChange(e) {
    setComment(e.target.value);
  }

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      bg={useColorModeValue("white", "gray.800")}
      minH="100vh"
      p={5}
    >
      <Stack
        spacing={6}
        mx="auto"
        maxW={650}
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
          예약하실 날짜를 선택해주세요
        </Heading>
        <Center>
          <Calendar
            tileDisabled={tileDisable}
            onChange={handleDayChange}
            value={dateValue}
            minDetail="month"
            maxDetail="month"
            calendarType={"gregory"}
            formatDay={(locale, date) => moment(date).format("DD")}
          />
        </Center>

        {changeDay && (
          <Box bg={"white"} p={5} borderRadius={"md"} boxShadow={"base"}>
            <Box>
              당신이 선택한 날짜는 {moment(dateValue).format("MM월 DD일")}
              입니다.
            </Box>
            <Divider mt={4} mb={4} />
            <FormControl mt={4}>
              <FormLabel>시간을 선택해주세요</FormLabel>
              <Card bg={"gray.100"} borderRadius={"md"} p={5}>
                <CardBody>
                  오전
                  <Flex>
                    <Button
                      isDisabled={
                        9 < list.openHour ||
                        (9 === list.openHour && 0 < list.openMin) ||
                        9 > list.closeHour ||
                        (9 === list.closeHour && 0 >= list.closeMin) ||
                        (9 >= list.restHour &&
                          0 >= list.restMin &&
                          (9 < list.restCloseHour ||
                            (9 === list.restCloseHour &&
                              30 < list.restCloseMin)))
                      }
                      onClick={() => handleSetTimeClick(9, 0)}
                    >
                      9 : 00
                    </Button>
                    <Button
                      isDisabled={
                        9 < list.openHour ||
                        (9 === list.openHour && 30 < list.openMin) ||
                        9 > list.closeHour ||
                        (9 === list.closeHour && 30 >= list.closeMin) ||
                        (9 >= list.restHour &&
                          30 >= list.restMin &&
                          (9 < list.restCloseHour ||
                            (9 === list.restCloseHour &&
                              30 < list.restCloseMin)))
                      }
                      onClick={() => handleSetTimeClick(9, 30)}
                    >
                      9 : 30
                    </Button>
                    <Button
                      isDisabled={
                        10 < list.openHour ||
                        (10 === list.openHour && 0 < list.openMin) ||
                        10 > list.closeHour ||
                        (10 === list.closeHour && 0 >= list.closeMin) ||
                        (10 >= list.restHour &&
                          0 >= list.restMin &&
                          (10 < list.restCloseHour ||
                            (10 === list.restCloseHour &&
                              0 < list.restCloseMin)))
                      }
                      onClick={() => handleSetTimeClick(10, 0)}
                    >
                      10 : 00
                    </Button>
                    <Button
                      isDisabled={
                        10 < list.openHour ||
                        (10 === list.openHour && 30 < list.openMin) ||
                        10 > list.closeHour ||
                        (10 === list.closeHour && 30 >= list.closeMin) ||
                        (10 >= list.restHour &&
                          30 >= list.restMin &&
                          (10 < list.restCloseHour ||
                            (10 === list.restCloseHour &&
                              30 < list.restCloseMin)))
                      }
                      onClick={() => handleSetTimeClick(10, 30)}
                    >
                      10 : 30
                    </Button>
                  </Flex>
                  <Divider />
                  <Flex>
                    <Button
                      isDisabled={
                        11 < list.openHour ||
                        (11 === list.openHour && 0 < list.openMin) ||
                        11 > list.closeHour ||
                        (11 === list.closeHour && 0 >= list.closeMin) ||
                        (11 >= list.restHour &&
                          0 >= list.restMin &&
                          (11 < list.restCloseHour ||
                            (11 === list.restCloseHour &&
                              0 < list.restCloseMin)))
                      }
                      onClick={() => handleSetTimeClick(11, 0)}
                    >
                      11 : 00
                    </Button>
                    <Button
                      isDisabled={
                        11 < list.openHour ||
                        (11 === list.openHour && 30 < list.openMin) ||
                        11 > list.closeHour ||
                        (11 === list.closeHour && 30 >= list.closeMin) ||
                        (11 >= list.restHour &&
                          30 >= list.restMin &&
                          (11 < list.restCloseHour ||
                            (11 === list.restCloseHour &&
                              30 < list.restCloseMin)))
                      }
                      onClick={() => handleSetTimeClick(11, 30)}
                    >
                      11 : 30
                    </Button>
                    <Button
                      isDisabled={
                        12 < list.openHour ||
                        (12 === list.openHour && 0 < list.openMin) ||
                        12 > list.closeHour ||
                        (12 === list.closeHour && 0 >= list.closeMin) ||
                        (12 >= list.restHour &&
                          0 >= list.restMin &&
                          (12 < list.restCloseHour ||
                            (12 === list.restCloseHour &&
                              0 < list.restCloseMin)))
                      }
                      onClick={() => handleSetTimeClick(12, 0)}
                    >
                      12 : 00
                    </Button>
                    <Button
                      isDisabled={
                        12 < list.openHour ||
                        (12 === list.openHour && 30 < list.openMin) ||
                        12 > list.closeHour ||
                        (12 === list.closeHour && 30 >= list.closeMin) ||
                        (12 >= list.restHour &&
                          30 >= list.restMin &&
                          (12 < list.restCloseHour ||
                            (12 === list.restCloseHour &&
                              30 < list.restCloseMin)))
                      }
                      onClick={() => handleSetTimeClick(12, 30)}
                    >
                      12 : 30
                    </Button>
                  </Flex>
                  <Divider />
                  오후
                  <Flex>
                    <Button
                      isDisabled={
                        13 < list.openHour ||
                        (13 === list.openHour && 0 < list.openMin) ||
                        13 > list.closeHour ||
                        (13 === list.closeHour && 0 >= list.closeMin) ||
                        (13 >= list.restHour &&
                          0 >= list.restMin &&
                          (13 < list.restCloseHour ||
                            (13 === list.restCloseHour &&
                              0 < list.restCloseMin)))
                      }
                      onClick={() => handleSetTimeClick(13, 0)}
                    >
                      1 : 00
                    </Button>
                    <Button
                      isDisabled={
                        13 < list.openHour ||
                        (13 === list.openHour && 30 < list.openMin) ||
                        13 > list.closeHour ||
                        (13 === list.closeHour && 30 >= list.closeMin) ||
                        (13 >= list.restHour &&
                          30 >= list.restMin &&
                          (13 < list.restCloseHour ||
                            (13 === list.restCloseHour &&
                              30 < list.restCloseMin)))
                      }
                      onClick={() => handleSetTimeClick(13, 30)}
                    >
                      1 : 30
                    </Button>
                    <Button
                      isDisabled={
                        14 < list.openHour ||
                        (14 === list.openHour && 0 < list.openMin) ||
                        14 > list.closeHour ||
                        (14 === list.closeHour && 0 >= list.closeMin) ||
                        (14 >= list.restHour &&
                          0 >= list.restMin &&
                          (14 < list.restCloseHour ||
                            (14 === list.restCloseHour &&
                              0 < list.restCloseMin)))
                      }
                      onClick={() => handleSetTimeClick(14, 0)}
                    >
                      2 : 00
                    </Button>
                    <Button
                      isDisabled={
                        14 < list.openHour ||
                        (14 === list.openHour && 30 < list.openMin) ||
                        14 > list.closeHour ||
                        (14 === list.closeHour && 30 >= list.closeMin) ||
                        (14 >= list.restHour &&
                          30 >= list.restMin &&
                          (14 < list.restCloseHour ||
                            (14 === list.restCloseHour &&
                              30 < list.restCloseMin)))
                      }
                      onClick={() => handleSetTimeClick(14, 30)}
                    >
                      2 : 30
                    </Button>
                  </Flex>
                  <Divider />
                  <Flex>
                    <Button
                      isDisabled={
                        15 < list.openHour ||
                        (15 === list.openHour && 0 < list.openMin) ||
                        15 > list.closeHour ||
                        (15 === list.closeHour && 0 >= list.closeMin) ||
                        (15 >= list.restHour &&
                          0 >= list.restMin &&
                          (15 < list.restCloseHour ||
                            (15 === list.restCloseHour &&
                              0 < list.restCloseMin)))
                      }
                      onClick={() => handleSetTimeClick(15, 0)}
                    >
                      3 : 00
                    </Button>
                    <Button
                      isDisabled={
                        15 < list.openHour ||
                        (15 === list.openHour && 30 < list.openMin) ||
                        15 > list.closeHour ||
                        (15 === list.closeHour && 30 >= list.closeMin) ||
                        (15 >= list.restHour &&
                          30 >= list.restMin &&
                          (15 < list.restCloseHour ||
                            (15 === list.restCloseHour &&
                              30 < list.restCloseMin)))
                      }
                      onClick={() => handleSetTimeClick(15, 30)}
                    >
                      3 : 30
                    </Button>
                    <Button
                      isDisabled={
                        16 < list.openHour ||
                        (16 === list.openHour && 0 < list.openMin) ||
                        16 > list.closeHour ||
                        (16 === list.closeHour && 0 >= list.closeMin) ||
                        (16 >= list.restHour &&
                          0 >= list.restMin &&
                          (16 < list.restCloseHour ||
                            (16 === list.restCloseHour &&
                              0 < list.restCloseMin)))
                      }
                      onClick={() => handleSetTimeClick(16, 0)}
                    >
                      4 : 00
                    </Button>
                    <Button
                      isDisabled={
                        16 < list.openHour ||
                        (16 === list.openHour && 30 < list.openMin) ||
                        16 > list.closeHour ||
                        (16 === list.closeHour && 30 >= list.closeMin) ||
                        (16 >= list.restHour &&
                          30 >= list.restMin &&
                          (16 < list.restCloseHour ||
                            (16 === list.restCloseHour &&
                              30 < list.restCloseMin)))
                      }
                      onClick={() => handleSetTimeClick(16, 30)}
                    >
                      4 : 30
                    </Button>
                  </Flex>
                  <Divider />
                  <Flex>
                    <Button
                      isDisabled={
                        17 < list.openHour ||
                        (17 === list.openHour && 0 < list.openMin) ||
                        17 > list.closeHour ||
                        (17 === list.closeHour && 0 >= list.closeMin) ||
                        (17 >= list.restHour &&
                          0 >= list.restMin &&
                          (17 < list.restCloseHour ||
                            (17 === list.restCloseHour &&
                              0 < list.restCloseMin)))
                      }
                      onClick={() => handleSetTimeClick(17, 0)}
                    >
                      5 : 00
                    </Button>
                    <Button
                      isDisabled={
                        17 < list.openHour ||
                        (17 === list.openHour && 30 < list.openMin) ||
                        17 > list.closeHour ||
                        (17 === list.closeHour && 30 >= list.closeMin) ||
                        (17 >= list.restHour &&
                          30 >= list.restMin &&
                          (17 < list.restCloseHour ||
                            (17 === list.restCloseHour &&
                              30 < list.restCloseMin)))
                      }
                      onClick={() => handleSetTimeClick(17, 30)}
                    >
                      5 : 30
                    </Button>
                    <Button
                      isDisabled={
                        18 < list.openHour ||
                        (18 === list.openHour && 0 < list.openMin) ||
                        18 > list.closeHour ||
                        (18 === list.closeHour && 0 >= list.closeMin) ||
                        (18 >= list.restHour &&
                          0 >= list.restMin &&
                          (18 < list.restCloseHour ||
                            (18 === list.restCloseHour &&
                              0 < list.restCloseMin)))
                      }
                      onClick={() => handleSetTimeClick(18, 0)}
                    >
                      6 : 00
                    </Button>
                    <Button
                      isDisabled={
                        18 < list.openHour ||
                        (18 === list.openHour && 30 < list.openMin) ||
                        18 > list.closeHour ||
                        (18 === list.closeHour && 30 >= list.closeMin) ||
                        (18 >= list.restHour &&
                          30 >= list.restMin &&
                          (18 < list.restCloseHour ||
                            (18 === list.restCloseHour &&
                              30 < list.restCloseMin)))
                      }
                      onClick={() => handleSetTimeClick(18, 30)}
                    >
                      6 : 30
                    </Button>
                  </Flex>
                </CardBody>
              </Card>
            </FormControl>
          </Box>
        )}
        {changeTime && (
          <Box>
            <Textarea
              placeholder={
                "예약시 특이사항을 적어주세요\n ex)진단서가 필요합니다.\n 실비보험청구내역서가 필요합니다."
              }
            />
            <Card
              my={5}
              px={5}
              py={7}
              bg={useColorModeValue("gray.100", "gray.600")}
              borderRadius="md"
            >
              <CardHeader>
                예약하신 시간은
                {reservationHour < 12
                  ? "오전 " + reservationHour
                  : "오후 " + (reservationHour - 12)}
                시{" "}
                {reservationMin === 0 ? "0" + reservationMin : reservationMin}분
                입니다.
              </CardHeader>
              <Divider my={3} />
              <CardBody mt={3}>
                다시 선택하시려면 취소
                <Divider />
                예약하시려면 예약 확인을 눌러주세요
              </CardBody>
              <CardFooter>
                <Button
                  colorScheme={"red"}
                  onClick={handleReservationCancelClick}
                >
                  취소
                </Button>
                <Button colorScheme={"green"} onClick={handleReservationClick}>
                  예약 확인
                </Button>
              </CardFooter>
            </Card>
          </Box>
        )}
      </Stack>
    </Flex>
  );
}
