import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Flex,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import { LoginContext } from "../../component/LoginProvider";

function MemberView(props) {
  const [member, setMember] = useState(null);
  const [access, setAccess] = useState(false);
  const [params] = useSearchParams();

  const navigate = useNavigate();

  const { authCheck, isAuthenticated, hasAccess } = useContext(LoginContext);

  useEffect(() => {
    if (
      authCheck() !== "admin" &&
      !isAuthenticated() &&
      !hasAccess(params.get("id"))
    ) {
      navigate("/");
    }

    axios.get("/api/member/info?" + params).then(({ data }) => setMember(data));
  }, []);

  if (member === null) {
    return <Spinner />;
  }

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto my-5 p-5">
        <div className="md:flex no-wrap md:-mx-2 ">
          <div className="w-full md:w-3/12 md:mx-2">
            <div className="bg-white p-3 border-t-4 border-green-400">
              <div className="image overflow-hidden">
                <Avatar></Avatar>
              </div>
              <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                {member.nickName}
              </h1>
              <h3 className="text-gray-600 font-lg text-semibold leading-6">
                코로나걸린 겜돌이
              </h3>
              <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                룰루룰루
              </p>
              <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li className="flex items-center py-3">
                  <span>상 태</span>
                  <span className="ml-auto">
                    <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                      접 속 중
                    </span>
                  </span>
                </li>
                <li className="flex items-center py-3">
                  <span>가입 년도</span>
                  <span className="ml-auto">{member.inserted}</span>
                </li>
              </ul>
            </div>

            <div className="my-4"></div>

            <div className="bg-white p-3 hover:shadow">
              <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                <span className="text-green-500">
                  <svg
                    className="h-5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </span>
                <span>친구 목록</span>
              </div>
              <div className="grid grid-cols-3">
                <div className="text-center my-2">
                  <Avatar></Avatar>
                </div>
                <div className="text-center my-2">
                  <Avatar></Avatar>
                </div>
                <div className="text-center my-2">
                  <Avatar></Avatar>
                </div>
                <div className="text-center my-2">
                  <Avatar></Avatar>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-9/12 mx-2 h-64">
            <div className="bg-white p-3 shadow-sm rounded-sm">
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <span className="tracking-wide">개인 정보</span>
              </div>
              <div className="text-gray-700">
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">이 름</div>
                  <div className="px-4 py-2">해야하나..?</div>
                </div>
                <div className="grid md:grid-cols-2 text-sm">
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Last Name</div>
                    <div className="px-4 py-2">Doe</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Gender</div>
                    <div className="px-4 py-2">Female</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Contact No.</div>
                    <div className="px-4 py-2">+11 998001001</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">
                      Current Address
                    </div>
                    <div className="px-4 py-2">
                      Beech Creek, PA, Pennsylvania
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">
                      Permanant Address
                    </div>
                    <div className="px-4 py-2">
                      Arlington Heights, IL, Illinois
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Email.</div>
                    <div className="px-4 py-2">
                      <a
                        className="text-blue-800"
                        href="mailto:jane@example.com"
                      >
                        jane@example.com
                      </a>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Birthday</div>
                    <div className="px-4 py-2">Feb 06, 1998</div>
                  </div>
                </div>
              </div>
              <button className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                Show Full Information
              </button>
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
                    <span className="tracking-wide">Experience</span>
                  </div>
                  <ul className="list-inside space-y-2">
                    <li>
                      <div className="text-teal-600">
                        Owner at Her Company Inc.
                      </div>
                      <div className="text-gray-500 text-xs">
                        March 2020 - Now
                      </div>
                    </li>
                    <li>
                      <div className="text-teal-600">
                        Owner at Her Company Inc.
                      </div>
                      <div className="text-gray-500 text-xs">
                        March 2020 - Now
                      </div>
                    </li>
                    <li>
                      <div className="text-teal-600">
                        Owner at Her Company Inc.
                      </div>
                      <div className="text-gray-500 text-xs">
                        March 2020 - Now
                      </div>
                    </li>
                    <li>
                      <div className="text-teal-600">
                        Owner at Her Company Inc.
                      </div>
                      <div className="text-gray-500 text-xs">
                        March 2020 - Now
                      </div>
                    </li>
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
                    <span className="tracking-wide">Education</span>
                  </div>
                  <ul className="list-inside space-y-2">
                    <li>
                      <div className="text-teal-600">
                        Masters Degree in Oxford
                      </div>
                      <div className="text-gray-500 text-xs">
                        March 2020 - Now
                      </div>
                    </li>
                    <li>
                      <div className="text-teal-600">
                        Bachelors Degreen in LPU
                      </div>
                      <div className="text-gray-500 text-xs">
                        March 2020 - Now
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Center>
          <Card>
            <CardHeader>
              <Heading>{member.id}</Heading>
            </CardHeader>
            <CardBody>
              <Box>nickName : {member.nickName}</Box>
              <Box>birthday : {member.birthday}</Box>
              <Box>phone : {member.phone}</Box>
              <Box>email : {member.email}</Box>
              <Box>address : {member.address}</Box>
              {/* TODO auth user 제외 표시*/}
              <Box>
                inserted :{" "}
                {new Date(member.inserted)
                  .toLocaleDateString()
                  .replace(/\./g, "")}
              </Box>
            </CardBody>
            <CardFooter>
              <Flex>
                <Button
                  onClick={() =>
                    navigate("/home/member/edit?" + params.toString())
                  }
                >
                  수정
                </Button>
                <Button>삭제</Button>
              </Flex>
            </CardFooter>
          </Card>
        </Center>
      </div>
    </div>
  );
}

export default MemberView;
