import styled from "styled-components";
import "./footer.scss";
import Logo from "../image/logo_white.svg";

export default function Footer() {
  return (
    <div className="FooterLayout">
      <div className="FooterLayoutStart">
        <div className="Service">
          <h3>서비스</h3>
          <p>개발자용 코믹스택</p>
          <p>학생용 코믹스택</p>
          <p>코믹스택 스쿨</p>
        </div>
        <div className="Terms">
          <h3>약관</h3>
          <p>개인정보 처리방침</p>
          <p>이용약관</p>
        </div>
        <div className="Ask">
          <h3>문의</h3>
          <p>FAQ/문의</p>
          <p>기관 도입문의</p>
        </div>
        <div className="CustomerCenter">
          <h3>고객센터</h3>
          <h4>코딩 테스트 및 교육 문의: 010-2354-7227</h4>
          <p>문의하기 운영시간: 오전9시 ~ 오후 6시 (주말 및 공휴일 휴무)</p>
          <p>점심시간: 오후 12시 ~ 오후 1시</p>
        </div>
        <div className="Logo">
          <img width="200px" height="100px" src={Logo} alt="logoImage" />
        </div>
      </div>
      <div className="FooterLayoutEnd">
        <hr style={{ border: "1px solid  #444" }} />
        <p className="CompanyName">2021 헤일러소프트</p>
        <p className="CompanyDesc">
          헤일러소프트 / 대표 최진우 / 서울특별시 성동구 마장동 782-4 301호
          <br></br>
          사업자등록번호 586-23-01405
        </p>
      </div>
    </div>
  );
}
