import {Map, MapMarker, useKakaoLoader, ZoomControl} from "react-kakao-maps-sdk";
import React, {useContext, useState} from "react";
import {KakaoMapAppContext} from "../App";

export function Hs() {
    const key = useContext(KakaoMapAppContext);

    const [position, setPosition] = useState();

    const [level, setLevel] = useState();
    const [loading, error] = useKakaoLoader({
        appkey: key,
    });
    console.log(level);
    return (
        <Map center={{lat: 36.503232, lng: 127.269971}} style={{width: "100%", height: "900px"}} level={5}
             onZoomChanged={(m) => setLevel(m.getLevel())}
             onDragEnd={m => setPosition({
                 lat: m.getCenter().getLat(),
                 lng: m.getCenter().getLng()
             })}>
            <MapMarker position={{lat: 36.503232, lng: 127.269971}}/>
            <ZoomControl/>
        </Map>
    );
}