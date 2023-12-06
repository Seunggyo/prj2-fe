import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import {
  Badge,
  Box,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";

export function BoardList() {
  const [boardList, setBoardList] = useState([]);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios.get("/api/board/list?" + params).then((r) => setBoardList(r.data));
  }, [location]);

  if (boardList == null) {
    return <Spinner />;
  }

  function handleAllClick() {
    const params = new URLSearchParams();
    params.set("b", "all");

    navigate("/board?" + params);
  }

  function handlePopClick() {
    const params = new URLSearchParams();
    params.set("b", "pop");

    navigate("/board?" + params);
  }

  return (
    <Box>
      <button
        className="relative h-12 w-40 overflow-hidden text-indigo-600 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-indigo-500 before:duration-300 before:ease-out hover:text-white  hover:before:h-40 hover:before:w-40 hover:before:opacity-80 font-dongle font-semibold font text-3xl"
        onClick={handleAllClick}
      >
        <span className="relative z-10">전체 글</span>
      </button>
      <button
        className="relative h-12 w-40 overflow-hidden text-indigo-600 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-indigo-500 before:duration-300 before:ease-out hover:text-white  hover:before:h-40 hover:before:w-40 hover:before:opacity-80 font-dongle font-semibold font text-3xl"
        onClick={handlePopClick}
      >
        <span className="relative z-10">인기 글</span>
      </button>
      <button className="relative h-12 w-40 overflow-hidden text-indigo-600 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-indigo-500 before:duration-300 before:ease-out hover:text-white  hover:before:h-40 hover:before:w-40 hover:before:opacity-80 font-dongle font-semibold font text-3xl">
        <span className="relative z-10">공 지</span>
      </button>
      <Box>
        <Table>
          <Thead>
            <Tr>
              <Th>id</Th>
              <Th>like</Th>
              <Th>title</Th>
              <Th>by</Th>
              <Th>at</Th>
              <Th>category</Th>
            </Tr>
          </Thead>
          <Tbody>
            {boardList.map((board) => (
              <Tr
                _hover={{
                  cursor: "pointer",
                }}
                key={board.id}
                onClick={() => navigate("/board/" + board.id)}
              >
                <Td>{board.id}</Td>
                <td>{board.countLike}</td>
                <Td>
                  {board.title}
                  {board.countComment > 0 && (
                    <Badge>
                      <ChatIcon />
                      {board.countComment}
                    </Badge>
                  )}
                </Td>
                <Td>{board.nickName}</Td>
                <Td>{board.inserted}</Td>
                <Td>{board.category}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <div class="flex justify-center p-6">
        <nav class="flex space-x-2" aria-label="Pagination">
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
          <a
            href="#"
            class="relative inline-flex items-center px-6 py-2 text-lg bg-gradient-to-r from-violet-300 to-indigo-300 border border-fuchsia-100 hover:border-violet-100 text-white font-semibold cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10"
          >
            다 음
          </a>
        </nav>
      </div>
    </Box>
  );
}
