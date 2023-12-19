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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { LoginContext } from "../../component/LoginProvider";
import { DeleteIcon, EditIcon, NotAllowedIcon } from "@chakra-ui/icons";

function CommentForm({ comment, setComment, onSubmit, businessId }) {
  function handleSubmit() {
    onSubmit({ businessId, comment });
  }

  return (
    <Box>
      <Flex>
        <Textarea
          placeholder="댓글을 작성해주세요"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Center onClick={handleSubmit}>
          <Button h={"full"} size={5}>
            <Heading p={5}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </Heading>
          </Button>
        </Center>
      </Flex>
    </Box>
  );
}

function CommentItem({ c, toast, setIsSubmitting, onDeleteModalOpen }) {
  const { hasAccess, isAdmin } = useContext(LoginContext);
  const [isEditing, setIsEditing] = useState(false);
  const [commentEdited, setCommentEdited] = useState(c.comment);

  function handleSubmitClick() {
    setIsSubmitting(true);
    axios
      .put("/api/hospital/comment/edit", {
        id: c.id,
        comment: commentEdited,
      })
      .then(() => {
        toast({
          description: "댓글이 수정되었습니다.",
          status: "success",
        });
      })
      .catch((e) => {
        if (e.response.status === 401 || e.response.status === 403) {
          toast({
            description: "권한이 없습니다.",
            status: "error",
          });
        }
        if (e.response.status === 400) {
          toast({
            description: "댓글에 내용을 작성하여야 합니다.",
            status: "error",
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
      <Flex justifyContent={"space-between"}>
        <Heading fontSize="2xl" marginBottom="10px">
          {c.memberNickName}
        </Heading>
      </Flex>
      <Flex>
        <Box flex={1}>
          <Text>{c.comment}</Text>
          <Text>{c.ago}</Text>
          {isEditing && (
            <Box>
              <Textarea
                value={commentEdited}
                onChange={(e) => setCommentEdited(e.target.value)}
              />
              <Button colorScheme="twitter" onClick={handleSubmitClick}>
                저장
              </Button>
            </Box>
          )}
        </Box>
        {(hasAccess(c.memberId) || isAdmin()) && (
          <Box>
            {isEditing || (
              <Button
                variant="ghost"
                colorScheme="green"
                marginRight="5px"
                onClick={() => setIsEditing(true)}
              >
                <EditIcon />
              </Button>
            )}
            {isEditing && (
              <Button
                variant="ghost"
                colorScheme={"gray"}
                onClick={() => setIsEditing(false)}
              >
                <NotAllowedIcon />
              </Button>
            )}
            <Button
              variant="ghost"
              size={"xs"}
              colorScheme={"red"}
              onClick={() => onDeleteModalOpen(c.id)}
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
  toast,
  onDeleteModalOpen,
}) {
  return (
    <Center mt={10}>
      <Card w={"lg"}>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            {commentList.map((c) => (
              <CommentItem
                key={c.id}
                c={c}
                toast={toast}
                isSubmitting={isSubmitting}
                setIsSubmitting={setIsSubmitting}
                onDeleteModalOpen={onDeleteModalOpen}
              />
            ))}
          </Stack>
        </CardBody>
      </Card>
    </Center>
  );
}

export function HsComment({ businessId }) {
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const commentIdRef = useRef(0);

  function handleSubmit(comment) {
    setIsSubmitting(true);
    axios
      .post("/api/hospital/comment/add", comment)
      .then(() => {
        toast({
          description: "댓글 등록이 완료되었습니다.",
          status: "success",
        });
        setComment("");
      })
      .catch((e) => {
        if (e.response.status === 403 || e.response.status === 401) {
          toast({
            description: "권한이 없습니다.",
            status: "error",
          });
        }
        if (e.response.status === 400) {
          toast({
            description: "댓글에 내용을 작성해야합니다.",
            status: "error",
          });
        }
      })
      .finally(() => setIsSubmitting(false));
  }

  useEffect(() => {
    if (!isSubmitting) {
      const params = new URLSearchParams();
      params.set("id", businessId);
      axios
        .get("/api/hospital/comment/list?" + params)
        .then((r) => setCommentList(r.data));
    }
  }, [isSubmitting]);

  function handleDelete() {
    setIsSubmitting(true);
    axios
      .delete("/api/hospital/comment/" + commentIdRef.current)
      .then(() => {
        toast({
          description: "삭제가 완료되었습니다.",
          status: "success",
        });
      })
      .catch((e) => {
        if (e.response.status === 401 || e.response.status === 403) {
          toast({
            description: "권한이 없습니다.",
            status: "error",
          });
        } else {
          toast({
            description: "댓글 삭제에 문제가 생겼습니다.",
            status: "error",
          });
        }
      })
      .finally(() => {
        setIsSubmitting(false);
        onClose();
      });
  }

  function handleDeleteModalOpen(id) {
    commentIdRef.current = id;
    onOpen();
  }

  return (
    <Box>
      <Center mt={10}>
        <Box w={"lg"}>
          <CommentForm
            comment={comment}
            setComment={setComment}
            businessId={businessId}
            onSubmit={handleSubmit}
          />
        </Box>
      </Center>

      <CommentList
        businessId={businessId}
        commentList={commentList}
        setIsSubmitting={setIsSubmitting}
        isSubmitting={isSubmitting}
        toast={toast}
        onDeleteModalOpen={handleDeleteModalOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>삭제확인</ModalHeader>
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
