import {
  Box,
  Button,
  Card,
  CardHeader,
  Center,
  Checkbox,
  Flex,
  FormLabel,
  Heading,
  Image,
  Spinner,
  Table,
  Td,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import {
  faCommentDots,
  faHeart as fullHeart,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../component/LoginProvider";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function LikeContainer({ like, onClick }) {
  const { isAuthenticated } = useContext(LoginContext);
  if (like === null) {
    return <Spinner />;
  }

  return (
    <Flex>
      <Tooltip isDisabled={isAuthenticated()} hasArrow label={"로그인 하세요"}>
        <Button variant="ghost" size="xl" onClick={onClick}>
          {/*<FontAwesomeIcon icon={faHeart} size="xl" />*/}
          {like.like && (
            <FontAwesomeIcon icon={fullHeart} size="xl" color="red" />
          )}
          {like.like || (
            <FontAwesomeIcon icon={emptyHeart} size="xl" color="red" />
          )}
        </Button>
      </Tooltip>
      <Heading color="red" size="lg">
        {like.countLike}
      </Heading>
    </Flex>
  );
}

export function HsView({ hsId }) {
  const [list, setList] = useState([]);
  const [like, setLike] = useState(null);
  const { id } = useParams();
  const [currentImageShowIndex, setCurrentImageShowIndex] = useState(0);
  const navigate = useNavigate();

  const realId = hsId || id;
  const imageShowLength = list.files ? list.files.length : 0;

  useEffect(() => {
    if (imageShowLength > 0) {
      const interval = setInterval(() => {
        setCurrentImageShowIndex((c) => (c + 1) % imageShowLength);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [list]);

  useEffect(() => {
    if (realId) {
      axios.get("/api/hospital/id/" + realId).then((r) => setList(r.data));
    }
  }, [realId]);
  useEffect(() => {
    if (realId) {
      axios
        .get("/api/hospital/like/hospital/" + realId)
        .then((r) => setLike(r.data));
    }
  }, [realId]);

  if (realId === undefined || id === null) {
    return <Spinner />;
  }

  function handleLikeClick() {
    axios
      .post("/api/hospital/like", { businessId: list.id })
      .then((r) => setLike(r.data))
      .catch(() => console.log("bad"))
      .finally(() => console.log("done"));
  }

  return (
    <Table>
      <Card w="370px">
        <CardHeader>
          <Center className="font-dongle text-5xl">{list.name}</Center>
        </CardHeader>
        <Box
          w="100%"
          h="200px"
          sx={{ marginTop: "20px", marginBottom: "20px" }}
          position="relative"
        >
          {list.files &&
            list.files.map((file, index) => (
              <Box
                key={file.id}
                position="absolute"
                opacity={currentImageShowIndex === index ? 1 : 0}
                transition="opacity 0.5s"
              >
                <Image
                  src={file.url}
                  alt={file.name}
                  width="350px"
                  height="200px"
                />
              </Box>
            ))}
        </Box>
        <Flex color="white" w="100%" h="100px">
          <Center w="33%" color="black" borderTop="1px solid lightgrey">
            <Text fontSize="2xl">정보</Text>
          </Center>
          <Center
            w="33%"
            size="150px"
            border="1px solid lightgrey"
            borderBottom="none"
          >
            <LikeContainer like={like} onClick={handleLikeClick} />
          </Center>
          <Center w="33%" color="black" borderTop="1px solid lightgrey">
            <Text fontSize="2xl">리뷰</Text>
          </Center>
        </Flex>
        <Button
          border="1px solid lightgrey"
          bg="white"
          width="100%"
          height="50px"
          marginTop="10px"
          marginRight="55px"
          marginBottom="10px"
          fontSize="1.5xl"
          onClick={() => navigate("/home/cs/qaList")}
        >
          <FontAwesomeIcon icon={faCommentDots} size="lg" />
          문의
        </Button>

        <Td>
          <FormLabel fontWeight="bold" fontSize="21px" color="grey">
            병원 주소
          </FormLabel>
          <Text>{list.address}</Text>
        </Td>
        <Td>
          <Flex>
            <FormLabel fontWeight="bold" fontSize="18px" color="grey">
              전화번호
            </FormLabel>
            <Text>{list.phone} </Text>
          </Flex>
        </Td>
        <Td>
          <Flex>
            <FormLabel fontWeight="bold" fontSize="18px" color="grey">
              오픈시간
            </FormLabel>
            <Text>{list.openHour}시</Text>
            <Text>
              {list.openMin === 0 ? "0" + list.openMin : list.openMin}분
            </Text>
          </Flex>
        </Td>
        {list.restHour !== 0 && (
          <Td>
            <Flex>
              <FormLabel fontWeight="bold" fontSize="18px" color="grey">
                휴게시간
              </FormLabel>
              <Text>{list.restHour} 시</Text>
              <Text>
                {list.restMin === 0 ? "0" + list.restMin : list.restMin} 분
              </Text>
              <FormLabel marginLeft="10px">~</FormLabel>
              <Text>{list.restCloseHour} 시</Text>
              <Text>
                {list.restCloseMin === 0
                  ? "0" + list.restCloseMin
                  : list.restCloseMin}{" "}
                분
              </Text>
            </Flex>
          </Td>
        )}
        <Td>
          <Flex>
            <FormLabel fontWeight="bold" fontSize="18px" color="grey">
              마감시간
            </FormLabel>
            <Text>{list.closeHour}시</Text>
            <Text>
              {list.closeMin === 0 ? "0" + list.closeMin : list.closeMin}분
            </Text>
            <FormLabel
              marginLeft="30px"
              fontWeight="bold"
              fontSize="18px"
              color="grey"
            >
              야간영업
            </FormLabel>
            <Checkbox size="lg" isChecked={list.nightCare}></Checkbox>
          </Flex>
        </Td>
        <Td>
          <FormLabel fontWeight="bold" fontSize="18px" color="grey">
            상세정보
          </FormLabel>
          <Text>{list.content}</Text>
        </Td>
        <Td>
          <FormLabel fontWeight="bold" fontSize="18px" color="grey">
            홈페이지
          </FormLabel>
          <a href={list.homePage} target="_blank">
            {list.homePage}
          </a>
        </Td>
        {list.medicalCourse !== null && (
          <Td>
            <Flex>
              <FormLabel fontWeight="bold" fontSize="18px" color="grey">
                진료과목
              </FormLabel>
              {list.medicalCourse &&
                list.medicalCourse.map((medicalCourse, index) => (
                  <React.Fragment key={index}>
                    {medicalCourse.medicalCourseCategory}
                    {index < list.medicalCourse.length - 1 && ", "}
                  </React.Fragment>
                ))}
            </Flex>
          </Td>
        )}
        {(list.holidays !== null || list.holidays.length > 0) && (
          <Td display={list.holidays === [] ? "none" : "block"}>
            <Flex>
              <FormLabel fontWeight="bold" fontSize="18px" color="grey">
                휴무일
              </FormLabel>
              <Text>
                {list.holidays &&
                  list.holidays.map((holiday, index) => (
                    <React.Fragment key={index}>
                      {holiday.holiday}
                      {index < list.holidays.length - 1 && ", "}
                    </React.Fragment>
                  ))}
              </Text>
            </Flex>
          </Td>
        )}

        <Td>
          <Flex>
            <FormLabel fontWeight="bold" fontSize="18px" color="grey">
              야간영업
            </FormLabel>
            <Checkbox isChecked={list.nightCare}></Checkbox>
          </Flex>
        </Td>
      </Card>
    </Table>
  );
}
