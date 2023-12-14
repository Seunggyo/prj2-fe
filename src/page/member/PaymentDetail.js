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
    <Box maxWidth={"800px"} marginLeft={"100px"}>
      {/* 장바구니 css*/}
      <Center>
        <Box marginTop="20px">
          <div className="col-span-1 bg-white lg:block hidden">
            <Flex>
              <Box>
                {orderList.map((order) => (
                  <ul
                    className="py-6 border-b space-y-6 px-8 w-auto"
                    key={order.id}
                  >
                    <li className="grid grid-cols-6 gap-2 border-b-1">
                      <div className="col-span-1 self-center">
                        <Image
                          src={order.url}
                          alt={order.url}
                          className="rounded w-full"
                        />
                      </div>
                      <div className="flex flex-col col-span-3 pt-2">
                        <span className="text-gray-600 text-md font-semi-bold">
                          상품명 : {order.drugName}
                        </span>
                        <span className="text-gray-400 text-sm inline-block pt-2">
                          기능 : {order.func}
                        </span>
                      </div>
                      <br />
                      <div className="col-span-2 pt-3">
                        <div className="flex items-center space-x-2 text-sm justify-between">
                          <span className="text-gray-400">
                            개수 : {order.quantity}
                          </span>
                          <span className="text-pink-400 font-semibold inline-block">
                            가격 : {order.total}
                          </span>
                        </div>
                      </div>
                    </li>
                  </ul>
                ))}
              </Box>
              <Center marginBottom={"56px"} marginRight={"80px"}>
                <section>
                  {/*주문자*/}
                  <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2 mt-2">
                    배송지 정보
                  </h2>
                  <fieldset className="mb-3 bg-white shadow-lg rounded text-gray-600">
                    <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                      <span className="text-right px-2">이름</span>
                      <input
                        name="name"
                        className="focus:outline-none px-3"
                        value={"수령인 : " + location.state.order.deliveryName}
                        readOnly
                      />
                    </label>
                    <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                      <span className="text-right px-2">번호</span>
                      <input
                        name="phone"
                        type="phone"
                        className="focus:outline-none px-3"
                        value={"번호 : " + location.state.order.deliveryPhone}
                        readOnly
                      />
                    </label>
                    <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                      <span className="text-right px-2">email</span>
                      <input
                        name="address"
                        className="focus:outline-none px-3"
                        value={"주소 : " + location.state.order.deliveryAddress}
                        readOnly
                      />
                    </label>
                    <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                      <span className="text-right px-2">주소</span>
                      <input
                        name="comment"
                        className="focus:outline-none px-3"
                        value={"메모 : " + location.state.order.deliveryComment}
                      />
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
