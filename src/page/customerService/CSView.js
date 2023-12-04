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
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "../../component/LoginProvider";

export function CSView() {
  const [cs, setCs] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();

  const { id } = useParams();

  const { hasAccess, isAdmin } = useContext(LoginContext);

  useEffect(() => {
    axios.get("/api/cs/id/" + id).then((response) => setCs(response.data));
  }, []);

  if (cs === null) {
    return <Spinner />;
  }

  function handleDelete() {
    axios
      .delete("/api/cs/remove/" + id)
      .then((response) => {
        toast({
          description: id + "번 공지글이 삭제되었습니다.",
          status: "success",
        });
        navigate("/cs");
      })
      .catch((error) => {
        toast({
          description: "삭제 중 문제가 발생하였습니다.",
          status: "error",
        });
      })
      .finally(() => onClose());
  }

  return (
    <div>
      <Box>
        <h1>{cs.id}번 글 보기</h1>
        <FormControl>
          <FormLabel>제목</FormLabel>
          <Input value={cs.csTitle} readOnly />
        </FormControl>
        <FormControl>
          <FormLabel>본문</FormLabel>
          <Textarea value={cs.csContent} readOnly />
        </FormControl>
        <FormControl>
          <FormLabel>작성자</FormLabel>
          <Input value={cs.csWriter} readOnly />
        </FormControl>
        <FormControl>
          <FormLabel>작성일시</FormLabel>
          <Input value={cs.inserted} readOnly />
        </FormControl>

        {(hasAccess(cs.csWriter) || isAdmin()) && (
          <Box>
            <Button
              colorScheme="purple"
              onClick={() => navigate("/csEdit/" + id)}
            >
              수정
            </Button>
            <Button colorScheme="red" onClick={onOpen}>
              삭제
            </Button>
          </Box>
        )}

        {/* 공지글 삭제 모달 */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>삭제 확인</ModalHeader>
            <ModalCloseButton />
            <ModalBody>삭제 하시겠습니까?</ModalBody>

            <ModalFooter>
              <Button onClick={onClose}>닫기</Button>
              <Button onClick={handleDelete} colorScheme="red">
                삭제
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </div>
  );
}
