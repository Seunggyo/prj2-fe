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
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function DsWrite() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
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
        navigate("/ds/list");
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

  return (
    <Box>
      <h1>약국 정보 기입</h1>
      <Box>
        <FormControl>
          <FormLabel>업체 명</FormLabel>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>

        <FormControl>
          <FormLabel>주소</FormLabel>
          <Input value={address} onChange={(e) => setAddress(e.target.value)} />
        </FormControl>

        <FormControl>
          <FormLabel>번호</FormLabel>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </FormControl>

        <FormControl>
          <Box>
            <Flex>
              <FormLabel>오픈 시간</FormLabel>
              <Box>
                <Flex>
                  <Select
                    defaultValue="7"
                    onChange={(e) => setOpenHour(e.target.value)}
                  >
                    <option value="7">7시</option>
                    <option value="8">8시</option>
                    <option value="9">9시</option>
                    <option value="10">10시</option>
                    <option value="11">11시</option>
                    <option value="12">12시</option>
                    <option value="13">13시</option>
                    <option value="14">14시</option>
                    <option value="15">15시</option>
                    <option value="16">16시</option>
                    <option value="17">17시</option>
                    <option value="18">18시</option>
                    <option value="19">19시</option>
                    <option value="20">20시</option>
                    <option value="21">21시</option>
                    <option value="22">22시</option>
                    <option value="23">23시</option>
                    <option value="24">24시</option>
                    <option value="01">01시</option>
                    <option value="02">02시</option>
                  </Select>
                  <Select
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
              </Box>
              <FormLabel mx="20px">마감 시간</FormLabel>
              <Box>
                <Flex>
                  <Select
                    defaultValue="16"
                    onChange={(e) => setCloseHour(e.target.value)}
                  >
                    <option value="7">7시</option>
                    <option value="8">8시</option>
                    <option value="9">9시</option>
                    <option value="10">10시</option>
                    <option value="11">11시</option>
                    <option value="12">12시</option>
                    <option value="13">13시</option>
                    <option value="14">14시</option>
                    <option value="15">15시</option>
                    <option value="16">16시</option>
                    <option value="17">17시</option>
                    <option value="18">18시</option>
                    <option value="19">19시</option>
                    <option value="20">20시</option>
                    <option value="21">21시</option>
                    <option value="22">22시</option>
                    <option value="23">23시</option>
                    <option value="00">00시</option>
                    <option value="01">01시</option>
                    <option value="02">02시</option>
                  </Select>
                  <Select
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
              </Box>
              <FormLabel mx="20px">야간 업무</FormLabel>
              <Flex>
                <Box>
                  <Flex>
                    <Checkbox
                      size="lg"
                      onChange={(e) => setNightCare(e.target.checked)}
                    />
                    <Text>야간 업무 진행시 체크해 주세요</Text>
                  </Flex>
                </Box>
              </Flex>
            </Flex>
            <FormControl>
              <Box>
                <Flex>
                  <FormLabel>휴식 시간</FormLabel>
                  <FormHelperText>
                    {/*TODO : 휴식 시간 체크 시 작성 칸 뜨게끔 수정해야 함*/}
                    휴식 시간이 없으시 선택안하시면 됩니다
                  </FormHelperText>
                  <Box>
                    <Flex>
                      <Select
                        defaultValue="0"
                        onChange={(e) => setRestHour(e.target.value)}
                      >
                        <option value="7">7시</option>
                        <option value="8">8시</option>
                        <option value="9">9시</option>
                        <option value="10">10시</option>
                        <option value="11">11시</option>
                        <option value="12">12시</option>
                        <option value="13">13시</option>
                        <option value="14">14시</option>
                        <option value="15">15시</option>
                        <option value="16">16시</option>
                        <option value="17">17시</option>
                        <option value="18">18시</option>
                        <option value="19">19시</option>
                        <option value="20">20시</option>
                        <option value="21">21시</option>
                        <option value="22">22시</option>
                        <option value="23">23시</option>
                        <option value="00">00시</option>
                        <option value="01">01시</option>
                        <option value="02">02시</option>
                      </Select>
                      <Select
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
                      ~
                      <Select
                        defaultValue="0"
                        onChange={(e) => setRestCloseHour(e.target.value)}
                      >
                        <option value="7">7시</option>
                        <option value="8">8시</option>
                        <option value="9">9시</option>
                        <option value="10">10시</option>
                        <option value="11">11시</option>
                        <option value="12">12시</option>
                        <option value="13">13시</option>
                        <option value="14">14시</option>
                        <option value="15">15시</option>
                        <option value="16">16시</option>
                        <option value="17">17시</option>
                        <option value="18">18시</option>
                        <option value="19">19시</option>
                        <option value="20">20시</option>
                        <option value="21">21시</option>
                        <option value="22">22시</option>
                        <option value="23">23시</option>
                        <option value="00">00시</option>
                        <option value="01">01시</option>
                        <option value="02">02시</option>
                      </Select>
                      <Select
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
                  </Box>
                </Flex>
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
              </Box>
            </FormControl>
          </Box>
        </FormControl>

        <FormControl>
          <FormLabel>약국 소개</FormLabel>
          <Textarea
            value={content}
            placeholder="300글자 이내로 작성해주세요"
            onChange={(e) => setContent(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>약국 정보</FormLabel>
          <Textarea
            value={info}
            placeholder="300글자 이내로 작성해주세요"
            onChange={(e) => setInfo(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>가게 사진</FormLabel>
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
      </Box>

      <Button
        colorScheme="blue"
        marginX="5px"
        onClick={handleSubmit}
        isDisabled={isSubmitting}
      >
        작성
      </Button>
      <Button colorScheme="red">취소</Button>
    </Box>
  );
}

export default DsWrite;
