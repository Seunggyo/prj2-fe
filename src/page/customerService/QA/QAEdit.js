import { useImmer } from "use-immer";
import { useNavigate, useParams } from "react-router-dom";
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
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import axios from "axios";

export function QAEdit() {
  const [qa, updateQa] = useImmer(null);

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

        navigate("/cs/qaList/" + id);
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

  return (
    <Box>
      <h1>{id}번 글 수정</h1>
      <FormControl>
        <FormLabel>제목</FormLabel>
        <Input
          value={qa.qaTitle}
          onChange={(e) =>
            updateQa((draft) => {
              draft.qaTitle = e.target.value;
            })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>본문</FormLabel>
        <Textarea
          value={qa.qaContent}
          onChange={(e) =>
            updateQa((draft) => {
              draft.qaContent = e.target.value;
            })
          }
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>작성자</FormLabel>
        <Input value={qa.qaWriter} readOnly />
      </FormControl>

      <Button colorScheme="blue" onClick={onOpen}>
        저장
      </Button>
      {/* navigate(-1) : 이전 경로로 이동 */}
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
