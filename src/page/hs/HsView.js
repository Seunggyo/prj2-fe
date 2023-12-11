import {
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Image,
    Spinner,
    Text,
    Tooltip
} from "@chakra-ui/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart as fullHeart} from "@fortawesome/free-solid-svg-icons";
import React, {useContext, useEffect, useState} from "react";
import {LoginContext} from "../../component/LoginProvider";
import {faHeart as emptyHeart} from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import {useImmer} from "use-immer";
import {useParams} from "react-router-dom";
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

export function HsView() {
    const [list, updateList] = useImmer([]);
    const [like, setLike] = useState(null);
    const {id} = useParams();

    useEffect(() => {
        axios.get("/api/hospital/id/" + id).then((r) => updateList(r.data))
    }, []);
    useEffect(() => {
        axios.get("/api/hospital/like/hospital/" + id).then(r => setLike(r.data));
    }, []);

    function handleLikeClick() {
        axios
            .post("/api/hospital/like", {businessId: list.id})
            .then(r => setLike(r.data))
            .catch(() => console.log("bad"))
            .finally(() => console.log("done"));
    }

    return (
        <Box>
            <Card>

                <CardHeader>
                    {list.files?.length > 0 &&
                        list.files.map((file) => (
                            <Card
                                key={file.id}
                                sx={{marginTop: "20px", marginBottom: "20px"}}
                            >
                                <CardBody>
                                    <Image src={file.url} alt={file.name} width="100%"/>
                                </CardBody>

                            </Card>
                        ))}
                    <Heading>{list.name}</Heading>
                    <LikeContainer like={like} onClick={handleLikeClick}/>
                </CardHeader>
                <CardBody>
                    <FormControl>
                        <FormLabel>병원명</FormLabel>
                        <Text>{list.name}</Text>
                    </FormControl>
                    <FormControl>
                        <FormLabel>병원 주소</FormLabel>
                        <Text>{list.address}</Text>
                    </FormControl>
                    <FormControl>
                        <FormLabel>전화번호</FormLabel>
                        <Text>{list.phone} </Text>
                    </FormControl>
                    <FormControl>
                        <FormLabel>오픈시간</FormLabel>
                        <Flex>

                            <Text>
                                {list.openHour}시
                            </Text>
                            <Text>
                                {list.openMin === 0 ? "0" + list.openMin : list.openMin}분
                            </Text>
                        </Flex>
                    </FormControl>
                    {list.restHour !== null && (
                        <FormControl>
                            <FormLabel>휴게시간</FormLabel>
                            <Flex>
                                <FormLabel>시작 시간</FormLabel>
                                <Text>{list.restHour} 시</Text>
                                <Text>
                                    {list.restMin === 0 ? "0" + list.restMin : list.restMin} 분
                                </Text>
                                <FormLabel>~</FormLabel>
                                <Text>
                                    {list.restCloseHour} 시
                                </Text>
                                <Text>
                                    {list.restCloseMin === 0 ? "0" + list.restCloseMin : list.restCloseMin} 분
                                </Text>
                            </Flex>
                        </FormControl>
                    )}
                    <FormControl>
                        <FormLabel>마감시간</FormLabel>
                        <Flex>

                            <Text>
                                {list.closeHour}시
                            </Text>

                            <Text>
                                {list.closeMin === 0 ? "0" + list.closeMin : list.closeMin}분
                            </Text>
                        </Flex>
                    </FormControl>
                    <FormControl>
                        <FormLabel>상세정보</FormLabel>
                        <Text>
                            {list.content && list.content.split('\n').map((line, index) => (
                                <React.Fragment key={index}>
                                    {line}
                                    {index < list.content.split('\n').length - 1 && <br/>}
                                </React.Fragment>
                            ))}
                        </Text>
                    </FormControl>
                    <FormControl>
                        <FormLabel>홈페이지</FormLabel>
                        <Text>{list.homePage}</Text>
                    </FormControl>
                    {(list.medicalCourse && list.medicalCourse.length > 0) && (
                        <FormControl>
                            <FormLabel>진료 과목</FormLabel>
                            <Text>
                                {list.medicalCourse && list.medicalCourse.map((course, index) => (
                                    <React.Fragment key={index}>
                                        {course.medicalCourseCategory}
                                        {index < list.medicalCourse.length - 1 && ', '}
                                    </React.Fragment>
                                ))}
                            </Text>
                        </FormControl>
                    )}
                    {(list.holidays && list.holidays.length > 0) && (
                        <FormControl>
                            <FormLabel>휴무일</FormLabel>
                            <Text>
                                {list.holidays && list.holidays.map((holiday, index) => (
                                    <React.Fragment key={index}>
                                        {holiday.holiday}
                                        {index < list.holidays.length - 1 && ', '}
                                    </React.Fragment>
                                ))}
                            </Text>
                        </FormControl>
                    )}


                    {list.nightCare && (
                        <FormControl>
                            <FormLabel>야간영업</FormLabel>
                            <Checkbox isChecked={list.nightCare} isDisabled>야간영업을 하고있습니다</Checkbox>
                        </FormControl>
                    )}
                </CardBody>
            </Card>
            <HsComment businessId={id}/>
        </Box>
    );
}