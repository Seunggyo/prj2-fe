import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { LoginContext } from "../../component/LoginProvider";
import axios from "axios";
import { DeleteIcon, EditIcon, NotAllowedIcon } from "@chakra-ui/icons";

function CommentForm({ businessId, isSubmitting, onSubmit }) {
  const [comment, setComment] = useState("");

  function handleSubmit() {
    onSubmit({ businessId, comment });
  }

  return (
    <Box>
      <Textarea value={comment} onChange={(e) => setComment(e.target.value)} />
      <Button isDisabled={isSubmitting} onClick={handleSubmit}>
        쓰기
      </Button>
    </Box>
  );
}

function CommentItem({
  DsComment,
  isSubmitting,
  setIsSubmitting,
  onDeleteModalOpen,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [commentEdited, setCommentEdited] = useState(DsComment.comment);

  const toast = useToast();

  const { hasAccess } = useContext(LoginContext);

  function handleCommentSubmit() {
    // setIsSubmitting(true);

    axios
      .put("/api/ds/comment/edit", { id: DsComment.id, comment: commentEdited })
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
        // TODO : setIsSubmitting 오류 해결해야함
        // setIsSubmitting(false);
        setIsEditing(false);
      });
  }

  return (
    <Box>
      <Flex justifyContent="space-between">
        <Heading>{DsComment.memberNickName}</Heading>
        <Text>{DsComment.ago}</Text>
      </Flex>
      <Flex>
        <Box flex={1}>
          <Text>{DsComment.comment}</Text>
          {isEditing && (
            <Box>
              <Textarea
                value={commentEdited}
                onChange={(e) => setCommentEdited(e.target.value)}
              />
              <Button
                isDisabled={isSubmitting}
                colorScheme="blue"
                onClick={handleCommentSubmit}
              >
                저장
              </Button>
            </Box>
          )}
        </Box>

        {hasAccess(DsComment.memberId) && (
          <Box>
            {isEditing || (
              <Button colorScheme="purple" onClick={() => setIsEditing(true)}>
                <EditIcon />
              </Button>
            )}
            {isEditing && (
              <Button colorScheme="gray" onClick={() => setIsEditing(false)}>
                <NotAllowedIcon />
              </Button>
            )}
            <Button
              onClick={() => onDeleteModalOpen(DsComment.id)}
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
  isSubmitting,
  setIsSubmitting,
  onDeleteModalOpen,
}) {
  return (
    <Card>
      <CardHeader>
        <Heading size="md">댓글 리스트</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          {commentList.map((DsComment) => (
            <CommentItem
              key={DsComment.id}
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
              DsComment={DsComment}
              onDeleteModalOpen={onDeleteModalOpen}
            />
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
}

export function DsComment({ businessId }) {
  const { isAuthenticated } = useContext(LoginContext);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commentList, setCommentList] = useState([]);

  const { isOpen, onClose, onOpen } = useDisclosure();

  // 임시로 값을 저장하는 용도로 사용할려고 씀
  const commentIdRef = useRef(0);

  const toast = useToast();

  useEffect(() => {
    if (!isSubmitting) {
      const params = new URLSearchParams();
      params.set("id", businessId);

      axios
        .get("/api/ds/comment/list?" + params)
        .then((response) => setCommentList(response.data));
    }
  }, [isSubmitting]);

  // 클릭시 해야 하는 기능들
  function handleOnSubmit(comment) {
    setIsSubmitting(true);

    axios
      .post("/api/ds/comment/add", comment)
      .then(() => {
        toast({
          description: "댓글이 등록되었습니다.",
          status: "success",
        });
      })
      .catch((error) => {
        toast({
          description: "댓글 등록 중 문제가 발생하였습니다.",
          status: "error",
        });
      })
      .finally(() => setIsSubmitting(false));
  }

  function handleDeleteComment() {
    setIsSubmitting(true);
    axios
      .delete("/api/ds/comment/" + commentIdRef.current)
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
    commentIdRef.current = id;
    // 삭제 모달 열기
    onOpen();
  }

  return (
    <Box>
      {/*댓글 쓰는 부분 (create) */}
      {isAuthenticated() && (
        <CommentForm
          businessId={businessId}
          isSubmitting={isSubmitting}
          onSubmit={handleOnSubmit}
        />
      )}
      {/*댓글 리스트 ( read)*/}
      <CommentList
        businessId={businessId}
        isSubmitting={isSubmitting}
        setIsSubmitiing={setIsSubmitting}
        commentList={commentList}
        onDeleteModalOpen={handleDeleteModalOpen}
      />
      삭제 모달
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>삭제 확인</ModalHeader>
          <ModalCloseButton />
          <ModalBody>삭제 하시겠습니까?</ModalBody>
          <ModalFooter>
            <Button
              onClick={handleDeleteComment}
              colorScheme="red"
              isDisabled={isSubmitting}
            >
              삭제
            </Button>
            <Button onClick={onClose}>닫기</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
