import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useNumberInput,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { DrugComment } from "./DrugComment";
import { LoginContext } from "../../component/LoginProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faCartPlus,
  faEdit,
  faHeart as fullHeart,
  faRemove,
  faShoppingCart,
  faTrain,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

function ShoppingCartIcon() {
  return null;
}

function CartContainer({ cart, onClick }) {
  const { getInputProps, getDecrementButtonProps, getIncrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 0,
      min: 0,
      max: 10,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  if (cart === null) {
    return <Spinner />;
  }

  return (
    <Flex>
      <HStack maxW="150px">
        <Button {...dec} bg="whith" colorScheme="blue" variant="outline">
          -
        </Button>
        <Input {...input} />
        <Button {...inc} bg="whith" colorScheme="blue" variant="outline">
          +
        </Button>
      </HStack>
      <Button
        variant="ghost"
        onClick={() => onClick(input.value)}
        colorScheme="blue"
      >
        <FontAwesomeIcon icon={faCartPlus} />
      </Button>
    </Flex>
  );
}

function LikeIcon({ type }) {
  const animateStyle = {
    animate: { scale: [0, 1], y: [20, 0] },
    transition: { type: "spring" },
  };
  if (type === "like") {
    return (
      <motion.div {...animateStyle}>
        <FontAwesomeIcon icon={fullHeart} size="xl" color="red" />
      </motion.div>
    );
  }
  return (
    <motion.div {...animateStyle}>
      <FontAwesomeIcon icon={emptyHeart} size="xl" color="red" />
    </motion.div>
  );
}

function LikeContainer({ like, onClick }) {
  const { isAuthenticated } = useContext(LoginContext);

  if (like === null) {
    return <Spinner />;
  }
  return (
    <Flex gap={2} alignItems="center">
      <Tooltip isDisabled={isAuthenticated()} hasArrow label={"로그인 하세요."}>
        <Box onClick={onClick}>
          {like.like && <LikeIcon type="like" />}
          {like.like || <LikeIcon />}
        </Box>
      </Tooltip>
      <Heading size="lg">{like.countLike}</Heading>
    </Flex>
  );
}

export function DrugView() {
  const [like, setLike] = useState(null);

  const [drug, setDrug] = useState(null);
  const [cart, setCart] = useState(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { isOpen, onClose, onOpen } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();

  const { isAdmin } = useContext(LoginContext);
  const { id } = useParams();

  useEffect(() => {
    axios.get("/api/drug/id/" + id).then((response) => setDrug(response.data));
  }, []);

  useEffect(() => {
    axios
      .get("/api/drug/cart/drugId/" + id)
      .then((response) => setCart(response.data));
  }, []);

  useEffect(() => {
    axios
      .get("/api/drug/like/drug/" + id)
      .then((response) => setLike(response.data));
  }, []);

  if (drug === null) {
    return <Spinner />;
  }

  const imageLength = drug.files.length;

  function handleDelete() {
    axios
      .delete("/api/drug/remove/" + id)
      .then((response) => {
        toast({
          description: id + "번 게시물이 삭제되었습니다.",
          status: "success",
        });
        navigate("/home/drug/");
      })
      .catch((error) => {
        toast({
          description: "삭제 중 문제가 발생하였습니다.",
          status: "error",
        });
      })
      .finally(() => onClose());
  }

  function handleCart(quantity) {
    axios
      .post("/api/drug/cart", { drugId: drug.id, quantity })
      .then((response) => {
        setCart(response.data);
        toast({
          description: "장바구니에 담는중입니다.",
          status: "success",
        });
      })
      .catch((error) => {
        //TODO: 로그인 안하고 누르면 로그인 페이지로 보내기
        toast({
          description: " 장바구니에 넣는 중 문제가 발생하였습니다.",
          status: "error",
        });
      })
      .finally(() => onClose);
  }

  function handleLike() {
    axios
      .post("/api/drug/like", { drugId: drug.id })
      .then((response) => setLike(response.data))
      .catch(() => console.log("안됨"))
      .finally(() => console.log("끝"));
  }

  function handleShowImageStatic(index) {
    setCurrentImageIndex(index);
  }

  return (
    <Box marginLeft="150px" width="1200px" height="1000px">
      <Center>
        <Card w={"5xl"} marginLeft="50px">
          <CardBody pt="0">
            <Flex>
              {/*<Button onClick={() => handleShowImage(-1)}>이전</Button>*/}
              <Box position="relative" w="500px" h="500px" mb="10">
                {drug.files.map((file, index) => (
                  <Card
                    position="absolute"
                    key={file.id}
                    my={5}
                    height="500px"
                    opacity={index === currentImageIndex ? 1 : 0}
                    transition="opacity 0.5s"
                  >
                    <CardBody>
                      <Image width="100%" src={file.url} alt={file.name} />
                    </CardBody>
                  </Card>
                ))}
              </Box>
              {/*<Button onClick={() => handleShowImage(1)}>다음</Button>*/}
            </Flex>
            <Flex gap={2}>
              {drug.files.map((file, index) => (
                <Box
                  opacity={index === currentImageIndex ? 1 : 0.5}
                  w={20}
                  h={20}
                  key={file.id}
                  onClick={() => handleShowImageStatic(index)}
                >
                  <Image width="100%" src={file.url} alt={file.name} />
                </Box>
              ))}
            </Flex>
          </CardBody>
        </Card>

        <Card w={"5xl"} marginLeft={"10px"}>
          <CardHeader>
            <Flex justifyContent="space-between">
              <Text className="font-dongle font-semibold text-6xl ">
                {drug.name}
              </Text>
              {/*좋아요 버튼*/}
              <LikeContainer like={like} onClick={handleLike} />
            </Flex>
          </CardHeader>
          <CardBody>
            <FormControl>
              <FormLabel>제품명</FormLabel>
              <Input value={drug.name} readOnly />
              <FormHelperText>{drug.content}</FormHelperText>
            </FormControl>

            <FormControl>
              <FormLabel>기능</FormLabel>
              <Input value={drug.func} readOnly />
            </FormControl>

            <FormControl>
              <FormLabel>가격</FormLabel>
              <Input value={drug.price} readOnly />
            </FormControl>

            <FormControl>
              <FormLabel>배송비</FormLabel>
              <Input value={drug.shipping} readOnly />
            </FormControl>

            <FormControl>
              <FormLabel>등록 일자</FormLabel>
              <Input value={drug.ago} readOnly />
            </FormControl>
            <br />

            {/*장바구니*/}
            <Flex>
              <CartContainer cart={cart} onClick={handleCart} />

              {isAdmin() && (
                <>
                  <Button
                    bg="whith"
                    color="black"
                    onClick={() => navigate("/home/drug/edit/" + id)}
                  >
                    {" "}
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button bg="whith" color="black" onClick={onOpen}>
                    <FontAwesomeIcon icon={faRemove} />
                  </Button>
                </>
              )}
            </Flex>
          </CardBody>
        </Card>
      </Center>

      <br />
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
      <DrugComment drugId={drug.id} />
    </Box>
  );
}
