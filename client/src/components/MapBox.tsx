import * as React from "react";

const MapBox: React.VoidFunctionComponent = () => {
  const style: React.CSSProperties = {
    width: "1000px",
    height: "720px",
    borderRadius: "10px 0 0 10px",
  };
  return <div style={style} id="map-box"></div>;
};

export default MapBox;
