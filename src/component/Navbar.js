import { Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();

  return (
    <Flex>
      <Button onClick={() => navigate("/")}>메인화면</Button>
      <Button onClick={() => navigate("/write")}>글쓰기</Button>
      <Button onClick={() => navigate("/login")}>로그인</Button>
      <Button onClick={() => navigate("/member/signup")}>회원가입</Button>
    </Flex>
  );
}
