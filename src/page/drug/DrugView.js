import {
  border,
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Image,
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
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { DrugComment } from "./DrugComment";
import { IoIosCart } from "react-icons/io";

export function DrugView() {
  const [drug, setDrug] = useState(null);

  const { isOpen, onClose, onOpen } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios.get("/api/drug/id/" + id).then((response) => setDrug(response.data));
  }, []);

  if (drug === null) {
    return <Spinner />;
  }

  function handleDelete() {
    axios
      .delete("/api/drug/remove/" + id)
      .then((response) => {
        toast({
          description: id + "번 게시물이 삭제되었습니다.",
          status: "success",
        });
        navigate("/drug/drugList/");
      })
      .catch((error) => {
        toast({
          description: "삭제 중 문제가 발생하였습니다.",
          status: "error",
        });
      })
      .finally(() => onClose());
  }

  function handleCart() {
    axios
      .post("/api/drug/cart", { drugId: drug.id })
      .then(() => console.log("잘됨"))
      .catch(() => console.log("안됨"))
      .finally(() => console.log("끝"));
  }

  return (
    <Box marginLeft="256px">
      <h1>{drug.id}영양제 보기</h1>

      <FormControl>
        <FormLabel>사진</FormLabel>
        {drug.files.map((file) => (
          <Box
            key={file.id}
            my="5px"
            border="3px solid black"
            width="500px"
            height="500px"
          >
            <Image width="100%" src={file.url} alt={file.name} />
          </Box>
        ))}
      </FormControl>

      <FormControl>
        <FormLabel>제품명</FormLabel>
        <Input value={drug.name} readOnly />
        <FormHelperText>{drug.content}</FormHelperText>
      </FormControl>

      <FormControl>
        <FormLabel>기능</FormLabel>
        <Input value={drug.func} readOnly />
      </FormControl>

      <FormControl>
        <FormLabel>가격</FormLabel>
        <Input value={drug.price} readOnly />
      </FormControl>

      <FormControl>
        <FormLabel>배송비</FormLabel>
        <Input value={drug.shipping} readOnly />
      </FormControl>

      <FormControl>
        <FormLabel>등록 일자</FormLabel>
        <Input value={drug.inserted} readOnly />
      </FormControl>

      <Button variant="ghost" bg="red.300" color="white" onClick={handleCart}>
        <IoIosCart size="xl" />
      </Button>

      <Button colorScheme="pink" onClick={() => navigate("/drug/edit/" + id)}>
        수정
      </Button>
      <Button colorScheme="purple" onClick={onOpen}>
        삭제
      </Button>

      {/* 삭제 모달 */}
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
      <DrugComment drugId={drug.id} />
    </Box>
  );
}
