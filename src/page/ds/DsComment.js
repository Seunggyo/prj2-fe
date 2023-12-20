import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
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
import { LoginContext } from "../../component/LoginProvider";
import axios from "axios";
import { DeleteIcon, EditIcon, NotAllowedIcon } from "@chakra-ui/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

function CommentForm({ businessId, isSubmitting, onSubmit }) {
  const [comment, setComment] = useState("");

  function handleSubmit() {
    onSubmit({ businessId, comment });
  }

  return (
    <Box marginTop="10px" marginBottom="10px">
      <Flex>
        <Textarea
          placeholder="댓글을 작성해주세요"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Center onClick={handleSubmit}>
          <Button h="full" size={5} isDisabled={isSubmitting} w="80px">
            <Heading>
              <FontAwesomeIcon icon={faPaperPlane} />
            </Heading>
          </Button>
        </Center>
      </Flex>
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
        <Heading fontSize="2xl" marginBottom="10px">
          {DsComment.memberNickName}
        </Heading>
        <Text fontSize="medium">{DsComment.ago}</Text>
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
              <Button colorScheme="gray" onClick={() => setIsEditing(false)}>
                <NotAllowedIcon />
              </Button>
            )}
            <Button
              variant="ghost"
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
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          {commentList.length > 0 &&
            commentList.map((DsComment) => (
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

function PageButton({ variant, pageNumber, children, handleClick }) {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  return (
    <Button variant={variant} onClick={handleClick}>
      {children}
    </Button>
  );
}

function Pagination({ pageInfo, handleClickPageButton }) {
  const pageNumbers = [];
  const navigate = useNavigate();

  for (let i = pageInfo.startPageNumber; i <= pageInfo.endPageNumber; i++) {
    pageNumbers.push(i);
  }

  return (
    <Box>
      {/* 뒤로가기*/}
      {pageInfo.prevPageNumber && (
        <PageButton variant="ghost" pageNumber={pageInfo.prevPageNumber}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </PageButton>
      )}

      {pageNumbers.map((pageNumber) => (
        <PageButton
          key={pageNumber}
          variant={
            pageNumber === pageInfo.currentPageNumber ? "solid" : "ghost"
          }
          pageNumber={pageNumber}
          handleClick={() => handleClickPageButton(pageNumber)}
        >
          {pageNumber}
        </PageButton>
      ))}

      {/*앞으로 가기*/}
      {pageInfo.nextPageNumber && (
        <PageButton variant="ghost" pageNumber={pageInfo.nextPageNumber}>
          <FontAwesomeIcon icon={faAngleRight} />
        </PageButton>
      )}
    </Box>
  );
}

export function DsComment({ businessId }) {
  const { isAuthenticated } = useContext(LoginContext);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [pageInfo, setPageInfo] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const { isOpen, onClose, onOpen } = useDisclosure();

  // 임시로 값을 저장하는 용도로 사용할려고 씀
  const commentIdRef = useRef(0);

  const toast = useToast();

  useEffect(() => {
    if (!isSubmitting) {
      const params = new URLSearchParams();
      params.set("id", businessId);
      params.set("p", pageNumber);

      axios.get("/api/ds/comment/list?" + params).then((response) => {
        setCommentList(response.data.dsComment);
        setPageInfo(response.data.pageInfo);
      });
    }
  }, [isSubmitting, pageNumber]);

  function handleClickPageButton(page) {
    setPageNumber(page);
  }
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
      <Box>
        <Pagination
          pageInfo={pageInfo}
          handleClickPageButton={handleClickPageButton}
        />
      </Box>
      {/*삭제 모달*/}
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
