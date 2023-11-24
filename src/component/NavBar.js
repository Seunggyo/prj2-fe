import {Button, Flex} from "@chakra-ui/react";
import {faHospital} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router-dom";

export function NavBar() {
    const navigate = useNavigate();

    return (
        <Flex direction="column" align="start">
            <Button onClick={() => navigate("/")}>
                <FontAwesomeIcon icon={faHospital}/>
            </Button>
            <Button onClick={() => navigate("hospital")}>
                병원
            </Button>
            <Button onClick={() => navigate("nutraceutical")}>
                영양제
            </Button>

        </Flex>
    );
}