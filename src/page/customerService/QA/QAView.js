import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
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
  Spinner,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../../../component/LoginProvider";
import axios from "axios";

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
    <Box p={8}>
      <Text fontSize="3xl" fontWeight="bold" mb={4}>
        {qa.id}번 글 보기
      </Text>
      <FormControl mb={4}>
        <FormLabel>제목</FormLabel>
        <Input value={qa.qaTitle} readOnly />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>본문</FormLabel>
        <Textarea value={qa.qaContent} readOnly />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>작성자</FormLabel>
        <Input value={qa.qaWriter} readOnly />
      </FormControl>
      <FormControl>
        <FormLabel>카테고리</FormLabel>
        <Input value={qa.qaCategory} readOnly />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>작성일시</FormLabel>
        <Input value={qa.inserted} readOnly />
      </FormControl>

      {(hasAccess(qa.qaWriter) || authCheck() === "admin") && (
        <Box mt={4}>
          <Button
            colorScheme="purple"
            onClick={() => navigate("/home/cs/qaEdit/" + id)}
            mr={2}
          >
            수정
          </Button>
          <Button colorScheme="red" onClick={onOpen}>
            삭제
          </Button>
        </Box>
      )}

      {/* 공지글 삭제 모달 */}
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
  );
}
