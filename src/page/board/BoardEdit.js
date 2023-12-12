import { useImmer } from "use-immer";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

export function BoardEdit() {
  const [board, updateBoard] = useImmer("");
  const [fileSwitch, setFileSwitch] = useState([]);
  const [uploadFiles, setUploadFiles] = useState(null);

  const { id } = useParams();

  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    axios.get("/api/board/id/" + id).then((r) => updateBoard(r.data));
  }, []);

  if (board == null) {
    return <Spinner />;
  }

  function handleSubmit() {
    axios
      .put("/api/board/edit", board)
      .then((r) => {
        toast({
          description: board.id + "번 게시글이 수정되었습니다",
          status: "success",
        });
        navigate("/home/board/" + id);
      })
      .catch((error) => {
        if (error.response.data === 400) {
          toast({
            description: "입력된 정보를 다시 확인해주세요",
            status: "warning",
          });
        } else {
          toast({
            description: "수정 중에 문제가 발생하였습니다.",
            status: "error",
          });
        }
      })
      .finally(() => onClose());
  }

  function handleFileSwitch(e) {
    if (e.target.checked) {
      // fileSwitch 에 추가
      setFileSwitch([...fileSwitch, e.target.value]);
    } else {
      // fileSwitch 에서 삭제
      setFileSwitch(fileSwitch.filter((item) => item !== e.target.value));
    }
  }

  return (
    <Box>
      <h1>{id}번 글 수정하기</h1>
      <FormControl>
        <FormLabel>제 목</FormLabel>
        <Input
          value={board.title}
          onChange={(e) =>
            updateBoard((draft) => {
              draft.title = e.target.value;
            })
          }
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

      {/* 이미지 출력 */}
      {/*{board.files.length > 0 &&*/}
      {/*  board.files.map((file) => (*/}
      {/*    <Box key={file.id} my="5px" border="3px solid black">*/}
      {/*      <FormControl display="flex" alignItems="center">*/}
      {/*        <FormLabel>*/}
      {/*          <FontAwesomeIcon color="red" icon={faTrashCan} />*/}
      {/*        </FormLabel>*/}
      {/*        <Switch*/}
      {/*          value={file.id}*/}
      {/*          colorScheme="red"*/}
      {/*          onChange={handleFileSwitch}*/}
      {/*        />*/}
      {/*      </FormControl>*/}
      {/*      <Box>*/}
      {/*        <Image src={file.url} alt={file.name} width="100%" />*/}
      {/*      </Box>*/}
      {/*    </Box>*/}
      {/*  ))}*/}

      {/* 추가할 파일 선택 */}
      <FormControl>
        <FormLabel>이미지</FormLabel>
        <Input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setUploadFiles(e.target.files)}
        />
        <FormHelperText>
          한 개 파일은 1MB 이내, 총 용량은 10MB 이내로 첨부하세요.
        </FormHelperText>
      </FormControl>

      <Button onClick={onOpen}>저 장</Button>
      <Button onClick={() => navigate(-1)}>취 소</Button>

      {/*수정 모달*/}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>저장 확인</ModalHeader>
          <ModalCloseButton />
          <ModalBody>저장 하시겠습니까?</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>닫기</Button>
            <Button onClick={handleSubmit} colorScheme="blue">
              저장
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
