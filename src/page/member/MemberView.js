import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import {
  Avatar,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { LoginContext } from "../../component/LoginProvider";

function MemberView(props) {
  const [member, setMember] = useState(null);
  const [boardList, setBoardList] = useState(null);
  const [commentList, setCommentList] = useState(null);
  const [access, setAccess] = useState(false);

  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  const { login, authCheck, isAuthenticated, hasAccess } =
    useContext(LoginContext);

  // TODO: 회원탈퇴 추가해야함.
  // const { id } = useParams();
  // function handleDelete() {
  //   axios
  //     .delete("/api/cs/remove/" + id)
  //     .then((response) => {
  //       toast({
  //         description: id + "번 회원이 탈퇴되었습니다.",
  //         status: "success",
  //       });
  //       navigate("/home/cs");
  //     })
  //     .catch((error) => {
  //       toast({
  //         description: "탈퇴 중 문제가 발생하였습니다.",
  //         status: "error",
  //       });
  //     })
  //     .finally(() => onClose());
  // }

  useEffect(() => {
    axios.get("/api/member/info?" + params).then(({ data }) => {
      setMember(data.member);
      setBoardList(data.boardList);
      setCommentList(data.commentList);
    });
  }, []);

  if (member === null || boardList === null || commentList === null) {
    return <Spinner />;
  }

  function handleDeleteClick() {
    axios.delete("/api/member/remove?" + params).then(() => {
      toast({
        description: "탈퇴되었습니다.",
        status: "success",
      });
      navigate("/");
    });
  }

  return (
    <div className="bg-gray-100 mx-16">
      <div className="container mx-auto my-5 p-5">
        <div className="md:flex no-wrap md:-mx-2 ">
          <div className="w-full md:w-3/12 md:mx-2">
            <div className="bg-white p-3 border-t-4 border-green-400">
              <div className="image overflow-hidden flex justify-center">
                <Avatar
                  style={{
                    width: "18rem",
                    height: "18rem",
                  }}
                  src={member.profile}
                />
              </div>
              <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                {member.nickName}
              </h1>
              <h3>코로나걸린 겜돌이</h3>

              <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li className="flex items-center py-3">
                  <span>상 태</span>
                  <span className="ml-auto">
                    {isAuthenticated ? (
                      <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                        접 속 중
                      </span>
                    ) : (
                      <span className="bg-red-500 py-1 px-2 rounded text-white text-sm">
                        비 접 속
                      </span>
                    )}
                  </span>
                </li>
                <li className="flex items-center py-3">
                  <span>가입 년도</span>

                  {/* TODO auth user 제외 표시*/}
                  <span className="ml-auto">
                    {new Date(member.inserted)
                      .toLocaleDateString()
                      .replace(/\.$/, "")}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full md:w-9/12 mx-2 h-64">
            <div className="bg-white p-3 shadow-sm rounded-sm">
              <div className="flex items-center justify-between space-x-2 font-semibold mt-3">
                <div class="flex items-center">
                  <svg
                    className="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span className="tracking-wide text-xl">개인 정보</span>
                </div>

                {isAuthenticated() && (
                  <Flex>
                    <button
                      onClick={() =>
                        navigate("/home/member/edit?" + params.toString())
                      }
                      className="ml-60 py-2 rounded-md relative h-12 w-32 overflow-hidden text-blue-500 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-blue-500 before:duration-300 before:ease-out hover:text-white hover:before:h-40 hover:before:w-40 hover:before:opacity-80 font-dongle font-semibold"
                    >
                      <span className="relative z-10  text-4xl">
                        수 정 하 기
                      </span>
                    </button>
                    <button
                      onClick={onOpen}
                      className="ml-8 py-2 rounded-md relative h-12 w-32 overflow-hidden text-blue-500 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-blue-500 before:duration-300 before:ease-out hover:text-white hover:before:h-40 hover:before:w-40 hover:before:opacity-80 font-dongle font-semibold "
                    >
                      <span className="relative z-10  text-4xl">
                        삭 제 하 기
                      </span>
                    </button>
                  </Flex>
                )}
              </div>
              <div className="text-gray-700 mt-6">
                <div className="grid md:grid-cols-2 text-md">
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">아 이 디</div>
                    <div className="px-4 py-2">{member.id}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">닉 네 임</div>
                    <div className="px-4 py-2">{member.nickName}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">연락번호</div>
                    <div className="px-4 py-2">{member.phone}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">주 소</div>
                    <div className="px-4 py-2">{member.address}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">이 메 일</div>
                    <div className="px-4 py-2 ">
                      <a
                        className="text-blue-800 hover:text-red-500 hover:underline underline"
                        href={"mailto:${member.email}"}
                      >
                        {member.email}
                      </a>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">생 년 월 일</div>
                    <div className="px-4 py-2">{member.birthday}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-4"></div>

            <div className="bg-white p-3 shadow-sm rounded-sm">
              <div className="grid grid-cols-2">
                <div>
                  <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                    <span clas="text-green-500">
                      <svg
                        className="h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </span>
                    <span className="tracking-wide">최근 작성 게시글</span>
                  </div>
                  <ul className="list-inside space-y-2">
                    {boardList.length === 0 && (
                      <li>
                        <div className="text-teal-600">
                          최근 활동이 없습니다.
                        </div>
                      </li>
                    )}

                    {boardList.map((board) => (
                      <li>
                        <div
                          className="text-teal-600 hover:underline cursor-pointer"
                          onClick={() => navigate("/home/board/" + board.id)}
                        >
                          {board.title}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {board.insert}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                    <span clas="text-green-500">
                      <svg
                        className="h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path
                          fill="#fff"
                          d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                        />
                      </svg>
                    </span>
                    <span className="tracking-wide">최근 작성 댓글</span>
                  </div>
                  <ul className="list-inside space-y-2">
                    {commentList.length === 0 && (
                      <li>
                        <div className="text-teal-600">
                          최근 활동이 없습니다.
                        </div>
                      </li>
                    )}
                    {commentList.map((comment) => (
                      <li>
                        <div
                          className="text-teal-600 hover:underline cursor-pointer"
                          onClick={() =>
                            navigate("/home/board/" + comment.boardId)
                          }
                        >
                          {comment.comment}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {comment.inserted}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 삭제 모달 */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>삭제 확인</ModalHeader>
          <ModalCloseButton />
          <ModalBody>삭제 하시겠습니까?</ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>취소</Button>
            <Button onClick={handleDeleteClick} colorScheme="red">
              삭제
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default MemberView;
