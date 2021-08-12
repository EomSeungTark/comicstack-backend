import React, { useState } from "react";
import Header from "../layout/header";
import Footer from "../layout/footer";
import ToonList from "../components/toonList";
import { DayNav } from "components/dayNav";

function SeriesPage() {
  const [currentDay, setCurrentDay] = useState("전체");
  const dayList = ["전체", "월", "화", "수", "목", "금", "토", "일"];

  return (
    <>
      <Header />
      <div className={"body-layout"}>
        <DayNav
          currentDay={currentDay}
          setCurrentDay={setCurrentDay}
          dayList={dayList}
        />
        <ToonList currentDay={currentDay} />
      </div>
      <Footer />
    </>
  );
}

export default SeriesPage;
