import {
  Box,
  Button,
  Image,
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
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../../component/LoginProvider";

export function Cart() {
  const [cartList, setCartList] = useState(null);

  const idRef = useRef(null);

  const { isOpen, onClose, onOpen } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(LoginContext);

  useEffect(() => {
    axios.get("/api/drug/cart/cartList").then((response) => {
      setCartList(response.data);
      if (!isAuthenticated()) {
        navigate("/member/login");
      }
    });
  }, [isOpen]);

  if (cartList === null) {
    return <Spinner />;
  }

  function handleDelete() {
    axios
      .delete("/api/drug/cart/remove/" + idRef.current)
      .then((response) => {
        toast({
          description: idRef.current + "번 장바구니가 삭제되었습니다",
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
    <Box marginRight="40px">
      <Table>
        <Thead>
          <Tr>
            <Th>상품 번호</Th>
            <Th>사진</Th>
            <Th>상품 이름</Th>
            <Th>상품 갯수</Th>
            <Th>상품 금액</Th>
          </Tr>
        </Thead>
        <Tbody>
          {cartList.map((cart) => (
            <Tr key={cart.id}>
              <Td>{cart.id}</Td>
              <Td>
                <Image w={"50px"} src={cart.url} alt={cart.url} />
              </Td>
              <Td>{cart.drugName}</Td>
              <Td>{cart.quantity}</Td>
              <Td>{cart.total}</Td>
              <Button
                colorScheme="teal"
                variant="solid"
                onClick={() => navigate("/drug/buy/" + cart.id)}
              >
                주문
              </Button>
              <Button
                colorScheme="pink"
                onClick={() => {
                  idRef.current = cart.id;
                  onOpen();
                }}
              >
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
