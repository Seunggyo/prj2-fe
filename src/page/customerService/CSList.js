import { Box, Spinner, Table, Tbody, Td, Thead, Tr } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

export function CSList() {
  const [csList, setCsList] = useState(null);
  const [orderByHit, setOrderByHit] = useState(null);
  const [orderByTitle, setOrderByTitle] = useState(null);

  const navigate = useNavigate();

  const [params, setParams] = useSearchParams();

  useEffect(() => {
    axios
      .get("/api/cs/list?" + params.toString())
      .then((r) => setCsList(r.data));
  }, [params]);

  if (csList == null) {
    return <Spinner />;
  }

  function handleRowClick(id) {
    axios
      .put("/api/cs/" + id)
      .then((r) => console.log("good"))
      .catch((error) => {
        console.error("bad");
      });
    navigate("/cs/" + id);
  }

  function sortTitle() {
    const urlSearchParams = new URLSearchParams(params.toString());
    let nextOrderByTitle = null;
    urlSearchParams.delete("h");
    if (orderByTitle === false) {
      urlSearchParams.set("t", true);
      nextOrderByTitle = true;
    } else if (orderByTitle === true) {
      urlSearchParams.delete("t");
      nextOrderByTitle = null;
    } else {
      urlSearchParams.set("t", false);
      nextOrderByTitle = false;
    }

    setParams(urlSearchParams);
    setOrderByTitle(nextOrderByTitle);
  }

  function sortCount() {
    const urlSearchParams = new URLSearchParams(params.toString());
    let nextOrderByHit = null;
    urlSearchParams.delete("t");
    if (orderByHit === false) {
      urlSearchParams.set("h", true);
      nextOrderByHit = true;
    } else if (orderByHit === true) {
      urlSearchParams.delete("h");
      nextOrderByHit = null;
    } else {
      urlSearchParams.set("h", false);
      nextOrderByHit = false;
    }

    setParams(urlSearchParams);
    setOrderByHit(nextOrderByHit);
  }

  return (
    <div>
      <button className="relative h-12 w-40 overflow-hidden text-indigo-600 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-indigo-500 before:duration-300 before:ease-out hover:text-white  hover:before:h-40 hover:before:w-40 hover:before:opacity-80 font-dongle font-semibold font text-3xl">
        <span className="relative z-10">여기 공지사항</span>
      </button>
      <button className="relative h-12 w-40 overflow-hidden text-indigo-600 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-indigo-500 before:duration-300 before:ease-out hover:text-white  hover:before:h-40 hover:before:w-40 hover:before:opacity-80 font-dongle font-semibold font text-3xl">
        <span className="relative z-10">인기 글</span>
      </button>
      <button
        className="relative h-12 w-40 overflow-hidden text-indigo-600 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-indigo-500 before:duration-300 before:ease-out hover:text-white  hover:before:h-40 hover:before:w-40 hover:before:opacity-80 font-dongle font-semibold font text-3xl"
        onClick={() => navigate("/cs/csWrite")}
      >
        <span className="relative z-10">글 쓰 기</span>
      </button>
      <Box>
        <Table>
          <Thead>
            <Tr>
              <th>번호</th>
              <th>카테고리</th>
              <th onClick={sortTitle} style={{ cursor: "pointer" }}>
                제목
              </th>
              <th>작성자</th>
              <th>작성일</th>
              <th onClick={sortCount} style={{ cursor: "pointer" }}>
                조회수
              </th>
              <th>수정 / 삭제</th>
            </Tr>
          </Thead>
          <Tbody>
            {csList.map((cs) => (
              <Tr
                _hover={{
                  cursor: "pointer",
                }}
                key={cs.id}
                onClick={() => handleRowClick(cs.id)}
              >
                <Td>{cs.id}</Td>
                <Td>{cs.csCategory}</Td>
                <Td>{cs.csTitle}</Td>
                <Td>{cs.csWriter}</Td>
                <Td>{cs.inserted}</Td>
                <Td>{cs.csHit}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <div class="flex justify-center p-6">
        <nav class="flex space-x-2">
          <a
            href="#"
            class="items-center px-6 py-2 text-lg bg-gradient-to-r from-violet-300 to-indigo-300 border border-fuchsia-100 hover:border-violet-100 text-white font-semibold cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10"
          >
            이 전
          </a>
          <a
            href="#"
            class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-fuchsia-100 hover:bg-fuchsia-200 cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10"
          >
            1
          </a>
          <a
            href="#"
            class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-fuchsia-100 hover:bg-fuchsia-200 cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10"
          >
            2
          </a>
          <a
            href="#"
            class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-fuchsia-100 hover:bg-fuchsia-200 cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10"
          >
            3
          </a>
          <button class="relative inline-flex items-center px-6 py-2 text-lg bg-gradient-to-r from-violet-300 to-indigo-300 border border-fuchsia-100 hover:border-violet-100 text-white font-semibold cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10">
            다 음
          </button>
        </nav>
      </div>
    </div>
  );
}
