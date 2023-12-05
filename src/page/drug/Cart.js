import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export function Cart() {
  const [cartList, setCartList] = useState(null);

  const { isOpen, onClose, onOpen } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get("/api/drug/cart/cartList")
      .then((response) => setCartList(response.data));
  }, []);

  if (cartList === null) {
    return <Spinner />;
  }

  function handleDelete() {
    axios
      .delete("/api/durg/cart/remove/" + id)
      .then((response) => {
        toast({
          description: id + "번 장바구니가 삭제되었습니다",
          status: "success",
        });
      })
      .catch((error) => {
        toast({
          description: "삭제 중 문제가 발생하였습니다",
          status: "error",
        });
      })
      .finally(() => onClose());
  }

  return (
    <Box marginLeft="270px">
      <Table>
        <Thead>
          <Tr>
            <Th>상품 번호</Th>
            <Th>상품 이름</Th>
            <Th>상품 갯수</Th>
            <Th>상품 금액</Th>
          </Tr>
        </Thead>
        <Tbody>
          {cartList.map((cart) => (
            <Tr key={cart.id}>
              <Td>{cart.id}</Td>
              <Td>{cart.drugName}</Td>
              <Td>{cart.quantity}</Td>
              <Td>{cart.total}</Td>
              <Button colorScheme="teal" variant="solid">
                주문
              </Button>
              <Button colorScheme="pink" onClick={onclose}>
                삭제
              </Button>
            </Tr>
          ))}
        </Tbody>
      </Table>
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
    </Box>
  );
}
