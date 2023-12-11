import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormHelperText,
  Heading,
  Image,
  Input,
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
import { LoginContext } from "../../component/LoginProvider";
import { DeleteIcon, EditIcon, NotAllowedIcon } from "@chakra-ui/icons";

function CommentForm({ drugId, isSubmitting, onSubmit, setFiles }) {
  const [comment, setComment] = useState("");

  function handleSubmit() {
    onSubmit({ drugId, comment });
  }

  return (
    <Box>
      <Textarea value={comment} onChange={(e) => setComment(e.target.value)} />
      <Flex>
        <Input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setFiles(e.target.files)}
        />
        <Button
          isDisabled={isSubmitting}
          onClick={handleSubmit}
          colorScheme="blue"
        >
          댓글등록
        </Button>
      </Flex>
    </Box>
  );
}

function CommentItem({
  drugComment,
  onDeleteModalOpen,
  setIsSubmitting,
  isSubmitting,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [commentEdited, setCommentEdited] = useState(drugComment.comment);

  const { hasAccess } = useContext(LoginContext);

  const toast = useToast();

  function handleSubmit() {
    // TODO: 응답 코드에 따른 기능들 추가

    setIsSubmitting(true);

    axios
      .put("/api/drug/comment/edit", {
        id: drugComment.id,
        comment: commentEdited,
      })
      .then(() => {
        toast({
          description: "댓글이 잘 달렸소",
          status: "success",
        });
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          toast({
            description: "권한이 없소",
            status: "warning",
          });
        }
        if (error.response.status === 400) {
          toast({
            description: "입력값을 확인 해주시오",
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
        <Heading size="xs">{drugComment.memberId}</Heading>
        <Text fontSize="xs">{drugComment.inserted}</Text>
      </Flex>
      <Flex>
        {drugComment.files.map((file) => (
          <Box key={file.id} width="300px" border="1px solid black">
            <Image width="100%" src={file.url} />
          </Box>
        ))}
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

function CommentList({
  drugCommentList,
  onDeleteModalOpen,
  isSubmitting,
  setIsSubmitting,
}) {
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
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
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
  const [files, setFiles] = useState(null);

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
      .postForm("/api/drug/comment/add", {
        comment: comment.comment,
        drugId: comment.drugId,
        uploadfiles: files,
      })
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
          setFiles={setFiles}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
        />
      )}

      <CommentList
        drugId={drugId}
        isSubmitting={isSubmitting}
        setIsSubmitting={setIsSubmitting}
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
