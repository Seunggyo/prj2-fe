import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Box, Button, Spinner, Table, Tbody, Td, Th, Thead, Tr, useToast} from "@chakra-ui/react";
import {LoginContext} from "../../component/LoginProvider";

export function MemberJoinList() {
    const [memberList, setMemberList] = useState(null);

    const toast = useToast();
    const navigate = useNavigate();
    const {authCheck} = useContext(LoginContext)

    useEffect(() => {
        if (authCheck() !== "admin") {
            navigate("/")
        }

        axios.get("/api/member/joinList")
            .then(({data})=> {
                setMemberList(data);
            })
    }, []);


    if (memberList === null) {
        return <Spinner />
    }

    function handleAcceptClick(member) {
        axios
            .post("/api/member/accept", {
                id : member.id,
                password : member.password,
                nickName : member.nickName,
                birthday : "",
                phone: member.phone,
                email : member.email,
                address : member.address,
                auth : member.auth,
                fileName : member.fileName
            })
            .then(() => {
                toast({
                    position: "top",
                    description: "가입이 승인되었습니다.",
                    status: "success",
                });
            })
            .catch(() => {
                toast({
                    position: "top",
                    description: "오류가 발생했습니다.",
                    status: "error",
                });
            })
    }

    function handleCancelClick(member) {
        axios.post("/api/member/cancel", {
            id: member.id
        })
            .then(() => {
                toast({
                    position: "top",
                    description: "가입이 거절되었습니다.",
                    status: "success",
                })
            })
            .catch(() => {
                toast({
                    position: "top",
                    description: "오류가 발생했습니다.",
                    status: "error",
                });
            })
    }

    return (
        <Box>
            <h1>가입 대기 목록</h1>
            {/*<MemberSearchComp />*/}
            <Table>
                <Thead>
                    <Tr>
                        <Th>id</Th>
                        <Th>password</Th>
                        <Th>nickName</Th>
                        <Th>phone</Th>
                        <Th>email</Th>
                        <Th>auth</Th>
                        <Th>inserted</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {memberList.map((member) => (
                        <Tr key={member.id}>
                            <Td>{member.id}</Td>
                            <Td>{member.password}</Td>
                            <Td>{member.nickName}</Td>
                            <Td>{member.phone}</Td>
                            <Td>{member.email}</Td>
                            <Td>{member.auth}</Td>
                            <Td>{member.inserted}</Td>
                            <Td><Button onClick={()=> handleAcceptClick(member)}>수락</Button></Td>
                            <Td><Button onClick={() => handleCancelClick(member)}>거절</Button></Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
}