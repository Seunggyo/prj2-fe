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
  FormHelperText,
  FormLabel,
  Grid,
  Heading,
  Input,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function HsAdd() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [oldAddress, setOldAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [openHour, setOpenHour] = useState(0);
  const [openMin, setOpenMin] = useState(0);
  const [restHour, setRestHour] = useState(0);
  const [restMin, setRestMin] = useState(0);
  const [restCloseHour, setRestCloseHour] = useState(0);
  const [restCloseMin, setRestCloseMin] = useState(0);
  const [info, setInfo] = useState("");
  const [closeHour, setCloseHour] = useState(0);
  const [closeMin, setCloseMin] = useState(0);
  const [course, setCourse] = useState([]);
  const [content, setContent] = useState("");
  const [holiday, setHoliday] = useState([]);
  const [homePage, setHomePage] = useState("");
  const [hsFiles, setHsFiles] = useState(null);
  const [nightCare, setNightCare] = useState(0);

  const toast = useToast();

  const navigate = useNavigate();

  const hour = () => {
    const result = [];
    for (let i = 0; i < 25; i++) {
      result.push(
        <option value={i} key={i}>
          {i}
        </option>,
      );
    }
    return result;
  };

  function handleClickSubmit() {
    axios
      .postForm("/api/hospital/add", {
        name,
        address,
        oldAddress,
        phone,
        openHour,
        openMin,
        restHour,
        restMin,
        restCloseHour,
        restCloseMin,
        closeHour,
        closeMin,
        course,
        content,
        info,
        holiday,
        homePage,
        hsFiles,
        nightCare,
      })
      .then(() => {
        toast({
          description: "전송 되었습니다.",
          status: "success",
        });
        navigate("/home/hospital/hospitalList");
      })
      .catch(() =>
        toast({
          description: "전송에 실패하였습니다.",
          status: "error",
        }),
      );
  }

  function handleCourseChange(e) {
    setCourse(e);
  }

  return (
    <Center>
      <Card w={"lg"} boxShadow="lg" fontFamily="dongle">
        <CardHeader bg="blue.200" textAlign="center" py={4}>
          <Heading fontSize="5xl" color="white" fontFamily="dongle">
            병원 정보 등록
          </Heading>
        </CardHeader>
        <CardBody>
          <FormControl mb={2}>
            <FormLabel fontSize="2xl">병원명</FormLabel>
            <Input
              fontSize="2xl"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl mb={2}>
            <FormLabel fontSize="2xl">병원 주소</FormLabel>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <FormLabel fontSize="2xl">병원 간단주소</FormLabel>
            <Input
              fontSize="2xl"
              value={oldAddress}
              onChange={(e) => setOldAddress(e.target.value)}
              placeholder="동까지만 입력해주시면 됩니다 ex:)세종시 아람동"
            />
          </FormControl>
          <FormControl mb={2}>
            <FormLabel fontSize="2xl">전화번호</FormLabel>
            <Input
              fontSize="2xl"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </FormControl>
          <FormControl mb={2}>
            <FormLabel fontSize="2xl">오픈시간</FormLabel>
            <Grid mt={3} ml={3} templateColumns={"repeat(2 , 1fr)"}>
              <FormLabel fontSize="2xl">시간</FormLabel>
              <FormLabel ml={3} fontSize="2xl">
                분
              </FormLabel>
            </Grid>
            <Flex>
              <Select
                fontSize="2xl"
                onChange={(e) => setOpenHour(e.target.value)}
                w={"sm"}
                placeholder="시간"
                value={openHour}
              >
                {hour()}
              </Select>
              <Select
                fontSize="2xl"
                onChange={(e) => setOpenMin(e.target.value)}
                value={openMin}
                w={"sm"}
                placeholder="분"
              >
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
          <FormControl mb={2}>
            <Flex>
              <FormLabel fontSize="2xl">휴게시간</FormLabel>
              <FormHelperText>
                휴식 시간이 없으시 선택안하시면 됩니다
              </FormHelperText>
            </Flex>
            <Grid mt={3} ml={3} templateColumns={"repeat(4 , 1fr)"}>
              <FormLabel fontSize="2xl">시작 시간</FormLabel>
              <FormLabel ml={3} fontSize="2xl">
                분
              </FormLabel>
              <FormLabel fontSize="2xl">끝나는 시간</FormLabel>
              <FormLabel ml={3} fontSize="2xl">
                분
              </FormLabel>
            </Grid>
            <Flex marginRight="8px">
              <Select
                onChange={(e) => setRestHour(e.target.value)}
                w={"sm"}
                placeholder="시간"
                value={restHour}
                defaultValue={0}
                fontSize="2xl"
              >
                {hour()}
              </Select>
              <Select
                onChange={(e) => setRestMin(e.target.value)}
                value={restMin}
                w={"sm"}
                placeholder="분"
                marginRight="7px"
                fontSize="2xl"
              >
                <option value={0}>00</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={40}>40</option>
                <option value={50}>50</option>
                <option value={60}>60</option>
              </Select>

              <Select
                onChange={(e) => setRestCloseHour(e.target.value)}
                w={"sm"}
                placeholder="시간"
                value={restCloseHour}
                defaultValue={0}
                fontSize="2xl"
              >
                {hour()}
              </Select>
              <Select
                onChange={(e) => setRestCloseMin(e.target.value)}
                value={restCloseMin}
                w={"sm"}
                placeholder="분"
                fontSize="2xl"
              >
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
          <FormControl mb={2}>
            <FormLabel fontSize="2xl">마감시간</FormLabel>
            <Grid mt={3} ml={3} templateColumns={"repeat(2 , 1fr)"}>
              <FormLabel fontSize="2xl">시간</FormLabel>
              <FormLabel ml={3} fontSize="2xl">
                분
              </FormLabel>
            </Grid>
            <Flex>
              <Select
                fontSize="2xl"
                value={closeHour}
                onChange={(e) => setCloseHour(e.target.value)}
                w={"sm"}
                placeholder="시간"
              >
                {hour()}
              </Select>
              <Select
                fontSize="2xl"
                value={closeMin}
                w={"sm"}
                placeholder="분"
                onChange={(e) => setCloseMin(e.target.value)}
              >
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
          <FormControl mb={2}>
            <Flex>
              <FormLabel fontSize="2xl">야간영업</FormLabel>
              <Checkbox
                value={nightCare}
                onChange={(e) => setNightCare(e.target.checked)}
              >
                야간영업을 하시면 체크 해주세요
              </Checkbox>
            </Flex>
          </FormControl>
          <FormControl mb={2}>
            <FormLabel fontSize="2xl">진료과목</FormLabel>
            <Flex>
              <CheckboxGroup value={course} onChange={handleCourseChange}>
                <Checkbox value="소아과">소아과</Checkbox>
                <Checkbox value="내과">내과</Checkbox>
                <Checkbox value="외과">외과</Checkbox>
                <Checkbox value="치과">치과</Checkbox>
              </CheckboxGroup>
            </Flex>
          </FormControl>
          <FormControl mb={2}>
            <FormLabel fontSize="2xl">휴무일</FormLabel>
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

          <FormControl mb={2}>
            <FormLabel fontSize="2xl">병원 소개</FormLabel>
            <Textarea
              placeholder="300글자 이내로 작성해주세요"
              fontSize="2xl"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </FormControl>
          <FormControl mb={2}>
            <FormLabel fontSize="2xl">병원 정보</FormLabel>
            <Textarea
              placeholder="300글자 이내로 작성해주세요"
              fontSize="2xl"
              value={info}
              onChange={(e) => setInfo(e.target.value)}
            />
          </FormControl>
          <FormControl mb={2}>
            <FormLabel fontSize="2xl">홈페이지</FormLabel>
            <Input
              placeholder="https:// 가 포함된 주소로 적어주세요"
              fontSize="2xl"
              value={homePage}
              onChange={(e) => setHomePage(e.target.value)}
            />
          </FormControl>
          <FormControl mb={2}>
            <FormLabel fontSize="2xl">병원 사진</FormLabel>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setHsFiles(e.target.files)}
            />
          </FormControl>
        </CardBody>
        <CardFooter>
          <Button onClick={handleClickSubmit} colorScheme="twitter">
            저장
          </Button>
          <Button colorScheme="red" marginLeft="4">
            취소
          </Button>
        </CardFooter>
      </Card>
    </Center>
  );
}
