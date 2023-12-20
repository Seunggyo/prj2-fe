import {
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
  Spinner,
  Switch,
  Textarea,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useImmer } from "use-immer";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  faHeart as fullHeart,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoginContext } from "../../component/LoginProvider";
import { FaBookmark, FaTimes } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

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

export function HsEdit() {
  const [list, updateList] = useImmer([]);
  const { id } = useParams();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onClose: onDeleteClose,
    onOpen: onDeleteOpen,
  } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();
  const [removeFileIds, setRemoveFileIds] = useState([]);
  const [uploadFiles, setUploadFiles] = useState(null);
  const [holiday, setHoliday] = useState([]);
  const [course, setCourse] = useState([]);
  const [like, setLike] = useState(null);
  const { isAuthenticated } = useContext(LoginContext);

  useEffect(() => {
    axios.get("/api/hospital/id/" + id).then((r) => {
      updateList(r.data);
      setHoliday(r.data.holidays.map((i) => i.holiday));
      setCourse(r.data.medicalCourse.map((i) => i.medicalCourseCategory));
    });
  }, []);
  useEffect(() => {
    axios.get("/api/hospital/like/hospital/" + id).then((r) => setLike(r.data));
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

  function handleOldAddressChange(e) {
    updateList((r) => {
      r.oldAddress = e.target.value;
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
    axios
      .putForm("/api/hospital/edit", {
        id: list.id,
        name: list.name,
        address: list.address,
        oldAddress: list.oldAddress,
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

  function handleDelete() {
    axios
      .delete("/api/hospital/delete/" + id)
      .then((response) => {
        toast({
          description: id + "번 정보가 삭제되었습니다",
          status: "success",
        });
        navigate("/home/hospital/hospitalList");
      })
      .catch((error) => {
        toast({
          description: "삭제 중 문제가 발생하였습니다.",
          status: "error",
        });
      })
      .finally(() => onClose());
  }

  return (
    <Center>
      <Card w={"xl"} boxShadow="lg" fontFamily="dongle">
        <CardHeader bg="blue.200" textAlign="center" py={4}>
          <Heading fontSize="5xl" color="white" fontFamily="dongle">
            병원 정보 수정
          </Heading>
        </CardHeader>
        <CardBody>
          <FormControl mb={4}>
            <FormLabel fontSize="2xl">병원명</FormLabel>
            <Input value={list.name} onChange={handleNameChange} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel fontSize="2xl">병원 주소</FormLabel>
            <Input value={list.address} onChange={handleAddressChange} />
            <FormLabel fontSize="2xl">병원 간단주소</FormLabel>
            <Input
              value={list.oldAddress}
              onChange={handleOldAddressChange}
              placeholder="동까지만 입력해주시면 됩니다 ex:)세종시 아람동"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel fontSize="2xl">전화번호</FormLabel>
            <Input value={list.phone} onChange={handlePhoneChange} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel fontSize="2xl">오픈시간</FormLabel>
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
                fontSize="2xl"
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
            <Flex>
              <Select
                value={list.closeHour}
                onChange={handleCloseHourChange}
                w={"sm"}
                placeholder="시간"
                fontSize="2xl"
              >
                {hour()}
              </Select>
              <FormLabel fontSize="2xl">시</FormLabel>
              <Select
                value={list.closeMin}
                w={"sm"}
                placeholder="분"
                onChange={handleCloseMinChange}
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
              <FormLabel fontSize="2xl">분</FormLabel>
            </Flex>
          </FormControl>
          <FormControl>
            <FormLabel fontSize="2xl">상세정보</FormLabel>
            <Textarea
              value={list.content}
              onChange={handleContentChange}
              fontSize="2xl"
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize="2xl">홈페이지</FormLabel>
            <Input
              value={list.homePage}
              onChange={handleHomePageChange}
              fontSize="2xl"
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize="2xl">진료과목</FormLabel>
            <Flex>
              <CheckboxGroup
                value={course}
                onChange={(e) => setCourse(e)}
                fontSize="2xl"
              >
                <Checkbox value="소아과">소아과</Checkbox>
                <Checkbox value="내과">내과</Checkbox>
                <Checkbox value="외과">외과</Checkbox>
                <Checkbox value="치과">치과</Checkbox>
              </CheckboxGroup>
            </Flex>
          </FormControl>
          <FormControl>
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
        </CardBody>
      </Card>

      <Card w={"xl"} boxShadow="lg" fontFamily="dongle">
        <CardBody>
          {list.files?.length > 0 &&
            list.files.map((file) => (
              <Card
                key={file.id}
                sx={{ marginTop: "20px", marginBottom: "20px" }}
              >
                <CardBody>
                  <Image
                    src={file.url}
                    alt={file.name}
                    width="400px"
                    h="400px"
                  />
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
            <Button
              leftIcon={<FaTrashCan />}
              onClick={onDeleteOpen}
              marginX="5px"
              colorScheme="red"
              variant="solid"
            >
              삭제
            </Button>
          </Flex>
        </CardFooter>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>저장</ModalHeader>
          {/*<ModalCloseButton />*/}

          <ModalBody>저장 하시겠습니까?</ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>닫기</Button>
            <Button onClick={handleSubmitClick} colorScheme="twitter">
              저장
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="2xl" fontWeight="bold">
            삭제 확인
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody fontSize="xl">
            삭제하시면 이 데이터는 복구할 수 없습니다. 정말로 삭제하시겠습니까?
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" onClick={onDeleteClose}>
              취소
            </Button>
            <Button onClick={handleDelete} colorScheme="red" marginLeft={3}>
              삭제 하기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
}
