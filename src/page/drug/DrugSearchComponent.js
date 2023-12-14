import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Center, Flex, Input, Select } from "@chakra-ui/react";
import { isDisabled } from "@testing-library/user-event/dist/utils";

export function DrugSearchComponent() {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("all");

  const navigate = useNavigate();

  function handleSearch() {
    // /?k=keyword
    const params = new URLSearchParams();
    params.set("k", keyword);
    params.set("c", category);

    navigate("?" + params);
  }

  return (
    <Center>
      <div className="flex w-[30rem] rounded bg-white border-indigo-300">
        <input
          type="search"
          className="w-full border bg-transparent px-4 py-1 text-gray-900 focus:outline-none"
          placeholder="search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button
          className={`m-2 rounded px-4 py-2 font-semibold text-gray-100 ${
            keyword ? "bg-indigo-300" : "bg-gray-500 cursor-not-allowed"
          }`}
          disabled={!keyword}
          onClick={handleSearch}
        >
          search
        </button>
      </div>
    </Center>
  );
}
