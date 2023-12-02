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
  Spinner,
  Stack,
  StackDivider,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { LoginContext } from "../../component/LoginProvider";
import { DeleteIcon, EditIcon, NotAllowedIcon } from "@chakra-ui/icons";

function CommentForm({ drugId, isSubmitting, onSubmit }) {
  const [comment, setComment] = useState("");

  function handleSubmit() {
    onSubmit({ drugId, comment });
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

function CommentItem({ drugComment, onDeleteModalOpen }) {
  const [isEditing, setIsEditing] = useState(false);
  const [commentEdited, setCommentEdited] = useState(drugComment.comment);

  const { hasAccess } = useContext(LoginContext);

  function handleSubmit() {
    axios
      .put("/api/drug/comment/edit", {
        id: drugComment.id,
        drugComment: commentEdited,
      })
      .then(() => console.log("잘됨"))
      .catch(() => console.log("안됨"))
      .catch(() => console.log("끝"));
  }

  return (
    <Box>
      <Flex justifyContent="space-between">
        <Heading size="xs">{drugComment.memberId}</Heading>
        <Text fontSize="xs">{drugComment.inserted}</Text>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center">
        <Box flex={1}>
          <Text sx={{ whiteSpace: "pre-wrap" }} pt="2" fontSize="sm">
            {drugComment.comment}
          </Text>

          {isEditing && (
            <Box>
              <Textarea
                value={commentEdited}
                onChange={(e) => setCommentEdited(e.target.value)}
              />
              <Button colorScheme="blue" onClick={handleSubmit}>
                저장
              </Button>
            </Box>
          )}
        </Box>

        {/*내가 쓴 댓글만 버튼 보이게 하기*/}
        {hasAccess(drugComment.memberId) && (
          <Box>
            {isEditing || (
              <Button
                size="xs"
                colorScheme="purple"
                onClick={() => setIsEditing(true)}
              >
                <EditIcon />
              </Button>
            )}
            {isEditing && (
              <Button
                size="xs"
                colorScheme="gray"
                onClick={() => setIsEditing(false)}
              >
                <NotAllowedIcon />
              </Button>
            )}

            <Button
              onClick={() => onDeleteModalOpen(drugComment.id)}
              size="xs"
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

function CommentList({ drugCommentList, onDeleteModalOpen, isSubmitting }) {
  const { hasAccess } = useContext(LoginContext);

  return (
    <Card>
      <CardHeader>
        <Heading>
          <Heading size="md">댓글 리스트</Heading>
        </Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          {drugCommentList.map((drugComment) => (
            <CommentItem
              key={drugComment.id}
              drugComment={drugComment}
              onDeleteModalOpen={onDeleteModalOpen}
            />
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
}

export function DrugComment({ drugId }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [drugCommentList, setDrugCommentList] = useState([]);

  const { isOpen, onClose, onOpen } = useDisclosure();

  // const [id, setId] = useState(0);
  // useRef: 컴포넌트에서 임시로 값을 저장하는 용도로 사용
  const commentIdRef = useRef(0);

  const { isAuthenticated } = useContext(LoginContext);

  const toast = useToast();

  useEffect(() => {
    if (!isSubmitting) {
      const params = new URLSearchParams();
      params.set("id", drugId);

      axios
        .get("/api/drug/comment/list?" + params)
        .then((response) => setDrugCommentList(response.data));
    }
  }, [isSubmitting]);

  function handleSubmit(comment) {
    setIsSubmitting(true);

    axios
      .post("/api/drug/comment/add", comment)
      .then(() => {
        toast({
          description: "댓글 등록이 되었소",
          status: "success",
        });
      })
      .catch((error) => {
        toast({
          description: "댓글 등록 중 문제가 발생하였소",
          status: "error",
        });
      })
      .finally(() => setIsSubmitting(false));
  }

  function handleDelete() {
    // console.log(id + "댓글 삭제");

    setIsSubmitting(true);
    axios
      .delete("/api/drug/comment/" + commentIdRef.current)
      .then(() => {
        toast({
          description: "댓글이 삭제되었소",
          status: "success",
        });
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          toast({
            description: "권한이 업소",
            status: "warning",
          });
        } else {
          toast({
            description: "댓글 삭제 중 문제가 발생하였소",
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
    //id 를 저장해야 함
    // setId(id);
    commentIdRef.current = id;
    //모달 열고
    onOpen();
  }
  return (
    <Box>
      {isAuthenticated() && (
        <CommentForm
          drugId={drugId}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
        />
      )}
      <CommentList
        drugId={drugId}
        isSubmitting={isSubmitting}
        drugCommentList={drugCommentList}
        onDeleteModalOpen={handleDeleteModalOpen}
      />

      {/* 삭제 모달 */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>삭제 확인</ModalHeader>
          <ModalCloseButton />
          <ModalBody>삭제 하시겠소?</ModalBody>

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
