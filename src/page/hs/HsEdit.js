import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Checkbox,
    CheckboxGroup,
    Divider,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Heading,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Spinner,
    Switch,
    Textarea,
    Tooltip,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import {useImmer} from "use-immer";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {faHeart as fullHeart, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {faHeart as emptyHeart} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {LoginContext} from "../../component/LoginProvider";
import {HsComment} from "./HsComment";


function LikeContainer({like, onClick}) {
    const {isAuthenticated} = useContext(LoginContext);
    if (like === null) {
        return <Spinner/>
    }

    return (
        <Flex>
            <Tooltip isDisabled={isAuthenticated()} hasArrow label={"로그인 하세요"}>
                <Button variant="ghost" size="xl" onClick={onClick}>
                    {/*<FontAwesomeIcon icon={faHeart} size="xl" />*/}
                    {like.like && <FontAwesomeIcon icon={fullHeart} size="xl"/>}
                    {like.like || <FontAwesomeIcon icon={emptyHeart} size="xl"/>}
                </Button>
            </Tooltip>
            <Heading size="lg">{like.countLike}</Heading>
        </Flex>
    )
}


export function HsEdit() {
    const [list, updateList] = useImmer([]);
    const {id} = useParams();
    const {isOpen, onClose, onOpen} = useDisclosure();
    const navigate = useNavigate();
    const toast = useToast();
    const [removeFileIds, setRemoveFileIds] = useState([]);
    const [uploadFiles, setUploadFiles] = useState(null);
    const [holiday, setHoliday] = useState([]);
    const [course, setCourse] = useState([]);
    const [like, setLike] = useState(null);
    const {isAuthenticated} = useContext(LoginContext);

    useEffect(() => {
        axios.get("/api/hospital/id/" + id).then((r) => updateList(r.data))
    }, []);
    useEffect(() => {
        axios.get("/api/hospital/like/hospital/" + id).then(r => setLike(r.data));
    }, []);


    const hour = () => {
        const result = [];
        for (let i = 0; i < 25; i++) {
            result.push(<option value={i} key={i}>{i}</option>);
        }
        return result;
    }

    function handleNameChange(e) {
        updateList(r => {
            r.name = e.target.value
        })
    }

    function handleAddressChange(e) {
        updateList(r => {
            r.address = e.target.value
        })
    }

    function handlePhoneChange(e) {
        updateList(r => {
            r.phone = e.target.value
        })
    }

    function handleOpenHourChange(e) {
        updateList(r => {
            r.openHour = e.target.value
        })
    }

    function handleRestHourChange(e) {
        updateList(r => {
            r.restHour = e.target.value
        })
    }

    function handleRestMinChange(e) {
        updateList(r => {
            r.restMin = e.target.value
        })
    }

    function handleCloseHourChange(e) {
        updateList(r => {
            r.closeHour = e.target.value
        })
    }

    function handleOpenMinChange(e) {
        updateList(r => {
            r.openMin = e.target.value
        })
    }

    function handleCloseMinChange(e) {
        void updateList(r => {
            r.closeMin = e.target.value
        })
    }

    function handleContentChange(e) {
        updateList((draft) => {
            draft.content = e.target.value
        })
    }

    function handleHomePageChange(e) {
        updateList(r => {
            r.homePage = e.target.value
        })
    }

    function handleNightChange(e) {
        updateList(r => {
            r.nightCare = e.target.checked
        })
    }

    console.log(list.nightCare)

    function handleSubmitClick() {
        axios.putForm("/api/hospital/edit", {
            id: list.id,
            name: list.name,
            address: list.address,
            phone: list.phone,
            openHour: list.openHour,
            openMin: list.openMin,
            restHour: list.restHour,
            restMin: list.restMin,
            restCloseHour: list.restCloseHour,
            restCloseMin: list.restCloseMin,
            closeHour: list.closeHour,
            closeMin: list.closeMin,
            content: list.content,
            info: list.info,
            homePage: list.homePage,
            nightCare: list.nightCare,
            holiday,
            course,
            uploadFiles,
            removeFileIds,

        }).then(() => {
            toast({
                description: "수정이 완료되었습니다.",
                status: "success"
            });
            navigate(-1)
        }).catch(() => {
            toast({
                description: "문제가 발생하였습니다.",
                status: "error",
            })
        }).finally(() => onClose)
    }


    function handleRemoveFileSwitch(e) {
        if (e.target.checked) {
            setRemoveFileIds([...removeFileIds, e.target.value]);
        } else {
            setRemoveFileIds(removeFileIds.filter((item) => item !== e.target.value));
        }
    }

    function handleLikeClick() {
        axios
            .post("/api/hospital/like", {businessId: list.id})
            .then(r => setLike(r.data))
            .catch(() => console.log("bad"))
            .finally(() => console.log("done"));
    }


    function handleCourseChange(e) {
        updateList(r => {
            r.medicalCourse = e.target.checked
        })
    }

    function handleRestCloseMinChange(e) {
        updateList(r => {
            r.restCloseMin = e.target.value
        })
    }

    function handleRestCloseHourChange(e) {
        updateList(r => {
            r.restCloseHour = e.target.value
        })
    }

    return (
        <Box>
            <Card>
                <CardHeader>
                    <Heading>병원 정보 수정</Heading>
                    <LikeContainer like={like} onClick={handleLikeClick}/>
                </CardHeader>
                <CardBody>
                    <FormControl>
                        <FormLabel>병원명</FormLabel>
                        <Input value={list.name} onChange={handleNameChange}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>병원 주소</FormLabel>
                        <Input value={list.address} onChange={handleAddressChange}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>전화번호</FormLabel>
                        <Input value={list.phone} onChange={handlePhoneChange}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>오픈시간</FormLabel>
                        <Flex>
                            <FormLabel>시간</FormLabel>
                            <Select onChange={handleOpenHourChange} w={"sm"} placeholder="시간"
                                    value={list.openHour} defaultValue={0}>
                                {hour()}
                            </Select>
                            <FormLabel>분</FormLabel>
                            <Select defaultValue={0} onChange={handleOpenMinChange} value={list.openMin} w={"sm"}
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
                            <FormLabel>시작 시간</FormLabel>
                            <Select onChange={handleRestHourChange} w={"sm"} placeholder="시간"
                                    value={list.restHour} defaultValue={0}>
                                {hour()}
                            </Select>
                            <FormLabel>분</FormLabel>
                            <Select defaultValue={0} onChange={handleRestMinChange} value={list.restMin}
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
                            <FormLabel>종료시간</FormLabel>
                            <Select onChange={handleRestCloseHourChange} w={"sm"} placeholder="시간"
                                    value={list.restCloseHour} defaultValue={0}>
                                {hour()}
                            </Select>
                            <FormLabel>분</FormLabel>
                            <Select defaultValue={0} onChange={handleRestCloseMinChange} value={list.restCloseMin}
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
                            <Select value={list.closeHour} defaultValue={0} onChange={handleCloseHourChange}
                                    w={"sm"}
                                    placeholder="시간">
                                {hour()}
                            </Select>
                            <FormLabel>분</FormLabel>
                            <Select value={list.closeMin} defaultValue={0} w={"sm"} placeholder="분"
                                    onChange={handleCloseMinChange}>
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
                        <Textarea value={list.content} onChange={handleContentChange}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>홈페이지</FormLabel>
                        <Input value={list.homePage} onChange={handleHomePageChange}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>진료과목</FormLabel>
                        <Flex>
                            <CheckboxGroup value={course} onChange={e => setCourse(e)}>
                                <Checkbox value="이비인후과">이비인후과</Checkbox>
                                <Checkbox value="내과">내과</Checkbox>
                                <Checkbox value="외과">외과</Checkbox>
                                <Checkbox value="치과">치과</Checkbox>
                            </CheckboxGroup>
                        </Flex>
                    </FormControl>
                    <FormControl>
                        <FormLabel>휴무일</FormLabel>
                        <CheckboxGroup value={holiday} onChange={(e) => setHoliday(e)}>
                            <Checkbox value="월요일">월요일</Checkbox>
                            <Checkbox value="화요일">화요일</Checkbox>
                            <Checkbox value="수요일">수요일</Checkbox>
                            <Checkbox value="목요일">목요일</Checkbox>
                            <Checkbox value="금요일">금요일</Checkbox>
                            <Checkbox value="토요일">토요일</Checkbox>
                            <Checkbox value="일요일">일요일</Checkbox>
                            <Checkbox value="공휴일">공휴일</Checkbox>
                        </CheckboxGroup>
                    </FormControl>
                    {list.files?.length > 0 &&
                        list.files.map((file) => (
                            <Card
                                key={file.id}
                                sx={{marginTop: "20px", marginBottom: "20px"}}
                            >
                                <CardBody>
                                    <Image src={file.url} alt={file.name} width="100%"/>
                                </CardBody>
                                <Divider/>
                                <CardFooter>
                                    <FormControl display="flex" alignItems={"center"} gap={2}>
                                        <FormLabel colorScheme="red" m={0} p={0}>
                                            <FontAwesomeIcon color="red" icon={faTrashCan}/>
                                        </FormLabel>
                                        <Switch
                                            value={file.id}
                                            onChange={handleRemoveFileSwitch}
                                            colorScheme="red"
                                        />
                                    </FormControl>
                                </CardFooter>
                            </Card>
                        ))}
                    <FormControl mb={5}>
                        <FormLabel>이미지</FormLabel>
                        <Input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => setUploadFiles(e.target.files)}
                        />
                        <FormHelperText>
                            한 개 파일은 3MB, 총 용량은 10MB 이내로 첨부하세요.
                        </FormHelperText>
                    </FormControl>
                    <FormControl>
                        <FormLabel>야간영업</FormLabel>
                        <Checkbox isChecked={list.nightCare} value={list.nightCare} onChange={handleNightChange}>야간영업을
                            하시면 체크 해주세요</Checkbox>
                    </FormControl>
                </CardBody>
                <CardFooter>
                    {isAuthenticated() && (
                        <Button onClick={() => navigate("/hospital/hospitalReservation/" + id)}>예약</Button>
                    )}
                    <Button onClick={onOpen} colorScheme="twitter">저장</Button>
                    <Button onClick={() => navigate(-1)}>취소</Button>
                </CardFooter>
            </Card>

            <HsComment businessId={id}/>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>저장</ModalHeader>
                    <ModalCloseButton/>

                    <ModalBody>저장 하시겠습니까?</ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose}>닫기</Button>
                        <Button onClick={handleSubmitClick} colorScheme="twitter">
                            저장
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}