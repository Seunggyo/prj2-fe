import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Textarea,
    useToast
} from "@chakra-ui/react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import {useEffect, useState} from "react";
import moment from "moment";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {useImmer} from "use-immer";

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

    const {id} = useParams();

    useEffect(() => {
        axios.get("/api/hospital/reservation/" + id)
            .then(r => updateList(r.data))
    }, []);


    function handleDayChange(e) {
        setDateValue(e);
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
        axios.post("/api/hospital/reservation", {
            reservationHour,
            reservationMin,
            comment
        })
            .then(() => {
                    toast({
                        description: "예약이 완료되었습니다.",
                        status: "success"
                    });
                    navigate(-1);
                }
            )
            .catch(() => {
                toast({
                    description: "예약에 실패하였습니다.",
                    status: "error"
                })
            })

    }

    console.log(dateValue.toString());

    const tileDisable = ({date, view}) => {
        const today = new Date();
        return date < today;
    };
    return (
        <Box>
            <Heading>예약하실 날짜를 선택해주세요</Heading>
            <Calendar tileDisabled={tileDisable} onChange={handleDayChange} value={dateValue}
                      formatDay={(locale, date) => moment(date).format("DD")}/>
            {changeDay && (
                <Box m={5}>
                    <Box>
                        당신이 선택한 날짜는 {moment(dateValue).format("MM월 DD일")}입니다.
                    </Box>
                    <FormControl>
                        <FormLabel>시간을 선택해주세요</FormLabel>
                        <Card>
                            <CardBody>
                                오전
                                <Flex>
                                    <Button onClick={() => handleSetTimeClick(9, 0)}>9 : 00</Button>
                                    <Button onClick={() => handleSetTimeClick(9, 30)}>9 : 30</Button>
                                    <Button onClick={() => handleSetTimeClick(10, 0)}>10 : 00</Button>
                                    <Button onClick={() => handleSetTimeClick(10, 30)}>10 : 30</Button>
                                </Flex>
                                <Divider/>
                                <Flex>

                                    <Button onClick={() => handleSetTimeClick(11, 0)}>11 : 00</Button>
                                    <Button onClick={() => handleSetTimeClick(11, 30)}>11 : 30</Button>
                                    <Button onClick={() => handleSetTimeClick(12, 0)}>12 : 00</Button>
                                    <Button onClick={() => handleSetTimeClick(12, 30)}>12 : 30</Button>
                                </Flex>
                                <Divider/>
                                오후
                                <Flex>
                                    <Button onClick={() => handleSetTimeClick(13, 0)}>1 : 00</Button>
                                    <Button onClick={() => handleSetTimeClick(13, 30)}>1 : 30</Button>
                                    <Button onClick={() => handleSetTimeClick(14, 0)}>2 : 00</Button>
                                    <Button onClick={() => handleSetTimeClick(14, 30)}>2 : 30</Button>
                                </Flex>
                                <Divider/>
                                <Flex>
                                    <Button onClick={() => handleSetTimeClick(15, 0)}>3 : 00</Button>
                                    <Button onClick={() => handleSetTimeClick(15, 30)}>3 : 30</Button>
                                    <Button onClick={() => handleSetTimeClick(16, 0)}>4 : 00</Button>
                                    <Button onClick={() => handleSetTimeClick(16, 30)}>4 : 30</Button>
                                </Flex>
                                <Divider/>
                                <Flex>
                                    <Button onClick={() => handleSetTimeClick(17, 0)}>5 : 00</Button>
                                    <Button onClick={() => handleSetTimeClick(17, 30)}>5 : 30</Button>
                                    <Button onClick={() => handleSetTimeClick(18, 0)}>6 : 00</Button>
                                    <Button onClick={() => handleSetTimeClick(18, 30)}>6 : 30</Button>
                                </Flex>
                            </CardBody>
                        </Card>
                    </FormControl>
                </Box>
            )}
            {changeTime && (
                <Box>
                    <Textarea placeholder={"예약시 특이사항을 적어주세요\n ex)진단서가 필요합니다.\n 실비보험청구내역서가 필요합니다."}/>
                    <Card>
                        <CardHeader>
                            예약하신
                            시간은 {reservationHour < 12 ? "오전 " + reservationHour : "오후 " + (reservationHour - 12)}시 {reservationMin}분
                            입니다.
                        </CardHeader>
                        <CardBody>
                            다시 선택하시려면 취소
                            <Divider/>
                            예약하시려면 예약 확인을 눌러주세요
                        </CardBody>
                        <CardFooter>
                            <Button colorScheme={"red"} onClick={handleReservationCancelClick}>취소</Button>
                            <Button colorScheme={"twitter"} onClick={handleReservationClick}>예약 확인</Button>
                        </CardFooter>
                    </Card>
                </Box>
            )}
        </Box>
    );
}