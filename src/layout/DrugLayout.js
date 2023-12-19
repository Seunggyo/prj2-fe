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
  useDisclosure,
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import React from "react";
import { NavBarDrug } from "./NavBarDrug";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Cart } from "../page/drug/Cart";

export function DrugLayout() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <NavBarDrug />

      <div>
        <div className="flex items-center justify-end w-full">
          {/*TODO: 우측 상단 메뉴버튼*/}
          <Button
            colorScheme="teal"
            onClick={onOpen}
            class="flex text-gray-600 focus:outline-none mx-4 sm:mx-0 font-dongle font-semibold text-3xl"
          >
            <svg
              // className="h-5 w-5"
              className="w-10"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <span className="w-20 mr-20">장바구니</span>
          </Button>
          <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />

              {/*제목글*/}
              <DrawerHeader className="text-2xl font-medium text-gray-700">
                <FontAwesomeIcon icon={faCartPlus} size="1xl" color="green" />
              </DrawerHeader>

              {/*본문내용*/}
              <DrawerBody marginBottom="200px">
                <Cart />
              </DrawerBody>

              {/*TODO: 장바구니 사이드바 하단부 있어도 되고 없어도 댐*/}
              <DrawerFooter>
                <Button variant="outline" mr={3} onClick={onClose}>
                  <FontAwesomeIcon icon={faRightFromBracket} />
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
      <Outlet />
    </Box>
  );
}
