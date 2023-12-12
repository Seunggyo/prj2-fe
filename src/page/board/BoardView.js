import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
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
  Spinner,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "../../component/LoginProvider";
import { CommentContainer } from "../../component/CommentContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";

function LikeContainer({ like, onClick }) {
  const { isAuthenticated } = useContext(LoginContext);

  if (like === null) {
    return <Spinner />;
  }

  return (
    <Box>
      {isAuthenticated() && (
        <Flex gap={2}>
          <Button variant="ghost" size="xl" onClick={onClick}>
            {like.like && <FontAwesomeIcon icon={fullHeart} size="xl" />}
            {like.like || <FontAwesomeIcon icon={emptyHeart} size="xl" />}
          </Button>
          <Heading size="lg">
            {like.countLike} {like.like}
          </Heading>
        </Flex>
      )}
    </Box>
  );
}

export function BoardView() {
  const [board, setBoard] = useState(null);
  const [like, setLike] = useState(null);

  const { isOpen, onClose, onOpen } = useDisclosure();
  const { hasAccess, authCheck } = useContext(LoginContext);

  const toast = useToast();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios.get("/api/board/id/" + id).then((r) => setBoard(r.data));
  }, []);

  useEffect(() => {
    axios.get("/api/like/board/" + id).then((r) => setLike(r.data));
  }, []);

  if (board == null) {
    return <Spinner />;
  }

  function handleDelete() {
    axios
      .delete("/api/board/remove/" + id)
      .then((r) => {
        toast({
          description: id + "번 게시글이 삭제되었습니다",
          status: "success",
        });
        navigate("/home/board");
      })
      .catch((error) => {
        toast({
          description: "삭제 중 문제가 발생하였습니다.",
          status: "error",
        });
      })
      .finally(() => onClose());
  }

  function handleLike() {
    axios.post("/api/like", { boardId: board.id }).then((r) => setLike(r.data));
  }

  return (
    <Box className="mx-auto max-w-screen-full">
      <h1
        className="text-4xl font-semibold mb-8 cursor-pointer"
        onClick={() => navigate("/home/board")}
      >
        자유 게시판
      </h1>
      <Box p={8} bg="orange.100">
        <Box
          bg="white"
          borderRadius="xl"
          boxShadow="lg"
          p="6"
          className="flex flex-col md:flex-row w-full"
        >
          <Box
            mb={{ base: 8, md: 0 }}
            mr={{ md: 10 }}
            width={{ base: "100%", md: "60%" }}
          >
            <Card>
              <CardHeader>
                <Flex justifyContent="space-between">
                  <Heading size="xl">{board.id}번 글 보기</Heading>
                  <LikeContainer like={like} onClick={handleLike} />
                </Flex>
              </CardHeader>
              <CardBody>
                <Box mb={5}>
                  <p className="font-dongle text-5xl text-gray-500">제 목</p>
                  <Input
                    w="600px"
                    style={{ borderColor: "#f1efef" }}
                    value={board.title}
                    readOnly
                  />
                </Box>
                <Box mb={5} readOnly>
                  <span className="font-dongle text-5xl text-gray-500">
                    본 문
                  </span>
                  <div style={{ whiteSpace: "pre-line" }}>
                    {/* 이미지 출력 */}
                    {board.files.map((file) => (
                      <Card key={file.id} my={5}>
                        <CardBody>
                          <Image
                            width="40%"
                            mb="5"
                            src={file.url}
                            alt={file.fileName}
                          />
                          {board.content}
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                </Box>

                <Box mb={5} className="flex items-center">
                  <span className="mr-4 font-dongle text-3xl text-gray-500">
                    작성자 :
                  </span>
                  <Input value={board.writer} readOnly w="120px" />
                  <span className="ml-10 mr-4 font-dongle text-3xl text-gray-500">
                    카테고리 :
                  </span>
                  <Input value={board.category} readOnly w="120px" />
                </Box>
                <Box>
                  <span className="font-dongle text-3xl text-gray-500 mr-4">
                    작성일시 :
                  </span>
                  <Input value={board.ago} readOnly w="120px" />
                </Box>
              </CardBody>

              <CardFooter justifyContent="flex-end">
                {(hasAccess(board.writer) || authCheck() === "admin") && (
                  <Box>
                    <button
                      onClick={() => navigate("/home/board/edit/" + id)}
                      className="mr-4 px-8 py-2 rounded-md relative h-12 w-40 overflow-hidden text-indigo-600 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-indigo-500 before:duration-300 before:ease-out hover:text-white hover:before:h-40 hover:before:w-40 hover:before:opacity-80 font-dongle font-semibold"
                    >
                      <span className="relative z-10  text-4xl">
                        수 정 하 기
                      </span>
                    </button>
                    <button
                      onClick={onOpen}
                      ml={2}
                      className="ml-10 rounded-md relative h-12 w-40 overflow-hidden text-indigo-600 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-indigo-500 before:duration-300 before:ease-out hover:text-white hover:before:h-40 hover:before:w-40 hover:before:opacity-80 font-dongle font-semibold "
                    >
                      <span className="relative z-10  text-4xl">
                        삭 제 하 기
                      </span>
                    </button>
                  </Box>
                )}
              </CardFooter>
            </Card>
          </Box>
          <Box width={{ base: "100%", md: "40%" }}>
            <CommentContainer boardId={id} category={"board"} />
          </Box>

          {/* 삭제 모달 */}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>삭제 확인</ModalHeader>
              <ModalCloseButton />
              <ModalBody>삭제 하시겠습니까?</ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>닫기</Button>
                <Button onClick={handleDelete} colorScheme="blue" ml={3}>
                  삭제
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Box>
    </Box>
  );
}
