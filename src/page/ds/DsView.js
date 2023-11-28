import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function DsView() {
  const navigate = useNavigate();
  const toast = useToast();
  const { id } = useParams();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const [ds, setDs] = useState("");

  useEffect(() => {
    axios.get("/api/ds/id/" + id).then((response) => setDs(response.data));
  }, []);

  function handleDelete() {
    axios
      .delete("/api/ds/delete/" + id)
      .then((response) => {
        toast({
          description: id + "번 정보가 삭제되었습니다",
          status: "success",
        });
        navigate("/ds/list");
      })
      .catch((error) => {
        toast({
          description: "삭제 중 문제가 발생하였습니다.",
          status: "error",
        });
      })
      .finally(() => onClose());
  }

  return (
    <Box>
      <h1> 정보 입니다 </h1>

      <FormControl>
        <FormLabel>업체 명</FormLabel>
        <Input value={ds.name} isReadOnly />
      </FormControl>

      <FormControl>
        <FormLabel>주소</FormLabel>
        <Input value={ds.address} isReadOnly />
      </FormControl>

      <FormControl>
        <FormLabel>번호</FormLabel>
        <Input value={ds.phone} isReadOnly />
      </FormControl>

      <FormControl>
        <FormLabel>오픈 시간</FormLabel>
        <Flex>
          <Input w={"20%"} value={ds.openHour} isReadOnly />
          <Input w={"40%"} mx={"30px"} value={ds.openMin} isReadOnly />
        </Flex>
      </FormControl>

      <FormControl>
        <Flex justifyContent="space-between">
          <FormLabel>마감 시간</FormLabel>
          <FormLabel>야간 진료</FormLabel>
        </Flex>
        <Flex>
          <Input w={"20%"} value={ds.closeHour} isReadOnly />
          <Input w={"40%"} mx={"30px"} value={ds.closeMin} isReadOnly />
          <Checkbox value={ds.nightCare} isReadOnly />
        </Flex>
      </FormControl>
      {/*TODO: 야간진료 하는지 확인 할 수 있는 칸 작성 필요*/}

      {/*TODO : 지역 화폐 사용 가능 한지도 작성*/}

      <FormControl>
        <FormLabel>약국 소개</FormLabel>
        <Input value={ds.content} isReadOnly />
      </FormControl>

      <Box>
        <Button colorScheme="blue" onClick={() => navigate("/ds/edit/" + id)}>
          수정
        </Button>
        <Button
          colorScheme="red"
          mx="30px"
          onClick={() => {
            onOpen();
          }}
        >
          삭제
        </Button>
      </Box>

      {/*삭제 클릭시 모달*/}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>삭제 확인</ModalHeader>
          <ModalCloseButton />
          <ModalBody>삭제 시 복구 할 수 없습니다</ModalBody>

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

export default DsView;
