import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

export function DrugWrite() {
  const [name, setName] = useState("");
  const [func, setFunc] = useState("위 건강");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("");
  const [shipping, setShipping] = useState("");
  const [uploadFiles, setUploadFiles] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();
  function handleSubmit() {
    setIsSubmitting(true);
    axios
      .postForm("/api/drug/add", {
        name,
        func,
        content,
        price,
        shipping,
        uploadFiles,
      })
      .then(() => {
        toast({
          description: "새 글이 저장되었습니다.",
          status: "success",
        });
        navigate("/home/drug");
      })
      .catch((error) => {
        if (error.response.status === 400) {
          toast({
            description: "작성한 내용을 확인해주세요",
            status: "error",
          });
        } else {
          toast({
            description: "저장 중에 문제가 발생하였습니다",
            status: "error",
          });
        }
      })
      .finally(() => setIsSubmitting(false));
  }
  return (
    <Center>
      <Card w={"lg"} boxShadow="lg" fontFamily="dongle">
        <CardHeader bg="blue.200" textAlign="center" py={4}>
          <Heading fontSize="5xl" color="white" fontFamily="dongle">
            등록할 상품 작성
          </Heading>
        </CardHeader>

        <CardBody>
          <FormControl mb={2}>
            <FormLabel fontSize="2xl">제품명</FormLabel>
            <Input
              fontSize="2xl"
              placeholder="영양제 제품명을 입력하세요."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <FormControl mb={2}>
            <FormLabel fontSize="2xl">기능</FormLabel>
            <Select
              fontSize="2xl"
              defaultValue="위 건강"
              onChange={(e) => setFunc(e.target.value)}
            >
              <option value="위 건강">위</option>
              <option value="눈 건강">눈</option>
              <option value="간 건강">간</option>
              <option value="피로 개선">피로 개선</option>
              <option value="어린이 성장">어린이 성장</option>
              <option value="수면질 개선">수면질 개선</option>
            </Select>
          </FormControl>

          <FormControl mb={2}>
            <FormLabel fontSize="2xl">상세 내용</FormLabel>
            <Textarea
              fontSize="2xl"
              placeholder="제품의 상세 내용을 입력하세요."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </FormControl>

          <FormControl mb={2}>
            <FormLabel fontSize="2xl">판매가</FormLabel>
            <Input
              fontSize="2xl"
              placeholder="제품의 판매 가격을 입력하세요."
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </FormControl>

          <FormControl mb={2}>
            <FormLabel fontSize="2xl">배송비</FormLabel>
            <Input
              fontSize="2xl"
              placeholder="배송비를 입력하세요."
              value={shipping}
              onChange={(e) => setShipping(e.target.value)}
            />
          </FormControl>

          <FormControl mb={2}>
            <FormLabel fontSize="2xl">이미지</FormLabel>
            <Input
              fontSize="xl"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setUploadFiles(e.target.files)}
            />
            <FormHelperText fontSize="2xl">
              등록 할 파일을 3MB 이내, 총 30MB 이내로 첨부하세요.
            </FormHelperText>
          </FormControl>
        </CardBody>

        <CardFooter justifyContent="center">
          <Button
            fontSize="2xl"
            isDisabled={isSubmitting}
            onClick={handleSubmit}
            colorScheme="blue"
            size="lg"
            leftIcon={<FontAwesomeIcon icon={faUpload} />}
          >
            상품 등록
          </Button>
        </CardFooter>
      </Card>
    </Center>
  );
}
