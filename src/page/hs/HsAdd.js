import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Center,
    Checkbox,
    CheckboxGroup,
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
import {useNavigate} from "react-router-dom";

export function HsAdd() {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [openHour, setOpenHour] = useState(0);
    const [openMin, setOpenMin] = useState(0);
    const [restHour, setRestHour] = useState(0);
    const [restMin, setRestMin] = useState(0);
    const [closeHour, setCloseHour] = useState(0);
    const [closeMin, setCloseMin] = useState(0);
    const [course, setCourse] = useState([]);
    const [content, setContent] = useState("");
    const [homePage, setHomePage] = useState("");
    const [hsFiles, setHsFiles] = useState(null);
    const [nightCare, setNightCare] = useState(0);

    const toast = useToast();

    const navigate = useNavigate();

    const hour = () => {
        const result = [];
        for (let i = 0; i < 25; i++) {
            result.push(<option value={i} key={i}>{i}</option>);
        }
        return result;
    }


    function handleClickSubmit() {

        axios.postForm("/api/hospital/add", {
            name,
            address,
            phone,
            openHour,
            openMin,
            restHour,
            restMin,
            closeHour,
            closeMin,
            course,
            content,
            homePage,
            hsFiles,
            nightCare
        }).then(() => {
                toast({
                    description: "전송 되었습니다.",
                    status: "success"
                });
                navigate("/hospital/hospitalList");
            }
        ).catch(() => toast({
            description: "전송에 실패하였습니다.",
            status: "error"
        }))

    }

    function handleCourseChange(e) {
        setCourse(e)
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
                                    value={openHour} defaultValue={0}>
                                {hour()}
                            </Select>
                            <FormLabel>분</FormLabel>
                            <Select defaultValue={0} onChange={e => setOpenMin(e.target.value)} value={openMin} w={"sm"}
                                    placeholder="분">
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
                        <FormLabel>휴게시간</FormLabel>
                        <Flex>
                            <FormLabel>시간</FormLabel>
                            <Select onChange={e => setRestHour(e.target.value)} w={"sm"} placeholder="시간"
                                    value={restHour} defaultValue={0}>
                                {hour()}
                            </Select>
                            <FormLabel>분</FormLabel>
                            <Select defaultValue={0} onChange={e => setRestMin(e.target.value)} value={restMin}
                                    w={"sm"}
                                    placeholder="분">
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
                            <Select value={closeHour} defaultValue={0} onChange={e => setCloseHour(e.target.value)}
                                    w={"sm"}
                                    placeholder="시간">
                                {hour()}
                            </Select>
                            <FormLabel>분</FormLabel>
                            <Select value={closeMin} defaultValue={0} w={"sm"} placeholder="분"
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
                        <FormLabel>진료과목</FormLabel>
                        <Flex>
                            <CheckboxGroup value={course} onChange={handleCourseChange}>
                                <Checkbox value="이비인후과">이비인후과</Checkbox>
                                <Checkbox value="내과">내과</Checkbox>
                                <Checkbox value="외과">외과</Checkbox>
                                <Checkbox value="치과">치과</Checkbox>
                            </CheckboxGroup>
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
                        <FormLabel>병원 사진</FormLabel>
                        <Input type="file" accept="image/*" multiple onChange={e => setHsFiles(e.target.files)}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>야간영업</FormLabel>
                        <Checkbox value={nightCare} onChange={e => setNightCare(e.target.checked)}>야간영업을 하시면 체크
                            해주세요</Checkbox>
                    </FormControl>
                </CardBody>
                <CardFooter>
                    <Button onClick={handleClickSubmit} colorScheme="twitter">저장</Button>
                </CardFooter>
            </Card>
        </Center>
    );
}