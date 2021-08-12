import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/react";
import "../styles/mainSlideStyle.scss";
import FirstImage from "../image/first-slide-image.png";
import SecondImage from "../image/second-slide-image.gif";
import ThirdImage from "../image/third-slide-image.gif";

const Wrapper = styled.div`
  width: 100%;
  max-width: 90rem;
  height: 18.75rem;
  margin: 0 auto;
  background-color: teal;
  /* div {
    width: 100%;
    height: 100%;
  } */
  /* 슬라이드 화살표 마우스오버 효과 */
  .css-onkibi:hover {
    color: black;
  }
  .slick-dots {
    bottom: 15px;
    .slick-active button {
      opacity: 1;
      &:before {
        color: #f2663b;
        opacity: 1;
      }
    }
    li button {
      &:hover {
        &:before {
          opacity: 1;
          color: #f2663b;
        }
      }
    }
  }
`;

export const MainSilde = () => {
  const CustomRightArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <ChevronRightIcon
        className={className}
        style={{
          ...style,
          width: "100px",
          height: "100px",
          right: "10px",
          opacity: "0.5",
          cursor: "pointer",
          zIndex: "100",
        }}
        onClick={onClick}
      />
    );
  };

  const CustomLeftArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <ChevronLeftIcon
        className={className}
        style={{
          ...style,
          width: "100px",
          height: "100px",
          left: "10px",
          opacity: "0.5",
          cursor: "pointer",
          zIndex: "100",
        }}
        onClick={onClick}
      />
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomRightArrow />,
    prevArrow: <CustomLeftArrow />,
    // autoplay: true,
    // autoplaySpeed: 2000,
  };

  return (
    <>
      <Wrapper>
        <Slider {...settings}>
          <div className="FirstSlide">
            <div className={"cover-left"}>
              <div className={"comment-wrapper"}>
                <div className={"comment-title"}>
                  공부하다 막히면 <br />
                  커뮤니티에 물어보세요!
                </div>
                <div className={"comment-sub"}>
                  #공부 #golang #react <br />
                  #여러가지 #이것저것 #아리랑
                </div>
              </div>
            </div>
            <div className={"cover-right"}>
              <img src={FirstImage} alt="logoImage" />
            </div>
          </div>
          <div className="SecondSlide">
            <div className={"cover-left"}>
              <div className={"comment-wrapper"}>
                <Badge px="3" fontSize="1rem" colorScheme="purple">
                  큐레이션
                </Badge>
                <div className={"comment-title"}>
                  프로그래밍 입문자라면 주목!
                </div>
                <div className={"comment-sub"}>
                  누구에게나 열려 있고, <br />
                  누구나 참여 가능한 코딩의 세계
                </div>
              </div>
            </div>
            <div className={"cover-right"}>
              <img src={SecondImage} alt="logoImage" />
            </div>
          </div>
          <div className="ThirdSlide">
            <div className={"cover-left"}>
              <div className={"comment-wrapper"}>
                <Badge px="3" fontSize="1rem" colorScheme="purple">
                  save
                </Badge>
                <div className={"comment-title"}>
                  지금 <br />
                  할인 중인 웹툰
                </div>
                <div className={"comment-sub"}>
                  지금 할인 중인 웹툰을 확인하세요. <br />
                  당장 오늘 마감이 될 수도 있어요!
                </div>
              </div>
            </div>
            <div className={"cover-right"}>
              <img src={ThirdImage} alt="logoImage" />
            </div>
          </div>
        </Slider>
      </Wrapper>
    </>
  );
};
