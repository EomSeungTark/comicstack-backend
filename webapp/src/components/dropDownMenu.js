import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LoginModalComponent } from "../components/modal";
import { useDisclosure } from "@chakra-ui/react";

const Wrapper = styled.div`
	width: 8rem;
	height: auto;
	background-color: white;
	position: absolute;
	z-index: 1000;
	top: 8%;
	right: 2.5%;
	border-radius: 0.3rem;
	box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
	.menu {
		width: 100%;
		height: 2rem;
		line-height: 2rem;
		margin: 0.5rem auto;
		font-weight: bold;
		background-color: white;
		text-align: center;
		/* position: relative; */
		&:hover {
			background-color: #dddddd;
		}
	}
`;

export const DropDownMenu = (props) => {

	const { menuList, openValue, logoutFunction } = props;
	const { isOpen, onClose, onOpen } = useDisclosure();

	return (
		<Wrapper style={{display: `${openValue ? "initial" : "none" }`}}>
			{
				menuList && menuList.map((menu) => {
					if(menu.text === "로그인") {
						return (
							<div className={"menu"} onClick={onOpen}>
								{menu.text}
							</div>
						)
					} else if(menu.text === "로그아웃") {
						return (
							<div className={"menu"} onClick={logoutFunction}>
								{menu.text}
							</div>
						)
					} else {
						return (
							<Link to={menu.link}>
								<div className={"menu"}>
									{menu.text}
								</div>
							</Link>
						)
					}
				})
			}
			<LoginModalComponent title={"로그인"} isOpen={isOpen} onClose={onClose} />
		</Wrapper>
	)
}