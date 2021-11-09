import * as React from "react";

const MapBox: React.VoidFunctionComponent = () => {
  const createMap = () => {
    const { kakao } = window;
    const container = document.getElementById("map-box");

    const mapOption = {
      center: new kakao.maps.LatLng(37.56646, 126.98121), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
      mapTypeId: kakao.maps.MapTypeId.ROADMAP, // 지도종류
    };

    const map = new kakao.maps.Map(container, mapOption);
  };

  React.useEffect(() => createMap);
  const style: React.CSSProperties = {
    width: "1000px",
    height: "720px",
    borderRadius: "10px 0 0 10px",
  };
  return <div style={style} id="map-box"></div>;
};

export default MapBox;
