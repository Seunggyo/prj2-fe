import {Box, Button, FormControl, FormLabel, Input} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export function MemberFindId() {
    const [email, setEmail] = useState("");
    const [id, setId] = useState("");
    const [text, setText] = useState("");

    const navigate = useNavigate();

    function handleButtonClick() {
        axios.post("/api/member/findId", {email})
            .then(({data}) => {
                if (data === "") {
                    setText("이메일 확인 요망");
                } else {
                    !(email === "") && setId(data)
                }
            });
    }

    return <Box>
        <h1>아이디 찾기</h1>
        <FormControl>
            <FormLabel>email 을 입력하세요</FormLabel>
            <Input onChange={e => setEmail(e.target.value)}/>
            <Button onClick={handleButtonClick}>입력</Button>
        </FormControl>

        {text !== "" && (<Box>{text}</Box>)}

        {id && (
            <FormControl>
                <FormLabel>ID</FormLabel>
                <Input value={id} readOnly />
                <Button onClick={()=> navigate("/member/login")}>로그인 하러 가기</Button>
            </FormControl>
        )}
    </Box>;
}