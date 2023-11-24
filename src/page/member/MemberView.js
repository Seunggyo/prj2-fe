import React, {useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";
import axios from "axios";
import {Box, Card, CardBody, CardHeader, Center, Heading} from "@chakra-ui/react";

function MemberView(props) {
    const [member, setMember] = useState(null);
    const [params] = useSearchParams();

    useEffect(() => {
        axios
            .get("/api/member/view?" + params.toString())
            .then(({data}) => setMember(data))
    }, []);

    return (
        <Center>
            <Card>
                <CardHeader>
                    <Heading>{member.id}</Heading>
                </CardHeader>
                <CardBody>
                    <Box>nickName : {member.nickName}</Box>
                    <Box>phone : {member.phone}</Box>
                    <Box>email : {member.email}</Box>
                    <Box>address : {member.address}</Box>
                    // TODO auth user 제외 표시
                    <Box>inserted : {member.inserted}</Box>
                </CardBody>
            </Card>
        </Center>
    );
}

export default MemberView;