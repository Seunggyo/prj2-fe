import React, { useState } from "react";
import {
  Box,
  Card,
  Flex,
  FormLabel,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function BoardWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [writer, setWriter] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  function handleSubmit() {
    setIsSubmitting(true);
    axios
      .post("/api/board/add", {
        title,
        content,
        writer,
      })
      .then(() => {
        toast({
          description: "새 글이 저장되었습니다.",
          status: "success",
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response.status);
        if (error.response.status === 400) {
          toast({
            description: "작성한 내용을 확인해주세요.",
            status: "error",
          });
        } else {
          toast({
            description: "저장 중에 문제가 발생하였습니다.",
            status: "error",
          });
        }
      })
      .finally(() => setIsSubmitting(false));
  }

  function setAuth(value) {}

  return (
    <div>
      <form>
        <div className="bg-indigo-50 min-h-screen md:px-20 pt-6">
          <div className=" bg-white rounded-md px-6 py-10 max-w-4xl mx-auto">
            <h1 className="text-center text-6xl font-dongle text-gray-500 mb-10">
              게시판 글 작성
            </h1>
            <div className="space-y-4">
              <div>
                <span className="font-dongle text-4xl text-gray-500">
                  제 목:
                </span>
                <input
                  type="text"
                  id="title"
                  placeholder="Title"
                  className="ml-2 outline-none py-1 p-2 w-3/5 text-md border-2 rounded-md"
                />
              </div>
              <div>
                <textarea
                  id="description"
                  cols="30"
                  rows="10"
                  className="w-full p-4 text-gray-  600 bg-indigo-50 outline-none rounded-md"
                ></textarea>
              </div>
              <div className="flex space-x-24">
                <div>
                  <span className="font-dongle text-4xl text-gray-500">
                    작성자:
                  </span>
                  <input
                    type="text"
                    placeholder="NickName"
                    id="name"
                    className="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md"
                  />
                </div>
                <div>
                  <Flex>
                    <span className="font-dongle text-4xl text-gray-500">
                      게시판:
                    </span>
                    <Flex ml="4">
                      <Select
                        defaultValue={"user"}
                        onChange={(e) => setAuth(e.target.value)}
                      >
                        {/*TODO: 게시판유형 더 추가해야함..*/}

                        <option value={"ds"}>약국</option>
                        <option value={"hs"}>병원</option>
                      </Select>
                    </Flex>
                  </Flex>
                </div>
              </div>
              <div>
                <span className="font-dongle text-4xl text-gray-500">
                  첨부파일
                </span>
                <input
                  className="block w-4/5 text-sm text-gray-900 border
                  border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                  id="file_input"
                  type="file"
                />
              </div>
              <button class=" px-8 py-2 mx-auto block rounded-md font-dongle text-3xl text-indigo-100 bg-indigo-600  ">
                작성 완료
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
