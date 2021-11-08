import * as React from "react";

const SideBar: React.VoidFunctionComponent = () => {
  const style: React.CSSProperties = {
    borderRadius: "0 10px 10px 0",
    borderLeft: "2px solid gray",
    width: "280px",
    height: "720px",
  };

  return <div style={style}></div>;
};

export default SideBar;
