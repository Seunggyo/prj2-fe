import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Box } from "@chakra-ui/react";

function DrugList(props) {
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
        <Box>
          <Box>{drug.id}1</Box>
          <Box>{drug.name}1</Box>
          <Box>{drug.price}1</Box>
        </Box>
      ))}
    </div>
  );
}

export default DrugList;
