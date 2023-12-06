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
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { TbReportMedical } from "react-icons/tb";
import { Cart } from "./Cart";
import { DrugPagination } from "./DrugPagination";

export function DrugList() {
  const [drugList, setDrugList] = useState(null);
  const [pageInfo, setPageInfo] = useState(null);

  const { isOpen, onClose, onOpen } = useDisclosure();
  const btnRef = React.useRef();
  const [files, setFiles] = useState("");
  const [drug, setDrug] = useState(null);

  const [params] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios.get("/api/drug/drugList?" + params).then((response) => {
      setDrugList(response.data.drugList);
      setPageInfo(response.data.pageInfo);
    });
  }, [location]);

  if (drugList === null) {
    return <Spinner />;
  }

  return (
    <Box marginLeft="256px">
      <div>
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
            장바구니
          </Button>
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
                <Cart />
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

      <section className="min-h-screen w-full py-2 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-zinc-900 dark:to-zinc-800 flex items-center justify-center">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-3 md:gap-8">
            {/*첫번째 */}
            {drugList.map((drug) => (
              <div
                key="drug.id"
                className="flex flex-col p-6 bg-white shadow-lg rounded-lg dark:bg-zinc-850 justify-between border border-gray-300"
              >
                <div>
                  <div>
                    <Image src={drug.files[0].url} />
                  </div>
                  <div className="mt-10 text-center text-zinc-600 dark:text-zinc-400">
                    <span className="text-4xl font-bold">{drug.name}</span>/{" "}
                    {drug.func}
                  </div>

                  <ul className="mt-4 space-y-2 ">
                    <li className=" flex items-center text-4xl font-dongle ">
                      {/*<IconCheck className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />*/}
                      <TbReportMedical />
                      {drug.price}원
                    </li>
                  </ul>
                </div>
                <div className="mt-5">
                  <Button
                    className="w-full"
                    bg="green.600"
                    color="white"
                    onClick={() => navigate("/drug/" + drug.id)}
                  >
                    주문하기
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DrugPagination pageInfo={pageInfo} />
    </Box>
  );
}
// </Box>

function IconCheck(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
