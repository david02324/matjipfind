import * as React from "react";
import logo from "../resources/img/logo.png";

const Logo: React.VoidFunctionComponent = () => {
  const style: React.CSSProperties = {
    marginLeft: "15px",
    color: "white",
    fontSize: "45px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  };
  return (
    <div style={style}>
      <img src={logo} alt="로고 이미지" width="50px" height="50px"></img>
      <span>맛집찾아</span>
    </div>
  );
};

export default Logo;
