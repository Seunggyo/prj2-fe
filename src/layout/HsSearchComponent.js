import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Map,
  MapMarker,
  useKakaoLoader,
  ZoomControl,
} from "react-kakao-maps-sdk";
import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { LoginContext } from "../component/LoginProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
export function HsSearchComponent({ onItemClick }) {
  const navigate = useNavigate();
  const toast = useToast();

  const [list, setList] = useState([]);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [position, setPosition] = useState();

  const [level, setLevel] = useState();
  useEffect(() => {
    axios
      .get("/api/hospital/list?category=hospital")
      .then((r) => setList(r.data));
  }, []);

  return (
    <Box>
      <Box>
        <Stack spacing={4}>
          {list.map((h) => (
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
                  {h.name}
                </Box>
                <Box fontSize="12px">{h.address}</Box>
                <Box fontSize="14px">{h.phone}</Box>

                <Box>
                  {h.openHour}:{h.openMin === 0 ? "00" : h.openMin}~
                  {h.closeHour}:{h.closeMin === 0 ? "00" : h.closeMin}
                  {h.restHour !== 0 ||
                    (h.restHour === null && (
                      <>
                        <br />
                        ※휴게시간 {h.restHour}:
                        {h.restMin === 0 ? "00" : h.restMin}~{h.restCloseHour}:
                        {h.restCloseMin === 0 ? "00" : h.restCloseMin}
                      </>
                    ))}
                </Box>

                <Flex>
                  {/*<Stack direction="row" mt="2" spacing={2} align="center">*/}
                  {/*    <Box as="span" ml="2" color="gray.600" fontSize="sm">*/}
                  {/*        {h.commentCount} 댓글*/}
                  {/*    </Box>*/}
                  {/*</Stack>*/}
                  <Stack direction="row" mt="2" spacing={2} align="center">
                    <Box as="span" ml="2" fontSize="sm" color="red">
                      {h.countLike}{" "}
                      <FontAwesomeIcon icon={faHeart} color="red" />
                    </Box>
                  </Stack>
                </Flex>
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
