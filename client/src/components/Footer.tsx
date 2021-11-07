import * as React from "react";

const Footer: React.VoidFunctionComponent = () => {
  const style: React.CSSProperties = {
    width: "100%",
    height: "30px",
    backgroundColor: "black",
    display: "flex",
    alignItems: "center",
  };

  const spanStyle: React.CSSProperties = {
    marginLeft: "10px",
    color: "white",
    cursor: "pointer",
  };

  const redirectToGithub = () => {
    window.open("https://github.com/david02324/matjipfind", "blank");
  };

  return (
    <footer style={style}>
      <span style={spanStyle} onClick={redirectToGithub}>
        Github
      </span>
    </footer>
  );
};

export default Footer;
