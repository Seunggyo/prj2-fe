import {Box, Button, Flex, FormControl, FormLabel, Input, Select, Switch, Textarea} from "@chakra-ui/react";
import {useState} from "react";

export function DrugStoreWrite() {

  const [name, setName] = useState("");
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [openHour, setOpenHour] = useState(1)
  const [openMin, setOpenMin] = useState(1)
  const [closeHour, setCloseHour] = useState(1)
  const [closeMin, setCloseMin] = useState(1)
  const [nightCare, setNightCare] = useState(null)
  const [content, setContent] = useState("")

  function handleCheckNight() {

  }

  return (
    <Box>
      <h1>약국 정보 기입</h1>
      <Box>
        <FormControl>
          <FormLabel>이름</FormLabel>
          <Input value={name} onChange={e => setName(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>주소</FormLabel>
          <Input value={address} onChange={e => setAddress(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>번호</FormLabel>
          <Input value={phone} onChange={e => setPhone(e.target.value)} />
        </FormControl>
        <FormControl>
          <Box>
            <FormLabel>오픈 시간</FormLabel>
            <Flex>
              <Box>
                <Select defaultValue='7'
                        onChange={e => setOpenHour(e.target.value)}>
                  <option value='7'>7시</option>
                  <option value='8'>8시</option>
                  <option value='9'>9시</option>
                  <option value='10'>10시</option>
                  <option value='11'>11시</option>
                  <option value='12'>12시</option>
                </Select>
                <Select defaultValue='7'
                        onChange={e => setOpenMin(e.target.value)}>
                  <option value='00'>0분</option>
                  <option value='10'>10분</option>
                  <option value='20'>20분</option>
                  <option value='30'>30분</option>
                  <option value='40'>40분</option>
                  <option value='50'>50분</option>
                </Select>
              </Box>
            </Flex>
          </Box>

        </FormControl>
        <FormControl>
          <FormLabel>마감 시간</FormLabel>
          <Flex>
            <Select defaultValue='6'
                    onChange={e => setCloseHour(e.target.value)}>
              <option value='16'>16시</option>
              <option value='17'>17시</option>
              <option value='18'>18시</option>
              <option value='19'>19시</option>
              <option value='20'>20시</option>
            </Select>
            <Select defaultValue='00'
                    onChange={e => setCloseMin(e.target.value)}>
              <option value='00'>0분</option>
              <option value='10'>10분</option>
              <option value='20'>20분</option>
              <option value='30'>30분</option>
              <option value='40'>40분</option>
              <option value='50'>50분</option>
            </Select>
          </Flex>
          <FormLabel>야간 업무 진행시 체크 해주세요</FormLabel>
          <Flex>
            <Switch onClick={handleCheckNight}/>
            {/*TODO : onclick 시 인풋 창이 뜨겠금 코드 작성해야함*/}
            <Input placeholder="업무 마감 시간을 입력해주세요"  value={nightCare} onChange={e => setNightCare(e.target.value)} />
          </Flex>
        </FormControl>
        <FormControl>
          <FormLabel>약국 소개</FormLabel>
          <Textarea value={content} placeholder="300글자 이내로 작성해주세요" onChange={e => setContent(e.target.value)}/>
        </FormControl>
      </Box>
      <Button colorScheme="blue" marginX="5px">작성</Button>
      <Button colorScheme="red">취소</Button>
    </Box>
  );
}

export default DrugStoreWrite;