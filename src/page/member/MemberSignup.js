import React, {useState} from 'react';
import {
    Button,
    Card,
    CardBody, CardFooter,
    CardHeader,
    Center,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input, Select, useToast
} from "@chakra-ui/react";
import axios from "axios";

function MemberSignup(props) {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [nickName, setNickName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [auth, setAuth] = useState("user");

    const [idAvailable, setIdAvailable] = useState(false);
    const [nickNameAvailable, setNickNameAvailable] = useState(false);
    const [emailAvailable, setEmailAvailable] = useState(false);

    const toast = useToast();

    let submitAvailable = true;

    if (!idAvailable) {
        submitAvailable = false;
    }
    if (!nickNameAvailable) {
        submitAvailable = false;
    }
    if (phone.length === 0) {
        submitAvailable = false;
    }
    if (!emailAvailable) {
        submitAvailable = false;
    }
    if (address.length === 0) {
        submitAvailable = false;
    }
    if (password !== passwordCheck) {
        submitAvailable = false;
    }
    if (password.length === 0) {
        submitAvailable = false;
    }

    function handleIdCheck() {
        const params = new URLSearchParams();
        params.set("id", id);

        axios.get("/api/member/check?" + params)
            .then(() => {
                setIdAvailable(false);
                toast({
                    description: "이미 사용중인 ID 입니다.",
                    status: "warning",
                });
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    setIdAvailable(true);
                    toast({
                        description: "사용 가능한 ID 입니다.",
                        status: "success"
                    })
                }
            });
    }

    function handleNickNameCheck() {
        const params = new URLSearchParams();
        params.set("nickName", nickName);

        axios.get("/api/member/check?" + params)
            .then(() => {
                setNickNameAvailable(false);
                toast({
                    description: "이미 사용중인 nickName 입니다.",
                    status: "warning",
                });
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    setNickNameAvailable(true);
                    toast({
                        description: "사용 가능한 nickName 입니다.",
                        status: "success"
                    })
                }
            });
    }

    function handleEmailCheck() {
        const params = new URLSearchParams();
        params.set("email", email);

        axios.get("/api/member/check?" + params)
            .then(() => {
                setEmailAvailable(false);
                toast({
                    description: "이미 사용중인 Email 입니다.",
                    status: "warning",
                });
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    setEmailAvailable(true);
                    toast({
                        description: "사용 가능한 Email 입니다.",
                        status: "success"
                    })
                }
            });
    }

    function handleSubmit() {
        axios
            .post("/api/member/signup", {
                id,
                password,
                nickName,
                phone,
                email,
                address,
                auth
            })
            .then(() => {
                toast({
                    description: "회원가입이 완료되엇습니다.",
                    status: "success"
                });
                // TODO: navigate
            })
            .catch(error => {
                if (error.response.status === 400) {
                    toast({
                        description: "입력값을 확인해 주세요",
                        status: "error"
                    });
                } else {
                    toast({
                        description: "가입 실패",
                        status: "error"
                    });
                }
            });
    }

    return (
        <Center>
            <Card>
                <CardHeader>
                    <Heading>회원가입</Heading>
                </CardHeader>
                <CardBody>
                    <FormControl isInvalid={!idAvailable} mb={5}>
                        <FormLabel>id</FormLabel>
                        <Flex>
                            <Input
                                value={id}
                                onChange={e=> setId(e.target.value)} />
                            <Button onClick={handleIdCheck}>중복 확인</Button>
                        </Flex>
                    </FormControl>

                    <FormControl
                        isInvalid={!(password === passwordCheck) || (password.length===0)}
                        mb={5}>
                        <FormLabel>password</FormLabel>
                        <Flex>
                            <Input
                                type={password}
                                value={password}
                                onChange={e=> setPassword(e.target.value)} />
                        </Flex>
                    </FormControl>
                    <FormControl
                        isInvalid={!(password === passwordCheck) || (passwordCheck.length===0)}
                        mb={5}>
                        <FormLabel>passwordCheck</FormLabel>
                        <Flex>
                            <Input
                                type={password}
                                value={passwordCheck}
                                onChange={e=> setPasswordCheck(e.target.value)} />
                        </Flex>
                    </FormControl>

                    <FormControl isInvalid={!nickNameAvailable} mb={5}>
                        <FormLabel>nickName</FormLabel>
                        <Flex>
                            <Input
                                value={nickName}
                                onChange={e=> setNickName(e.target.value)} />
                            <Button onClick={handleNickNameCheck}>중복 확인</Button>
                        </Flex>
                    </FormControl>

                    <FormControl isInvalid={phone.length===0}>
                        <FormLabel>phone</FormLabel>
                        <Flex>
                            <Input
                                value={phone}
                                onChange={e=> setPhone(e.target.value)} />
                        </Flex>
                    </FormControl>

                    <FormControl isInvalid={!emailAvailable} mb={5}>
                        <FormLabel>email</FormLabel>
                        <Flex>
                            <Input
                                value={email}
                                onChange={e=> setEmail(e.target.value)} />
                            <Button onClick={handleEmailCheck}>중복 확인</Button>
                        </Flex>
                    </FormControl>

                    <FormControl isInvalid={address.length===0}>
                        <FormLabel>address</FormLabel>
                        <Flex>
                            <Input
                                value={address}
                                onChange={e=> setAddress(e.target.value)} />
                        </Flex>
                    </FormControl>
                    <FormControl>
                        <FormLabel>가입 유형</FormLabel>
                        <Select defaultValue={"user"}
                        onChange={e => setAuth(e.target.value)}>
                            <option value={"user"}>유저</option>
                            <option value={"admin"}>관리자</option>
                            <option value={"ds"}>약국</option>
                            <option value={"hs"}>병원</option>
                        </Select>
                    </FormControl>
                </CardBody>

                <CardFooter>
                    <Button
                        isDisabled={!submitAvailable}
                        onClick={handleSubmit}
                        colorScheme={"blue"}
                    >
                        가입
                    </Button>
                </CardFooter>
            </Card>
        </Center>
    );
}

export default MemberSignup;