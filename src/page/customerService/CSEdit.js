import { useImmer } from "use-immer";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  FormControl,
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
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export function CSEdit() {
  const [cs, updateCs] = useImmer(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileSwitch, setFileSwitch] = useState([]);
  const [uploadFiles, setUploadFiles] = useState(null);
  const [files, setFiles] = useState(null);

  // /edit/:id
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    axios.get("/api/cs/id/" + id).then((response) => updateCs(response.data));
  }, []);

  if (cs === null) {
    return <Spinner />;
  }

  function handleSubmit() {
    setIsSubmitting(true);
    // 저장 버튼 클릭 시
    // PUT /api/board/edit
    axios
      .putForm("/api/cs/edit", {
        id: cs.id,
        csTitle: cs.csTitle,
        csContent: cs.csContent,
        csWriter: cs.csWriter,
        csCategory: cs.csCategory,
        fileSwitch,
        uploadFiles,
      })
      .then(() => {
        toast({
          description: cs.id + "번 게시글이 수정되었습니다.",
          status: "success",
        });

        navigate("/home/cs/" + id);
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
      setFileSwitch([...fileSwitch, e.target.value]);
    } else {
      setFileSwitch(fileSwitch.filter((item) => item !== e.target.value));
    }
  }

  // 파일 미리보기
  const handleFileChange = (e) => {
    // 파일 입력에서 선택한 파일들을 가져오기.
    const selecteFiles = e.target.files;
    const filesArray = [];

    for (let i = 0; i < selecteFiles.length; i++) {
      const file = selecteFiles[i];

      const reader = new FileReader();

      reader.onloadend = () => {
        // 파일 미리보기 URL을 생성하여 상태 업데이트
        filesArray.push({ file, previewURL: reader.result });

        setFiles([...filesArray]);
      };
      // 파일을 읽어와서 미리보기 URL을 생성
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">공 지 사 항</h1>
      <form>
        <div className="bg-orange-50 min-h-screen md:px-40 rounded-xl">
          <div className=" bg-white rounded-xl px-6 py-12 max-w-full mx-auto">
            <h1 className="text-center text-6xl font-dongle text-gray-500 mb-10">
              {id}번 공지 글 수정하기{" "}
            </h1>
            <div className="space-y-4">
              <div>
                <span className="font-dongle text-4xl text-gray-500">
                  제 목:
                </span>
                <input
                  value={cs.csTitle}
                  onChange={(e) =>
                    updateCs((draft) => {
                      draft.csTitle = e.target.value;
                    })
                  }
                  className="ml-2 outline-none py-1 p-2 w-3/5 text-md border-2 rounded-md"
                />
              </div>
              <div>
                <textarea
                  cols="30"
                  rows="15"
                  value={cs.csContent}
                  onChange={(e) =>
                    updateCs((draft) => {
                      draft.csContent = e.target.value;
                    })
                  }
                  className="w-full p-4 text-gray-600 bg-orange-50 outline-none rounded-md"
                ></textarea>
              </div>

              {/* 이미지 출력 */}
              {cs.files &&
                cs.files.length > 0 &&
                cs.files.map((file) => (
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
                      value={cs.csWriter}
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
                        value={cs.csCategory}
                        onChange={(e) =>
                          updateCs((draft) => {
                            draft.csCategory = e.target.value;
                          })
                        }
                      >
                        <option value="">전체</option>
                        <option value={"안내사항"}>안내사항</option>
                        <option value={"긴급안내"}>긴급안내</option>
                        <option value={"출시소식"}>출시소식</option>
                        <option value={"이벤트"}>이벤트</option>
                        <option value={"당첨자발표"}>당첨자발표</option>
                      </Select>
                    </Flex>
                  </Flex>
                </Flex>
              </div>

              {/* 추가할 파일 선택 */}
              <div>
                <span className="font-dongle text-4xl text-gray-500">
                  첨부파일
                </span>
                <input
                  className="block w-4/5 text-sm text-gray-900 border
                  border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    handleFileChange(e);
                    setUploadFiles(e.target.files);
                  }}
                />

                {/* 미리보기 이미지를 표시하는 부분 */}
                <div style={{ display: "flex", marginTop: "10px" }}>
                  {Array.isArray(files) &&
                    files.map((file, index) => (
                      <img
                        key={index}
                        src={file.previewURL}
                        alt={`Preview ${index}`}
                        style={{
                          width: "180px",
                          height: "auto",
                          marginRight: "10px",
                        }}
                      />
                    ))}
                </div>
                <span className="text-xs text-gray-500">
                  한 개의 파일은 3MB 이내, 총 용량은 30MB 이내로 첨부해주세요.
                </span>
              </div>

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
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
