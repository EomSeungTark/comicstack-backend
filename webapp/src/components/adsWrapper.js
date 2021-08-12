import styled from "styled-components";
import adImage from "../image/ad01.png";

const AdsWarpper = styled.div`
  width: 50%;
  min-width: 42rem;
  height: 200px;
  margin: 0 auto;
  padding: 10px;
  /* background-color: azure; */
`;

function AdsWrapper() {
  return (
    <AdsWarpper>
      {/* 광고 */}
      <img src={adImage} alt="logoImage" />
    </AdsWarpper>
  );
}

export default AdsWrapper;
