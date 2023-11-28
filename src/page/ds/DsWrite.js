import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Textarea,
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
  const [closeHour, setCloseHour] = useState(16);
  const [closeMin, setCloseMin] = useState(0);
  const [businessLi, setBusinessLi] = useState(null);
  const [nightCare, setNightCare] = useState(false);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        businessLi,
        nightCare,
        content,
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
                    defaultValue="7시"
                    onChange={(e) => setOpenHour(e.target.value)}
                  >
                    <option value="7시">7시</option>
                    <option value="8시">8시</option>
                    <option value="9시">9시</option>
                    <option value="10시">10시</option>
                    <option value="11시">11시</option>
                    <option value="12시">12시</option>
                  </Select>
                  <Select
                    defaultValue="0분"
                    onChange={(e) => setOpenMin(e.target.value)}
                  >
                    <option value="0분">0분</option>
                    <option value="10분">10분</option>
                    <option value="20분">20분</option>
                    <option value="30분">30분</option>
                    <option value="40분">40분</option>
                    <option value="50분">50분</option>
                  </Select>
                </Flex>
              </Box>
              <FormLabel mx="20px">마감 시간</FormLabel>
              <Box>
                <Flex>
                  <Select
                    defaultValue="16시"
                    onChange={(e) => setCloseHour(e.target.value)}
                  >
                    <option value="16시">16시</option>
                    <option value="17시">17시</option>
                    <option value="18시">18시</option>
                    <option value="19시">19시</option>
                    <option value="20시">20시</option>
                  </Select>
                  <Select
                    defaultValue="0분"
                    onChange={(e) => setCloseMin(e.target.value)}
                  >
                    <option value="0분">0분</option>
                    <option value="10분">10분</option>
                    <option value="20분">20분</option>
                    <option value="30분">30분</option>
                    <option value="40분">40분</option>
                    <option value="50분">50분</option>
                  </Select>
                </Flex>
              </Box>
              <FormLabel mx="20px">야간 업무</FormLabel>
              <Flex>
                <Box>
                  <Checkbox
                    size="lg"
                    onChange={(e) => setNightCare(e.target.checked)}
                  />
                </Box>
              </Flex>
            </Flex>
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
          <FormLabel>사업자 등록증</FormLabel>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setBusinessLi(e.target.files[0]);
              console.log(e.target.files[0]);
            }}
          />
          <FormHelperText>파일은 1MB 미만인 파일만 가능합니다</FormHelperText>
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
