import * as React from "react";
import naverLoginBtn from "../resources/img/naver_login.png";
import googleLoginBtn from "../resources/img/google_login.png";
import githubLoginBtn from "../resources/img/github_login.png";

const LoginBox: React.VoidFunctionComponent = () => {
  const style: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    right: "20px",
  };
  const btnStyle: React.CSSProperties = {
    marginRight: "10px",
    width: "50px",
    height: "50px",
  };

  return (
    <div style={style}>
      <img src={naverLoginBtn} style={btnStyle} alt="네이버 로그인 버튼"></img>
      <img src={googleLoginBtn} style={btnStyle} alt="구글 로그인 버튼"></img>
      <img src={githubLoginBtn} style={btnStyle} alt="깃허브 로그인 버튼"></img>
    </div>
  );
};

export default LoginBox;
