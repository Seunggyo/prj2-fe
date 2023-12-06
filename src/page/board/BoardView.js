import {
  Box,
  Button,
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
          <Heading size="lg">{like.countLike}</Heading>
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
      .delete("/api/board/remove" + id)
      .then((r) => {
        toast({
          description: id + "번 게시글이 삭제되었습니다",
          status: "success",
        });
        navigate("/board");
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
    <Box>
      <Flex>
        <Heading size="xl">{board.id}번 글 보기</Heading>
        <LikeContainer like={like} onClick={handleLike} />
      </Flex>
      <FormControl>
        <FormLabel>제 목</FormLabel>
        <Input value={board.title} readOnly />
      </FormControl>
      <FormControl>
        <FormLabel>본 문</FormLabel>
        <Input value={board.content} readOnly />
      </FormControl>
      <FormControl>
        <FormLabel>작성자</FormLabel>
        <Input value={board.nickName} readOnly />
      </FormControl>
      <FormControl>
        <FormLabel>커뮤니티</FormLabel>
        <Input value={board.category} readOnly />
      </FormControl>
      <FormControl>
        <FormLabel>작성일시</FormLabel>
        <Input value={board.inserted} readOnly />
      </FormControl>

      {(hasAccess(board.writer) || authCheck() === "admin") && (
        <Box>
          <Button onClick={() => navigate("/board/edit/" + id)}>수 정</Button>
          <Button onClick={onOpen}>삭 제</Button>
        </Box>
      )}

      {/*삭제 모달*/}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>삭제 확인</ModalHeader>
          <ModalCloseButton />
          <ModalBody>삭제 하시겠습니까?</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>닫기</Button>
            <Button onClick={handleDelete} colorScheme="blue">
              삭제
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <CommentContainer boardId={id} />
    </Box>
  );
}
