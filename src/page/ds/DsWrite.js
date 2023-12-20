import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Textarea,
  Text,
  useToast,
  Center,
  Card,
  Heading,
  CardHeader,
  CardBody,
  CardFooter,
  Grid,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function DsWrite() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [oldAddress, setOldAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [openHour, setOpenHour] = useState(7);
  const [openMin, setOpenMin] = useState(0);
  const [closeHour, setCloseHour] = useState(7);
  const [closeMin, setCloseMin] = useState(0);
  const [restHour, setRestHour] = useState(0);
  const [restMin, setRestMin] = useState(0);
  const [restCloseHour, setRestCloseHour] = useState(0);
  const [restCloseMin, setRestCloseMin] = useState(0);
  const [holiday, setHoliday] = useState([]);
  const [nightCare, setNightCare] = useState(false);
  const [content, setContent] = useState("");
  const [info, setInfo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadFiles, setUploadFiles] = useState(null);

  const toast = useToast();
  const navigate = useNavigate();

  function handleSubmit() {
    setIsSubmitting(true);
    axios
      .postForm("/api/ds/add", {
        name,
        address,
        oldAddress,
        phone,
        openHour,
        openMin,
        closeHour,
        closeMin,
        restHour,
        restMin,
        restCloseHour,
        restCloseMin,
        holiday,
        nightCare,
        content,
        info,
        uploadFiles,
      })
      .then(() => {
        toast({
          description: "정보가 잘 저장되었습니다",
          status: "success",
        });
        navigate("/home/ds");
      })
      .catch((error) => {
        if (error.response.status === 400) {
          toast({
            description: "정보가 잘 입력되지 않았습니다",
            status: "error",
          });
        } else {
          toast({
            description: "저장 중에 문제가 발생하였습니다",
            status: "error",
          });
        }
      })
      .finally(() => setIsSubmitting(false));
  }

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

  return (
    <Center>
      <Card w={"lg"} boxShadow="lg" fontFamily="dongle">
        <CardHeader bg="green.200" textAlign="center" py={4}>
          <Heading fontSize="5xl" color="white" fontFamily="dongle">
            약국 정보 등록
          </Heading>
        </CardHeader>

        <CardBody>
          <FormControl mb={2}>
            <FormLabel fontSize="2xl">업체 명</FormLabel>
            <Input
              fontSize="2xl"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <FormControl mb={2}>
            <FormLabel fontSize="2xl">주소</FormLabel>
            <Input
              fontSize="2xl"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <FormLabel mb={2} fontSize="2xl">
              간단 주소
            </FormLabel>
            <Input
              fontSize="2xl"
              value={oldAddress}
              onChange={(e) => setOldAddress(e.target.value)}
              placeholder="동까지만 입력해주시면 됩니다 ex:)세종시 아람동"
            />
          </FormControl>

          <FormControl mb={2}>
            <FormLabel fontSize="2xl">번호</FormLabel>
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
                defaultValue="7"
                onChange={(e) => setOpenHour(e.target.value)}
              >
                {hour()}
              </Select>
              <Select
                fontSize="2xl"
                defaultValue="0"
                onChange={(e) => setOpenMin(e.target.value)}
              >
                <option value="0">0분</option>
                <option value="10">10분</option>
                <option value="20">20분</option>
                <option value="30">30분</option>
                <option value="40">40분</option>
                <option value="50">50분</option>
              </Select>
            </Flex>
            <FormLabel marginTop="10px" fontSize="2xl">
              마감시간
            </FormLabel>
            <Grid mt={3} ml={3} templateColumns={"repeat(2 , 1fr)"}>
              <FormLabel fontSize="2xl">시간</FormLabel>
              <FormLabel ml={3} fontSize="2xl">
                분
              </FormLabel>
            </Grid>
            <Flex>
              <Select
                fontSize="2xl"
                defaultValue="16"
                onChange={(e) => setCloseHour(e.target.value)}
              >
                {hour()};
              </Select>
              <Select
                fontSize="2xl"
                defaultValue="0"
                onChange={(e) => setCloseMin(e.target.value)}
              >
                <option value="0">0분</option>
                <option value="10">10분</option>
                <option value="20">20분</option>
                <option value="30">30분</option>
                <option value="40">40분</option>
                <option value="50">50분</option>
              </Select>
            </Flex>
            <FormControl mb={2} marginTop="10px">
              <Flex>
                <FormLabel fontSize="2xl">야간 업무</FormLabel>
                <Checkbox
                  size="lg"
                  onChange={(e) => setNightCare(e.target.checked)}
                />
                <FormHelperText marginX="8px" fontSize="xl">
                  야간 업무 진행시 체크해 주세요
                </FormHelperText>
              </Flex>
            </FormControl>
            <FormControl mb={2}>
              <Box>
                <Flex>
                  <FormLabel fontSize="2xl">휴식</FormLabel>
                  <FormHelperText fontSize="xl">
                    휴식 시간이 없으시 선택안하시면 됩니다
                  </FormHelperText>
                </Flex>
                <Grid mt={3} ml={3} templateColumns={"repeat(4 , 1fr)"}>
                  <FormLabel fontSize="2xl">시간</FormLabel>
                  <FormLabel ml={3} fontSize="2xl">
                    분
                  </FormLabel>
                  <FormLabel fontSize="2xl">시간</FormLabel>
                  <FormLabel ml={3} fontSize="2xl">
                    분
                  </FormLabel>
                </Grid>
                <FormControl>
                  <Flex>
                    <Select
                      fontSize="2xl"
                      defaultValue="0"
                      onChange={(e) => setRestHour(e.target.value)}
                    >
                      {hour()}
                    </Select>
                    <Select
                      fontSize="2xl"
                      defaultValue="0"
                      onChange={(e) => setRestMin(e.target.value)}
                    >
                      <option value="0">0분</option>
                      <option value="10">10분</option>
                      <option value="20">20분</option>
                      <option value="30">30분</option>
                      <option value="40">40분</option>
                      <option value="50">50분</option>
                    </Select>
                    <Text fontSize="2xl">{" ~ "}</Text>
                    <Select
                      fontSize="2xl"
                      defaultValue="0"
                      onChange={(e) => setRestCloseHour(e.target.value)}
                    >
                      {hour()}
                    </Select>
                    <Select
                      fontSize="2xl"
                      defaultValue="0"
                      onChange={(e) => setRestCloseMin(e.target.value)}
                    >
                      <option value="0">0분</option>
                      <option value="10">10분</option>
                      <option value="20">20분</option>
                      <option value="30">30분</option>
                      <option value="40">40분</option>
                      <option value="50">50분</option>
                    </Select>
                  </Flex>
                </FormControl>
                <FormControl marginTop="10px">
                  <FormLabel fontSize="2xl">휴무일</FormLabel>
                  <CheckboxGroup
                    value={holiday}
                    onChange={(e) => setHoliday(e)}
                  >
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
              </Box>
            </FormControl>
          </FormControl>

          <FormControl>
            <FormLabel fontSize="2xl">약국 소개</FormLabel>
            <Textarea
              fontSize="2xl"
              value={content}
              placeholder="300글자 이내로 작성해주세요"
              onChange={(e) => setContent(e.target.value)}
            />
          </FormControl>

          <FormControl marginTop="10px">
            <FormLabel fontSize="2xl">약국 정보</FormLabel>
            <Textarea
              fontSize="2xl"
              value={info}
              placeholder="300글자 이내로 작성해주세요"
              onChange={(e) => setInfo(e.target.value)}
            />
          </FormControl>

          <FormControl marginTop="10px">
            <FormLabel fontSize="2xl">약국 사진</FormLabel>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                setUploadFiles(e.target.files);
              }}
            />
            <FormHelperText>
              한 개 파일은 1MB 이내, 총 파일은 10MB 이내로 첨부 가능합니다
            </FormHelperText>
          </FormControl>
        </CardBody>

        <CardFooter>
          <Flex>
            <Button
              colorScheme="teal"
              marginX="5px"
              onClick={handleSubmit}
              isDisabled={isSubmitting}
              marginLeft="350px"
            >
              작성
            </Button>
            <Button colorScheme="red" marginLeft="4">
              취소
            </Button>
          </Flex>
        </CardFooter>
      </Card>
    </Center>
  );
}

export default DsWrite;
