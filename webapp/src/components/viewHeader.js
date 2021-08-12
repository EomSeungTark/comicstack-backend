import { useHistory } from 'react-router';
import styled from 'styled-components';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const HeaderWrapper = styled.div`
	width: 100%;
	height: 4.375rem;
	background-color: beige;
	position: fixed;
	.toon-info {
		display: inline-flex;
		height: 100%;
		align-items: center;
		justify-content: center;

		.back-button {
			width: 5rem;
			height: 100%;
			text-align: center;
			line-height: 4rem;
			cursor: pointer;
		}

		.toon-title {
			display: inline-block;
			font-size: 20px;
		}
		.toon-episode-name {
			display: inline-block;
			font-size: 20px;
		}
	}
`;

export const ViewHeader = (props) => {

	const { toonId, name, viewHeaderUI } = props

	const history = useHistory();

	const handleGoBack = () => {
		history.goBack();
	}

	return (
		<>
			<HeaderWrapper 
				style={{display: viewHeaderUI ? "" : "none"}}
			>
				<div className={"toon-info"}>
					<div className={"back-button"} onClick={handleGoBack}>
						<ChevronLeftIcon w={10} h={10}/>
					</div>
					<div className={"toon-title"} >{toonId}</div>
						<ChevronRightIcon w={8} h={8} color={"#aaaaaa"}/>
					<div className={"toon-episode-name"} >{name}</div>
				</div>
			</HeaderWrapper>
		</>
	)
}

