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
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LoginContext } from "../../component/LoginProvider";

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
          {/*TODO: 댓글 작성후 re render*/}
          {drugCommentList.map((drugComment) => (
            <Box key={drugComment.id}>
              <Flex justifyContent="space-between">
                <Heading size="xs">{drugComment.memberId}</Heading>
                <Text fontSize="xs">{drugComment.inserted}</Text>
              </Flex>
              <Flex justifyContent="space-between" alignItems="center">
                <Text sx={{ whiteSpace: "pre-wrap" }} pt="2" fontSize="sm">
                  {drugComment.comment}
                </Text>
                {/*내가 쓴 댓글만 버튼 보이게 하기*/}
                {hasAccess(drugComment.memberId) && (
                  <Button
                    isDisabled={isSubmitting}
                    onClick={() => onDeleteModalOpen(drugComment.id)}
                    size="xs"
                    colorScheme="red"
                  >
                    삭제
                  </Button>
                )}
              </Flex>
            </Box>
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
}

export function DrugComment({ drugId }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [id, setId] = useState(0);
  const [drugCommentList, setDrugCommentList] = useState([]);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const { isAuthenticated } = useContext(LoginContext);

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
      .finally(() => setIsSubmitting(false));
  }

  function handleDelete() {
    // console.log(id + "댓글 삭제");

    setIsSubmitting(true);
    axios.delete("/api/drug/comment/" + id).finally(() => {
      onClose();
      setIsSubmitting(false);
    });
  }

  function handleDeleteModalOpen(id) {
    //id 를 저장해야 함
    setId(id);
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
