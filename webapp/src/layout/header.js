import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  ButtonGroup,
  useDisclosure,
} from "@chakra-ui/react";
import { SearchIcon, EditIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Logo from "../image/logo.svg";
import { LoginModalComponent } from "../components/modal";
import { useStateUser, useDispatchUser, logout } from "contextAPI/user";
import "./header.scss";
import { DropDownMenu } from 'components/dropDownMenu';

export default function Header() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const userState = useStateUser();
  const userDispatch = useDispatchUser();
  const [openMenu, setOpenMenu] = useState(false);

  const loginDropdownList = [
    {
      link: "/series",
      text: "시리즈"
    },
    {
      link: "/register",
      text: "가입하기"
    },
    {
      link: "/login",
      text: "로그인"
    }
  ]

  const logoutDropdownList = [
    {
      link: "/series",
      text: "시리즈"
    },
    {
      link: "/upload",
      text: "만화 업로드"
    },
    {
      link: "/lecture",
      text: "내 작품"
    },
    {
      link: "/logout",
      text: "로그아웃"
    }
  ]

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu)
  }

  const handleLogout = () => {
    logout(userDispatch);
  }

  return (
    <div>
      <div className="HeaderLayout">
        <div className="HeaderStart">
          <NavLink to="/">
            <img
              width="170px"
              height="85px"
              style={{ display: "inline-block" }}
              src={Logo}
              alt="logoImage"
            />
          </NavLink>
        </div>
        <div className="HeaderEnd">
          <ButtonGroup>
            <NavLink to={"/series"}>
              <Button
                style={{
                  backgroundColor: "#f2663b",
                  color: "white",
                  height: "33px",
                  marginTop: "4px",
                }}
              >
                시리즈
              </Button>
            </NavLink>
            {userState.entity.user_id ? (
              <>
                <NavLink to={"/upload"}>
                  <Button>
                    만화 업로드
                    <EditIcon style={{ marginLeft: "4px" }} />
                  </Button>
                </NavLink>
                <NavLink to={"/lecture"}>
                  <Button>내 작품</Button>
                </NavLink>
                <Button onClick={handleLogout}>로그아웃</Button>
              </>
            ) : (
              <>
                <NavLink to={"/register"}>
                  <Button>가입하기</Button>
                </NavLink>
                <Button onClick={onOpen}>로그인</Button>
              </>
            )}
          </ButtonGroup>
          <InputGroup className={"input-group"}>
            <Input
              style={{ marginLeft: "15px", height: "36px", marginTop: "2px" }}
              size="md"
              placeholder="search"
            />
            <InputRightElement
              children={<SearchIcon style={{ color: "#f74d1a" }} />}
            />
          </InputGroup>
        </div>
        <div className={"mobile-header-end"}>
          {
            openMenu ? <CloseIcon fontSize={"30"} style={{marginRight: "0.5rem"}} onClick={handleOpenMenu}/> 
            : <HamburgerIcon fontSize={"50"} onClick={handleOpenMenu}/>
          }
          <DropDownMenu 
            openValue={openMenu}
            menuList={userState.entity.user_id ? logoutDropdownList : loginDropdownList}
            logoutFunction={handleLogout}
          />
        </div>
      </div>
      <LoginModalComponent title={"로그인"} isOpen={isOpen} onClose={onClose} />
    </div>
  );
}
