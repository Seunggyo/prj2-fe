import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import axios from "axios";
import { useImmer } from "use-immer";
import { useParams } from "react-router-dom";

export function DrugEdit() {
  const [drug, updateDrug] = useImmer(null);

  const { id } = useParams();

  useEffect(() => {
    axios
      .putForm("/api/drug/id/" + id)
      .then((response) => updateDrug(response.data));
  }, []);

  function handleSubmit() {
    axios
      .putForm("/api/drug/edit", drug)
      .then(() => console.log("굿"))
      .catch(() => console.log("안됨"))
      .finally(() => console.log("끝"));
  }

  return (
    <Box>
      <h1>{name}번 글 수정</h1>
      <FormControl>
        <FormLabel>제품명</FormLabel>
        <Input value={drug.name} />
      </FormControl>

      <FormControl>
        <FormLabel>기능</FormLabel>
        <Select defaultValue="위">
          <option value="stomach">위</option>
          <option value="eye">눈</option>
          <option value="liver">간</option>
          <option value="fatigue">피로 개선</option>
          <option value="child">어린이 성장</option>
          <option value="sleep">수면질 개선</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>상세 내용</FormLabel>
        <Textarea value={drug.content} />
      </FormControl>

      <FormControl>
        <FormLabel>이미지</FormLabel>
        <Input type="file" accept="image/*" multiple />
        <FormHelperText>
          등록 할 파일을 1MB이내, 총 10MB 이내로 첨부하세요.
        </FormHelperText>
      </FormControl>

      <FormControl>
        <FormLabel>가격</FormLabel>
        <Input value={price} />
      </FormControl>

      <Button colorScheme="pink" onClick={handleSubmit}>
        저장
      </Button>
      <Button onClick={() => navigate(-1)}>취소</Button>
    </Box>
  );
}
