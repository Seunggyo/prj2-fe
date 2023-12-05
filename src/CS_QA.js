import React, { useState } from "react";
import { Button, Flex, Select, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function CS_QA() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [boardType, setBoardType] = useState("병원");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  function handleSubmit() {
    setIsSubmitting(true);
    axios
      .post("/api/board/add", {
        title,
        content,
        category: boardType,
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

  return (
    <div>
      <form>
        <div className="bg-orange-50 min-h-screen rounded-xl md:px-20 pt-2">
          <div className=" bg-white rounded-xl px-6 py-24 max-w-4xl mx-auto">
            <h1 className="text-center text-6xl font-dongle text-gray-500 mb-10">
              원하시는 질문을 적어주세요!
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
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="ml-2 outline-none py-1 p-2 w-3/5 text-md border-2 rounded-md"
                />
              </div>
              <div>
                <textarea
                  id="description"
                  cols="30"
                  rows="10"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-4 text-gray-  600 bg-orange-50 outline-none rounded-md"
                ></textarea>
              </div>
              <div className="flex space-x-24">
                <div>
                  <Flex>
                    <span className="font-dongle text-4xl text-gray-500">
                      게시판:
                    </span>
                    <Flex ml="4">
                      <Select
                        defaultValue={"병원"}
                        onChange={(e) => {
                          setBoardType(e.target.value);
                        }}
                      >
                        {/*TODO: 게시판유형 더 추가해야함..?*/}

                        <option value={"병원"}>병원</option>
                        <option value={"약국"}>약국</option>
                        <option value={"쇼핑몰"}>쇼핑몰</option>
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

                  // TODO: 멀티파일업로드 키밸류 추가해야댐.
                />
              </div>
              <Button
                isDisabled={isSubmitting}
                onClick={handleSubmit}
                class=" px-8 py-2 mx-auto block rounded-md font-dongle text-3xl
                text-indigo-100 bg-indigo-600"
              >
                작성 완료
              </Button>
              <Button onClick={() => navigate(-1)}>취소</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
