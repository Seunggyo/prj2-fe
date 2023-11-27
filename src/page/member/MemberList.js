import React, {useEffect, useState} from 'react';
import {Box, Spinner, Table, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function MemberList(props) {
    const [memberList, setMemberList] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("/api/member/list")
            .then(({data})=> {
                setMemberList(data);
            })
    }, []);


    if (memberList === null) {
        return <Spinner />
    }

    function handleMemberClick(id) {
        const params = new URLSearchParams;
        params.set("id", id);

        navigate("/member/view?" + params);
    }

    return (
        <Box>
            <h1>memberList</h1>
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
                    <Tr key={member.id}
                    onClick={()=> handleMemberClick(member.id)}>
                        <Td>{member.id}</Td>
                        <Td>{member.password}</Td>
                        <Td>{member.nickName}</Td>
                        <Td>{member.phone}</Td>
                        <Td>{member.email}</Td>
                        <Td>{member.auth}</Td>
                        <Td>{member.inserted}</Td>
                    </Tr>
                ))}
                </Tbody>
            </Table>
        </Box>
    );
}

export default MemberList;