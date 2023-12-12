import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Spinner,
  Switch,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as fullHeart,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../component/LoginProvider";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { useImmer } from "use-immer";
import { useParams } from "react-router-dom";

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
          {like.like && <FontAwesomeIcon icon={fullHeart} size="xl" />}
          {like.like || <FontAwesomeIcon icon={emptyHeart} size="xl" />}
        </Button>
      </Tooltip>
      <Heading size="lg">{like.countLike}</Heading>
    </Flex>
  );
}

export function HsView({ hsId }) {
  const [list, setList] = useState([]);
  const [like, setLike] = useState(null);
  const { id } = useParams();

  const realId = hsId || id;

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
    <Box>
      <Card>
        <CardHeader>
          <Heading>병원 정보 수정</Heading>
          <LikeContainer like={like} onClick={handleLikeClick} />
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
              <Text>{list.openHour}시</Text>
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
                <Text>{list.restCloseHour} 시</Text>
                <Text>
                  {list.restCloseMin === 0
                    ? "0" + list.restCloseMin
                    : list.restCloseMin}{" "}
                  분
                </Text>
              </Flex>
            </FormControl>
          )}
          <FormControl>
            <FormLabel>마감시간</FormLabel>
            <Flex>
              <Text>{list.closeHour}시</Text>

              <Text>
                {list.closeMin === 0 ? "0" + list.closeMin : list.closeMin}분
              </Text>
            </Flex>
          </FormControl>
          <FormControl>
            <FormLabel>상세정보</FormLabel>
            <Text>{list.content}</Text>
          </FormControl>
          <FormControl>
            <FormLabel>홈페이지</FormLabel>
            <Text>{list.homePage}</Text>
          </FormControl>
          {list.medicalCourse !== null && (
            <FormControl>
              <FormLabel>진료과목</FormLabel>
              {list.medicalCourse}
            </FormControl>
          )}
          {(list.holidays !== null || list.holidays.length > 0) && (
            <FormControl>
              <FormLabel>휴무일</FormLabel>
              <Text>
                {list.holidays &&
                  list.holidays.map((holiday, index) => (
                    <React.Fragment key={index}>
                      {holiday.holiday}
                      {index < list.holidays.length - 1 && ", "}
                    </React.Fragment>
                  ))}
              </Text>
            </FormControl>
          )}
          {list.files?.length > 0 &&
            list.files.map((file) => (
              <Card
                key={file.id}
                sx={{ marginTop: "20px", marginBottom: "20px" }}
              >
                <CardBody>
                  <Image src={file.url} alt={file.name} width="100%" />
                </CardBody>
                <Divider />
                <CardFooter>
                  <FormControl display="flex" alignItems={"center"} gap={2}>
                    <FormLabel colorScheme="red" m={0} p={0}>
                      <FontAwesomeIcon color="red" icon={faTrashCan} />
                    </FormLabel>
                    <Switch value={file.id} colorScheme="red" />
                  </FormControl>
                </CardFooter>
              </Card>
            ))}

          <FormControl>
            <FormLabel>야간영업</FormLabel>
            <Checkbox isChecked={list.nightCare}>
              야간영업을 하시면 체크 해주세요
            </Checkbox>
          </FormControl>
        </CardBody>
      </Card>
    </Box>
  );
}
