import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  Spinner,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoginContext } from "../../component/LoginProvider";

export function DsSearchComponent({ onItemClick }) {
  const [dsList, setDsList] = useState([]);
  const [isButtonActive, setIsButtonActive] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();

  const { isAuthenticated, authCheck, idCheck } = useContext(LoginContext);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const [keyword, setKeyword] = useState("");
  // const [pageInfo, setPageInfo] = useState("");
  const [params] = useSearchParams();
  const location = useLocation();

  function handleSearch() {
    const params = new URLSearchParams();

    params.set("k", keyword);

    navigate("/home/ds?" + params);
  }

  useEffect(() => {
    axios.get("/api/ds/listMap?" + params).then((r) => {
      setDsList(r.data.dsList);
      // setPageInfo(r.data.pageInfo);
      const isMemberExists =
        r.data.dsList.find((d) => d.memberId === idCheck()) === undefined;
      console.log(idCheck());
      console.log(isMemberExists);
      setIsButtonActive(isMemberExists);
    });
  }, [location]);

  if (dsList === null) {
    return <Spinner />;
  }

  return (
    // list 보여주는 박스
    <Box w="300px">
      <Box>
        <InputGroup size="sm" marginBottom="10px">
          <Input
            placeholder="이름,장소 검색"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Button
            className={`mx-2 px-4 py-2 font-semibold text-gray-100`}
            onClick={handleSearch}
          >
            검색
          </Button>
        </InputGroup>
        {isAuthenticated() && authCheck() === "ds" && isButtonActive && (
          <Button onClick={() => navigate("/home/ds/write")}>약국 추가</Button>
        )}
      </Box>
      <Stack spacing={4}>
        {dsList.map((ds) => (
          <Box
            key={ds.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            onClick={() => onItemClick(ds.id)}
            p="2"
          >
            <Flex>
              <Box w="175px" h="120px">
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
                    <Center>{ds.name}</Center>
                  </Box>
                  <Box
                    as="span"
                    mt="1"
                    ml="2"
                    fontSize="lg"
                    color="red"
                    mb="4px"
                    w="39px"
                  >
                    {ds.likeCount}{" "}
                    <FontAwesomeIcon icon={faHeart} color="red" />
                  </Box>
                </Flex>
                <Box mb="4px" fontSize="13px">
                  {ds.oldAddress}
                </Box>

                <Box fontSize="14px">
                  영업시간 : {ds.openHour}:
                  {ds.openMin === 0 ? "00" : ds.openMin} ~ {ds.closeHour}:
                  {ds.closeMin === 0 ? "00" : ds.closeMin}
                  {ds.restHour !== 0 && (
                    <>
                      <br />
                      ※휴게시간 {ds.restHour}:
                      {ds.restMin === 0 ? "00" : ds.restMin}~{ds.restCloseHour}:
                      {ds.restCloseMin === 0 ? "00" : ds.restCloseMin}
                    </>
                  )}
                </Box>
              </Box>
              <Box>
                <Image
                  src={ds.files.length > 0 ? ds.files[0].url : ""}
                  objectFit="fill"
                  w="240px"
                  h="120px"
                  borderRadius="8px"
                />
              </Box>
            </Flex>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
