import React, { useEffect, useRef, useState } from "react";
import { AspectRatio, Box, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseChimneyMedical,
  faMagnifyingGlass,
  faPills,
} from "@fortawesome/free-solid-svg-icons";
import {
  faEnvelope,
  faHeart,
  faHospital,
  faUser,
} from "@fortawesome/free-regular-svg-icons";

const images = [
  {
    id: 1,
    src: "https://i.namu.wiki/i/6RpRDJmQvX6La8GElfZqD-EZPXfe-hRbDTPZIC3yfs2RSoAKHfgyZR7dlJL-j1l_rd2Oio5JUUYBiC93LUlDJg.webp",
    current: true,
  },
  {
    id: 2,
    src: "https://cdn.ccdn.co.kr/news/photo/202311/947372_446996_2538.jpg",
    current: false,
  },
  {
    id: 3,
    src: "https://www.sisajournal.com/news/photo/202103/213509_121167_21.jpeg",
    current: false,
  },

  {
    id: 4,
    src: "https://t1.daumcdn.net/cfile/tistory/99CA613359CC878433",
    current: false,
  },
];
export function WelcomePage() {
  const [imageList, setImageList] = useState(images);
  const nextIndex = useRef(1);

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      handleAutoSlide(nextIndex.current);
      nextIndex.current = (nextIndex.current + 1) % imageList.length;
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  console.log(imageList.length);
  console.log(nextIndex.current);

  function handleAutoSlide(nextIndex) {
    setImageList(
      imageList.map((image, index) => {
        return { ...image, current: index === nextIndex ? true : false };
      }),
    );
  }

  return (
    <div className="bg-blue-100 bg-opacity-40">
      <Box className="max-w-screen-xl mx-auto ">
        <AspectRatio ratio={20 / 6} position="relative">
          <Box>
            {imageList.map((image) => (
              <Image
                position="absolute"
                w="100%"
                key={image.id}
                src={image.src}
                zIndex={image.current ? 1 : 0}
                opacity={image.current ? 1 : 0}
                transition="opacity 0.5s"
              />
            ))}
          </Box>
        </AspectRatio>
      </Box>

      <body>
        <div className="flex bg-blue-100 bg-opacity-20 justify-center relative">
          <div
            className="sticky z-99 flex flex-col justify-center"
            style={{
              marginRight: "100px",
              marginTop: "100px",
              color: "#4C87B9",
              cursor: "pointer",
            }}
            onClick={() => navigate("/home")}
          >
            <p>여기 로고 들어갈 수 있나?</p>
            <br />
            <p className="text-4xl" style={{ marginBottom: "40px" }}>
              <strong>세종시의</strong> 의료가
            </p>
            <p className="text-4xl" style={{ marginBottom: "40px" }}>
              필요한 모든 순간
            </p>
            <p
              className="text-4xl"
              style={{ fontWeight: "bold", marginBottom: "20px" }}
            >
              병원 갈 땐, 아프지마
            </p>
            <div
              style={{
                border: "2px solid white",
                borderRadius: "8px",
                backgroundColor: "white",
                marginBottom: "200px",
              }}
            >
              <p className="flex">
                아프지마? 로고?
                <img src="/src/assets/images/QRimage.svg" alt="qr이미지" />
              </p>
            </div>
          </div>

          <div className="max-w-md overflow-y-auto bg-white w-full md:w-1/2">
            <div className="flex bg-blue-100 pt-5 bg-opacity-20 flex items-center">
              <div className="flex mx-auto flex-col md:flex-row">
                <div className="bg-white max-w-md">
                  <div className=" flex flex-col">
                    <div className="p-4">
                      {/*<div className="flex rounded-xl bg-gray-100 h-16 items-center text-md mt-10 p-8">*/}
                      {/*  <FontAwesomeIcon icon={faMagnifyingGlass} />*/}
                      {/*  <h2 className="text-gray-500 ml-2">*/}
                      {/*    병원 또는 약국명을 검색해 보세요.*/}
                      {/*  </h2>*/}
                      {/*</div>*/}
                      <div className="flex justify-between h-30 mt-6 ">
                        <button
                          className="w-full mx-auto pt-10 flex flex-col items-center"
                          onClick={() => navigate("/home/hospital")}
                        >
                          <FontAwesomeIcon
                            icon={faHospital}
                            className="w-14 h-14"
                          />
                          <h3
                            className="font-semibold mt-2"
                            style={{ color: "#14af29" }}
                          >
                            병원 검색
                          </h3>
                        </button>
                        <button
                          className="w-full mx-auto pt-10 flex flex-col items-center"
                          onClick={() => navigate("/home/ds")}
                        >
                          <FontAwesomeIcon
                            icon={faPills}
                            className="w-14 h-14"
                          />
                          <h3
                            className="font-semibold mt-2"
                            style={{ color: "#14af29" }}
                          >
                            약국 검색
                          </h3>
                        </button>
                        <button
                          className="w-full mx-auto pt-10 flex flex-col items-center"
                          onClick={() => navigate("/home/drug")}
                        >
                          <FontAwesomeIcon
                            icon={faHouseChimneyMedical}
                            className="w-14 h-14"
                          />
                          <h3
                            className="font-semibold mt-2"
                            style={{ color: "#14af29" }}
                          >
                            건강 마켓
                          </h3>
                        </button>
                      </div>
                      <div className="flex justify-between h-60 mt-6">
                        <button
                          className="w-full mx-auto pt-10 flex flex-col items-center"
                          onClick={() => navigate("/home/board")}
                        >
                          <FontAwesomeIcon
                            icon={faUser}
                            className="w-14 h-14"
                          />
                          <h3
                            className="font-semibold mt-2"
                            style={{ color: "#FF6347" }}
                          >
                            커뮤니티
                          </h3>
                        </button>
                        <button
                          className="w-full mx-auto pt-10 flex flex-col items-center"
                          onClick={() => navigate("/home/cs")}
                        >
                          <FontAwesomeIcon
                            icon={faEnvelope}
                            className="w-14 h-14"
                          />
                          <h3
                            className="font-semibold mt-2"
                            style={{ color: "#FF6347" }}
                          >
                            고객센터
                          </h3>
                        </button>
                        <button
                          className="w-full mx-auto pt-10 flex flex-col items-center"
                          onClick={() => navigate("/home/member/login")}
                        >
                          <FontAwesomeIcon
                            icon={faHeart}
                            className="w-14 h-14"
                          />
                          <h3
                            className="font-semibold mt-2"
                            style={{ color: "#FF6347" }}
                          >
                            로그인
                          </h3>
                        </button>
                      </div>
                    </div>
                    <div className="w-full h-8 p-4 bg-green-200 bg-opacity-40 flex items-center justify-center">
                      <p className="font-bold text-center">
                        아프지마는 세종시의 메디컬 정보 제공사이트입니다.
                      </p>
                    </div>
                    <div className="mt-auto">
                      <footer
                        className="p-5  max-w-md text-xs leading-relaxed"
                        style={{
                          background:
                            "rgb(245, 246, 250); color: rgb(130, 136, 150);",
                        }}
                      >
                        <div className="mb-4">
                          <b>개인정보 처리방침</b>
                          <br />
                          <p>
                            아프지마는 의료정보의 중개서비스 또는
                            의료정보중개시스템의 제공자로서, 의료정보의 당사자가
                            아니며, 의료정보와 관련된 의무와 책임은 각
                            의료기관에게 있습니다.
                          </p>
                        </div>
                      </footer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}
