import React, { useContext, useEffect, useState } from "react";
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

// function CommentItem({ DsComment, isSubmitting, setIsSubmitting }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [commentEdited, setCommentEdited] = useState(DsComment.comment);
//   return (
//     <Box>
//       <Flex justifyContent="space-between">
//         <Heading>{DsComment.memberNickName}</Heading>
//         <Text>{DsComment.ago}</Text>
//       </Flex>
//     </Box>
//   );
// }

function CommentList({ commentList }) {
  return (
    <Card>
      <CardHeader>
        <Heading size="md">댓글 리스트</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          {commentList.map((DsComment) => (
            <Box>
              <Flex>
                <Heading>{DsComment.memberId}</Heading>
                <Text>{DsComment.inserted}</Text>
              </Flex>
              <Text>{DsComment.comment}</Text>
            </Box>
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

  // function handleDeleteComment() {
  //   setIsSubmitting(true);
  // }

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
        // ondeleteModal={handleOnDeleteModal}
      />
      {/*삭제 모달*/}
      {/*<Modal isOpen={isOpen} onClose={onClose}>*/}
      {/*  <ModalOverlay />*/}
      {/*  <ModalContent>*/}
      {/*    <ModalHeader>삭제 확인</ModalHeader>*/}
      {/*    <ModalCloseButton />*/}
      {/*    <ModalBody>삭제 하시겠습니까?</ModalBody>*/}
      {/*    <ModalFooter>*/}
      {/*      <Button*/}
      {/*        onClick={handleDeleteComment}*/}
      {/*        colorScheme="red"*/}
      {/*        isDisabled={isSubmitting}*/}
      {/*      >*/}
      {/*        삭제*/}
      {/*      </Button>*/}
      {/*      <Button onClick={onClose}>닫기</Button>*/}
      {/*    </ModalFooter>*/}
      {/*  </ModalContent>*/}
      {/*</Modal>*/}
    </Box>
  );
}
