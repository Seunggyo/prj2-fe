import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function MemberFindPassword() {
  const [member, setMember] = useState(null);
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [authenticationNum, setAuthenticationNum] = useState("");
  const [inputNum, setInputNum] = useState("");
  const [text, setText] = useState("");

  const navigate = useNavigate();

  function handleButtonClick() {
    axios.get("/api/member/info?id=" + id).then(({ data }) => setMember(data));
  }

  function SendMail() {
    if (member === null) {
      setText("아이디를 입력해 주세요");
    } else if (email === member.email) {
      axios
        .get("/mail?email=" + email)
        .then(({ data }) => setAuthenticationNum(data));
      setText("");
    } else {
      setText("아이디 또는 이메일을 확인해 주세요");
    }
  }

  return (
    <Box>
      <h1>비밀번호 찾기</h1>
      <FormControl>
        <FormLabel>id를 입력하세요</FormLabel>
        <Input onChange={(e) => setId(e.target.value)} />
        <Button onClick={handleButtonClick}>입력</Button>
      </FormControl>
      <FormControl>
        <FormLabel>email을 입력하세요</FormLabel>
        <Input onChange={(e) => setEmail(e.target.value)} />
        <Button onClick={SendMail}>입력</Button>
      </FormControl>
      {authenticationNum !== "" && (
        <FormControl>
          <FormLabel>인증번호를 입력하세요</FormLabel>
          <Input onChange={(e) => setInputNum(e.target.value)} />
        </FormControl>
      )}

      {text === "" || <Box>{text}</Box>}

      {parseInt(inputNum) === authenticationNum && (
        <FormControl>
          <FormLabel>비밀번호</FormLabel>
          <Input value={member.password} readOnly />
          <Button onClick={() => navigate("/home/member/login")}>
            로그인 하러 가기
          </Button>
        </FormControl>
      )}
    </Box>
  );
}
