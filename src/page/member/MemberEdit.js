import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LoginContext } from "../../component/LoginProvider";
//TODO 수정 조건 추가하기
function MemberEdit(props) {
  const [member, setMember] = useState(null);
  const [nickName, setNickName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState();
  const [profile, setProfile] = useState();
  const [previewProfile, setPreviewProfile] = useState(null);

  const [params] = useSearchParams();
  const toast = useToast();
  const navigate = useNavigate();
  const profileInput = useRef(null);

  const { login, authCheck, isAuthenticated, hasAccess } =
    useContext(LoginContext);

  useEffect(() => {
    if (
      authCheck() !== "admin" &&
      !isAuthenticated() &&
      !hasAccess(params.get("id"))
    ) {
      navigate("/");
    }

    axios.get("/api/member/info?" + params.toString()).then(({ data }) => {
      setMember(data);
      setNickName(data.nickName);
      setPhone(data.phone);
      setBirthday(data.birthday);
      setAddress(data.address);
    });
  }, []);

  if (member === null) {
    return <Spinner />;
  }

  function handleEditClick() {
    axios
      .putForm("/api/member/edit", {
        id: member.id,
        nickName,
        phone,
        birthday,
        address,
        profileFile: profile,
      })
      .then(() => {
        toast({
          description: "회원 정보가 수정되었습니다.",
          status: "success",
        });
        navigate("/home/member/view?id=" + member.id);
        //     TODO: 회원 정보 수정 navigate 다시 지정해주기
      })
      .catch((error) => {
        toast({
          description: "수정 실패",
        });
      });
  }

  function handleProfileChange(e) {
    if (e.target.files[0]) {
      setProfile(e.target.files[0]);
    }

    // 화면에 프로필사진 표시..
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreviewProfile(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  function handleFileSwitch(e) {
    if (e.target.checked) {
      // fileSwitch 에 추가
      setFileSwitch([...fileSwitch, e.target.value]);
    } else {
      // fileSwitch 에서 삭제
      setFileSwitch(fileSwitch.filter((item) => item !== e.target.value));
    }
  }

  return (
    <Center>
      <Card>
        <CardHeader>
          <Heading>{member.id}님 정보 수정</Heading>
        </CardHeader>
        <CardBody>
          <FormControl>
            <FormLabel>nickName</FormLabel>
            <Input
              defaultValue={member.nickName}
              onChange={(e) => setNickName(e.target.value)}
            />
          </FormControl>
          <Avatar
            src={previewProfile || login.profile}
            style={{ margin: "20px", width: "16rem", height: "16rem" }}
            onClick={() => profileInput.current.click()}
          >
            <input
              type="file"
              style={{ display: "none" }}
              accept="image/*"
              name="profile_img"
              onChange={handleProfileChange}
              ref={profileInput}
            />
          </Avatar>
          <FormControl>
            <FormLabel>phone</FormLabel>
            <Input
              defaultValue={member.phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>birthday</FormLabel>
            <Input
              defaultValue={member.birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>address</FormLabel>
            <Input
              defaultValue={member.address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </FormControl>
        </CardBody>
        <CardFooter>
          <Flex>
            <Button onClick={handleEditClick}>확인</Button>
            <Button>취소</Button>
          </Flex>
        </CardFooter>
      </Card>
    </Center>
  );
}

export default MemberEdit;
