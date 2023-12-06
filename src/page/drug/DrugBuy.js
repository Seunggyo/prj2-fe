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
import { Radio, RadioGroup } from "@mui/material";

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
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
        >
          {/*<Image*/}
          {/*  objectFit="cover"*/}
          {/*  maxW={{ base: "100%", sm: "200px" }}*/}
          {/*  src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"*/}
          {/*  alt="Caffe Latte"*/}
          {/*/>*/}
          <Flex>
            <Box border="1pxx solid red" width="450px" marginTop="20px">
              <Stack>
                <Card width="450px">
                  <CardBody>
                    <Heading size="md">주문 정보</Heading>
                    {/*사진들어가야함*/}
                    <Text py="1" marginTop="10px">
                      물건명 : 홍삼정
                    </Text>
                    <Text py="1">갯수 : 2개</Text>
                    <Text py="1">금액 : 1,000,000원</Text>
                  </CardBody>
                  <Divider />
                </Card>

                <Card>
                  <CardBody>
                    <Heading size="md">주문자 정보</Heading>

                    <Text py="1" marginTop="10px">
                      김아리
                    </Text>
                    <Text py="1">010-1233-4657</Text>
                    <Text py="1">dkxhaektha@naver.com</Text>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody>
                    <Heading size="md">배송 정보</Heading>

                    <Text py="1" marginTop="10px">
                      김아리
                      <Button marginLeft="290px" colorScheme="pink">
                        변경
                      </Button>
                    </Text>
                    <Text py="1">010-1233-4657</Text>
                    <Text py="1">주소</Text>
                    <Text py="1">배송메모</Text>
                  </CardBody>
                </Card>
              </Stack>
            </Box>

            <Box
              marginLeft="5px"
              border="1pxx solid black"
              h="400px"
              marginTop="20px"
            >
              <Stack>
                <Card>
                  <CardBody>
                    <Heading size="md">최종 결제금액</Heading>
                    <Text py="1" marginTop="10px">
                      상품 가격 :
                    </Text>
                    <Text color="blue.600" fontSize="2xl">
                      총 결제 금액 : 1,000,000원
                    </Text>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody>
                    <Heading size="md">결제 방법</Heading>

                    <Text py="1" marginTop="10px">
                      몰라
                    </Text>
                  </CardBody>
                </Card>

                <Button colorScheme="blue">주문하기</Button>
              </Stack>
            </Box>
          </Flex>
        </Card>
      </Box>
    </Box>
  );
}
