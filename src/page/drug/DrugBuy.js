import { Box, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export function DrugBuy() {
  const [buy, setBuy] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    axios.get("/api/drug/buy/id/" + id).then(({ data }) => setBuy(data));
  }, []);

  if (buy === null) {
    return <Spinner />;
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
                      placeholder="이름을 적어주세요."
                      required
                    />
                  </label>
                  <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                    <span className="text-right px-2">번호</span>
                    <input
                      name="email"
                      type="email"
                      className="focus:outline-none px-3"
                      placeholder="번호를 적어주세요."
                      required
                    />
                  </label>
                  <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                    <span className="text-right px-2">주소</span>
                    <input
                      name="address"
                      className="focus:outline-none px-3"
                      placeholder="주소를 적어주세요."
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
                      placeholder="이름을 적어주세요."
                      required
                    />
                  </label>
                  <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                    <span className="text-right px-2">번호</span>
                    <input
                      name="email"
                      type="email"
                      className="focus:outline-none px-3"
                      placeholder="번호를 적어주세요."
                      required
                    />
                  </label>
                  <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                    <span className="text-right px-2">주소</span>
                    <input
                      name="address"
                      className="focus:outline-none px-3"
                      placeholder="주소를 적어주세요."
                    />
                  </label>
                  <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                    <span className="text-right px-2">배송 메모</span>
                    <input
                      name="city"
                      className="focus:outline-none px-3"
                      placeholder="배송메모를 입력해주세요."
                    />
                  </label>

                  {/*<label class="inline-flex w-2/4 border-gray-200 py-3">*/}
                  {/*  <span class="text-right px-2">배송메모</span>*/}
                  {/*  <input*/}
                  {/*    name="state"*/}
                  {/*    class="focus:outline-none px-3"*/}
                  {/*    placeholder="CA"*/}
                  {/*  />*/}
                  {/*</label>*/}
                  {/*<label class="xl:w-1/4 xl:inline-flex py-3 items-center flex xl:border-none border-t border-gray-200 py-3">*/}
                  {/*  <span class="text-right px-2 xl:px-0 xl:text-none">*/}
                  {/*    ZIP*/}
                  {/*  </span>*/}
                  {/*  <input*/}
                  {/*    name="postal_code"*/}
                  {/*    class="focus:outline-none px-3"*/}
                  {/*    placeholder="98603"*/}
                  {/*  />*/}
                  {/*</label>*/}
                </fieldset>
              </section>
            </form>
          </div>

          <div class="rounded-md">
            <section>
              <h2 class="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
                결제
              </h2>
              <fieldset class="mb-3 bg-white shadow-lg rounded text-gray-600">
                <label class="flex border-b border-gray-200 h-12 py-3 items-center">
                  <span class="text-right px-2">Card</span>
                  <input
                    name="card"
                    class="focus:outline-none px-3 w-full"
                    placeholder="Card number MM/YY CVC"
                    required=""
                  />
                </label>
              </fieldset>
            </section>
          </div>
          <button class="submit-button px-4 py-3 rounded-full bg-green-700 text-white focus:ring focus:outline-none w-full text-xl font-semibold transition-colors">
            Pay €846.98
          </button>
        </div>
        <div class="col-span-1 bg-white lg:block hidden">
          <h1 class="py-6 border-b-2 text-xl text-gray-600 px-8">
            Order Summary
          </h1>
          <ul class="py-6 border-b space-y-6 px-8">
            <li class="grid grid-cols-6 gap-2 border-b-1">
              <div class="col-span-1 self-center">
                <img
                  src="https://bit.ly/3oW8yej"
                  alt="Product"
                  class="rounded w-full"
                />
              </div>
              <div class="flex flex-col col-span-3 pt-2">
                <span class="text-gray-600 text-md font-semi-bold">
                  Studio 2 Headphone
                </span>
                <span class="text-gray-400 text-sm inline-block pt-2">
                  Red Headphone
                </span>
              </div>
              <div class="col-span-2 pt-3">
                <div class="flex items-center space-x-2 text-sm justify-between">
                  <span class="text-gray-400">2 x €30.99</span>
                  <span class="text-pink-400 font-semibold inline-block">
                    €61.98
                  </span>
                </div>
              </div>
            </li>
            <li class="grid grid-cols-6 gap-2 border-b-1">
              <div class="col-span-1 self-center">
                <img
                  src="https://bit.ly/3lCyoSx"
                  alt="Product"
                  class="rounded w-full"
                />
              </div>
              <div class="flex flex-col col-span-3 pt-2">
                <span class="text-gray-600 text-md font-semi-bold">
                  Apple iPhone 13
                </span>
                <span class="text-gray-400 text-sm inline-block pt-2">
                  Phone
                </span>
              </div>
              <div class="col-span-2 pt-3">
                <div class="flex items-center space-x-2 text-sm justify-between">
                  <span class="text-gray-400">1 x €785</span>
                  <span class="text-pink-400 font-semibold inline-block">
                    €785
                  </span>
                </div>
              </div>
            </li>
          </ul>
          <div class="px-8 border-b">
            <div class="flex justify-between py-4 text-gray-600">
              <span>Subtotal</span>
              <span class="font-semibold text-pink-500">€846.98</span>
            </div>
            <div class="flex justify-between py-4 text-gray-600">
              <span>Shipping</span>
              <span class="font-semibold text-pink-500">Free</span>
            </div>
          </div>
          <div class="font-semibold text-xl px-8 flex justify-between py-8 text-gray-600">
            <span>Total</span>
            <span>€846.98</span>
          </div>
        </div>
      </div>
    </Box>
  );
}
