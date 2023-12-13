import React, { useEffect, useState } from "react";
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
import * as PropTypes from "prop-types";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

// function PageButton({ variant, pageNumber, children }) {
//   const [params] = useSearchParams();
//   const navigate = useNavigate();
//
//   function handleClick() {
//     params.set("p", pageNumber);
//
//     navigate("?" + params);
//   }
//
//   return (
//     <Button variant={variant} onClick={handleClick}>
//       {children}
//     </Button>
//   );
// }
//
// function Pagination({ pageInfo }) {
//   const pageNumbers = [];
//   const navigate = useNavigate();
//
//   for (let i = pageInfo.startPageNumber; i <= pageInfo.endPageNumber; i++) {
//     pageNumbers.push(i);
//   }
//
//   return (
//     <Box>
//       {/* 뒤로가기*/}
//       {pageInfo.prevPageNumber && (
//         <PageButton variant="ghost" pageNumber={pageInfo.prevPageNumber}>
//           <FontAwesomeIcon icon={faAngleLeft} />
//         </PageButton>
//       )}
//
//       {pageNumbers.map((pageNumber) => (
//         <PageButton
//           key={pageNumber}
//           variant={
//             pageNumber === pageInfo.currentPageNumber ? "solid" : "ghost"
//           }
//           pageNumber={pageNumber}
//         >
//           {pageNumber}
//         </PageButton>
//       ))}
//
//       {/*앞으로 가기*/}
//       {pageInfo.nextPageNumber && (
//         <PageButton variant="ghost" pageNumber={pageInfo.nextPageNumber}>
//           <FontAwesomeIcon icon={faAngleRight} />
//         </PageButton>
//       )}
//     </Box>
//   );
// }

export function DsSearchComponent({ onItemClick }) {
  const [dsList, setDsList] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();

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
    axios.get("/api/ds/list?" + params).then((r) => {
      setDsList(r.data.dsList);
      // setPageInfo(r.data.pageInfo);
    });
  }, [location]);

  if (dsList === null) {
    return <Spinner />;
  }

  return (
    // list 보여주는 박스
    <Box w="280px">
      <Box>
        <InputGroup size="sm">
          <Input
            placeholder="이름"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <InputRightAddon children="검색" onClick={handleSearch} />
        </InputGroup>
      </Box>
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
              <Box fontSize="12px">{ds.oldAddress}</Box>
              {/*<Box fontSize="14px">번호 : {ds.phone}</Box>*/}

              <Box>
                영업시간 :{ds.openHour}:{ds.openMin === 0 ? "00" : ds.openMin}~
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
      {/*페이징*/}
      {/*<Box>*/}
      {/*  <Pagination pageInfo={pageInfo} />*/}
      {/*</Box>*/}
    </Box>
  );
}
