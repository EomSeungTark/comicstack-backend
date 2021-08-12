import Header from "../layout/header";
// import Body from '../layout/body';
import Footer from "../layout/footer";
import AdsWrapper from "../components/adsWrapper";
import ToonListWrapper from "../components/toonListWrapper";
// import BodyInnerWrapper from '../components/bodyInnerWrapper';
import { MainSilde } from "components/mainSlide";
import { ListBlock } from "components/listBlock";

function MainPage() {
  return (
    <>
      <Header />
      <div className={"body-layout"}>
        <MainSilde />
        <ListBlock title={"새로운 학습만화"} viewCardCount={4} />
        <ListBlock title={"베스트 모음"} viewCardCount={3} />
        <AdsWrapper />
        <ListBlock title={"추천 학습만화"} viewCardCount={4} />
        {/* <ToonListWrapper /> */}
      </div>
      <Footer />
    </>
  );
}

export default MainPage;
