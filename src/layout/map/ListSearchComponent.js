import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightAddon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function ListSearchComponent() {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("all");
  const navigate = useNavigate();
  function handleSearch() {
    const params = new URLSearchParams();

    params.set("k", keyword);
    params.set("c", category);

    navigate("/hospital?" + params);
  }

  return (
    <Stack spacing={4}>
      {/* If you add the size prop to `InputGroup`, it'll pass it to all its children. */}
      <InputGroup size="sm">
        <Input
          placeholder="이름"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <InputRightAddon children="검색" onClick={handleSearch} />
      </InputGroup>
      <Flex>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            진료과목
          </MenuButton>
          <MenuList onChange={(e) => setCategory(e.target)}>
            <MenuItem value="all">전체</MenuItem>
            <MenuItem value="소아과">소아과</MenuItem>
            <MenuItem value="내과">내과</MenuItem>
            <MenuItem value="외과">외과</MenuItem>
            <MenuItem value="치과">치과</MenuItem>
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            야간
          </MenuButton>
          <MenuList>
            <MenuItem value="nightCare">야간</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Stack>
  );
}
