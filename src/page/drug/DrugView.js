import { Box, FormControl, FormLabel, Input, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export function DrugView() {
  const [drug, setDrug] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    axios.get("/api/drug/id/" + id).then((response) => setDrug(response.data));
  }, []);

  if (drug === null) {
    return <Spinner />;
  }
  return (
    <Box>
      <h1>{drug.id}영양제 보기</h1>
      <FormControl>
        <FormLabel>제품</FormLabel>
        <Input value={drug.name} readOnly />
      </FormControl>

      <FormControl>
        <FormLabel>사진</FormLabel>
      </FormControl>

      <FormControl>
        <FormLabel>기능</FormLabel>
        <Input value={drug.func} readOnly />
      </FormControl>

      <FormControl>
        <FormLabel>상세 정보</FormLabel>
        <Input value={drug.content} readOnly />
      </FormControl>

      <FormControl>
        <FormLabel>가격</FormLabel>
        <Input value={drug.price} readOnly />
      </FormControl>

      <FormControl>
        <FormLabel>등록 일자</FormLabel>
        <Input value={drug.inserted} readOnly />
      </FormControl>
    </Box>
  );
}
