import {Map, MapMarker, useKakaoLoader} from "react-kakao-maps-sdk";
import React from "react";

export function Hs() {
    const [loading, error] = useKakaoLoader({
        appkey: "570e471a3abddb0c3503c5a0bc9a4031",
        
    });
    return (
        <Map center={{lat: 36.503232, lng: 127.269971}} style={{width: "100%", height: "900px"}} level={5}>
            <MapMarker position={{lat: 36.503232, lng: 127.269971}}/>
        </Map>
    );
}