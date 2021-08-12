import styled from "styled-components";

const EpisodeItemWrapper = styled.li`
  width: 100%;
  height: 100px;
  margin-bottom: 6px;
  padding-bottom: 6px;
  display: inline-flex;
  border-bottom: 1px solid #f2663b;
`;

const ImageZone = styled.div`
  width: 100px;
  height: 100%;
  > img {
    height: 100%;
  }
  background-color: bisque;
`;

const ContentZone = styled.div`
  width: calc(100% - 100px);
  height: 100%;
  padding: 5px;
`;

const EpisodeName = styled.div`
  width: 100%;
  height: 20px;
  margin-top: 10px;
  padding-left: 0.4rem;
`;

const EpisodeTitle = styled.div`
  width: 100%;
  height: 30px;
  padding-left: 1rem;
  font-size: 20px;
`;

const EpisodeUploadDate = styled.div`
  width: 100%;
  height: 20px;
  text-align: right;
`;

export const EpisodeItem = (props) => {
  const { id, name, title, thumbNail, context, uploadDate } = props;

  console.log("series episode path", thumbNail)

  return (
    <>
      <EpisodeItemWrapper>
        <ImageZone>
          <img
            src={thumbNail}
            alt={""}
          />
          {/* <img src={require(image).default} alt={""}/> */}
        </ImageZone>
        <ContentZone>
          <EpisodeName>{name}</EpisodeName>
          <EpisodeTitle>{title}</EpisodeTitle>
          <EpisodeUploadDate>{uploadDate}</EpisodeUploadDate>
        </ContentZone>
      </EpisodeItemWrapper>
    </>
  );
};
