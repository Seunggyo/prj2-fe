import React, { useEffect, useRef, useState } from "react";
import "../../kakaomap.css";
import { Map, MapMarker, MapTypeId, Roadview } from "react-kakao-maps-sdk";
import { Box, Button, Input, VStack } from "@chakra-ui/react";
import { DsSearchComponent } from "./DsSearchComponent";
import { ViewComponent } from "./ViewComponent";
import { HsSearchComponent } from "./HsSearchComponent";
import { HsViewComponent } from "./HsViewComponent";

const MainPage = () => {
  const [dsId, setDsId] = useState();
  const [hsId, setHsId] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [keyword, setKeyword] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [selectedMarker, setSelectedMarker] = useState(null);
  // 로드뷰 관련 설정들
  const [isVisible, setIsVisible] = useState(false);
  const mapRef = useRef();
  const roadviewRef = useRef();

  const [buttonValue, setButtonValue] = useState("");
  const [dsList, setDsList] = useState([]);

  const [searchMode, setSearchMode] = useState("drugStore");

  const [center, setCenter] = useState({
    lat: 36.504493,
    lng: 127.264655,
  });
  const [isAtive, setIsAtive] = useState(false);
  const handleInputChange = (event) => {
    // 입력된 값으로 inputValue 상태를 업데이트합니다.
    setInputValue(event.target.value);
  };

  // 검색 버튼이 클릭될 때 호출될 함수입니다.
  const handleSearch = () => {
    // inputValue 상태를 사용하여 keyword 상태를 업데이트합니다.
    setKeyword("%세종시%" + inputValue + "%병원%");
  };
  // const handleButtonSearch = (mode) => {
  //   setSearchMode(mode);
  //
  //   setKeyword(`%세종시%${mode === "drugStore" ? "약국" : "병원"}%`);
  // };

  // 마커 클릭 핸들러
  const handleMarkerClick = (markerId) => {
    // 선택된 마커 ID를 업데이트합니다.
    if (selectedMarker === markerId) {
      // 이미 선택된 마커를 클릭하면 닫습니다.
      setSelectedMarker(null);
    } else {
      // 다른 마커를 클릭하면 선택된 마커로 설정합니다.
      setSelectedMarker(markerId);
    }
  };
  //검색 기능 일때 사용
  const handleListItemClick = (index) => {
    const selected = markers[index];
    // 선택된 마커 정보를 업데이트합니다.
    setSelectedMarker(index);
    // 선택된 마커 위치로 지도 중심을 이동합니다.
    map.setCenter(
      new window.kakao.maps.LatLng(
        selected.position.lat,
        selected.position.lng,
      ),
    );
  };

  // 버튼 기능 일 때 사용
  const handleListItemButton = (index) => {
    const selected = markers[index];
    // 선택된 마커 정보를 업데이트합니다.
    setSelectedMarker(index);
    // 선택된 마커 위치로 지도 중심을 이동합니다.
    map.setCenter(
      new window.kakao.maps.LatLng(
        selected.position.lat,
        selected.position.lng,
      ),
    );
  };

  // 장소 리스트의 표시 상태를 관리하는 상태 변수
  const [isListVisible, setIsListVisible] = useState(false);

  // 장소 리스트를 토글하는 함수
  const toggleListVisibility = () => {
    setIsListVisible(!isListVisible);
  };
  const toggleRoadview = () => {
    const map = mapRef.current;
    if (!map) return;

    // 현재 지도의 중심을 가져옵니다.
    const currentCenter = map.getCenter();

    // isVisible 상태를 업데이트하여 로드뷰를 토글합니다.
    setIsVisible((prevIsVisible) => !prevIsVisible);

    if (!isVisible) {
      // 로드뷰가 활성화되지 않은 상태에서 버튼을 누른 경우

      // 현재 지도의 중심을 로드뷰 마커의 위치로 설정합니다.
      setCenter({
        lat: currentCenter.getLat(),
        lng: currentCenter.getLng(),
      });

      // 지도의 중심을 재설정합니다. (화면이 줄어든 후 적용됩니다.)
      setTimeout(() => map.setCenter(currentCenter), 100);
    }
  };

  useEffect(() => {
    if (!map) return;
    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(
      `"세종시" + ${keyword} + "내과" + "병원"`,
      (data, status, _pagination) => {
        if (status === window.kakao.maps.services.Status.OK) {
          // 특정 키워드(예: "동물")를 포함하는 결과를 필터링합니다.
          const filteredData = data.filter(
            (item) => !item.place_name.includes("%동물%"),
          );
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가합니다
          const bounds = new window.kakao.maps.LatLngBounds();
          let markers = [];

          for (let i = 0; i < filteredData.length; i++) {
            markers.push({
              position: {
                lat: filteredData[i].y,
                lng: filteredData[i].x,
              },
              content: data[i].place_name,
            });
            bounds.extend(
              new window.kakao.maps.LatLng(
                filteredData[i].y,
                filteredData[i].x,
              ),
            );
          }
          setMarkers(markers);

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
          map.setBounds(bounds);
        }
      },
    );
  }, [map, keyword]);
  // 로드뷰 관련 useEffect
  useEffect(() => {
    const map = mapRef.current;
    const roadview = roadviewRef.current;
    if (roadview && map) {
      roadview.relayout();
      map.relayout();
    }
  }, [isVisible, center, mapRef, roadviewRef]);

  function handleItemHsClick(hsId) {
    setIsListVisible(true);
    setHsId(hsId);
  }

  console.log(markers.map((marker) => marker));

  return (
    <Box>
      {/*<div>*/}
      {/*  <Input type="text" onChange={handleInputChange} value={inputValue} />*/}
      {/*  <button onClick={handleSearch}>검색</button>*/}
      {/*</div>*/}
      <Box display="flex" position="relative">
        {/* 토글 버튼 */}
        {/*<button*/}
        {/*  onClick={toggleListVisibility}*/}
        {/*  style={{*/}
        {/*    position: "absolute",*/}
        {/*    left: isListVisible ? "350px" : "0",*/}
        {/*    top: "400px",*/}
        {/*    zIndex: 10,*/}
        {/*    border: "1px solid #ccc", // 테두리 추가*/}
        {/*    backgroundColor: "white", // 배경색 추가*/}
        {/*    padding: "10px", // 패딩 추가*/}
        {/*    cursor: "pointer", // 마우스 오버 시 커서 변경*/}
        {/*    borderRadius: "4px", // 테두리 둥글게 설정*/}
        {/*    boxShadow: "0 2px 5px rgba(0,0,0,0.2)", // 그림자 효과 추가*/}
        {/*    transition: "all 0.5s ease", // 모든 전환 효과에 애니메이션 적용*/}
        {/*  }}*/}
        {/*>*/}
        {/*{isListVisible ? "<" : ">"}*/}
        {/*</button>*/}
        {/* 장소 리스트를 보여주는 컴포넌트 */}
        <VStack
          // width={isListVisible ? "500px" : "0"} // isListVisible 상태에 따라 너비를 조정합니다.
          width="500px"
          height="100vh"
          overflowY="auto"
          transition="width 0.5s"
          p={4}
          borderRight="1px solid #ccc"
          // bg="black"
          // color="white"
        >
          <HsSearchComponent onItemClick={handleItemHsClick} />
          {/*{markers.map((marker, index) => (*/}
          {/*  <Box*/}
          {/*    key={index}*/}
          {/*    p={4}*/}
          {/*    border="1px solid #ddd"*/}
          {/*    borderRadius="md"*/}
          {/*    mb={2}*/}
          {/*    _hover={{ bg: "gray.100" }}*/}
          {/*    cursor="pointer"*/}
          {/*    onClick={() => handleListItemClick(index)}*/}
          {/*  >*/}
          {/*    <Text fontSize="lg">{marker.content}</Text>*/}
          {/*  </Box>*/}
          {/*))}*/}
        </VStack>
        <Box display="flex" position="relative" w="100%">
          {/* 토글 버튼 */}
          <button
            onClick={toggleListVisibility}
            style={{
              position: "absolute",
              left: isListVisible ? "500px" : "0",
              top: "400px",
              zIndex: 10,
              border: "1px solid #ccc", // 테두리 추가
              backgroundColor: "white", // 배경색 추가
              padding: "10px", // 패딩 추가
              cursor: "pointer", // 마우스 오버 시 커서 변경
              borderRadius: "4px", // 테두리 둥글게 설정
              boxShadow: "0 2px 5px rgba(0,0,0,0.2)", // 그림자 효과 추가
              transition: "all 0.5s ease", // 모든 전환 효과에 애니메이션 적용
            }}
          >
            {isListVisible ? "<" : ">"}
          </button>

          {/* 장소 리스트를 보여주는 컴포넌트 */}
          {hsId && (
            <Box
              width={isListVisible ? "500px" : "0"} // isListVisible 상태에 따라 너비를 조정합니다.
              height="100vh"
              overflowY="auto"
              transition="all 1s ease"
              p={4}
              borderRight="1px solid #ccc"
              bg="white"
              zIndex={9}
              display={isListVisible ? "block" : "none"}
            >
              <HsViewComponent hsId={hsId} />
            </Box>
          )}
          <div
            style={{
              display: "flex",
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          >
            <Map // 지도 표시
              center={center}
              style={{
                // 지도의 크기
                width: !isVisible ? "100%" : "50%",
                height: "100%",
              }}
              level={4}
              ref={mapRef}
              onCreate={setMap}
            >
              {isAtive && (
                <>
                  <MapTypeId type={window.kakao.maps.MapTypeId.ROADVIEW} />
                  <MapMarker
                    position={center}
                    draggable={true}
                    onDragEnd={(marker) => {
                      setCenter({
                        lat: marker.getPosition().getLat(),
                        lng: marker.getPosition().getLng(),
                      });
                    }}
                    image={{
                      src: "https://t1.daumcdn.net/localimg/localimages/07/2018/pc/roadview_minimap_wk_2018.png",
                      size: { width: 26, height: 46 },
                      options: {
                        spriteSize: { width: 1666, height: 168 },
                        spriteOrigin: { x: 705, y: 114 },
                        offset: { x: 13, y: 46 },
                      },
                    }}
                  />
                </>
              )}
              {markers.map((marker, index) => (
                <MapMarker
                  key={`${marker.position}-${index}`}
                  position={marker.position}
                  clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
                  onClick={() => handleMarkerClick(index)}
                >
                  {selectedMarker === index && (
                    <div style={{ minWidth: "150px" }}>
                      <img
                        alt="close"
                        width="14"
                        height="13"
                        src="https://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif"
                        style={{
                          position: "absolute",
                          right: "5px",
                          top: "5px",
                          cursor: "pointer",
                        }}
                        onClick={(event) => {
                          // 버블링을 방지하여 맵 마커의 onClick이 호출되지 않도록 합니다.
                          event.stopPropagation();
                          // 선택된 마커를 null로 설정하여 인포윈도우를 닫습니다.
                          setSelectedMarker(null);
                        }}
                      />
                      {/*TODO : 리스트 정보들을 content에 이식해서 넘기기*/}
                      <div style={{ padding: "5px", color: "#000" }}>
                        {marker.content}
                      </div>
                    </div>
                  )}
                </MapMarker>
              ))}
            </Map>

            <div
              id="roadviewControl"
              className={isAtive ? "active" : ""}
              onClick={() => {
                setIsVisible(true);
                setIsAtive(!isAtive);
                toggleRoadview();
              }}
            >
              <span className="img"></span>
            </div>
            <div
              style={{
                position: "relative",
                width: isVisible ? "50%" : "0",
                overflow: "hidden",
              }}
            >
              <Roadview // 로드뷰를 표시할 Container
                position={{ ...center, radius: 50 }}
                style={{
                  // 지도의 크기
                  width: "100%",
                  height: "600px",
                }}
                onPositionChanged={(rv) => {
                  setCenter({
                    lat: rv.getPosition().getLat(),
                    lng: rv.getPosition().getLng(),
                  });
                }}
                onPanoidChange={() => {
                  isAtive && setIsVisible(true);
                }}
                onErrorGetNearestPanoId={() => {
                  setIsVisible(false);
                }}
                ref={roadviewRef}
              >
                <div
                  id="close"
                  title="로드뷰닫기"
                  onClick={() => setIsVisible(false)}
                >
                  <span className="img"></span>
                </div>
              </Roadview>
            </div>
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default MainPage;
