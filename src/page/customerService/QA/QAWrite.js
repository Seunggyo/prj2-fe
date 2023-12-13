import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  Select,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function QAWrite() {
  const [qaTitle, setQaTitle] = useState("");
  const [qaContent, setQaContent] = useState("");
  const [qaCategory, setQaCategory] = useState("건의사항");
  const [uploadFiles, setUploadFiles] = useState(null);
  const [files, setFiles] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    // 파일 입력에서 선택한 파일들을 가져오기.
    const selecteFiles = e.target.files;
    const filesArray = [];

    for (let i = 0; i < selecteFiles.length; i++) {
      const file = selecteFiles[i];

      const reader = new FileReader();

      reader.onloadend = () => {
        // 파일 미리보기 URL을 생성하여 상태 업데이트
        filesArray.push({ file, previewURL: reader.result });

        setFiles([...filesArray]);
      };
      // 파일을 읽어와서 미리보기 URL을 생성
      reader.readAsDataURL(file);
    }
  };

  function handleSubmit() {
    setIsSubmitting(true);
    axios
      .postForm("/api/qa/add", {
        qaTitle,
        qaContent,
        qaCategory: qaCategory,
        uploadFiles: uploadFiles,
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

            <div className="flex space-x-24">
              <div>
                <Flex>
                  <span className="font-dongle text-4xl text-gray-500">
                    유 형:
                  </span>
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
                </Flex>
              </div>
            </div>
            <FormControl>
              <span className="font-dongle text-4xl text-gray-500">
                첨부파일
              </span>
              <input
                className="block w-4/5 text-sm text-gray-900 border
                  border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  handleFileChange(e);
                  setUploadFiles(e.target.files);
                }}
              />
              {/* 미리보기 이미지를 표시하는 부분 */}
              <div style={{ display: "flex", marginTop: "10px" }}>
                {Array.isArray(files) &&
                  files.map((file, index) => (
                    <img
                      key={index}
                      src={file.previewURL}
                      alt={`Preview ${index}`}
                      style={{
                        width: "180px",
                        height: "auto",
                        marginRight: "10px",
                      }}
                    />
                  ))}
              </div>
              <span className="text-xs text-gray-500">
                한 개의 파일은 3MB 이내, 총 용량은 30MB 이내로 첨부해주세요.
              </span>
            </FormControl>
            <Box className="flex justify-center">
              <Button
                isDisabled={isSubmitting}
                onClick={handleSubmit}
                className="px-8 py-2 rounded-md relative h-12 w-40 overflow-hidden text-indigo-600 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-indigo-500 before:duration-300 before:ease-out hover:text-white hover:before:h-40 hover:before:w-40 hover:before:opacity-80 font-dongle font-semibold"
              >
                <span className="relative z-10  text-4xl">작성 완료</span>
              </Button>
              <Button
                onClick={() => navigate(-1)}
                className="ml-10 rounded-md relative h-12 w-40 overflow-hidden text-indigo-600 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-indigo-500 before:duration-300 before:ease-out hover:text-white hover:before:h-40 hover:before:w-40 hover:before:opacity-80 font-dongle font-semibold "
              >
                <span className="relative z-10  text-4xl">취 소</span>
              </Button>
            </Box>
          </div>
        </div>
      </div>
    </form>
  );
}
