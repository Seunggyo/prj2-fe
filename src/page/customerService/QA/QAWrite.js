import { Button, Flex, Select, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function QAWrite() {
  const [qaTitle, setQaTitle] = useState("");
  const [qaContent, setQaContent] = useState("");
  const [qaCategory, setQaCategory] = useState("건의사항");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  function handleSubmit() {
    setIsSubmitting(true);
    axios
      .post("/api/qa/add", {
        qaTitle,
        qaContent,
        qaCategory: qaCategory,
      })
      .then(() => {
        toast({
          description: "새 글이 저장되었습니다.",
          status: "success",
        });
        navigate("/home/cs/qaList");
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
    <form>
      <div className="bg-orange-50 max-h-screen rounded-xl md:px-20">
        <div className=" bg-white rounded-xl px-6 py-12 max-w-full mx-auto">
          <h1 className="text-center text-6xl font-dongle text-gray-500 mb-10">
            원하시는 질문을 적어주세요!
          </h1>
          <div className="space-y-4">
            <div>
              <span className="font-dongle text-4xl text-gray-500">제 목:</span>
              <input
                type="text"
                placeholder="Title"
                value={qaTitle}
                onChange={(e) => setQaTitle(e.target.value)}
                className="ml-2 outline-none py-1 p-2 w-3/5 text-md border-2 rounded-md"
              />
            </div>
            <div>
              <textarea
                cols="30"
                rows="10"
                value={qaContent}
                onChange={(e) => setQaContent(e.target.value)}
                className="w-full p-4 text-gray-  600 bg-orange-50 outline-none rounded-md"
              ></textarea>
            </div>

            <div>
              <Flex ml="4">
                <Select
                  defaultValue={"건의사항"}
                  onChange={(e) => {
                    setQaCategory(e.target.value);
                  }}
                >
                  <option value={"건의사항"}>건의사항</option>
                  <option value={"이벤트관련"}>이벤트관련</option>
                  <option value={"물품관련"}>물품관련</option>
                  <option value={"기타"}>기타</option>
                </Select>
              </Flex>
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
  );
}
