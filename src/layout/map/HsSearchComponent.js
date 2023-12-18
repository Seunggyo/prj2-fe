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
        r.data.list.find((h) => h.memberId === idCheck()) === undefined;
      console.log(isMemberExists);
      setIsButtonActive(isMemberExists);
    });
  }, [location]);

  if (list === null) {
    return <Spinner />;
  }

  function handleClickMenuItem(medicalcourse) {
    onMedicalcourseClick(medicalcourse);
  }

  return (
    <Box w="280px">
      <Box>
        <Stack spacing={4}>
          <InputGroup size="sm">
            <Input
              placeholder="이름,장소,진료과목 검색"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <InputRightAddon children="검색" onClick={handleSearch} />
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
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                야간
              </MenuButton>
              <MenuList>
                <MenuItem value="nightCare">야간</MenuItem>
              </MenuList>
            </Menu>
            {isAuthenticated() &&
              authCheck() === "hs" &&
              isButtonActive === true && (
                <Button onClick={() => navigate("/home/hospital/hospitalAdd/")}>
                  병원 추가
                </Button>
              )}
          </Flex>
        </Stack>
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
                // onClick={() => console.log(ds.id)}
              >
                <Center>
                  <Image
                    src={h.files && h.files.length > 0 ? h.files[0].url : ""}
                    w="200px"
                    h="100px"
                  />
                </Center>

                <Box p="6">
                  {/*<Box d="flex" alignItems="baseline">*/}
                  {/*  <Badge borderRadius="full" px="2" colorScheme="teal">*/}
                  {/*    {ds.level}*/}
                  {/*  </Badge>*/}
                  {/*</Box>*/}
                  <Box
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    isTruncated
                  >
                    <Flex>
                      {h.name}
                      {/*<Stack direction="row" mt="2" spacing={2} align="center">*/}
                      <Box as="span" ml="2" fontSize="sm" color="red">
                        <FontAwesomeIcon icon={faHeart} color="red" />{" "}
                        {h.countLike}
                      </Box>
                      {/*</Stack>*/}
                    </Flex>
                  </Box>
                  <Box fontSize="12px">{h.oldAddress}</Box>
                  {/*<Box fontSize="14px">{h.phone}</Box>*/}

                  <Box>
                    영업시간 : {h.openHour}:{h.openMin === 0 ? "00" : h.openMin}
                    ~{h.closeHour}:{h.closeMin === 0 ? "00" : h.closeMin}
                    {h.restHour !== 0 ||
                      (h.restHour === null && (
                        <>
                          <br />
                          ※휴게시간 {h.restHour}:
                          {h.restMin === 0 ? "00" : h.restMin}~{h.restCloseHour}
                          :{h.restCloseMin === 0 ? "00" : h.restCloseMin}
                        </>
                      ))}
                  </Box>
                  <Flex>
                    {/*<Stack direction="row" mt="2" spacing={2} align="center">*/}
                    {/*  <Box as="span" ml="2" color="gray.600" fontSize="sm">*/}
                    {/*    {h.commentCount} 댓글*/}
                    {/*  </Box>*/}
                    {/*</Stack>*/}
                    {/*<Stack direction="row" mt="2" spacing={2} align="center">*/}
                    {/*  <Box as="span" ml="2" fontSize="sm" color="red">*/}
                    {/*    {h.countLike}{" "}*/}
                    {/*    <FontAwesomeIcon icon={faHeart} color="red" />*/}
                    {/*  </Box>*/}
                    {/*</Stack>*/}
                  </Flex>
                </Box>
              </Box>
            ))}
        </Stack>
      </Box>
    </Box>
  );
}
