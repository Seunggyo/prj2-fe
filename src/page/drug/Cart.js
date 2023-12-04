import {
  Box,
  Button,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export function Cart() {
  const [cartList, setCartList] = useState(null);

  useEffect(() => {
    axios
      .get("/api/drug/cart/cartList")
      .then((response) => setCartList(response.data));
  }, []);

  if (cartList === null) {
    return <Spinner />;
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
              <Button colorScheme="pink">삭제</Button>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
