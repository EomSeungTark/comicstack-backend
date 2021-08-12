import styled from 'styled-components';
import Toon from './toon';

const DivWrapper = styled.div`
	height: auto;
	width: 90%;
	margin: 0 auto;
	display: table;
	padding: 0 0 0 20px;
`;

const Wrapper = styled.ul`
	width: 100%;
	/* max-width: 75rem; */
	height: auto;
	min-height: 600px;
	/* padding: 20px 0 20px 30px; */
	display: inline-block;
`;

export default function ToonList(props) {

	const { currentDay } = props;

	return (
		<DivWrapper>
			<Wrapper>
				<Toon currentDay={currentDay}/>
			</Wrapper>
			{/* pagination */}
		</DivWrapper>
	)
}