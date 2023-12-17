import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Img,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

export function PaymentHistory() {
  const [orderList, setOrderList] = useState(null);
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/order/history").then(({ data }) => setOrderList(data));
  }, []);

  if (orderList === null) {
    return <Spinner />;
  }

  const handleHistoryClick = (order) => {
    navigate("/home/member/paymentDetail", {
      state: { order },
    });
  };
  return (
    <Box>
      <Table>
        <Thead>
          <Tr>
            <Th>사진</Th>
            <Th>이름</Th>
            <Th>가격</Th>
            <Th>주문시각</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orderList.map((order) => (
            <Tr key={order.orderId} onClick={() => handleHistoryClick(order)}>
              <Td>
                <Img src={order.url} alt={order.url} w={"50px"} />
              </Td>
              <Td>{order.orderName}</Td>
              <Td>{order.amount}</Td>
              <Td>{order.inserted}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
