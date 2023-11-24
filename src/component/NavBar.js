import {Box, Button} from "@chakra-ui/react";
import {faHospital} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router-dom";
import {Map, MapMarker} from "react-kakao-maps-sdk";

export function NavBar() {
    const navigate = useNavigate();

    return (
        <Box>
            <Button onClick={() => navigate("/")}>
                <FontAwesomeIcon icon={faHospital}/>
            </Button>
            <Button onClick={() => navigate("map")}>
                병원
            </Button>
            <Map center={{lat: 36.503232, lng: 127.269971}} style={{width: "100%", height: "900px"}} level={5}>
                <MapMarker position={{lat: 36.503232, lng: 127.269971}}/>
            </Map>
        </Box>
    );
}