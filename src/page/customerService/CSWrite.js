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
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function CSWrite() {
  const [csTitle, setCsTitle] = useState("");
  const [csContent, setCsContent] = useState("");
  const [csCategory, setCsCategory] = useState("안내사항");
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
      .postForm("/api/cs/add", {
        csTitle,
        csContent,
        csCategory: csCategory,
        uploadFiles: uploadFiles,
      })
      .then(() => {
        toast({
          description: "새 공지글이 저장되었습니다.",
          status: "success",
        });
        navigate("/home/cs");
      })
      .catch((error) => {
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
    <Box>
      <form>
        <div className="bg-orange-50 max-h-screen md:px-40">
          <div className=" bg-white rounded-md px-6 py-12 max-w-full mx-auto">
            <h1 className="text-center text-6xl font-dongle text-gray-500 mb-10">
              공지 글 작성
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
                  value={csTitle}
                  onChange={(e) => setCsTitle(e.target.value)}
                  className="ml-2 outline-none py-1 p-2 w-3/5 text-md border-2 rounded-md"
                />
              </div>
              <div>
                <textarea
                  id="description"
                  cols="30"
                  rows="10"
                  value={csContent}
                  onChange={(e) => setCsContent(e.target.value)}
                  className="w-full p-4 text-gray-600 bg-orange-50 outline-none rounded-md"
                ></textarea>
              </div>
              <div className="flex space-x-24">
                <Flex ml="4">
                  <Select
                    defaultValue={"안내사항"}
                    onChange={(e) => {
                      setCsCategory(e.target.value);
                    }}
                  >
                    <option value={"안내사항"}>안내사항</option>
                    <option value={"긴급안내"}>긴급안내</option>
                    <option value={"출시소식"}>출시소식</option>
                    <option value={"이벤트"}>이벤트</option>
                    <option value={"당첨자발표"}>당첨자발표</option>
                  </Select>
                </Flex>
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

                <FormHelperText>
                  한 개의 파일은 3MB 이내, 총 용량은 30MB 이내로 첨부해주세요.
                </FormHelperText>
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
    </Box>
  );
}
