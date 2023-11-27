import React, {useEffect, useState} from "react";
import {Box, Button, Flex, Heading, Spacer, Table, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import axios from "axios";
import {Map, MapMarker, useKakaoLoader, ZoomControl} from "react-kakao-maps-sdk";
import {useNavigate} from "react-router-dom";

export function Hs() {

    const [list, setList] = useState(null);
    const [position, setPosition] = useState();
    const navigate = useNavigate();

    const [level, setLevel] = useState();
    useEffect(() => {
        axios.get("/api/hospital/list?category=hospital").then(r => setList(r.data));
    }, []);

    const [loading, error] = useKakaoLoader({
        appkey: process.env.REACT_APP_KAKAO_KEY,
    });


    return (
        <Box>
            <Box>
                <Flex align="center">
                    <Heading>병원 리스트</Heading>
                    <Spacer/>
                    <Button onClick={() => navigate("/hospitalAdd")}>병원 추가</Button>
                </Flex>

                <Box>
                    <Table>
                        <Thead>

                            <Tr>
                                <Th>병원이름</Th>
                                <Th>전화번호</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {list &&
                                list.map((h) => (
                                    <Tr key={h.id} _hover={{
                                        cursor: "pointer"
                                    }} onClick={() => navigate("/hospitalEdit/" + h.id)}>
                                        <Td>{h.name}</Td>
                                        <Td>{h.phone}</Td>
                                    </Tr>
                                ))}
                        </Tbody>
                    </Table>
                </Box>
            </Box>

            <Box>{list && list.map(m => (

                <Map key={m.id} center={{lat: 36.503232, lng: 127.269971}} style={{width: "100%", height: "900px"}}
                     level={5}
                     onZoomChanged={(m) => setLevel(m.getLevel())}
                     onDragEnd={m => setPosition({
                         lat: m.getCenter().getLat(),
                         lng: m.getCenter().getLng()
                     })}>
                    <MapMarker position={{lat: m.lat, lng: m.lng}}/>
                    <ZoomControl/>
                </Map>))}

            </Box>
        </Box>
    );
}