import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Img,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";

export function PaymentHistory() {
  const [orderList, setOrderList] = useState(null);
  const { id } = useParams();

  const toast = useToast();
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    axios.get("/api/order/history").then(({ data }) => setOrderList(data));
  }, [location]);

  if (orderList === null) {
    return <Spinner />;
  }

  const handleHistoryClick = (order) => {
    navigate("/home/member/paymentDetail", {
      state: { order },
    });
  };

  function handleDeleteClick(orderId) {
    axios
      .delete("/api/order/remove?orderId=" + orderId)
      .then(() => {
        toast({
          description: "삭제되었습니다.",
          status: "success",
        });
        // 삭제 후에 목록 갱신
        axios.get("/api/order/history").then(({ data }) => setOrderList(data));
      })
      .catch(() => {
        toast({
          description: "오류가 발생했습니다.",
          status: "error",
        });
      });
  }

  return (
    <div className="container mx-auto p-4">
      <div
        className="flex -mx-2 overflow-hidden"
        style={{ flexDirection: "column", alignItems: "center" }}
      >
        {orderList.map((order) => (
          <div
            key={order.orderId}
            className="w-full   p-2"
            style={{ maxWidth: "900px" }}
          >
            <div
              className="flex bg-white border border-gray-300 p-4"
              style={{ flexDirection: "row" }}
            >
              <div className="text-center">
                <img
                  src={order.url}
                  alt={order.url}
                  className="w-36 h-36 object-cover mx-auto"
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    paddingLeft: "20px",
                    paddingBottom: "10px",
                    paddingTop: "10px",
                  }}
                >
                  <div
                    style={{
                      flex: "1",
                      fontSize: "1.5rem",
                      justifyContent: "space-between",
                      fontWeight: "500",
                    }}
                  >
                    {order.orderName}
                  </div>
                  <div className="font-bold" style={{ fontSize: "1.2rem" }}>
                    {order.amount}원
                  </div>
                  <div className="text-gray-500">{order.inserted}</div>
                </div>
                <div
                  style={{
                    paddingTop: "10px",
                    paddingRight: "10px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Button
                    colorScheme={"teal"}
                    style={{ justifyContent: "flex-end" }}
                    onClick={() => handleHistoryClick(order)}
                  >
                    상세보기
                  </Button>
                  <Button
                    colorScheme={"red"}
                    style={{ justifyContent: "flex-end" }}
                    onClick={() => handleDeleteClick(order.orderId)}
                  >
                    주문 취소
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
