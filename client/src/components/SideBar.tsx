import * as React from "react";
import InputBox from "./InputBox";

const SideBar: React.VoidFunctionComponent = () => {
  const style: React.CSSProperties = {
    borderRadius: "0 10px 10px 0",
    borderLeft: "2px solid gray",
    width: "280px",
    height: "720px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={style}>
      <InputBox width={220} type={1} placeHolder="위치를 직접 입력하기" />
    </div>
  );
};

export default SideBar;
