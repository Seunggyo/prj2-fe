import {Box, Heading, Table, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";

export function BusinessList() {
    const [list, setList] = useState([]);
    const navigate = useNavigate();
    const {id} = useParams();
    const [params] = useSearchParams();
    useEffect(() => {
        axios.get("/api/hospital/reservation/list?" + params)
            .then(e => setList(e.data))
    }, []);

    return (
        <Box>
            <Heading>예약 내역을 확인하실 병원을 선택해주세요</Heading>

            <Table>
                <Thead>
                    <Tr>
                        <Th>병원 이름</Th>
                    </Tr>
                </Thead>

                <Tbody>
                    {list && list !== null ? (
                        list.map(l => (
                            <Tr id={l.id} _hover={{
                                cursor: "pointer"
                            }}
                                onClick={() => navigate("/hospital/businessCheck/" + l.id)}>
                                <Td>{l.name}</Td>
                            </Tr>
                        ))
                    ) : (<Tr>
                        <Td>병원정보가 없습니다.</Td>
                    </Tr>)}
                </Tbody>
            </Table>
        </Box>
    );
}