import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useImmer } from "use-immer";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export function DsEdit() {
  const [ds, updateDs] = useImmer("");

  const toast = useToast();
  const { id } = useParams();
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    axios.get("/api/ds/id/" + id).then((response) => updateDs(response.data));
  }, []);

  function handleSubmit() {
    // 수정 버튼 클릭시 해야할 일
    axios
      .put("/api/ds/edit", {
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
      })
      .then(() =>
        toast({
          description: ds.id + "번 게시글이 수정되었습니다",
          status: "success",
        }),
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

  return (
    <Box>
      <h1>{ds.id}번 글 수정</h1>
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
        <Box>
          <Flex>
            <FormLabel>오픈 시간</FormLabel>
            <Box>
              <Flex>
                <Select
                  defaultValue="7"
                  onChange={(e) =>
                    updateDs((draft) => {
                      draft.openHour = e.target.value;
                    })
                  }
                >
                  <option value="7">7시</option>
                  <option value="8">8시</option>
                  <option value="9">9시</option>
                  <option value="10">10시</option>
                  <option value="11">11시</option>
                  <option value="12">12시</option>
                </Select>
                <Select
                  defaultValue="0"
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
            </Box>
            <FormLabel mx="20px">마감 시간</FormLabel>
            <Box>
              <Flex>
                <Select
                  defaultValue="16"
                  onChange={(e) =>
                    updateDs((draft) => {
                      draft.closeHour = e.target.value;
                    })
                  }
                >
                  <option value="16">16시</option>
                  <option value="17">17시</option>
                  <option value="18">18시</option>
                  <option value="19">19시</option>
                  <option value="20">20시</option>
                </Select>
                <Select
                  defaultValue="00"
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
            </Box>
            <FormLabel mx="20px">야간 업무</FormLabel>
            <Flex>
              <Box>
                <Checkbox
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
              onChange={(e) =>
                updateDs((draft) => {
                  draft.content = e.target.value;
                })
              }
            />
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
