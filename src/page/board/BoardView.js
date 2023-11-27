import {
  Box,
  FormControl,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export function BoardView() {
  const [board, setBoard] = useState();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const toast = useToast();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios.get("/api/board/id/" + id).then((r) => setBoard(r.data));
  }, []);

  if (board == null) {
    return <Spinner />;
  }

  return <h1>{board.id}번 글 보기</h1>;
}
