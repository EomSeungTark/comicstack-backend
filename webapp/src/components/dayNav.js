import styled from 'styled-components';
import { Button } from '@chakra-ui/react';

const DayNavWrapper = styled.div`
	width: 60%;
	height: 80px;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
	button {
		border-radius: 20px;
		width: 100px;
		margin: 0 5px 0 5px;
		&:focus {
			border: none;
		}
	}
	.active {
		background-color: #f2663d;
		border: none;
	}
`;

export const DayNav = (props) => {

	const {
		currentDay,
		setCurrentDay,
		dayList,
	} = props;

	return (
		<>
			<DayNavWrapper>
				{dayList.map((item) => (
					<Button 
						onClick={() => setCurrentDay(item)}
						className={currentDay === item ? "active" : ""} 
						key={item}
					>
						{item}
					</Button>
				))}
			</DayNavWrapper>
		</>
	)
}