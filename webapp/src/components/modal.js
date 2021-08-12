import React, {useState} from 'react';
import { useStateUser, useDispatchUser, loginCheck } from 'contextAPI/user';
import {Modal, ModalOverlay, ModalContent, ModalBody, ModalHeader, ModalCloseButton, Text, ModalFooter, Button, Input} from '@chakra-ui/react';

export const LoginModalComponent = ({isOpen, onClose, title}) => {

  const userState = useStateUser();
  const userDispatch = useDispatchUser();

  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleLogin = () => {
    loginCheck(userDispatch, userId, userPassword)
    .then((result) => {
      console.log("status", result)
      if(result.status){
        onClose();
      } else{
        alert("아이디 비밀번호 안맞음");
      }
    })
    // if(userState.login){
    //   onClose();
    // } else {
    //   alert("아이디 비밀번호 안맞음");
    // }
  }


  return (
    <>
      <Modal blockScrollOnMount={false} size={"sm"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader style={{textAlign: "center"}}>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
						<Text>username</Text>
						<Input 
              style={{marginBottom: "10px"}} 
              placeholder="아이디" 
              onChange={(e) => setUserId(e.target.value)}
            />
						<Text>password</Text>
						<Input 
              style={{marginBottom: "10px"}} 
              placeholder="비밀번호"
              type={"password"}
              onChange={(e) => setUserPassword(e.target.value)}
            />
            {/* <Lorem count={2} /> */}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => handleLogin()}>
              login
            </Button>
            {/* <Button variant="ghost">Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}