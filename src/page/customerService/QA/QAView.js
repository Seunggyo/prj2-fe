import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../../../component/LoginProvider";
import axios from "axios";
import { CommentContainer } from "../../../component/CommentContainer";

export function QAView() {
  const [qa, setQa] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();

  const { id } = useParams();

  const { hasAccess, authCheck } = useContext(LoginContext);

  useEffect(() => {
    axios.get("/api/qa/id/" + id).then((response) => setQa(response.data));
  }, []);

  if (qa === null) {
    return <Spinner />;
  }

  function handleDelete() {
    axios
      .delete("/api/qa/remove/" + id)
      .then((response) => {
        toast({
          description: id + "번 공지글이 삭제되었습니다.",
          status: "success",
        });
        navigate("/home/cs/qaList");
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
    <Box className="mx-auto max-w-screen-full">
      <h1 className="text-4xl font-semibold mb-8">1:1 응 답</h1>

      <Box p={8} bg="orange.100">
        <Box
          bg="white"
          borderRadius="xl"
          boxShadow="lg"
          p="4"
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
                  <Heading size="xl">{qa.id}번 글 보기</Heading>
                </Flex>
              </CardHeader>
              <CardBody>
                <Box mb={4}>
                  <span className="font-dongle text-4xl text-gray-500">
                    제목
                  </span>
                  <Input value={qa.qaTitle} readOnly />
                </Box>
                <Box mb={4}>
                  <span className="font-dongle text-4xl text-gray-500">
                    본문
                  </span>
                  <Textarea value={qa.qaContent} h="300px" readOnly />
                </Box>
                <Box mb={4} className="flex items-center">
                  <span className="mr-4 font-dongle text-4xl text-gray-500">
                    작성자 :
                  </span>
                  <Input value={qa.qaWriter} readOnly w="120px" />
                  <span className="ml-20 mr-4 font-dongle text-4xl text-gray-500">
                    카테고리 :
                  </span>
                  <Input value={qa.qaCategory} readOnly w="120px" />
                </Box>

                <Box>
                  <span className="font-dongle text-4xl text-gray-500">
                    작성일시
                  </span>
                  <Input value={qa.ago} readOnly />
                </Box>
              </CardBody>

              <CardFooter justifyContent="flex-end">
                {(hasAccess(qa.qaWriter) || authCheck() === "admin") && (
                  <Box>
                    <button
                      onClick={() => navigate("/home/cs/qaEdit/" + id)}
                      className="mr-4 px-8 py-2 rounded-md relative h-12 w-40 overflow-hidden text-indigo-600 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-indigo-500 before:duration-300 before:ease-out hover:text-white hover:before:h-40 hover:before:w-40 hover:before:opacity-80 font-dongle font-semibold"
                    >
                      <span className="relative z-10  text-4xl">
                        수 정 하 기
                      </span>
                    </button>
                    <button
                      onClick={onOpen}
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
            <CommentContainer boardId={id} category={"qa"} />
          </Box>

          {/* 글 삭제 모달 */}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>삭제 확인</ModalHeader>
              <ModalCloseButton />
              <ModalBody>삭제 하시겠습니까?</ModalBody>

              <ModalFooter>
                <Button onClick={onClose}>닫기</Button>
                <Button onClick={handleDelete} colorScheme="red">
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
