import {
  border,
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
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
  useNumberInput,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { DrugComment } from "./DrugComment";
import { IoIosCart } from "react-icons/io";
import * as PropTypes from "prop-types";

function CartContainer({ cart, onClick }) {
  const { getInputProps, getDecrementButtonProps, getIncrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 0,
      min: 0,
      max: 10,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  if (cart === null) {
    return <Spinner />;
  }

  return (
    <Box>
      <HStack maxW="320px">
        <Button {...dec}>-</Button>
        <Input {...input} />
        <Button {...inc}>+</Button>
      </HStack>
      <Button variant="ghost" onClick={() => onClick(input.value)}>
        <IoIosCart size="xl" />
      </Button>
    </Box>
  );
}

export function DrugView() {
  const [drug, setDrug] = useState(null);
  const [cart, setCart] = useState(null);

  const { isOpen, onClose, onOpen } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios.get("/api/drug/id/" + id).then((response) => setDrug(response.data));
  }, []);

  useEffect(() => {
    axios
      .get("/api/drug/cart/drugId/" + id)
      .then((response) => setCart(response.data));
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

  function handleCart(quantity) {
    axios
      .post("/api/drug/cart", { drugId: drug.id, quantity })
      .then((response) => {
        setCart(response.data);
        toast({
          description: "장바구니에 담는중입니다.",
          status: "success",
        });
      })
      .catch((error) => {
        toast({
          description: " 장바구니에 넣는 중 문제가 발생하였습니다.",
          status: "error",
        });
      })
      .finally(() => onClose);
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
      {/*장바구니*/}
      <CartContainer cart={cart} onClick={handleCart} />

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
