import { createContext, Provider, useEffect, useState } from "react";

interface Props {
  children: JSX.Element | JSX.Element[];
}

let initPos: any = null;
let initMap: any = null;

(() => {
  const { kakao } = window;
  const container = document.getElementById("map-box");

  initPos = new kakao.maps.LatLng(37.56646, 126.98121);
  const mapOption = {
    center: initPos, // 지도의 중심좌표
    level: 3, // 지도의 확대 레벨
    mapTypeId: kakao.maps.MapTypeId.ROADMAP, // 지도종류
  };

  initMap = new kakao.maps.Map(container, mapOption);
})();

const MapContext = createContext({
  currentPos: initPos,
  map: initMap,
});

const MapProvider = ({ children }: Props): JSX.Element => {
  const [currentPos, setCurrentPos] = useState(initPos);
  const [map, setMap] = useState(initMap);

  return (
    <MapContext.Provider
      value={{
        map,
        currentPos,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export { MapContext, MapProvider };
