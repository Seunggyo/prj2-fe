import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Box, Button, Center, FormControl, FormLabel, Input, useToast} from "@chakra-ui/react";
import axios from "axios";

function MemberLogin(props) {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const toast = useToast();

    function handleLogin() {
        axios
            .post("/api/member/login", {id, password})
            .then(() => {
                toast({
                    description: "로그인 되었습니다.",
                    status: "success",
                });
            })
            .catch(() => {
                toast({
                    description: "아이디와 암호를 확인해 주세요.",
                    status: "warning",
                });
            });
    }

    return (
        <Box>
            <FormControl>
                <FormLabel>ID</FormLabel>
                <Input value={id} onChange={e => setId(e.target.value)} />
            </FormControl>
            <FormControl>
                <FormLabel>PASSWORD</FormLabel>
                <Input value={password} onChange={e => setPassword(e.target.value)} />
            </FormControl>
            <Button onClick={handleLogin}>
                로그인
            </Button>
        </Box>
    );
}

export default MemberLogin;