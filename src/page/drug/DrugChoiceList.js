import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Box, Flex } from "@chakra-ui/react";

function DrugChoiceList(props) {
  const [drugList, setDrugList] = useState([]);
  const location = useLocation();

  useEffect(() => {
    axios
      .get("/api/drug/list?function=" + location.state)
      .then((response) => setDrugList(response.data));
  }, []);

  return (
    <div>
      {drugList.map((drug) => (
        <Flex key={drug.id}>
          <Box>{drug.id} </Box>
          <Box>{drug.name}</Box>
          <Box>{drug.price}</Box>
          <Box>{drug.fileName}</Box>
        </Flex>
      ))}
    </div>
  );
}

export default DrugChoiceList;
