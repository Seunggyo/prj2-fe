import { Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function NavBarDrug() {
  const navigate = useNavigate();

  return (
    <Flex>
      <Button onClick={() => navigate("/")}>HOME</Button>
      <Button onClick={() => navigate("/drug/ns")}>기능성 영양제</Button>
    </Flex>
  );
}
