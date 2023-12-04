import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Image,
  Input,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

export function Aaa() {
  // a태그를 navigate 로 바꿀 것..

  // 모달용
  const { isOpen, onClose, onOpen } = useDisclosure();

  const btnRef = React.useRef();

  // druglist에 관한 것들
  const [drugList, setDrugList] = useState(null);
  const [files, setFiles] = useState("");
  const [drug, setDrug] = useState(null);

  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/drug/drugList?" + params)
      .then((response) => setDrugList(response.data));
  }, [params]);

  if (drugList === null) {
    return <Spinner />;
  }

  return (
    <div className="bg-white">
      <header>
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-end w-full">
              {/*TODO: 우측 상단 메뉴버튼*/}
              <Button
                ref={btnRef}
                colorScheme="teal"
                onClick={onOpen}
                class="flex text-gray-600 focus:outline-none mx-4 sm:mx-0"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                메뉴
              </Button>

              {/*TODO: 장바구니 사이드바 오른쪽방향드로워*/}
              <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
              >
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerCloseButton />

                  {/*제목글*/}
                  <DrawerHeader className="text-2xl font-medium text-gray-700">
                    장바구니 카트
                  </DrawerHeader>

                  {/*본문내용*/}
                  <DrawerBody>
                    <div className="flex justify-between mt-6">
                      <div className="flex">
                        <div className="mx-3">
                          {/*장바구니 사이드바 1*/}
                          <h3 className="text-sm text-gray-600">
                            메뉴1 사진도 넣으려면 넣기.
                          </h3>
                          <div className="flex items-center mt-2">
                            <button className="text-gray-500 focus:outline-none focus:text-gray-600">
                              <svg
                                className="h-5 w-5"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                            </button>
                            <span className="text-gray-700 mx-2">2</span>
                            <button className="text-gray-500 focus:outline-none focus:text-gray-600">
                              <svg
                                className="h-5 w-5"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                      <span className="text-gray-600">가격은얼마</span>
                    </div>

                    {/*장바구니 사이드바 2*/}
                    <div className="flex justify-between mt-6">
                      <div className="flex">
                        <div className="mx-3">
                          <h3 className="text-sm text-gray-600">
                            메뉴2 사진도 넣으려면 넣기.
                          </h3>
                          <div className="flex items-center mt-2">
                            <button className="text-gray-500 focus:outline-none focus:text-gray-600">
                              <svg
                                className="h-5 w-5"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                            </button>
                            <span className="text-gray-700 mx-2">2</span>
                            <button className="text-gray-500 focus:outline-none focus:text-gray-600">
                              <svg
                                className="h-5 w-5"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                      <span className="text-gray-600">가격은얼마</span>
                    </div>

                    {/*장바구니 사이드바 3*/}
                    <div className="flex justify-between mt-6">
                      <div className="flex">
                        <div className="mx-3">
                          <h3 className="text-sm text-gray-600">
                            메뉴3 사진도 넣으려면 넣기.
                          </h3>
                          <div className="flex items-center mt-2">
                            <button className="text-gray-500 focus:outline-none focus:text-gray-600">
                              <svg
                                className="h-5 w-5"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                            </button>
                            <span className="text-gray-700 mx-2">2</span>
                            <button className="text-gray-500 focus:outline-none focus:text-gray-600">
                              <svg
                                className="h-5 w-5"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                      <span className="text-gray-600">가격은얼마</span>
                    </div>
                  </DrawerBody>

                  {/*TODO: 장바구니 사이드바 하단부 있어도 되고 없어도 댐*/}
                  <DrawerFooter>
                    <Button variant="outline" mr={3} onClick={onClose}>
                      취소
                    </Button>
                    <Button colorScheme="blue">저장</Button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
          </div>

          {/*TODO: 쇼핑몰 navbar.. 일단 넣어봄.. <a 태그 onClick 으로 바꾸기..>*/}
          {/*<nav className="sm:flex sm:justify-center sm:items-center mt-4">*/}
          {/*  <div className="flex flex-col sm:flex-row">*/}
          {/*    <a*/}
          {/*      className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0"*/}
          {/*      href="#"*/}
          {/*    >*/}
          {/*      Home*/}
          {/*    </a>*/}
          {/*    <a*/}
          {/*      className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0"*/}
          {/*      href="#"*/}
          {/*    >*/}
          {/*      Shop*/}
          {/*    </a>*/}
          {/*    <a*/}
          {/*      className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0"*/}
          {/*      href="#"*/}
          {/*    >*/}
          {/*      Categories*/}
          {/*    </a>*/}
          {/*    <a*/}
          {/*      className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0"*/}
          {/*      href="#"*/}
          {/*    >*/}
          {/*      Contact*/}
          {/*    </a>*/}
          {/*    <a*/}
          {/*      className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0"*/}
          {/*      href="#"*/}
          {/*    >*/}
          {/*      About*/}
          {/*    </a>*/}
          {/*  </div>*/}
          {/*</nav>*/}
          <div className="relative mt-6 max-w-lg mx-auto">
            <Input
              class="w-full border rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
      </header>

      {/*TODO: main본문 내용*/}
      <main className="my-8">
        <div className="container mx-auto px-6">
          <h3 className="text-gray-700 text-2xl font-medium">상품 리스트</h3>
          <span className="mt-3 text-sm text-gray-500">200+ 상품</span>

          <section className="min-h-screen w-full py-2 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-zinc-900 dark:to-zinc-800 flex items-center justify-center">
            <div className="container px-4 md:px-6">
              <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-3 md:gap-8">
                {drugList.map((drug) => (
                  <div className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
                    <div
                      className=" items-end justify-end h-56 w-full bg-cover"
                      // TODO: 이미지 스타일 넣을때 항상 이런 방식으로...
                    >
                      <Box width="100%">
                        <Image w="100%" src={drug.files[0].url} />
                      </Box>
                      <button className="p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                      </button>
                    </div>
                    <div className="px-5 py-3 bg-white">
                      <h3 className="text-gray-700 uppercase">{drug.name}</h3>
                      <span className="text-gray-500 mt-2">{drug.price}원</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* TODO: 게시글 페이징 <a태그로 된것들 onClick으로 바꾸기..>*/}
          <div className="flex justify-center">
            <div className="flex rounded-md mt-8">
              <a
                href="#"
                className="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 ml-0 rounded-l hover:bg-blue-500 hover:text-white"
              >
                <span />이 전
              </a>
              <a
                href="#"
                className="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 hover:bg-blue-500 hover:text-white"
              >
                <span>1</span>
              </a>
              <a
                href="#"
                className="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 hover:bg-blue-500 hover:text-white"
              >
                <span>2</span>
              </a>
              <a
                href="#"
                className="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 hover:bg-blue-500 hover:text-white"
              >
                <span>3</span>
              </a>
              <a
                href="#"
                className="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 rounded-r hover:bg-blue-500 hover:text-white"
              >
                <span>다 음</span>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
