import { Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function NavBarDrug() {
  const navigate = useNavigate();

  return (
    <Flex>
      <Button onClick={() => navigate("/drug/drugList")}>HOME</Button>
      <Button onClick={() => navigate("/drug/choice")}>기능성 영양제</Button>
      <Button onClick={() => navigate("/drug/write")}>write</Button>
    </Flex>
  );
}
