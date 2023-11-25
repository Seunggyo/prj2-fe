import { useState } from "react";
import { useToast } from "@chakra-ui/react";
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

  return (
    <div>
      <form>
        <div className="bg-indigo-50 min-h-screen md:px-20 pt-6">
          <div className=" bg-white rounded-md px-6 py-10 max-w-2xl mx-auto">
            <h1 className="text-center text-2xl font-bold text-gray-500 mb-10">
              게시판 글 작성
            </h1>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="text-lx">
                  제목:
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="title"
                  className="ml-2 outline-none py-1 p-2 w-4/5 text-md border-2 rounded-md"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-lg"
                ></label>
                <textarea
                  id="description"
                  cols="30"
                  rows="10"
                  className="w-full p-4 text-gray-600 bg-indigo-50 outline-none rounded-md"
                ></textarea>
              </div>
              <div>
                <label htmlFor="name" className="text-lx">
                  작성자:
                </label>
                <input
                  type="text"
                  placeholder="NickName"
                  id="name"
                  className="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-lx">
                  이메일:
                </label>
                <input
                  type="text"
                  placeholder="e-mail"
                  id="email"
                  className="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md"
                />
              </div>
              <button class=" px-6 py-2 mx-auto block rounded-md text-lg font-semibold text-indigo-100 bg-indigo-600  ">
                작성 완료
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
