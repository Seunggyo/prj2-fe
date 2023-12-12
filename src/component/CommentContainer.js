import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  StackDivider,
  Text,
  Textarea,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { DeleteIcon, EditIcon, NotAllowedIcon } from "@chakra-ui/icons";
import { faComments, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoginContext } from "./LoginProvider";

function CommentForm({ boardId, isSubmitting, onSubmit, category }) {
  const [comment, setComment] = useState("");

  const { isAuthenticated } = useContext(LoginContext);
  function handleSubmit() {
    onSubmit({ boardId, comment, category });
  }

  return (
    <Box>
      <Flex>
        <Textarea
          placeholder="댓글을 작성해주세요."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Tooltip
          isDisabled={isAuthenticated()}
          hasArrow
          label={"로그인이 필요합니다!"}
        >
          <Center isDisabled={isSubmitting} onClick={handleSubmit}>
            <Button h={"full"} size={"lg"}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </Button>
          </Center>
        </Tooltip>
      </Flex>
    </Box>
  );
}

function CommentItem({
  comment,
  onDeleteModalOpen,
  setIsSubmitting,
  isSubmitting,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [commentEdited, setCommentEdited] = useState(comment.comment);

  const { hasAccess } = useContext(LoginContext);

  const toast = useToast();

  function handleSubmit() {
    setIsSubmitting(true);

    axios
      .put("/api/comment/edit", { id: comment.id, comment: commentEdited })
      .then(() => {
        toast({
          description: "댓글이 수정되었습니다.",
          status: "success",
        });
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          toast({
            description: "권한이 없습니다.",
            status: "warning",
          });
        }

        if (error.response.status === 400) {
          toast({
            description: "입력값을 확인해주세요.",
            status: "warning",
          });
        }
      })
      .finally(() => {
        setIsSubmitting(false);
        setIsEditing(false);
      });
  }

  return (
    <Box>
      <Flex justifyContent="space-between">
        <Heading size="md">{comment.memberNickName}</Heading>
        <Text fontSize="md">{comment.ago}</Text>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center">
        <Box flex={1}>
          <Text sx={{ whiteSpace: "pre-wrap" }} pt="2" fontSize="md">
            {comment.comment}
          </Text>
          {isEditing && (
            <Box>
              <Textarea
                value={commentEdited}
                onChange={(e) => setCommentEdited(e.target.value)}
              />
              <Button
                isDisabled={isSubmitting}
                colorScheme="blue"
                onClick={handleSubmit}
              >
                저장
              </Button>
            </Box>
          )}
        </Box>

        {hasAccess(comment.memberId) && (
          <Box>
            {isEditing || (
              <Button
                variant="ghost"
                size="xl"
                colorScheme="purple"
                onClick={() => setIsEditing(true)}
                mr="3"
              >
                <EditIcon />
              </Button>
            )}
            {isEditing && (
              <Button
                variant="ghost"
                size="xl"
                colorScheme="gray"
                onClick={() => setIsEditing(false)}
                mr="3"
              >
                <NotAllowedIcon />
              </Button>
            )}
            <Button
              variant="ghost"
              onClick={() => onDeleteModalOpen(comment.id)}
              size="xl"
              colorScheme="red"
            >
              <DeleteIcon />
            </Button>
          </Box>
        )}
      </Flex>
    </Box>
  );
}

function CommentList({
  commentList,
  onDeleteModalOpen,
  isSubmitting,
  setIsSubmitting,
}) {
  const { hasAccess } = useContext(LoginContext);

  return (
    <Center mt={5}>
      <Card w={"lg"}>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            {commentList.map((comment) => (
              <CommentItem
                key={comment.id}
                isSubmitting={isSubmitting}
                setIsSubmitting={setIsSubmitting}
                comment={comment}
                onDeleteModalOpen={onDeleteModalOpen}
              />
            ))}
          </Stack>
        </CardBody>
      </Card>
    </Center>
  );
}

export function CommentContainer({ boardId, category }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commentList, setCommentList] = useState([]);

  const { isOpen, onClose, onOpen } = useDisclosure();

  // const [id, setId] = useState(0);
  // useRef : 컴포넌트에서 임시로 값을 저장하는 용도로 사용
  const commentIdRef = useRef(0);

  const { isAuthenticated } = useContext(LoginContext);

  const toast = useToast();

  useEffect(() => {
    if (!isSubmitting) {
      const params = new URLSearchParams();
      params.set("id", boardId);
      params.set("category", category);

      axios
        .get("/api/comment/list?" + params)
        .then((response) => setCommentList(response.data));
    }
  }, [isSubmitting]);

  function handleSubmit(comment) {
    setIsSubmitting(true);

    axios
      .post("/api/comment/add", comment)
      .then(() => {
        toast({
          description: "댓글이 등록되었습니다.",
          status: "success",
        });
      })
      .catch((error) => {})
      .finally(() => setIsSubmitting(false));
  }

  function handleDelete() {
    setIsSubmitting(true);
    axios
      .delete("/api/comment/" + commentIdRef.current)
      .then(() => {
        toast({
          description: "댓글이 삭제되었습니다.",
          status: "success",
        });
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          toast({
            description: "권한이 없습니다.",
            status: "warning",
          });
        } else {
          toast({
            description: "댓글 삭제 중 문제가 발생했습니다.",
            status: "error",
          });
        }
      })
      .finally(() => {
        onClose();
        setIsSubmitting(false);
      });
  }

  function handleDeleteModalOpen(id) {
    // id 를 어딘가 저장
    // setId(id);
    commentIdRef.current = id;
    // 모달 열기
    onOpen();
  }
  return (
    <Box>
      <Center mt={10}>
        <Box w={"lg"} borderBottom="1px solid #ccc">
          <Heading>
            <FontAwesomeIcon icon={faComments} /> 댓글
          </Heading>
        </Box>
      </Center>
      <Center mt={5}>
        <Box w={"lg"}>
          <CommentForm
            boardId={boardId}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
            category={category}
          />
        </Box>
      </Center>
      <CommentList
        boardId={boardId}
        isSubmitting={isSubmitting}
        setIsSubmitting={setIsSubmitting}
        commentList={commentList}
        onDeleteModalOpen={handleDeleteModalOpen}
      />
      {/* 삭제 모달 */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>삭제 확인</ModalHeader>
          <ModalCloseButton />
          <ModalBody>삭제 하시겠습니까?</ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>닫기</Button>
            <Button
              isDisabled={isSubmitting}
              onClick={handleDelete}
              colorScheme="red"
            >
              삭제
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
