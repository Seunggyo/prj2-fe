import React, { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Input,
  Select,
  Spinner,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

function ViewComponent() {
  return null;
}

export function DsSearchComponent({ onItemClick }) {
  const [dsList, setDsList] = useState([]);
  const [pageInfo, setPageInfo] = useState("");
  const [level, setLevel] = useState();

  const [params] = useSearchParams();

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    axios.get("/api/ds/list").then((r) => {
      setDsList(r.data.dsList);
    });
  }, [location]);

  if (dsList === null) {
    return <Spinner />;
  }

  return (
    <Box>
      <Stack spacing={4}>
        {dsList.map((ds) => (
          <Box
            key={ds.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            onClick={() => onItemClick(ds.id)}
            // onClick={() => console.log(ds.id)}
          >
            <Center>
              <Image
                src={ds.files.length > 0 ? ds.files[0].url : ""}
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
                {ds.name}
              </Box>
              <Box fontSize="12px">{ds.address}</Box>
              <Box fontSize="14px">{ds.phone}</Box>

              <Box>
                {ds.openHour}:{ds.openMin === 0 ? "00" : ds.openMin}~
                {ds.closeHour}:{ds.closeMin === 0 ? "00" : ds.closeMin}
                {ds.restHour !== 0 && (
                  <>
                    <br />
                    ※휴게시간 {ds.restHour}:
                    {ds.restMin === 0 ? "00" : ds.restMin}~{ds.restCloseHour}:
                    {ds.restCloseMin === 0 ? "00" : ds.restCloseMin}
                  </>
                )}
              </Box>

              <Flex>
                <Stack direction="row" mt="2" spacing={2} align="center">
                  <Box as="span" ml="2" color="gray.600" fontSize="sm">
                    {ds.commentCount} 댓글
                  </Box>
                </Stack>
                <Stack direction="row" mt="2" spacing={2} align="center">
                  <Box as="span" ml="2" fontSize="sm" color="red">
                    {ds.likeCount}{" "}
                    <FontAwesomeIcon icon={faHeart} color="red" />
                  </Box>
                </Stack>
              </Flex>
            </Box>
          </Box>
        ))}
      </Stack>
      <Box>
        <ViewComponent />
      </Box>
    </Box>
  );
}
