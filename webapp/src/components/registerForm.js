import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import styled from "styled-components";
import Logo from "../image/logo.svg";
import {
  Input,
  FormControl,
  FormLabel,
  Text,
  Button,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import {
  signinUser,
  idCheck,
  useStateUser,
  useDispatchUser,
} from "contextAPI/user";

const Wrapper = styled.div`
  width: 50%;
  min-width: 410px;
  height: 100%;
  margin: 0 auto;
  background-color: white;
  margin-bottom: 100px;
`;

const FormWrapper = styled.div`
  width: 70%;
  margin: 0 auto;
`;

const Title = styled.div`
  text-align: center;
  height: 50px;
  line-height: 50px;
  font-size: 25px;
`;

export default function RegisterForm() {
  const userInfoState = useStateUser();
  const userInfoDispatch = useDispatchUser();

  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordCheck, setUserPasswordCheck] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userAddress, setUserAddress] = useState("");

  const history = useHistory();

  const handleIdCheck = () => {
    idCheck(userInfoDispatch, userId);
  };

  useEffect(() => {
    console.log("idchek", userInfoState.idCheck)
    if(userInfoState.idCheckLoading){
      if(userInfoState.idCheck === true){
        alert("사용가능합니다.");
      } else {
        alert("다른 아이디를 사용해주세요");
      }
    }
  }, [userInfoState.idCheck])

  const handleSubmit = () => {
    // if(userName === ""){
    // 	alert("name 입력");
    // 	return null;
    // }
    // if(userId === ""){
    // 	alert("Id 입력");
    // 	return null;
    // }
    // if(userPassword === ""){
    // 	alert("password 입력");
    // 	return null;
    // }
    // if(userPasswordCheck === ""){
    // 	alert("password check 입력");
    // 	return null;
    // }
    // if(userPhone=== ""){
    // 	alert("Phone 입력");
    // 	return null;
    // }
    // if(userAddress === ""){
    // 	alert("address 입력");
    // 	return null;
    // }
    // if(userEmail === ""){
    // 	alert("email 입력");
    // 	return null;
    // }
    if(!!userInfoState.idCheck === false){
      alert("아이디 중복을 확인해주세요");
      return null;
    }
    const userInfo = {
      user_id: userId,
      password: userPassword,
      address: userAddress,
      phone_number: userPhone,
      persnal_basic_agree: false,
      persnal_share_agree: false,
      email: userEmail,
      sms_agree: false,
      email_agree: false,
      name: userName,
    };
    if (userInfoState.idCheck) {
      signinUser(userInfoDispatch, userInfo)
      .then((result) => {
        if(result.status){
          alert("회원가입 축하드립니다.")
          history.push("/")
        }
      });
    }
  };

  // console.log("??", userId)

  return (
    <>
      <Wrapper>
        <img
          width="200px"
          height="100px"
          style={{ margin: "0 auto 20px auto", paddingTop: "10px" }}
          src={Logo}
          alt="logoImage"
        />
        <Title>
          <Text>회원가입</Text>
        </Title>
        <FormWrapper>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              className={"input-margin-bottom"}
              placeholder={"name"}
              onChange={(e) => setUserName(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>ID</FormLabel>
            <InputGroup>
              <Input
                className={"input-margin-bottom"}
                placeholder={"id"}
                onChange={(e) => setUserId(e.target.value)}
              />
              <Button onClick={() => handleIdCheck()}>중복확인</Button>
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              className={"input-margin-bottom"}
              placeholder={"password"}
              type={"password"}
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password check</FormLabel>
            <Input
              className={"input-margin-bottom"}
              placeholder={"password check"}
              type={"password"}
              onChange={(e) => setUserPasswordCheck(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Phone</FormLabel>
            <Input
              className={"input-margin-bottom"}
              placeholder={"phone"}
              onChange={(e) => setUserPhone(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Address</FormLabel>
            <Input
              className={"input-margin-bottom"}
              placeholder={"Address"}
              onChange={(e) => setUserAddress(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>E-mail</FormLabel>
            <Input
              className={"input-margin-bottom"}
              placeholder={"e-mail"}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </FormControl>
          <Button onClick={handleSubmit}>가입</Button>
        </FormWrapper>
      </Wrapper>
    </>
  );
}
