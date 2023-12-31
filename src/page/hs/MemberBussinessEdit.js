import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Checkbox,
  CheckboxGroup,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
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
  Switch,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useImmer } from "use-immer";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../component/LoginProvider";
import { FaBookmark, FaTimes } from "react-icons/fa";
import { HsEdit } from "./HsEdit";

export function MemberBusinessEdit() {
  const [list, updateList] = useImmer([]);
  const { id } = useParams();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();
  const [removeFileIds, setRemoveFileIds] = useState([]);
  const [uploadFiles, setUploadFiles] = useState(null);
  const [holiday, setHoliday] = useState([]);
  const [course, setCourse] = useState([]);
  const [params] = useSearchParams();
  const { authCheck } = useContext(LoginContext);
  const [dsList, updateDsList] = useImmer([]);

  useEffect(() => {
    if (authCheck() === "hs") {
      axios.get(`/api/hospital/get?${params}`).then((r) => {
        if (r.data.length === 0 || r.data === null) {
          updateList(null);
        } else {
          updateList(r.data);
          setHoliday(r.data.holidays.map((i) => i.holiday));
          setCourse(r.data.medicalCourse.map((i) => i.medicalCourseCategory));
        }
      });
    }
    if (authCheck() === "ds") {
      axios.get(`/api/ds/get?${params}`).then((r) => {
        if (r.data.length === 0) {
          updateList(null);
        } else {
          updateList(r.data);
          setHoliday(r.data.holidays.map((i) => i.holiday));
        }
      });
    }
  }, []);

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

  function handleNameChange(e) {
    updateList((r) => {
      r.name = e.target.value;
    });
  }

  function handleAddressChange(e) {
    updateList((r) => {
      r.address = e.target.value;
    });
  }

  function handlePhoneChange(e) {
    updateList((r) => {
      r.phone = e.target.value;
    });
  }

  function handleOpenHourChange(e) {
    updateList((r) => {
      r.openHour = e.target.value;
    });
  }

  function handleRestHourChange(e) {
    updateList((r) => {
      r.restHour = e.target.value;
    });
  }

  function handleRestMinChange(e) {
    updateList((r) => {
      r.restMin = e.target.value;
    });
  }

  function handleCloseHourChange(e) {
    updateList((r) => {
      r.closeHour = e.target.value;
    });
  }

  function handleOpenMinChange(e) {
    updateList((r) => {
      r.openMin = e.target.value;
    });
  }

  function handleCloseMinChange(e) {
    void updateList((r) => {
      r.closeMin = e.target.value;
    });
  }

  function handleContentChange(e) {
    updateList((draft) => {
      draft.content = e.target.value;
    });
  }

  function handleHomePageChange(e) {
    updateList((r) => {
      r.homePage = e.target.value;
    });
  }

  function handleNightChange(e) {
    updateList((r) => {
      r.nightCare = e.target.checked;
    });
  }

  function handleSubmitClick() {
    if (list.category === "hospital") {
      axios
        .putForm("/api/hospital/edit", {
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
          oldAddress: list.oldAddress,
          holiday,
          course,
          uploadFiles,
          removeFileIds,
        })
        .then(() => {
          toast({
            description: "수정이 완료되었습니다.",
            status: "success",
          });
          navigate(-1);
        })
        .catch(() => {
          toast({
            description: "문제가 발생하였습니다.",
            status: "error",
          });
        })
        .finally(() => onClose);
    }

    if (list.category === "drugStore") {
      axios
        .putForm("/api/ds/edit", {
          id: list.id,
          name: list.name,
          address: list.address,
          oldAddress: list.oldAddress,
          phone: list.phone,
          openHour: list.openHour,
          openMin: list.openMin,
          closeHour: list.closeHour,
          closeMin: list.closeMin,
          nightCare: list.nightCare,
          content: list.content,
          restHour: list.restHour,
          restMin: list.restMin,
          restCloseHour: list.restCloseHour,
          restCloseMin: list.restCloseMin,
          updateHolidays: holiday,
          info: list.info,
          uploadFile: uploadFiles,
          deleteFileIds: removeFileIds,
        })
        .then(
          () =>
            toast({
              description: list.id + "번 게시글이 수정되었습니다",
              status: "success",
            }),
          navigate(-1),
        )
        .catch((error) => {
          if (error.response.status === 400) {
            toast({
              description: "요청이 잘못 되었습니다",
              status: "error",
            });
          } else {
            toast({
              description: "수정 중에 문제가 발생하였습니다",
              status: "error",
            });
          }
        })
        .finally(() => onClose());
    }
  }

  function handleRemoveFileSwitch(e) {
    if (e.target.checked) {
      setRemoveFileIds([...removeFileIds, e.target.value]);
    } else {
      setRemoveFileIds(removeFileIds.filter((item) => item !== e.target.value));
    }
  }

  function handleRestCloseMinChange(e) {
    updateList((r) => {
      r.restCloseMin = e.target.value;
    });
  }

  function handleRestCloseHourChange(e) {
    updateList((r) => {
      r.restCloseHour = e.target.value;
    });
  }

  function handleOldAddressChange(e) {
    updateList((r) => {
      r.oldAddress = e.target.value;
    });
  }

  function handleInfoChange(e) {
    updateList((r) => {
      r.info = e.target.value;
    });
  }

  return list === null ? (
    <Box>
      <Text fontSize={"xl"}>
        데이터가 없습니다. 우선 정보 등록이 필요합니다.
      </Text>
    </Box>
  ) : (
    <Center>
      <Card w={"xl"} boxShadow="lg" fontFamily="dongle">
        <CardHeader bg="blue.200" textAlign="center" py={4}>
          <Heading fontSize="5xl" color="white" fontFamily="dongle">
            기관 정보 수정
          </Heading>
        </CardHeader>
        <CardBody>
          <FormControl mb={4}>
            <FormLabel fontSize="2xl">기관명</FormLabel>
            <Input value={list.name} onChange={handleNameChange} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel fontSize={"2xl"}>기관 주소</FormLabel>
            <Input value={list.address} onChange={handleAddressChange} />
            <FormLabel fontSize="2xl">기관 간단주소</FormLabel>
            <Input
              value={list.oldAddress}
              onChange={handleOldAddressChange}
              placeholder="동까지만 입력해주시면 됩니다 ex:)세종시 아람동"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel fontSize={"2xl"}>전화번호</FormLabel>
            <Input value={list.phone} onChange={handlePhoneChange} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel fontSize={"2xl"}>오픈시간</FormLabel>
            <Grid mt={3} ml={3} templateColumns={"repeat(2 , 1fr)"}>
              <FormLabel fontSize="2xl">시간</FormLabel>
              <FormLabel ml={3} fontSize="2xl">
                분
              </FormLabel>
            </Grid>
            <Flex>
              <Select
                onChange={handleOpenHourChange}
                w={"sm"}
                placeholder="시간"
                value={list.openHour}
                fontSize="2xl"
              >
                {hour()}
              </Select>
              <Select
                onChange={handleOpenMinChange}
                value={list.openMin}
                w={"sm"}
                placeholder="분"
                fontSize={"2xl"}
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
          <FormControl mb={4}>
            <FormLabel fontSize="2xl">휴게시간</FormLabel>
            <Grid templateColumns={"repeat(4, 1fr)"}>
              <FormLabel fontSize="2xl">시작 시간</FormLabel>
              <FormLabel ml={2} fontSize="2xl">
                분
              </FormLabel>
              <FormLabel ml={2} fontSize="2xl">
                종료시간
              </FormLabel>
              <FormLabel ml={3} fontSize="2xl">
                분
              </FormLabel>
            </Grid>
            <Flex>
              <Select
                onChange={handleRestHourChange}
                w={"sm"}
                placeholder="시간"
                value={list.restHour}
                fontSize={"2xl"}
              >
                {hour()}
              </Select>

              <Select
                onChange={handleRestMinChange}
                value={list.restMin}
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

              <Select
                onChange={handleRestCloseHourChange}
                w={"sm"}
                placeholder="시간"
                value={list.restCloseHour}
                fontSize="2xl"
              >
                {hour()}
              </Select>

              <Select
                onChange={handleRestCloseMinChange}
                value={list.restCloseMin}
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
          <FormControl>
            <FormLabel fontSize="2xl">마감시간</FormLabel>
            <Grid mt={3} ml={3} templateColumns={"repeat(2 , 1fr)"}>
              <FormLabel fontSize="2xl">시간</FormLabel>
              <FormLabel ml={3} fontSize="2xl">
                분
              </FormLabel>
            </Grid>
            <Flex>
              <Select
                value={list.closeHour}
                onChange={handleCloseHourChange}
                w={"sm"}
                placeholder="시간"
                fontSize={"2xl"}
              >
                {hour()}
              </Select>

              <Select
                value={list.closeMin}
                w={"sm"}
                placeholder="분"
                onChange={handleCloseMinChange}
                fontSize={"2xl"}
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
          <FormControl>
            <FormLabel fontSize="2xl">기관 정보</FormLabel>
            <Textarea
              value={list.content}
              onChange={handleContentChange}
              fontSize="2xl"
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize="2xl">기관 특징</FormLabel>
            <Textarea
              value={list.info}
              onChange={handleInfoChange}
              fontSize="2xl"
            />
          </FormControl>
          {authCheck() === "hs" && (
            <FormControl>
              <FormLabel fontSize="2xl">홈페이지</FormLabel>
              <Input
                value={list.homePage}
                onChange={handleHomePageChange}
                fontSize="2xl"
              />
            </FormControl>
          )}

          {authCheck() === "hs" && (
            <FormControl>
              <FormLabel fontSize="2xl">진료과목</FormLabel>
              <Flex>
                <CheckboxGroup
                  fontSize="2xl"
                  value={course}
                  onChange={(e) => setCourse(e)}
                >
                  <Checkbox value="소아과">소아과</Checkbox>
                  <Checkbox value="내과">내과</Checkbox>
                  <Checkbox value="외과">외과</Checkbox>
                  <Checkbox value="치과">치과</Checkbox>
                </CheckboxGroup>
              </Flex>
            </FormControl>
          )}
          <FormControl>
            <FormLabel fontSize="2xl">휴무일</FormLabel>
            <CheckboxGroup
              fontSize="2xl"
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
        </CardBody>
      </Card>

      <Card w={"xl"} boxShadow="lg" fontFamily="dongle">
        <CardBody>
          {list.files != null &&
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
            <FormLabel fontSize="2xl">이미지</FormLabel>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setUploadFiles(e.target.files)}
            />
            <FormHelperText fontSize="2xl">
              한 개 파일은 3MB, 총 용량은 30MB 이내로 첨부하세요.
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel fontSize="2xl">야간영업</FormLabel>
            <Checkbox
              isChecked={list.nightCare}
              value={list.nightCare}
              onChange={handleNightChange}
              fontSize="2xl"
            >
              야간영업을 하시면 체크 해주세요
            </Checkbox>
          </FormControl>
        </CardBody>
        <CardFooter>
          <Flex>
            <Button
              onClick={onOpen}
              leftIcon={<FaBookmark />}
              colorScheme="teal"
              marginX="5px"
            >
              저장
            </Button>
            <Button
              leftIcon={<FaTimes />}
              onClick={() => navigate(-1)}
              marginLeft="4"
              colorScheme="blue"
              marginRight="15px"
            >
              취소
            </Button>
          </Flex>
        </CardFooter>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>저장</ModalHeader>
          <ModalCloseButton />

          <ModalBody>저장 하시겠습니까?</ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>닫기</Button>
            <Button onClick={handleSubmitClick} colorScheme="twitter">
              저장
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
}
