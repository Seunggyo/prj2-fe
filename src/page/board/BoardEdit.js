import { useImmer } from "use-immer";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import axios from "axios";

export function BoardEdit() {
  const [board, updateBoard] = useImmer("");

  const { id } = useParams();

  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    axios.get("/api/board/id/" + id).then((r) => updateBoard(r.data));
  }, []);

  if (board == null) {
    return <Spinner />;
  }

  return (
    <Box>
      <h1>{id}번 글 수정하기</h1>
      <FormControl>
        <FormLabel>제 목</FormLabel>
        <Input
          value={board.title}
          onChange={(draft) => (draft.title = e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>본 문</FormLabel>
        <Input
          value={board.content}
          onChange={(e) =>
            updateBoard((draft) => {
              draft.content = e.target.value;
            })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>작성자</FormLabel>
        <Input
          value={board.writer}
          onChange={(e) =>
            updateBoard((draft) => {
              draft.writer = e.target.value;
            })
          }
        />
      </FormControl>
      <Button onClick={() => navigate(-1)}>취소</Button>
    </Box>
  );
}
