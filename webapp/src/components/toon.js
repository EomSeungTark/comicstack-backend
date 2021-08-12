import styled from "styled-components";
import { Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import testImage from "image/test-webtoon.jpeg";
import {
  getList,
  useDispatchComicsList,
  useStateComicsList,
} from "contextAPI/comics";
import { useEffect } from "react";
import { Badge } from "@chakra-ui/react";

const ItemCard = styled.li`
  width: calc((100% - 7rem) / 5);
  @media (max-width: 970px) {
    width: calc((100% - 6rem) / 4);
  }
  @media (max-width: 760px) {
    width: calc((100% - 4rem) / 3);
  }
  height: calc((100vw - 7rem) / 5 + 80px);
  margin: 0 20px 30px 0;
  display: inline-block;
  .menu-card {
    width: 95% !important;
    height: 90%;
    background: white;
    margin: 15px 5px 10px 5px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border-radius: 10px;
    display: inline-grid !important;
    grid-template-rows: 2fr 1fr;
    grid-template-areas: "thumbnail-zone" "context-zone";
    .thumbnail-zone {
      grid-area: "thumbnail-zone";
      background-color: aliceblue;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .context-zone {
      width: 100%;
      grid-area: "context-zone";
      background-color: white;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      overflow: hidden;
      .context-title {
        width: 100%;
        height: 30px;
        /* min-height: 30%; */
        margin: 10px auto auto auto;
        padding: 0 0 0 10px;
        font-family: NotoSans-Medium;
        font-size: 15px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .context-info {
        font-size: 13px;
        padding: 0 0 0 10px;
        height: auto;
        .scoure {
          float: right;
          margin-right: 15px;
        }
      }
      .alert-zone {
        margin-top: 10px;
        padding: 0 0 0 10px;
        height: auto;
        span {
          margin-right: 10px;
        }
      }
    }
  }
`;

export default function Toon(props) {
  const { currentDay } = props;

  const comicsState = useStateComicsList();
  const comicsDispatch = useDispatchComicsList();

  // const list = ["1", "2", "3", "4", "5", "6", "7"]

  useEffect(() => {
    getList(comicsDispatch);
  }, []);

  const allList = () => {
    return (
      <>
        {comicsState.entities &&
          comicsState.entities.map((item) => (
            <ItemCard key={"all"+item.toon_sid}>
              <NavLink to={`/series/episode?toonId=${item.toon_sid}&name=${item.title}`}>
                <div className={"menu-card"} key={"all"+item.toon_sid}>
                  <div className={"thumbnail-zone"}>
                    <img src={item.thumbnail_path} alt="logoImage" />
                    {item.thumbnail_path}
                  </div>

                  <div className={"context-zone"}>
                    <div className={"context-title"}>{item.title}</div>
                    <div className={"context-info"}>
                      {item.context}
                      <span className={"scoure"}>4.4 / 10 reviews</span>
                    </div>
                    <div className={"alert-zone"}>
                      <Badge colorScheme="green">new</Badge>
                      <Badge colorScheme="red">HOT</Badge>
                    </div>
                  </div>
                </div>
              </NavLink>
            </ItemCard>
          ))}
      </>
    );
  };

  const dayFilterList = () => {
    return (
      <>
        {comicsState.entities &&
          comicsState.entities
            .filter((item) => item.day === currentDay)
            .map((item) => (
              <ItemCard key={"filter"+item.toon_sid}>
                <NavLink to={`/series/episode?toonId=${item.toon_sid}`}>
                  <div className={"menu-card"}>
                    <div className={"thumbnail-zone"}>
                      <img src={item.thumbnail_path} alt="logoImage" />
                    </div>

                    <div className={"context-zone"}>
                      <div className={"context-title"}>{item.title}</div>
                      <div className={"context-info"}>
                        {item.context}
                        <span className={"scoure"}>4.4 / 10 reviews</span>
                      </div>
                      <div className={"alert-zone"}>
                        <Badge colorScheme="green">new</Badge>
                        <Badge colorScheme="red">HOT</Badge>
                      </div>
                    </div>
                  </div>
                </NavLink>
              </ItemCard>
            ))}
      </>
    );
  };

  // 나중에 for, map으로 돌리면 됨
  return <>{currentDay !== "전체" ? dayFilterList() : allList()}</>;
}
