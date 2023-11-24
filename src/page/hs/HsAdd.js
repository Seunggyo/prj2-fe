import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Center,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Select,
    Textarea,
    useToast
} from "@chakra-ui/react";
import {useState} from "react";
import axios from "axios";

export function HsAdd() {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [openHour, setOpenHour] = useState(0);
    const [openMin, setOpenMin] = useState(0);
    const [closeHour, setCloseHour] = useState(0);
    const [closeMin, setCloseMin] = useState(0);
    const [content, setContent] = useState("");
    const [homePage, setHomePage] = useState("");
    const [nightCare, setNightCare] = useState(0);

    const toast = useToast();

    const hour = () => {
        const result = [];
        for (let i = 0; i < 25; i++) {
            result.push(<option value={i} key={i}>{i}</option>);
        }
        return result;
    }


    function handleNightChange() {
        setNightCare(1);
    }

    function handleClickSubmit() {

        axios.post("/api/hospital/add", {
            name,
            address,
            phone,
            openHour,
            openMin,
            closeHour,
            closeMin,
            content,
            homePage,
            nightCare
        }).then(() => toast({
            description: "전송 되었습니다.",
            status: "success"
        })).catch(() => toast({
            description: "전송에 실패하였습니다.",
            status: "error"
        }))


    }

    return (
        <Center>

            <Card w={"xl"}>
                <CardHeader>
                    <Heading>병원 정보 입력</Heading>
                </CardHeader>
                <CardBody>
                    <FormControl>
                        <FormLabel>병원명</FormLabel>
                        <Input value={name} onChange={e => setName(e.target.value)}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>병원 주소</FormLabel>
                        <Input value={address} onChange={e => setAddress(e.target.value)}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>전화번호</FormLabel>
                        <Input value={phone} onChange={e => setPhone(e.target.value)}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>오픈시간</FormLabel>
                        <Flex>
                            <FormLabel>시간</FormLabel>
                            <Select onChange={e => setOpenHour(e.target.value)} w={"sm"} placeholder="시간"
                                    value={openHour}>
                                {hour()}
                            </Select>
                            <FormLabel>분</FormLabel>
                            <Select onChange={e => setOpenMin(e.target.value)} value={openMin} w={"sm"} placeholder="분">
                                <option value={0}>00</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={30}>30</option>
                                <option value={40}>40</option>
                                <option value={50}>50</option>
                                <option value={60}>60</option>
                            </Select>
                        </Flex>
                    </FormControl>
                    <FormControl>
                        <FormLabel>마감시간</FormLabel>
                        <Flex>
                            <FormLabel>시간</FormLabel>
                            <Select onChange={e => setCloseHour(e.target.value)} w={"sm"} placeholder="시간">
                                {hour()}
                            </Select>
                            <FormLabel>분</FormLabel>
                            <Select value={closeHour} w={"sm"} placeholder="분"
                                    onChange={e => setCloseMin(e.target.value)}>
                                <option value={0}>00</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={30}>30</option>
                                <option value={40}>40</option>
                                <option value={50}>50</option>
                                <option value={60}>60</option>
                            </Select>
                        </Flex>
                    </FormControl>
                    <FormControl>
                        <FormLabel>상세정보</FormLabel>
                        <Textarea value={content} onChange={e => setContent(e.target.value)}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>홈페이지</FormLabel>
                        <Input value={homePage} onChange={e => setHomePage(e.target.value)}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>야간영업</FormLabel>
                        <Checkbox value={nightCare} onChange={handleNightChange}>야간영업을 하시면 체크 해주세요</Checkbox>
                    </FormControl>
                </CardBody>
                <CardFooter>
                    <Button onClick={handleClickSubmit} colorScheme="twitter">저장</Button>
                </CardFooter>
            </Card>
        </Center>
    );
}