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
  Spinner,
  Switch,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useImmer } from "use-immer";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaBookmark, FaTimes } from "react-icons/fa";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaTrashCan } from "react-icons/fa6";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export function DsEdit() {
  const [ds, updateDs] = useImmer(null);
  const [uploadFile, setUploadFile] = useState(null);
  const [deleteFileIds, setDeleteFileIds] = useState([]);
  const [holidays, setHolidays] = useState([]);

  const toast = useToast();
  const { id } = useParams();
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onClose: onDeleteClose,
    onOpen: onDeleteOpen,
  } = useDisclosure();

  useEffect(() => {
    axios.get("/api/ds/id/" + id).then((response) => {
      setHolidays(response.data.holidays.map((item) => item.holiday));
      updateDs(response.data);
    });
  }, []);

  // 바뀌고자 하는 사진을 미리 보여주는 코드
  // useEffect(() => {
  //   axios.get("/api/ds/id/" + id).then((response) =>
  //     updateDs({
  //       ...response.data,
  //       files: response.data.files.map((file) => ({
  //         ...file,
  //         preview: file.url,
  //       })),
  //     }),
  //   );
  // }, [id, updateDs]);

  if (ds === null) {
    return <Spinner />;
  }

  function handleSubmit() {
    // 수정 버튼 클릭시 해야할 일
    axios
      .putForm("/api/ds/edit", {
        id: ds.id,
        name: ds.name,
        address: ds.address,
        oldAddress: ds.oldAddress,
        phone: ds.phone,
        openHour: ds.openHour,
        openMin: ds.openMin,
        closeHour: ds.closeHour,
        closeMin: ds.closeMin,
        nightCare: ds.nightCare,
        content: ds.content,
        restHour: ds.restHour,
        restMin: ds.restMin,
        restCloseHour: ds.restCloseHour,
        restCloseMin: ds.restCloseMin,
        updateHolidays: holidays,
        info: ds.info,
        uploadFile,
        deleteFileIds,
      })
      .then(
        () =>
          toast({
            description: ds.id + "번 게시글이 수정되었습니다",
            status: "success",
          }),
        navigate("/home/ds"),
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

  function handleDeleteFileSwitch(e) {
    if (e.target.checked) {
      // removeFileIds에 추가
      setDeleteFileIds([...deleteFileIds, e.target.value]);
    } else {
      // removeFileIds에서 삭제
      setDeleteFileIds(deleteFileIds.filter((item) => item !== e.target.value));
    }
  }

  const hour = () => {
    const result = [];
    for (let i = 1; i < 25; i++) {
      result.push(
        <option value={i} key={i}>
          {i}시
        </option>,
      );
    }
    return result;
  };

  function handleDelete() {
    axios
      .delete("/api/ds/delete/" + id)
      .then((response) => {
        toast({
          description: id + "번 정보가 삭제되었습니다",
          status: "success",
        });
        navigate("/home/ds/list");
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
        <CardHeader bg="green.200" textAlign="center" py={4}>
          <Heading fontSize="5xl" color="white" fontFamily="dongle">
            약국 정보 수정
          </Heading>
        </CardHeader>
        <CardBody>
          <FormControl mb={4}>
            <FormLabel fontSize="2xl">약국 명</FormLabel>
            <Input
              fontSize="2xl"
              value={ds.name}
              onChange={(e) =>
                updateDs((draft) => {
                  draft.name = e.target.value;
                })
              }
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel fontSize="2xl">주소</FormLabel>
            <Textarea
              fontSize="2xl"
              value={ds.address}
              onChange={(e) =>
                updateDs((draft) => {
                  draft.address = e.target.value;
                })
              }
            />
            <FormLabel fontSize="2xl">간단 주소</FormLabel>
            <Textarea
              fontSize="2xl"
              value={ds.oldAddress}
              onChange={(e) =>
                updateDs((draft) => {
                  draft.oldAddress = e.target.value;
                })
              }
              placeholder="동까지만 입력해주시면 됩니다 ex:)세종시 아람동"
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel fontSize="2xl">번호</FormLabel>
            <Input
              fontSize="2xl"
              value={ds.phone}
              onChange={(e) =>
                updateDs((draft) => {
                  draft.phone = e.target.value;
                })
              }
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel fontSize="2xl">휴무일</FormLabel>
            <CheckboxGroup value={holidays} onChange={(e) => setHolidays(e)}>
              <Checkbox value="월요일">월요일</Checkbox>
              <Checkbox value="화요일">화요일</Checkbox>
              <Checkbox value="수요일">수요일</Checkbox>
              <Checkbox value="목요일">목요일</Checkbox>
              <Checkbox value="금요일">금요일</Checkbox>
              <Checkbox value="토요일">토요일</Checkbox>
              <Checkbox value="일요일">일요일</Checkbox>
              <Checkbox value="공휴일">공요일</Checkbox>
            </CheckboxGroup>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel fontSize="2xl">오픈 시간</FormLabel>
            <Grid mt={3} ml={3} templateColumns={"repeat(2 , 1fr)"}>
              <FormLabel fontSize="2xl">시간</FormLabel>
              <FormLabel ml={3} fontSize="2xl">
                분
              </FormLabel>
            </Grid>
            <Flex>
              <Select
                fontSize="2xl"
                value={ds.openHour}
                onChange={(e) =>
                  updateDs((draft) => {
                    draft.openHour = e.target.value;
                  })
                }
              >
                {hour()};
              </Select>
              <Select
                fontSize="2xl"
                value={ds.openMin}
                onChange={(e) =>
                  updateDs((draft) => {
                    draft.openMin = e.target.value;
                  })
                }
              >
                <option value="0">0분</option>
                <option value="10">10분</option>
                <option value="20">20분</option>
                <option value="30">30분</option>
                <option value="40">40분</option>
                <option value="50">50분</option>
              </Select>
            </Flex>
            <FormControl mb={4}>
              <FormLabel fontSize="2xl">마감 시간</FormLabel>
              <Grid mt={3} ml={3} templateColumns={"repeat(2 , 1fr)"}>
                <FormLabel fontSize="2xl">시간</FormLabel>
                <FormLabel ml={3} fontSize="2xl">
                  분
                </FormLabel>
              </Grid>
              <Flex>
                <Select
                  fontSize="2xl"
                  value={ds.closeHour}
                  onChange={(e) =>
                    updateDs((draft) => {
                      draft.closeHour = e.target.value;
                    })
                  }
                >
                  {hour()};
                </Select>
                <Select
                  fontSize="2xl"
                  value={ds.closeMin}
                  onChange={(e) =>
                    updateDs((draft) => {
                      draft.closeMin = e.target.value;
                    })
                  }
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
            <FormControl>
              <Flex>
                <FormLabel fontSize="2xl">휴식 시간</FormLabel>
                <FormHelperText fontSize="xl">
                  휴식 시간이 없으시 선택안하시면 됩니다
                </FormHelperText>
              </Flex>
              <Grid mt={3} ml={3} templateColumns={"repeat(4 , 1fr)"}>
                <FormLabel fontSize="2xl">시작 시간</FormLabel>
                <FormLabel ml={3} fontSize="2xl">
                  분
                </FormLabel>
                <FormLabel fontSize="2xl">종료 시간</FormLabel>
                <FormLabel ml={3} fontSize="2xl">
                  분
                </FormLabel>
              </Grid>
              <Flex>
                <Select
                  value={ds.restHour}
                  fontSize="2xl"
                  onChange={(e) =>
                    updateDs((draft) => {
                      draft.restHour = e.target.value;
                    })
                  }
                >
                  {hour()};
                </Select>
                <Select
                  value={ds.restMin}
                  fontSize="2xl"
                  onChange={(e) =>
                    updateDs((draft) => {
                      draft.restMin = e.target.value;
                    })
                  }
                >
                  <option value="0">0분</option>
                  <option value="10">10분</option>
                  <option value="20">20분</option>
                  <option value="30">30분</option>
                  <option value="40">40분</option>
                  <option value="50">50분</option>
                </Select>
                <Text fontSize="2xl">{"~"}</Text>
                <Select
                  value={ds.restCloseHour}
                  fontSize="2xl"
                  onChange={(e) =>
                    updateDs((draft) => {
                      draft.restCloseHour = e.target.value;
                    })
                  }
                >
                  {hour()};
                </Select>
                <Select
                  value={ds.restCloseMin}
                  fontSize="2xl"
                  onChange={(e) =>
                    updateDs((draft) => {
                      draft.restCloseMin = e.target.value;
                    })
                  }
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
          </FormControl>
          <FormControl mb={4}>
            <FormLabel fontSize="2xl">약국 소개</FormLabel>
            <Textarea
              fontSize="2xl"
              value={ds.content}
              onChange={(e) =>
                updateDs((draft) => {
                  draft.content = e.target.value;
                })
              }
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel fontSize="2xl">약국 정보</FormLabel>
            <Textarea
              fontSize="2xl"
              value={ds.info}
              onChange={(e) =>
                updateDs((draft) => {
                  draft.info = e.target.value;
                })
              }
            />
          </FormControl>
        </CardBody>
      </Card>

      <Card w={"xl"} boxShadow="lg" fontFamily="dongle">
        <CardBody>
          {ds.files.length > 0 &&
            ds.files.map((file) => (
              <Card
                key={file.id}
                sx={{ marginTop: "20px", marginBottom: "20px" }}
              >
                <CardBody display="flex" alignItems="center">
                  <Image w="400px" h="400px" src={file.url} alt={file.name} />
                </CardBody>
                <Divider />
                <CardFooter>
                  <FormControl display="flex" alignItems={"center"} gap={2}>
                    <FormLabel colorScheme="red" m={0} p={0}>
                      <FontAwesomeIcon icon={faTrashCan} color="red" />
                    </FormLabel>
                    <Switch
                      value={file.id}
                      colorScheme="red"
                      onChange={handleDeleteFileSwitch}
                    />
                  </FormControl>
                </CardFooter>
              </Card>
            ))}
          <FormControl mt={5}>
            <FormLabel fontSize="2xl">이미지</FormLabel>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setUploadFile(e.target.files)}
            />
            <FormHelperText fontSize="2xl">
              한 개 파일은 3MB, 총 용량은 30MB 이내로 첨부하세요.
            </FormHelperText>
          </FormControl>
          <FormControl marginTop="10px">
            <Flex>
              <FormLabel fontSize="2xl">야간 업무</FormLabel>
              <Checkbox
                value={ds.nightCare}
                isChecked={ds.nightCare}
                onChange={(e) =>
                  updateDs((draft) => {
                    draft.nightCare = e.target.checked;
                  })
                }
              />
              <FormHelperText marginLeft="10px" fontSize="xl">
                야간 업무가 없으시 선택 안하셔도 됩니다
              </FormHelperText>
            </Flex>
          </FormControl>
        </CardBody>

        {/*// 파일 업로드 시 미리 보여 주기*/}
        {/*// onChange={(e) =>*/}
        {/*//   updateDs((draft) => {*/}
        {/*//     draft.files = Array.from(e.target.files).map((file) =>*/}
        {/*//       Object.assign(file, {*/}
        {/*//         preview: URL.createObjectURL(file),*/}
        {/*//       }),*/}
        {/*//     );*/}
        {/*//   })*/}
        {/*// }*/}

        <CardFooter>
          <Flex>
            <Button
              leftIcon={<FaBookmark />}
              onClick={onOpen}
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

      {/* 수정 모달 */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>저장 확인</ModalHeader>
          <ModalCloseButton />
          <ModalBody>저장 하시겠습니까?</ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>닫기</Button>
            <Button onClick={handleSubmit} colorScheme="blue">
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
