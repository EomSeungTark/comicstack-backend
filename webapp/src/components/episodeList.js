import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

import { EpisodeItem } from "./episodeItem";
import { 
  getList as getEpisodeList, 
  useStateEpisodeList, 
  useDispatchEpisodeList
} from 'contextAPI/episode';

const Wrapper = styled.div`
  width: 100%;
  max-width: 45.25rem;
  margin: 0 auto;
  /* background-color: whitesmoke; */
`;

const EpisodeListBlock = styled.ul`
  width: 100%;
  margin: 10px auto;
  list-style: none;
`;

export const EpisodeList = (props) => {

  const { toonId, episodeName } = props;

  const episodeListState = useStateEpisodeList();
  const episodeListDispatch = useDispatchEpisodeList();

  useEffect(() => {
    getEpisodeList(episodeListDispatch, toonId)
  }, [toonId])

  return (
    <>
      <Wrapper>
        <EpisodeListBlock>
          {episodeListState.entities &&
            episodeListState.entities.map((item) => (
            <NavLink
              key={item.id}
              to={`/series/episode/view?toonId=${item.toon_sid}&name=${item.episode_name}`}
            >
              <EpisodeItem
                key={item.episode_name}
                id={item.episode_name}
                name={episodeName}
                title={item.episode_name}
                thumbNail={item.thumbnail_path}
                context={"context"}
                uploadDate={item.create_at.substr(0,10)}
              />
            </NavLink>
          ))}
        </EpisodeListBlock>
      </Wrapper>
    </>
  );
};
