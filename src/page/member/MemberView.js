import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Flex,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import { LoginContext } from "../../component/LoginProvider";

function MemberView(props) {
  const [member, setMember] = useState(null);
  const [access, setAccess] = useState(false);
  const [params] = useSearchParams();

  const navigate = useNavigate();

  const { authCheck, isAuthenticated, hasAccess } = useContext(LoginContext);

  useEffect(() => {
    if (
      authCheck() !== "admin" &&
      !isAuthenticated() &&
      !hasAccess(params.get("id"))
    ) {
      navigate("/");
    }

    axios.get("/api/member/info?" + params).then(({ data }) => setMember(data));
  }, []);

  if (member === null) {
    return <Spinner />;
  }

  return (
    <Center>
      <Card>
        <CardHeader>
          <Heading>{member.id}</Heading>
        </CardHeader>
        <CardBody>
          <Box>nickName : {member.nickName}</Box>
          <Box>birthday : {member.birthday}</Box>
          <Box>phone : {member.phone}</Box>
          <Box>email : {member.email}</Box>
          <Box>address : {member.address}</Box>
          {/* TODO auth user 제외 표시*/}
          <Box>
            inserted :{" "}
            {new Date(member.inserted).toLocaleDateString().replace(/\./g, "")}
          </Box>
        </CardBody>
        <CardFooter>
          <Flex>
            <Button
              onClick={() => navigate("/home/member/edit?" + params.toString())}
            >
              수정
            </Button>
            <Button>삭제</Button>
          </Flex>
        </CardFooter>
      </Card>
    </Center>
  );
}

export default MemberView;
