import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Divider,
  Flex,
  Heading,
  Square,
  Stack,
  StackDivider,
  Text,
  Tr,
} from "@chakra-ui/react";
import React from "react";

export function DrugBuy() {
  return (
    <Box
      marginLeft="300px"
      marginTop="30px"
      border="1px solid black"
      width="900px"
      height="900px"
    >
      <Box
        marginLeft="50px"
        marginTop="50px"
        border="1px solid black"
        width="800px"
        height="800px"
      >
        <Flex color="white">
          <Center w="700px" h="800px">
            <Card maxW="sm">
              <CardBody>
                <Stack mt="6" spacing="3">
                  <Heading size="md">주문 상품 정보</Heading>
                  <Text>제풍명 : 알로엘</Text>
                  <Text>갯수 : 2개</Text>
                  <Text>금액 : 19000원</Text>
                </Stack>
              </CardBody>
              <Divider />
            </Card>
          </Center>
          <Square h="800px" size="300px"></Square>
        </Flex>
      </Box>
    </Box>
  );
}
