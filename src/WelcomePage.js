import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";

export function WelcomePage() {
  const navigate = useNavigate();

  return (
    <Box>
      <section className="relative  bg-blueGray-50 w-4/5 mx-auto min-h-screen-75">
        <div className="relative pt-10 pb-10 flex content-center items-center justify-center min-h-screen-75">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            // style={{
            //   backgroundImage: "url()",
            // }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-75 bg-black"
            ></span>
          </div>

          <div className="container relative mx-auto flex">
            <video className="h-2/4 w-2/4 rounded-lg" controls autoPlay>
              <source
                src="https://docs.material-tailwind.com/demo.mp4"
                type="video/mp4"
              />
            </video>
            <div className="items-center flex flex-wrap">
              <div className="w-full px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-5xl">
                    웰컴페이지
                  </h1>
                  <p className="mt-4 text-lg text-blueGray-200">
                    배경 이미지 넣어야댐
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/*TODO: 왜 안되지*/}
          {/*<div*/}
          {/*  className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"*/}
          {/*  style={{transform: translateZ(0px)}}*/}
          {/*>*/}
          {/*  <svg*/}
          {/*    className="absolute bottom-0 overflow-hidden"*/}
          {/*    xmlns="http://www.w3.org/2000/svg"*/}
          {/*    preserveAspectRatio="none"*/}
          {/*    version="1.1"*/}
          {/*    viewBox="0 0 2560 100"*/}
          {/*    x="0"*/}
          {/*    y="0"*/}
          {/*  >*/}
          {/*    <polygon*/}
          {/*      className="text-blueGray-200 fill-current"*/}
          {/*      points="2560 0 2560 100 0 100"*/}
          {/*    ></polygon>*/}
          {/*  </svg>*/}
          {/*</div>*/}
        </div>
        <section className="pb-10 bg-blueGray-200 -mt-16">
          {/*여분 공간 사용처*/}
          <div className="container mx-auto ">
            <div className="container mx-auto px-4">
              <div className="sm:w-5/12 xl:w-4/12 flex flex-col items-start sm:items-end sm:text-right ml-auto mt-8 sm:mt-0 relative z-10 xl:pt-20 mb-16 sm:mb-0">
                <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                  <div className="text-sm text-blueGray-500 font-semibold py-1">
                    게시판 여분 보류 박스
                  </div>
                </div>
              </div>
            </div>
            {/*왼쪽 각 태그 항목들*/}
            <div className="flex flex-wrap w-3/5 ">
              {/*병원 태그*/}
              <div
                className="w-full md:w-6/12 px-4 text-center -ml-20 cursor-pointer"
                onClick={() => navigate("/home/hospital")}
              >
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg  transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-red-500 before:transition-all before:duration-500 hover:text-white hover:shadow-red-500 hover:before:left-0 hover:before:w-full">
                  <div className="px-4 py-5 flex-auto relative z-10 ">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                      <i className="fas fa-award"></i>
                    </div>
                    <h6 className="text-xl font-semibold">병 원</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">소개글</p>
                  </div>
                </div>
              </div>
              {/*약국 태그*/}
              <div
                className="w-full md:w-6/12 px-4 text-center cursor-pointer"
                onClick={() => navigate("/home/drug")}
              >
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-pink-400 hover:before:w-2/4 hover:before:bg-pink-400 hover:after:w-2/4 hover:after:bg-pink-400">
                  <div className="px-4 py-5 flex-auto relative z-10">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                      <i className="fas fa-award"></i>
                    </div>
                    <h6 className="text-xl font-semibold">약 국</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">소개글</p>
                  </div>
                </div>
              </div>

              {/*커뮤니티 태그*/}
              <div
                className="lg:pt-6 w-full md:w-6/12 px-4 text-center -ml-20 cursor-pointer"
                onClick={() => navigate("/home/board")}
              >
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-blue-400 hover:before:w-2/4 hover:before:bg-blue-400 hover:after:w-2/4 hover:after:bg-blue-400">
                  <div className="px-4 py-5 flex-auto relative z-10">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
                      <i className="fas fa-fingerprint"></i>
                    </div>
                    <h6 className="text-xl font-semibold">커뮤니티</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">소개글</p>
                  </div>
                </div>
              </div>
              {/*쇼핑몰 태그*/}
              <div
                className="lg:pt-6 w-full md:w-6/12 px-4 text-center cursor-pointer"
                onClick={() => navigate("/home/drug")}
              >
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg transition-all before:absolute before:left-0 before:right-0 before:top-0 before:h-0 before:w-full before:bg-green-600 before:duration-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0 after:w-full after:bg-green-600 after:duration-500 hover:text-white hover:shadow-green-600 hover:before:h-2/4 hover:after:h-2/4">
                  <div className="px-4 py-5 flex-auto relative z-10">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-lightBlue-400">
                      <i className="fas fa-retweet"></i>
                    </div>
                    <h6 className="text-xl font-semibold">
                      쇼핑몰ㅇㄹㅇㄹㄹㄹㄹㄹㄹ
                    </h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      소개글111111111111
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <footer className="relative  pt-8 pb-6 mt-1 w-full md:w-6/12 px-4 mx-auto text-center text-sm text-blueGray-500 font-semibold py-1">
              Creative 아프지마
            </footer>
          </div>
        </section>
      </section>
      <Outlet />
    </Box>
  );
}
