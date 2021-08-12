import styled from "styled-components"

const Wrapper = styled.div`
	width: 100%;
	height: 100vh;
	/* min-height: 500px; */
	padding: 20px;
`;

const ItemBlock = styled.div`
	width: 100%;
	height: 40px;
	margin-bottom: 10px;
	text-align: center;
	font-size: 20px;
	border-radius: 10px;
	line-height: 40px;
	background-color: lightcyan;
`;

export default function Category() {

	const categoryList = [ "자바", "파이썬", "리액트", "c언어", "자바스크립트", "go언어" ]

	return (
		<>
			<Wrapper>
				{categoryList && categoryList.map((item) => (
					<ItemBlock key={item}>
						{item}
					</ItemBlock>
				))}
			</Wrapper>
		</>
	)
}