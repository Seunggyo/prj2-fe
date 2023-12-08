import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import {useImmer} from "use-immer";
import {useEffect, useState} from "react";
import axios from "axios";
import {useSearchParams} from "react-router-dom";


export function HsReservationCheck() {
    const [list, updateList] = useImmer([]);
    const [position, setPosition] = useState();
    const {getButtonProps, getDisclosureProps, isControlled, isOpen, onClose, onOpen, onToggle} = useDisclosure();
    const [params] = useSearchParams();
    const toast = useToast();
    useEffect(() => {
        axios.get("/api/hospital/reservation?" + params)
            .then(e => updateList(e.data))
    }, []);


    function handleDeleteClick() {
        if (!position) {
            return;
        }
        axios.delete(`/api/hospital/reservation/remove/${position}`)
            .then(() => {
                toast({
                    description: "삭제가 완료되었습니다.",
                    status: "success"
                })
            }).catch(() => {
            toast({
                description: "실패하였습니다.",
                status: "error"
            })
        })
            .finally(() => {
                setPosition(null);
                onClose();
            })
    }

    return (
        <Box>
            <Flex>
                {list.map((l) => (
                    <Card>
                        <CardHeader>예약 정보</CardHeader>
                        <CardBody>
                            <Box>
                                병원명 : {l.name}
                            </Box>
                            <Box>예약 날짜 : {new Date(l.reservationDate).toLocaleDateString()}</Box>
                            <Box>예약 시간
                                : {l.reservationHour < 13 ? "오전 " + l.reservationHour : "오후 " + (l.reservationHour - 12)} : {l.reservationMin === 0 ? "0" + l.reservationMin : l.reservationMin}</Box>
                        </CardBody>
                        <CardFooter>
                            <Button id={l.id} colorScheme={"red"} onClick={e => {
                                e.stopPropagation();
                                onOpen();
                                setPosition(l.id)
                            }}>
                                예약 취소
                            </Button>
                        </CardFooter>
                    </Card>

                ))}
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>예약취소</ModalHeader>
                    <ModalCloseButton/>

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