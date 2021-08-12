import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Badge } from "@chakra-ui/react";
import thumbnail1 from "../image/thumb1.PNG";
import thumbnail2 from "../image/thumb2.PNG";
import thumbnail3 from "../image/thumb3.PNG";

const Wrapper = styled.div`
  width: 100%;
  max-width: 80rem;
  height: auto;
  min-height: 25rem;
  margin: 50px auto;
  /* background: honeydew; */
  .title {
    width: 90%;
    height: 50px;
    margin: 0 auto;
    line-height: 50px;
    font-family: NotoSans-Bold;
    font-size: 20px;
  }
  .menu-wrapper {
    width: 90%;
    height: 350px;
    margin: 0 auto;
    /* background: hotpink; */
    div {
      height: 100%;
    }
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
    /* .flex-wrapper {
			width: 100%;
			height: 100%;
			display: inline-flex;
			justify-content: space-between;
			.menu-card {
				width: calc(95% / ${(props) => props.viewCardCount} );
				height: 100%;
				background: indianred;
			}
		} */
  }
`;

export const ListBlock = (props) => {
  const { title, viewCardCount } = props;

  const settings = {
    dots: false,
    // arrow: false,
    infinite: true,
    speed: 500,
    slidesToShow: viewCardCount,
    slidesToScroll: 2,
  };

  return (
    <>
      <Wrapper>
        <section>
          <div className={"title"}>{title}</div>
          <div className={"menu-wrapper"}>
            {/* viewCardCount로  */}
            <Slider {...settings}>
              <div className={"menu-card"}>
                <div className={"thumbnail-zone"}>
                  <img src={thumbnail1} alt="logoImage" />
                </div>

                <div className={"context-zone"}>
                  <div className={"context-title"}>문과 감성 파이썬</div>
                  <div className={"context-info"}>
                    거미
                    <span className={"scoure"}>4.4 / 10 reviews</span>
                  </div>
                  <div className={"alert-zone"}>
                    <Badge colorScheme="green">new</Badge>
                    <Badge colorScheme="red">HOT</Badge>
                  </div>
                </div>
              </div>

              <div className={"menu-card"}>
                <div className={"thumbnail-zone"}>
                  <img src={thumbnail2} alt="logoImage" />
                </div>

                <div className={"context-zone"}>
                  <div className={"context-title"}>
                    react를 이용한 youtube클론 사이트 만들기
                  </div>
                  <div className={"context-info"}>
                    진우
                    <span className={"scoure"}>4.4 / 10 reviews</span>
                  </div>
                  <div className={"alert-zone"}>
                    <Badge colorScheme="green">new</Badge>
                    <Badge colorScheme="red">HOT</Badge>
                  </div>
                </div>
              </div>
              <div className={"menu-card"}>
                <div className={"thumbnail-zone"}>
                  <img src={thumbnail3} alt="logoImage" />
                </div>

                <div className={"context-zone"}>
                  <div className={"context-title"}>알고리즘 첫걸음</div>
                  <div className={"context-info"}>
                    일리닛
                    <span className={"scoure"}>4.4 / 10 reviews</span>
                  </div>
                  <div className={"alert-zone"}>
                    <Badge colorScheme="green">new</Badge>
                    <Badge colorScheme="red">HOT</Badge>
                  </div>
                </div>
              </div>
              <div className={"menu-card"}>
                <div className={"thumbnail-zone"}>
                  <img src={thumbnail1} alt="logoImage" />
                </div>

                <div className={"context-zone"}>
                  <div className={"context-title"}>문과 감성 파이썬 시즌2</div>
                  <div className={"context-info"}>
                    거미
                    <span className={"scoure"}>4.4 / 10 reviews</span>
                  </div>
                  <div className={"alert-zone"}>
                    <Badge colorScheme="green">new</Badge>
                    <Badge colorScheme="red">HOT</Badge>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </section>
      </Wrapper>
    </>
  );
};
