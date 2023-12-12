import { useImmer } from "use-immer";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Image,
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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export function BoardEdit() {
  const [board, updateBoard] = useImmer(null);
  const [fileSwitch, setFileSwitch] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadFiles, setUploadFiles] = useState(null);

  const { id } = useParams();

  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    axios.get("/api/board/id/" + id).then((r) => updateBoard(r.data));
  }, []);

  if (board == null) {
    return <Spinner />;
  }

  function handleSubmit() {
    setIsSubmitting(true);
    axios
      .putForm("/api/board/edit", {
        id: board.id,
        title: board.title,
        content: board.content,
        writer: board.writer,
        category: board.category,
        fileSwitch,
        uploadFiles,
      })
      .then((r) => {
        toast({
          description: board.id + "번 게시글이 수정되었습니다",
          status: "success",
        });
        navigate("/home/board");
      })
      .catch((error) => {
        if (error.response.data === 400) {
          toast({
            description: "입력된 정보를 다시 확인해주세요",
            status: "warning",
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
      <h1 className="text-4xl font-bold text-indigo-400 mb-8">자유 게시판</h1>
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
                  value={board.title}
                  onChange={(e) =>
                    updateBoard((draft) => {
                      draft.title = e.target.value;
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
                  value={board.content}
                  onChange={(e) =>
                    updateBoard((draft) => {
                      draft.content = e.target.value;
                    })
                  }
                  className="w-full p-4 text-gray-600 bg-orange-50 outline-none rounded-md"
                ></textarea>
              </div>

              {/* 이미지 출력 */}
              {board.files &&
                board.files.length > 0 &&
                board.files.map((file) => (
                  <Box key={file.id} my="5px">
                    <FormControl display="flex" alignItems="center">
                      <FormLabel>
                        <FontAwesomeIcon color="red" icon={faTrashCan} />
                      </FormLabel>
                      <Switch
                        value={file.id}
                        colorScheme="red"
                        onChange={handleFileSwitch}
                      />
                    </FormControl>
                    <div>
                      <Image src={file.url} alt={file.fileName} width="40%" />
                    </div>
                  </Box>
                ))}

              <div className="flex space-x-24">
                <Flex>
                  <div>
                    <span className="font-dongle text-4xl text-gray-500">
                      작성자:
                    </span>
                    <input
                      value={board.writer}
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
                        value={board.category}
                        onChange={(e) =>
                          updateBoard((draft) => {
                            draft.category = e.target.value;
                          })
                        }
                      >
                        <option value={"병원"}>병 원</option>
                        <option value={"약국"}>약 국</option>
                        <option value={"쇼핑몰"}>쇼핑몰</option>
                        <option value={"자유"}>자 유</option>
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
                  onChange={(e) => setUploadFiles(e.target.files)}
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
                    <Button onClick={onClose}>닫기</Button>
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
