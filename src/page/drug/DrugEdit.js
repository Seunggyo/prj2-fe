import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useImmer } from "use-immer";
import { useEffect } from "react";
import axios from "axios";

export function DrugEdit() {
  const [drug, updateDrug] = useImmer(null);
  // /edit/:id
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/drug/id/" + id)
      .then((response) => updateDrug(response.data));
  }, []);

  if (drug === null) {
    return <Spinner />;
  }

  function handleSubmit() {
    // 저장 버튼
    //api/drug/edit
    axios
      .put("/api/drug/edit", drug)
      .then(() => console.log("굿"))
      .catch(() => console.log("잘안됨"))
      .finally(() => console.log("끝"));
  }

  return (
    <Box>
      <h1>{drug.id}영양제 수정</h1>
      <FormControl>
        <FormLabel>제품</FormLabel>
        <Input
          value={drug.name}
          onChange={(e) =>
            updateDrug((draft) => {
              draft.name = e.target.value;
            })
          }
        />
      </FormControl>

      <FormControl>
        <FormLabel>기능</FormLabel>
        <Input
          value={drug.func}
          onChange={(e) =>
            updateDrug((draft) => {
              draft.func = e.target.value;
            })
          }
        />
      </FormControl>

      <FormControl>
        <FormLabel>상세 정보</FormLabel>
        <Input
          value={drug.content}
          onChange={(e) =>
            updateDrug((draft) => {
              draft.content = e.target.value;
            })
          }
        />
      </FormControl>

      <FormControl>
        <FormLabel>가격</FormLabel>
        <Input
          value={drug.price}
          onChange={(e) =>
            updateDrug((draft) => {
              draft.price = e.target.value;
            })
          }
        />
      </FormControl>
      <Button colorScheme="pink" onClick={handleSubmit}>
        저장
      </Button>
      <Button onClick={() => navigate(-1)}>취소</Button>
    </Box>
  );
}
