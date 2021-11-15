import * as React from "react";
import { initalizeMap } from "../utils/mapUtils";
import MapBox from "./MapBox";
import SideBar from "./SideBar";

const MainContainer: React.VoidFunctionComponent = () => {
  const style: React.CSSProperties = {
    width: "1280px",
    height: "720px",
    borderRadius: "10px",
    display: "flex",
    border: "1px solid gray",
  };

  React.useEffect(() => {
    // 지도 초기화 및 전역 window 객체에 할당
    initalizeMap(document.getElementById("map-box"));
  });

  return (
    <div style={style}>
      <MapBox />
      <SideBar />
    </div>
  );
};

export default MainContainer;
