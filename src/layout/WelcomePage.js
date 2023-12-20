import React, { useContext, useEffect, useRef, useState } from "react";
import { AspectRatio, Box, Center, Flex, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseChimneyMedical,
  faPills,
} from "@fortawesome/free-solid-svg-icons";
import {
  faEnvelope,
  faHeart,
  faHospital,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import logo from "../assets/images/로고1.png";
import Snowfall from "react-snowfall";
import { LoginContext } from "../component/LoginProvider";
import bgg from "../assets/images/배경화면.jpg";
import ch from "../assets/images/크리스마스 배너.PNG";
import { faTree } from "@fortawesome/free-solid-svg-icons/faTree";

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
    src: ch,
    current: false,
  },
];
export function WelcomePage() {
  /*------------------반짝이----------------------*/
  const [text, setText] = useState("크리스마스크리스마스크리스마스크리스크");
  const [introduceColors, setIntroduceColors] = useState([]);
  useEffect(() => {
    let nonSpaceCharCount = 0;
    if (text !== null) {
      setIntroduceColors(
        Array.from(text).map((char, index) => {
          if (char !== " ") {
            const color = nonSpaceCharCount % 2 === 0 ? "#41A541" : "tomato";
            nonSpaceCharCount++;
            return color;
          }
          return null;
        }),
      );
    }
  }, [text]);

  useEffect(() => {
    if (text !== null) {
      const interval = setInterval(() => {
        setIntroduceColors((currentColors) =>
          currentColors.map(
            (color) => color && (color === "#41A541" ? "tomato" : "#41A541"),
          ),
        );
      }, 1000);

      return () => clearInterval(interval);
    }
  }, []);

  /*-------------------------------------*/
  const [imageList, setImageList] = useState(images);
  const nextIndex = useRef(1);

  const navigate = useNavigate();

  const { fetchLogin, login, isAuthenticated, authCheck } =
    useContext(LoginContext);

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
    <div
      class="h-screen"
      style={{
        backgroundImage: `url(${bgg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Snowfall
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: 10,
          color: "red",
        }}
      />

      <Box className="mx-auto ">
        <AspectRatio ratio={20 / 4} position="relative">
          <Box>
            {imageList.map((image) => (
              <Image
                position="absolute"
                w="90%"
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

      <div>
        <div className="flex justify-center relative">
          <div
            className="sticky z-99 flex flex-col justify-center"
            style={{
              marginRight: "100px",
              color: "white",
              cursor: "pointer",
            }}
            onClick={() => navigate("/home")}
          >
            <br />

            <Flex justifyContent="center">
              {text !== null &&
                text.split("").map((char, index) => (
                  <span
                    style={{
                      color: introduceColors[index] || "inherit",
                      marginBottom: "30px",
                      marginRight: "8px",
                    }}
                    key={index}
                  >
                    {char !== " " ? <FontAwesomeIcon icon={faTree} /> : " "}
                  </span>
                ))}
            </Flex>
            <p
              className="text-7xl font-dongle font-semibold text-center"
              style={{ marginBottom: "30px" }}
            >
              <strong>세종시의</strong> 의료가
            </p>
            <p
              className="text-7xl font-dongle font-semibold text-center"
              style={{ marginBottom: "30px" }}
            >
              필요한 모든 순간
            </p>
            <p
              className="text-7xl font-dongle font-semibold text-center"
              style={{ fontWeight: "bold", marginBottom: "20px" }}
            >
              병원 갈 땐, 아프지마
            </p>
            <br />
            <p>
              {/*<Image*/}
              {/*  src={ch}*/}
              {/*  style={{*/}
              {/*    width: "500px",*/}
              {/*    height: "200px",*/}
              {/*  }}*/}
              {/*/>*/}
            </p>
            {/*<div*/}
            {/*  style={{*/}
            {/*    border: "2px solid white",*/}
            {/*    borderRadius: "8px",*/}
            {/*    backgroundColor: "white",*/}
            {/*    // marginBottom: "200px",*/}
            {/*  }}*/}
            {/*></div>*/}
          </div>

          <div className="max-w-md overflow-y-auto  w-full md:w-1/2">
            <div
              className="flex  pt-5  flex items-center "
              style={{ marginTop: "10px" }}
            >
              <div className="flex mx-auto flex-col md:flex-row">
                <div className=" max-w-md">
                  <div className=" flex flex-col">
                    <div className="p-4">
                      <div className="flex justify-between h-30  ">
                        <button
                          className="w-full mx-auto pt-10 flex flex-col items-center"
                          onClick={() => navigate("/home/hospital")}
                        >
                          <FontAwesomeIcon
                            color="white"
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
                            color="white"
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
                            color="white"
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
                      <div className="flex justify-between h-40 mt-6">
                        <button
                          className="w-full mx-auto pt-10 flex flex-col items-center"
                          onClick={() => navigate("/home/board")}
                        >
                          <FontAwesomeIcon
                            color="white"
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
                            color="white"
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
                        {isAuthenticated() || (
                          <button
                            className="w-full mx-auto pt-10 flex flex-col items-center"
                            onClick={() => navigate("/home/member/login")}
                          >
                            <FontAwesomeIcon
                              color="white"
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
                        )}
                      </div>
                    </div>
                    <div className="w-full h-8 p-4 bg-yellow-500 flex items-center justify-center">
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
                        <div className="mb-4" style={{ color: "white" }}>
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
      </div>
    </div>
  );
}
