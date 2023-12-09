import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
//TODO 수정 조건 추가하기
function MemberEdit(props) {
  const [member, setMember] = useState(null);
  const [nickName, setNickName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState();

  const [params] = useSearchParams();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/member/info?" + params.toString()).then(({ data }) => {
      setMember(data);
      setNickName(data.nickName);
      setPhone(data.phone);
      setBirthday(data.birthday);
      setAddress(data.address);
    });
  }, []);

  if (member === null) {
    return <Spinner />;
  }

  function handleEditClick() {
    axios
      .put("/api/member/edit", {
        id: member.id,
        nickName,
        phone,
        birthday,
        address,
      })
      .then(() => {
        toast({
          description: "회원 정보가 수정되었습니다.",
          status: "success",
        });
        navigate("/home/member/view?id=" + member.id);
        //     TODO: 회원 정보 수정 navigate 다시 지정해주기
      })
      .catch((error) => {
        toast({
          description: "수정 실패",
        });
      });
  }

  return (
    <Center>
      <Card>
        <CardHeader>
          <Heading>{member.id}님 정보 수정</Heading>
        </CardHeader>
        <CardBody>
          <FormControl>
            <FormLabel>nickName</FormLabel>
            <Input
              defaultValue={member.nickName}
              onChange={(e) => setNickName(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>phone</FormLabel>
            <Input
              defaultValue={member.phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>birthday</FormLabel>
            <Input
              defaultValue={member.birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>address</FormLabel>
            <Input
              defaultValue={member.address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </FormControl>
        </CardBody>
        <CardFooter>
          <Flex>
            <Button onClick={handleEditClick}>확인</Button>
            <Button>취소</Button>
          </Flex>
        </CardFooter>
      </Card>
    </Center>
  );
}

export default MemberEdit;
