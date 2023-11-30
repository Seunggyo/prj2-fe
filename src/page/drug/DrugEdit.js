import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Switch,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useImmer } from "use-immer";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { DrugComment } from "./DrugComment";

export function DrugEdit() {
  // /edit/:id
  const [drug, updateDrug] = useImmer(null);
  const [removeFileIds, setRemoveFileIds] = useState([]);
  const [uploadFiles, setUploadFiles] = useState(null);

  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get("/api/drug/id/" + id)
      .then((response) => updateDrug(response.data));
  }, []);

  if (drug === null) {
    return <Spinner />;
  }

  function handleSubmit() {
    axios
      .putForm("/api/drug/edit", {
        id: drug.id,
        name: drug.name,
        func: drug.func,
        content: drug.content,
        price: drug.price,
        removeFileIds,
        uploadFiles,
      })
      .then(() => {
        toast({
          description: drug.id + "번 게시글이 수정 되었소",
          status: "success",
        });
        navigate("/drug/" + id);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          toast({
            description: "요청이 잘못 되었소",
            status: "error",
          });
        } else {
          toast({
            description: "수정 중 문제가 생겼소",
            status: "error",
          });
        }
      })
      .finally(() => onClose());
  }

  function handleRemoveFileSwitch(e) {
    if (e.target.checked) {
      setRemoveFileIds([...removeFileIds, e.target.value]);
    } else {
      setRemoveFileIds(removeFileIds.filter((item) => item !== e.target.value));
    }
  }

  return (
    <Box marginLeft="256px">
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
      {/*이미지*/}
      {drug.files.length > 0 &&
        drug.files.map((file) => (
          <Box key={file.id} my="5px" border="3px solid black">
            <FormControl display="flex" alignItems="center">
              <FormLabel>
                <FontAwesomeIcon color="red" icon={faTrashCan} />
              </FormLabel>
              <Switch
                value={file.id}
                colorScheme="red"
                onChange={handleRemoveFileSwitch}
              />
            </FormControl>
            <Box>
              <Image src={file.url} alt={file.name} width="100%" />
            </Box>
          </Box>
        ))}

      <FormControl>
        <FormLabel>기능</FormLabel>
        <Select
          defaultValue="위 건강"
          onChange={(e) =>
            updateDrug((drug) => {
              drug.func = e.target.value;
            })
          }
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

      {/* 추가할 파일*/}
      <FormControl>
        <FormLabel>이미지</FormLabel>
        <Input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setUploadFiles(e.target.files)}
        />
        <FormHelperText>
          한 개 파일은 3MB 이내, 총 용량은 30MB 이내로 첨부하시오.
        </FormHelperText>
      </FormControl>
      <Button colorScheme="pink" onClick={onOpen}>
        저장
      </Button>
      <Button onClick={() => navigate(-1)}>취소</Button>

      {/* 수정 모달 */}
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

      <DrugComment drugId={id} />
    </Box>
  );
}
