import * as React from "react";
import { MapContext } from "../store/mapStore";

const MapBox: React.VoidFunctionComponent = () => {
  const mapContext = React.useContext(MapContext);

  console.log(mapContext.map);
  const style: React.CSSProperties = {
    width: "1000px",
    height: "720px",
    borderRadius: "10px 0 0 10px",
  };
  return <div style={style} id="map-box"></div>;
};

export default MapBox;
