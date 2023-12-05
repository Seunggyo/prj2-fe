import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useImmer } from "use-immer";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
        navigate("/ds/list"),
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

  return (
    <Box>
      <h1>{ds.id} 수정</h1>

      {/*약국 사진*/}
      {ds.files.length > 0 &&
        ds.files.map((file) => (
          <Box key={file.id} border="3px solid black" width="50%">
            <FormControl display="flex" alignItems="center">
              <FormLabel>
                <FontAwesomeIcon icon={faTrashCan} color="red" />
              </FormLabel>
              <Switch
                value={file.id}
                colorScheme="red"
                onChange={handleDeleteFileSwitch}
              />
            </FormControl>
            <Image width="100%" height="300px" src={file.url} alt={file.name} />
          </Box>
        ))}

      <FormControl>
        <FormLabel>업체 명</FormLabel>
        <Input
          value={ds.name}
          onChange={(e) =>
            updateDs((draft) => {
              draft.name = e.target.value;
            })
          }
        />
      </FormControl>

      <FormControl>
        <FormLabel>주소</FormLabel>
        <Textarea
          value={ds.address}
          onChange={(e) =>
            updateDs((draft) => {
              draft.address = e.target.value;
            })
          }
        />
      </FormControl>

      <FormControl>
        <FormLabel>번호</FormLabel>
        <Input
          value={ds.phone}
          onChange={(e) =>
            updateDs((draft) => {
              draft.phone = e.target.value;
            })
          }
        />
      </FormControl>

      <FormControl>
        <FormLabel>휴무일</FormLabel>
        <CheckboxGroup value={holidays} onChange={(e) => setHolidays(e)}>
          <Checkbox value="월요일">월요일</Checkbox>
          <Checkbox value="화요일">화요일</Checkbox>
          <Checkbox value="수요일">수요일</Checkbox>
          <Checkbox value="목요일">목요일</Checkbox>
          <Checkbox value="금요일">금요일</Checkbox>
          <Checkbox value="토요일">토요일</Checkbox>
          <Checkbox value="일요일">일요일</Checkbox>
        </CheckboxGroup>
      </FormControl>

      <FormControl>
        <Box>
          <Flex>
            <FormLabel>오픈 시간</FormLabel>
            <Box>
              <Flex>
                <Select
                  defaultValue="7시"
                  onChange={(e) =>
                    updateDs((draft) => {
                      draft.openHour = e.target.value;
                    })
                  }
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
                  onChange={(e) =>
                    updateDs((draft) => {
                      draft.openMin = e.target.value;
                    })
                  }
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
                  onChange={(e) =>
                    updateDs((draft) => {
                      draft.closeHour = e.target.value;
                    })
                  }
                >
                  <option value="16시">16시</option>
                  <option value="17시">17시</option>
                  <option value="18시">18시</option>
                  <option value="19시">19시</option>
                  <option value="20시">20시</option>
                </Select>
                <Select
                  defaultValue="0분"
                  onChange={(e) =>
                    updateDs((draft) => {
                      draft.closeMin = e.target.value;
                    })
                  }
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
                  value={ds.nightCare}
                  isChecked={ds.nightCare}
                  onChange={(e) =>
                    updateDs((draft) => {
                      draft.nightCare = e.target.checked;
                    })
                  }
                />
              </Box>
            </Flex>
          </Flex>

          <FormControl>
            <FormLabel>약국 소개</FormLabel>
            <Textarea
              value={ds.content}
              onChange={(e) =>
                updateDs((draft) => {
                  draft.content = e.target.value;
                })
              }
            />
          </FormControl>

          <FormControl>
            <FormLabel>약국 정보</FormLabel>
            <Textarea
              value={ds.info}
              onChange={(e) =>
                updateDs((draft) => {
                  draft.info = e.target.value;
                })
              }
            />
          </FormControl>

          <FormControl>
            <FormLabel>가게 사진</FormLabel>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setUploadFile(e.target.files)}
              // 파일 업로드 시 미리 보여 주기
              // onChange={(e) =>
              //   updateDs((draft) => {
              //     draft.files = Array.from(e.target.files).map((file) =>
              //       Object.assign(file, {
              //         preview: URL.createObjectURL(file),
              //       }),
              //     );
              //   })
              // }
            />
            <FormHelperText>
              한 개 파일은 1MB 이내, 총 파일은 10MB 이내로 첨부 가능합니다
            </FormHelperText>
          </FormControl>
        </Box>
      </FormControl>

      <Button onClick={onOpen} colorScheme="blue">
        저장
      </Button>
      <Button onClick={() => navigate(-1)}>취소</Button>

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
    </Box>
  );
}
