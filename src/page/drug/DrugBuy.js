import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  Heading,
  Square,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import React from "react";

export function DrugBuy() {
  return (
    <Box
      marginLeft="600px"
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
            <Card>
              <CardHeader>
                <Heading size="md">Client Report</Heading>
              </CardHeader>

              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Summary
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      View a summary of all your clients over the last month.
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Overview
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      Check out the overview of your clients.
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Analysis
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      See a detailed analysis of all your business clients.
                    </Text>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
          </Center>
          <Square h="800px" size="300px"></Square>
        </Flex>
      </Box>
    </Box>
  );
}
