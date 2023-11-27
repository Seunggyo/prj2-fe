import { Box, Spinner } from "@chakra-ui/react";
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
      <h1>영양제 보기</h1>
      <p>번호 : {drug.id}</p>
      <p>이름 : {drug.name}</p>
      <p>사진 : {drug.fileName}</p>
      <p>기능 : {drug.func}</p>
      <p>상세 정보 : {drug.content}</p>
      <p>가격 : {drug.price}</p>
      <p>등록 일자 : {drug.inserted}</p>
    </Box>
  );
}
