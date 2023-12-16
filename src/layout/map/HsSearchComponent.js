import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { LoginContext } from "../../component/LoginProvider";

export function HsSearchComponent({
  onItemClick,
  onMedicalcourseClick,
  medicalcourse,
}) {
  const navigate = useNavigate();
  const toast = useToast();
  const { isAuthenticated, authCheck, idCheck } = useContext(LoginContext);

  const [isButtonActive, setIsButtonActive] = useState(true);
  const [list, setList] = useState();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [params] = useSearchParams();

  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("all");

  const location = useLocation();

  function handleSearch() {
    const params = new URLSearchParams();

    params.set("k", keyword);
    params.set("c", category);

    navigate("/home/hospital?" + params);
  }

  useEffect(() => {
    axios.get("/api/hospital/list?" + params).then((r) => {
      setList(r.data.list);
      const isMemberExists =
        r.data.list.find((h) => h.memberId === idCheck()) !== undefined;
      setIsButtonActive(!isMemberExists);
    });
  }, [location]);

  if (list === null) {
    return <Spinner />;
  }

  function handleClickMenuItem(medicalcourse) {
    onMedicalcourseClick(medicalcourse);
  }

  return (
    <Box w="300px">
      <Box>
        <InputGroup size="sm" marginBottom="10px">
          <Input
            placeholder="이름,장소,진료과목 검색"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Button
            className={`mx-2 px-4 py-2 font-semibold text-gray-100 ${
              keyword ? "bg-indigo-300" : "bg-gray-500 cursor-not-allowed"
            }`}
            disabled={!keyword}
            onClick={handleSearch}
          >
            검색
          </Button>
        </InputGroup>
        <Flex>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              {medicalcourse === "" ? "진료과목" : medicalcourse}
            </MenuButton>
            <MenuList
              onChange={(e) => {
                setCategory(e.target);
              }}
            >
              <MenuItem onClick={() => handleClickMenuItem("")} value="all">
                전체
              </MenuItem>
              <MenuItem
                onClick={() => handleClickMenuItem("소아과")}
                value="소아과"
              >
                소아과
              </MenuItem>
              <MenuItem
                onClick={() => handleClickMenuItem("내과")}
                value="내과"
              >
                내과
              </MenuItem>
              <MenuItem
                onClick={() => handleClickMenuItem("외과")}
                value="외과"
              >
                외과
              </MenuItem>
              <MenuItem
                onClick={() => handleClickMenuItem("치과")}
                value="치과"
              >
                치과
              </MenuItem>
            </MenuList>
          </Menu>
          {isAuthenticated() && authCheck() === "hs" && isButtonActive && (
            <Button onClick={() => navigate("/home/hospital/hospitalAdd/")}>
              병원 추가
            </Button>
          )}
        </Flex>
      </Box>
      <Box>
        <Stack spacing={4}>
          {list &&
            list.map((h) => (
              <Box
                key={h.id}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                onClick={() => onItemClick(h.id)}
                p="2"
              >
                <Flex>
                  <Box w="174px" h="120px">
                    <Flex>
                      <Box
                        w="136px"
                        fontWeight="semibold"
                        as="h4"
                        lineHeight="tight"
                        isTruncated
                        className="font-dongle text-3xl"
                        mb="4px"
                      >
                        {h.name}
                      </Box>
                      <Box
                        as="span"
                        mt="1"
                        fontSize="lg"
                        color="red"
                        mb="4px"
                        mr="5px"
                      >
                        {h.countLike}
                        {""}
                        <FontAwesomeIcon icon={faHeart} color="red" />
                      </Box>
                    </Flex>
                    <Box mb="4px" fontSize="13px">
                      {h.oldAddress}
                    </Box>

                    <Box fontSize="14px">
                      영업시간 : {h.openHour}:
                      {h.openMin === 0 ? "00" : h.openMin}~{h.closeHour}:
                      {h.closeMin === 0 ? "00" : h.closeMin}
                      {h.restHour !== 0 ||
                        (h.restHour === null && (
                          <>
                            <br />
                            ※휴게시간 {h.restHour}:
                            {h.restMin === 0 ? "00" : h.restMin}~
                            {h.restCloseHour}:
                            {h.restCloseMin === 0 ? "00" : h.restCloseMin}
                          </>
                        ))}
                    </Box>
                  </Box>
                  <Box w="109px" flexShrink={0}>
                    <Image
                      src={h.files.length > 0 ? h.files[0].url : ""}
                      objectFit="fill"
                      w="100%"
                      h="120px"
                      borderRadius="8px"
                    />
                  </Box>
                </Flex>
              </Box>
            ))}
        </Stack>
      </Box>
    </Box>
  );
}
