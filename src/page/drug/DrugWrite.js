import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ChevronDownIcon } from "@chakra-ui/icons";

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
        navigate("/drug/drugList");
      })
      .catch((error) => {
        console.log(error.response.status);
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
    <Box marginLeft="256px">
      <FormControl>
        <FormLabel>제품명</FormLabel>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </FormControl>

      <FormControl>
        <FormLabel>기능</FormLabel>
        <Select
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

      <FormControl>
        <FormLabel>상세 내용</FormLabel>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>판매가</FormLabel>
        <Input value={price} onChange={(e) => setPrice(e.target.value)} />
      </FormControl>

      <FormControl>
        <FormLabel>배송비</FormLabel>
        <Input value={shipping} onChange={(e) => setShipping(e.target.value)} />
      </FormControl>

      <FormControl>
        <FormLabel>이미지</FormLabel>
        <Input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setUploadFiles(e.target.files)}
        />
        <FormHelperText>
          등록 할 파일을 3MB이내, 총 30MB 이내로 첨부하세요.
        </FormHelperText>
      </FormControl>

      <Button
        isDisabled={isSubmitting}
        onClick={handleSubmit}
        colorScheme="pink"
      >
        저장
      </Button>
    </Box>
  );
}
