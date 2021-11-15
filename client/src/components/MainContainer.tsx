import * as React from "react";
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
    window.kakaoMap = initalizeMap(document.getElementById("map-box"));
  });

  return (
    <div style={style}>
      <MapBox />
      <SideBar />
    </div>
  );
};

function initalizeMap(container: HTMLElement | null) {
  const { kakao } = window;
  const initPos = new kakao.maps.LatLng(37.56646, 126.98121);
  const mapOption = {
    center: initPos, // 지도의 중심좌표
    level: 3, // 지도의 확대 레벨
    mapTypeId: kakao.maps.MapTypeId.ROADMAP, // 지도종류
  };

  const initMap = new kakao.maps.Map(container, mapOption);

  return {
    map: initMap,
    currentPos: initPos,
  };
}

export default MainContainer;
