import { Box, Image, Spinner, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { nanoid } from "nanoid";

const orderCode = nanoid();
export function DrugBuy() {
  const [buy, setBuy] = useState(null);
  const [orderer, setOrderer] = useState(null);
  const location = useLocation();
  const [deliveryName, setDeliveryName] = useState("");
  const [deliveryPhone, setDeliveryPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryComment, setDeliveryComment] = useState("");

  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    axios.get("/api/drug/buy").then(({ data }) => setOrderer(data));
  }, []);

  if (orderer === null) {
    return <Spinner />;
  }

  if (location.state.url === null) {
    return <Spinner />;
  }

  function handleOrderClick() {
    if (
      deliveryName === "" ||
      deliveryComment === "" ||
      deliveryPhone === "" ||
      deliveryAddress === ""
    ) {
      toast({
        description: "배송지 정보를 입력 해 주세요",
        status: "warning",
      });
    } else {
      navigate("/payment", {
        state: {
          orderName: location.state.orderName,
          ordererName: orderer.id,
          ordererPhone: orderer.phone,
          ordererEmail: orderer.email,
          ordererAddress: orderer.address,
          amount: location.state.amount,
          orderCode,

          deliveryName,
          deliveryPhone,
          deliveryAddress,
          deliveryComment,
        },
      });
    }
  }

  return (
    <Box px={20} h="4/6">
      <div className="h-screen grid grid-cols-3 ">
        <div className="lg:col-span-2 col-span-3 bg-fuchsia-50 space-y-8 px-12">
          <div className="mt-8 p-4 relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md">
            <div className="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
              <div className="text-yellow-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 sm:w-5 h-6 sm:h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="text-sm font-medium ml-3">Checkout</div>
            </div>
            <div className="text-sm tracking-wide text-gray-500 mt-4 sm:mt-0 sm:ml-4">
              아래의 배송 및 결제 세부 정보를 입력해 주세요.
            </div>
            <div className="absolute sm:relative sm:top-auto sm:right-auto ml-auto right-4 top-4 text-gray-400 hover:text-gray-800 cursor-pointer">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
          <div className="rounded-md">
            <form id="payment-form" method="POST" action="">
              <section>
                {/*주문자*/}
                <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2 mt-2">
                  주문자
                </h2>
                <fieldset className="mb-3 bg-white shadow-lg rounded text-gray-600">
                  <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                    <span className="text-right px-2">이름</span>
                    <input
                      name="name"
                      className="focus:outline-none px-3"
                      value={orderer.id}
                      readOnly
                    />
                  </label>
                  <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                    <span className="text-right px-2">번호</span>
                    <input
                      name="phone"
                      type="phone"
                      className="focus:outline-none px-3"
                      value={orderer.phone}
                      readOnly
                    />
                  </label>
                  <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                    <span className="text-right px-2">email</span>
                    <input
                      name="email"
                      className="focus:outline-none px-3"
                      value={orderer.email}
                      readOnly
                    />
                  </label>
                  <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                    <span className="text-right px-2">주소</span>
                    <input
                      name="address"
                      className="focus:outline-none px-3"
                      value={orderer.address}
                    />
                  </label>
                </fieldset>
              </section>

              <section>
                {/*배송지*/}
                <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2 mt-10">
                  배송지
                </h2>
                <fieldset className="mb-3 bg-white shadow-lg rounded text-gray-600">
                  <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                    <span className="text-right px-2">이름</span>
                    <input
                      name="name"
                      className="focus:outline-none px-3"
                      placeholder="이름을 적어주세요"
                      required
                      onChange={(e) => setDeliveryName(e.target.value)}
                    />
                  </label>
                  <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                    <span className="text-right px-2">번호</span>
                    <input
                      name="phone"
                      className="focus:outline-none px-3"
                      placeholder="전화번호를 적어주세요."
                      required
                      onChange={(e) => setDeliveryPhone(e.target.value)}
                    />
                  </label>
                  <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                    <span className="text-right px-2">주소</span>
                    <input
                      name="address"
                      className="focus:outline-none px-3"
                      placeholder="주소를 적어주세요."
                      required
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                    />
                  </label>
                  <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                    <span className="text-right px-2">배송 메모</span>
                    <input
                      name="city"
                      className="focus:outline-none px-3"
                      placeholder="배송메모를 입력해주세요."
                      onChange={(e) => setDeliveryComment(e.target.value)}
                    />
                  </label>
                </fieldset>
              </section>
            </form>
          </div>

          <div class="rounded-md">
            <section>
              <h2 class="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
                상품 정보
              </h2>
              <fieldset class="mb-3 bg-white shadow-lg rounded text-gray-600">
                <label class="flex border-b border-gray-200 h-12 py-3 items-center">
                  <Image
                    w={"50px"}
                    src={location.state.cartList[0].url}
                    alt={location.state.cartList[0].url}
                  />
                  <span>{location.state.orderName}</span>
                </label>
              </fieldset>
            </section>
          </div>
          <button
            onClick={handleOrderClick}
            class="submit-button px-4 py-3 rounded-full bg-green-700 text-white focus:ring focus:outline-none w-full text-xl font-semibold transition-colors"
          >
            {location.state.amount}원 결제
          </button>
        </div>
        <div className="col-span-1 bg-white lg:block hidden">
          <h1 className="py-6 border-b-2 text-xl text-gray-600 px-8">
            주문 상품
          </h1>
          <div className="px-8 border-b"></div>
          <ul className="py-6 border-b space-y-6 px-8">
            {location.state.cartList.map((cart) => (
              <li className="grid grid-cols-6 gap-2 border-b-1">
                <div className="col-span-1 self-center">
                  <img
                    src={cart.url}
                    alt={cart.url}
                    className="rounded w-full"
                  />
                </div>
                <div className="flex flex-col col-span-3 pt-2">
                  <span className="text-gray-600 text-md font-semi-bold">
                    {cart.drugName}
                  </span>
                  <span className="text-gray-400 text-sm inline-block pt-2">
                    {cart.func}
                  </span>
                </div>
                <div className="col-span-2 pt-3">
                  <div className="flex items-center space-x-2 text-sm justify-between">
                    <span className="text-gray-400">
                      수량 : {cart.quantity}개
                    </span>
                    <span className="text-pink-400 font-semibold inline-block">
                      {cart.total}원
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="font-semibold text-xl px-8 flex justify-between py-8 text-gray-600">
            <span>Total</span>
            <span>{location.state.amount} 원</span>
          </div>
        </div>
      </div>
    </Box>
  );
}
