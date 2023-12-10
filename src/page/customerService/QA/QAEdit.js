import { useImmer } from "use-immer";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
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
  Spinner,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

export function QAEdit() {
  const [qa, updateQa] = useImmer(null);
  const [fileSwitch, setFileSwitch] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadFiles, setUploadFiles] = useState(null);

  // /edit/:id
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    axios.get("/api/qa/id/" + id).then((response) => updateQa(response.data));
  }, []);

  if (qa === null) {
    return <Spinner />;
  }

  function handleSubmit() {
    // 저장 버튼 클릭 시
    // PUT /api/board/edit

    axios
      .put("/api/qa/edit", qa)
      .then(() => {
        toast({
          description: qa.id + "번 게시글이 수정되었습니다.",
          status: "success",
        });

        navigate("/home/cs/qaList");
      })
      .catch((error) => {
        if (error.response.status === 400) {
          toast({
            description: "요청이 잘못되었습니다.",
            status: "error",
          });
        } else {
          toast({
            description: "수정 중에 문제가 발생하였습니다.",
            status: "error",
          });
        }
      })
      .finally(() => onClose());
  }

  function handleFileSwitch(e) {
    if (e.target.checked) {
      // fileSwitch 에 추가
      setFileSwitch([...fileSwitch, e.target.value]);
    } else {
      // fileSwitch 에서 삭제
      setFileSwitch(fileSwitch.filter((item) => item !== e.target.value));
    }
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-indigo-400 mb-8">1:1 응답</h1>
      <form>
        <div className="bg-orange-50 min-h-screen md:px-40 pt-2">
          <div className=" bg-white rounded-md px-6 py-12 max-w-full mx-auto">
            <h1 className="text-center text-6xl font-dongle text-gray-500 mb-10">
              {id}번 게시글 수정하기
            </h1>
            <div className="space-y-4">
              <div>
                <span className="font-dongle text-4xl text-gray-500">
                  제 목:
                </span>
                <input
                  value={qa.qaTitle}
                  onChange={(e) =>
                    updateQa((draft) => {
                      draft.qaTitle = e.target.value;
                    })
                  }
                  className="ml-2 outline-none py-1 p-2 w-3/5 text-md border-2 rounded-md"
                />
              </div>
              <div>
                <textarea
                  id="description"
                  cols="30"
                  rows="10"
                  value={qa.qaContent}
                  onChange={(e) =>
                    updateQa((draft) => {
                      draft.qaContent = e.target.value;
                    })
                  }
                  className="w-full p-4 text-gray-600 bg-orange-50 outline-none rounded-md"
                ></textarea>
              </div>
              <div className="flex space-x-24">
                <Flex>
                  <div>
                    <span className="font-dongle text-4xl text-gray-500">
                      작성자:
                    </span>
                    <input
                      value={qa.qaWriter}
                      readOnly
                      className="ml-2 outline-none py-1 p-2 w-3/5 text-md border-2 rounded-md"
                    />
                  </div>
                  <Flex>
                    <span className="font-dongle text-4xl text-gray-500">
                      게시판:
                    </span>
                    <Flex ml="4">
                      <Select
                        value={qa.qaCategory}
                        onChange={(e) =>
                          updateQa((draft) => {
                            draft.qaCategory = e.target.value;
                          })
                        }
                      >
                        <option value={"건의사항"}>건의사항</option>
                        <option value={"이벤트관련"}>이벤트관련</option>
                        <option value={"물품관련"}>물품관련</option>
                        <option value={"기타"}>기타</option>
                      </Select>
                    </Flex>
                  </Flex>
                </Flex>
              </div>

              {/* 추가할 파일 선택 */}
              <FormControl>
                <span className="font-dongle text-4xl text-gray-500">
                  첨부파일
                </span>
                <input
                  className="block w-4/5 text-sm text-gray-900 border
                  border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
                <FormHelperText>
                  한 개의 파일은 3MB 이내, 총 용량은 30MB 이내로 첨부해주세요.
                </FormHelperText>
              </FormControl>

              <Box className="flex justify-center">
                <Button
                  isDisabled={isSubmitting}
                  onClick={onOpen}
                  className="px-8 py-2 rounded-md relative h-12 w-40 overflow-hidden text-indigo-600 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-indigo-500 before:duration-300 before:ease-out hover:text-white hover:before:h-40 hover:before:w-40 hover:before:opacity-80 font-dongle font-semibold"
                >
                  <span className="relative z-10  text-4xl">수정 완료</span>
                </Button>
                <Button
                  onClick={() => navigate(-1)}
                  className="ml-10 rounded-md relative h-12 w-40 overflow-hidden text-indigo-600 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-indigo-500 before:duration-300 before:ease-out hover:text-white hover:before:h-40 hover:before:w-40 hover:before:opacity-80 font-dongle font-semibold "
                >
                  <span className="relative z-10  text-4xl">취 소</span>
                </Button>
              </Box>

              {/*수정 모달*/}
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>수정 확인</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>수정 하시겠습니까?</ModalBody>
                  <ModalFooter>
                    <Button onClick={onClose}>취소</Button>
                    <Button onClick={handleSubmit} colorScheme="blue">
                      수정
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
