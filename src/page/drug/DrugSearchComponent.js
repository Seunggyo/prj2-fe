import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Center, Flex, Input, Select } from "@chakra-ui/react";
import { isDisabled } from "@testing-library/user-event/dist/utils";

export function DrugSearchComponent() {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("all");

  const navigate = useNavigate();

  function handleSearch() {
    // /?k=keyword
    const params = new URLSearchParams();
    params.set("k", keyword);
    params.set("c", category);

    navigate("?" + params);
  }

  return (
    <Center>
      <Flex>
        <Select w="300px" onChange={(e) => setCategory(e.target.value)}>
          <option selected value="all">
            전체
          </option>
          <option value="name">이름</option>
          <option value="function">기능 별 검색</option>
        </Select>
        <Input
          w="500px"
          mx="50px"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button onClick={handleSearch}>검색</Button>
      </Flex>
    </Center>
  );
}
