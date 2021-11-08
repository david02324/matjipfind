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
  return (
    <div style={style}>
      <MapBox />
      <SideBar />
    </div>
  );
};

export default MainContainer;
