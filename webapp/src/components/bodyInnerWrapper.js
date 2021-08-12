import styled from 'styled-components';
import { Button } from "@chakra-ui/react"

const BodyInnerWarpper = styled.div`
	width: 70%;
	min-width: 42rem;
	height: 400px;
	padding: 20px 0 20px 0;
	margin: 0 auto;
	background-color: aqua;
`;

const BodyInnerContent = styled.div`
	width: 50%;
	min-width: 21rem;
	height: 100%;
	display: inline-block;
`;

const Content = styled.div`
	width: 90%;
	height: 31%;
	display: inline-flex;
	align-items: center;
	justify-content: space-between;
	margin-top: ${props => props.first ? "" : "15px"};
`;

const ContentHeaderImage = styled.div`
	width: 90%;
	height: 250px;
	margin: 0 auto;
	background-color: gray;
`;

const ContentHeaderInfo = styled.div`
	width: 90%;
	height: 100px;
	background-color: gray;
	margin: 10px auto auto auto;
`;

const ContentImage = styled.div`
	width: 100px;
	height: 100px;
	/* display: inline-block; */
	background-color: gray;
`;

const ContentInfo = styled.span`
	width: 65%;
	height: 90%;
	padding: 0 10px 0 10px;
	/* float: right; */
	/* display: inline-block; */
	background-color: gray;
`;

const ContentMoreButtonWarpper = styled.div`
	width: 70%;
	min-width: 42rem;
	height: 40px;
	margin: 0 auto;
`;

const ContentTitle = styled.div`
	width: 200px;
	height: 20px;
	background-color: gray;
	display: inline-block;
`;

export default function BodyInnerWrapper() {

	return (
		<>
			<BodyInnerWarpper>
				<BodyInnerContent>
					<ContentHeaderImage>

					</ContentHeaderImage>
					<ContentHeaderInfo>

					</ContentHeaderInfo>
				</BodyInnerContent>
				<BodyInnerContent>
					<Content first={true}>
						<ContentImage>
							image
						</ContentImage>
						<ContentInfo>
							<div>title</div>
							<div>contents~~~</div>
						</ContentInfo>
					</Content>
					<Content>
						<ContentImage>

						</ContentImage>
						<ContentInfo>
	
						</ContentInfo>
					</Content>
					<Content>
						<ContentImage>
							
						</ContentImage>
						<ContentInfo>

						</ContentInfo>
					</Content>
				</BodyInnerContent>
			</BodyInnerWarpper>
			<ContentMoreButtonWarpper>
				<Button style={{float: "right"}}>더보기</Button>
			</ContentMoreButtonWarpper>
		</>
	)
}