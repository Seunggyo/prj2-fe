import {
  Box,
  Button,
  Center,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../../component/LoginProvider";

export function Cart() {
  const [cartList, setCartList] = useState(null);
  const [amount, setAmount] = useState(0);

  const idRef = useRef(null);

  const { isOpen, onClose, onOpen } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(LoginContext);

  useEffect(() => {
    axios.get("/api/drug/cart/cartList").then((response) => {
      setCartList(response.data.cartList);
      setAmount(response.data.amount);
      if (!isAuthenticated()) {
        navigate("/home/member/login");
      }
    });
  }, [isOpen]);

  if (cartList === null) {
    return <Spinner />;
  }
  function handleDelete() {
    axios
      .delete("/api/drug/cart/remove/" + idRef.current)
      .then((response) => {
        toast({
          description: idRef.current + "번 장바구니가 삭제되었습니다",
          status: "success",
        });
      })
      .catch((error) => {
        toast({
          description: "삭제 중 문제가 발생하였습니다",
          status: "error",
        });
      })
      .finally(() => onClose());
  }

  return (
    <Box marginRight="40px">
      {/* 장바구니 css*/}
      <Center>
        <Box maxW="600px" marginTop="20px">
          <div className="col-span-1 bg-white lg:block hidden">
            <h1 className="py-6 border-b-2 text-xl text-gray-600 px-8">
              장바구니
            </h1>
            {cartList.map((cart) => (
              <ul className="py-6 border-b space-y-6 px-8" key={cart.id}>
                <li className="grid grid-cols-6 gap-2 border-b-1">
                  <div className="col-span-1 self-center">
                    <Image
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
                      <span className="text-gray-400">{cart.quantity}</span>
                      <span className="text-pink-400 font-semibold inline-block">
                        {cart.total}
                      </span>
                      <Button
                        colorScheme="pink"
                        onClick={() => {
                          idRef.current = cart.id;
                          onOpen();
                        }}
                      >
                        삭제
                      </Button>
                    </div>
                  </div>
                </li>
              </ul>
            ))}

            <div className="font-semibold text-xl px-8 flex justify-between py-8 text-gray-600">
              {/*TODO: 총 토탈 해야함 */}
              <span>Total</span>
              <span>100.000 원</span>
            </div>
            <Center>
              <button
                className="before:ease relative h-12 w-40 overflow-hidden border border-green-700 bg-green-700 text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-green-500 hover:before:-translate-x-40"
                onClick={() =>
                  navigate("/home/drug/buy", {
                    state: {
                      amount,
                      orderName:
                        cartList[0].drugName +
                        " 외 " +
                        (cartList.length - 1) +
                        " 개",
                      url: cartList[0].url,
                    },
                  })
                }
              >
                <span relative="relative z-10">주문</span>
              </button>
            </Center>
          </div>
        </Box>
      </Center>
      {/* 삭제 모달 */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>삭제 확인</ModalHeader>
          <ModalCloseButton />
          <ModalBody>삭제 하시겠습니까?</ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>닫기</Button>
            <Button onClick={handleDelete} colorScheme="red">
              삭제
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
