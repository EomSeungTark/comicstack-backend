import styled from "styled-components";
import testImage from "../image/test-webtoon.jpeg";
import { Text, Button } from "@chakra-ui/react";
import { NavLink } from 'react-router-dom';

const Wrapper = styled.div`
  width: 100%;
  max-width: 45rem;
  margin: 0 auto;
  position: relative;
  background-color: whitesmoke;
`;

const InfoWrapper = styled.div`
  position: absolute;
  width: 50%;
  height: 100%;
  margin-left: 50%;
`;

const InfoTitle = styled.div`
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  color: aliceblue;
  width: 100%;
  height: 30%;
  padding-top: 30px;
`;

const InfoStory = styled.div`
  text-align: center;
  width: 100%;
  height: 20%;
  margin-top: 10px;
  color: aliceblue;
  font-style: 20px;
  font-weight: bold;
`;

const ButtonWrapper = styled.div`
  width: 20%;
  margin: 5rem auto auto auto;
`;

export const EpisodeHeader = (props) => {

  const { toonId, episodeName } = props;
  const storyText =
    "벨비는 드디어 꿈에 그리던 컴공과에 진학을 한다 하지만 자신의 상상과는 컴공과의 어려움에 부딪히고 공부를 시작하게 되는데...";

  return (
    <>
      <Wrapper>
        <InfoWrapper>
          <InfoTitle>
            <h3>벨비의 개발일지</h3>
          </InfoTitle>
          <InfoStory>
            <Text>{storyText}</Text>
          </InfoStory>
          <ButtonWrapper>
            <NavLink to={`/series/episode/view?toonId=${toonId}`}>
              <Button>첫화보기</Button>
            </NavLink>
          </ButtonWrapper>
        </InfoWrapper>
        <img src={testImage} alt={"testImage"} style={{ borderRadius: "2%" }} />
      </Wrapper>
    </>
  );
};
