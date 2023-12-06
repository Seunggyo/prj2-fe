import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function CSWrite() {
  const [csTitle, setCsTitle] = useState("");
  const [csContent, setCsContent] = useState("");
  const [csCategory, setCsCategory] = useState("안내사항");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  function handleSubmit() {
    axios
      .post("/api/cs/add", { csTitle, csContent, csCategory: csCategory })
      .then(() => {
        toast({
          description: "새 공지글이 저장되었습니다.",
          status: "success",
        });
        navigate("/cs");
      })
      .catch((error) => {
        console.log(error.response.status);
        if (error.response.status === 400) {
          toast({
            description: "작성한 내용을 확인해주세요.",
            status: "error",
          });
        } else {
          toast({
            description: "저장 중에 문제가 발생하였습니다.",
            status: "error",
          });
        }
      })
      .finally(() => setIsSubmitting(false));
  }

  return (
    <Box>
      <Box>
        <h1>게시물 작성</h1>
        <Box>
          <FormControl>
            <FormLabel>제목</FormLabel>
            <Input
              value={csTitle}
              onChange={(e) => setCsTitle(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>본문</FormLabel>
            <Textarea
              value={csContent}
              onChange={(e) => setCsContent(e.target.value)}
            ></Textarea>
          </FormControl>

          <div>
            <Flex ml="4">
              <Select
                defaultValue={"안내사항"}
                onChange={(e) => {
                  setCsCategory(e.target.value);
                }}
              >
                <option value={"안내사항"}>안내사항</option>
                <option value={"긴급안내"}>긴급안내</option>
                <option value={"출시소식"}>출시소식</option>
                <option value={"이벤트"}>이벤트</option>
                <option value={"당첨자발표"}>당첨자발표</option>
              </Select>
            </Flex>
          </div>

          <Button
            isDisabled={isSubmitting}
            onClick={handleSubmit}
            colorScheme="blue"
          >
            저장
          </Button>
          <Button onClick={() => navigate(-1)}>취소</Button>
        </Box>
      </Box>
    </Box>
  );
}
