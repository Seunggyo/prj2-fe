import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Center, Flex, Image, Spinner } from "@chakra-ui/react";

export function PaymentDetail() {
  const location = useLocation();
  const [orderList, setOrderList] = useState(null);

  useEffect(() => {
    axios
      .get("/api/order/orderList?orderId=" + location.state.order.orderId)
      .then(({ data }) => setOrderList(data));
  }, []);

  if (orderList === null) {
    return <Spinner />;
  }
  return (
    <Box maxWidth={"1000px"} marginLeft={"auto"} marginRight={"auto"} px={4}>
      {/* 장바구니 css*/}
      <Center>
        <Box marginTop="20px">
          <div className="col-span-1 bg-white lg:block hidden shadow-lg rounded p-6">
            <Flex>
              <Box>
                {orderList.map((order) => (
                  <ul
                    className="py-6 border-b space-y-6 px-8 w-auto"
                    key={order.id}
                  >
                    <li className="grid grid-cols-6 gap-4 border-b-1">
                      <div className="col-span-1 self-center">
                        <Image
                          src={order.url}
                          alt={order.url}
                          className="rounded w-full h-auto shadow-md"
                        />
                      </div>
                      <div className="flex flex-col col-span-3 pt-2">
                        <span
                          className="text-gray-600 text-md"
                          style={{ fontWeight: "500" }}
                        >
                          상품명: {order.drugName}
                        </span>
                        <span className="text-gray-400 text-sm pt-2">
                          기능: {order.func}
                        </span>
                      </div>
                      <div className="col-span-2 pt-3">
                        <div className="flex flex-col items-end text-sm">
                          <span className="text-gray-400">
                            개수: {order.quantity}
                          </span>
                          <span className="text-pink-400 font-semibold">
                            가격: {order.total}
                          </span>
                        </div>
                      </div>
                    </li>
                  </ul>
                ))}
              </Box>
              <Center
                marginBottom={"56px"}
                style={{ alignItems: "flex-start" }}
              >
                <section style={{ paddingLeft: "10px" }}>
                  {/*주문자*/}
                  <fieldset
                    className="mb-3 bg-white shadow-lg rounded p-6 text-gray-600"
                    style={{ minWidth: "300px" }}
                  >
                    <h1
                      className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2 mt-2"
                      style={{ fontSize: "2rem", paddingBottom: "10px" }}
                    >
                      배송지 정보
                    </h1>
                    <label className="flex border-b border-gray-200 py-2 items-center">
                      <div
                        className="text-left "
                        style={{ whiteSpace: "nowrap", fontWeight: "600" }}
                      >
                        수령인 :
                      </div>
                      <div
                        className="text-left px-2"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        {location.state.order.deliveryName}
                      </div>
                    </label>
                    <label className="flex border-b border-gray-200 py-2 items-center">
                      <div
                        className="text-left "
                        style={{ whiteSpace: "nowrap", fontWeight: "600" }}
                      >
                        번호 :
                      </div>
                      <div
                        className="text-left px-2"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        {location.state.order.deliveryPhone}
                      </div>
                    </label>
                    <label className="flex border-b border-gray-200 py-2 items-center">
                      <div
                        className="text-left "
                        style={{ whiteSpace: "nowrap", fontWeight: "600" }}
                      >
                        주소 :
                      </div>
                      <div className="text-left px-2 ">
                        {location.state.order.deliveryAddress}
                      </div>
                    </label>
                    <label className="flex border-b border-gray-200 py-2 items-center">
                      <div
                        className="text-left"
                        style={{ whiteSpace: "nowrap", fontWeight: "600" }}
                      >
                        메모 :
                      </div>
                      <div
                        className="text-left px-2"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        {location.state.order.deliveryComment}
                      </div>
                    </label>
                  </fieldset>
                </section>
              </Center>
            </Flex>
          </div>
        </Box>
      </Center>
    </Box>
  );
}
