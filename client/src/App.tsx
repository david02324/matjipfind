import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./resources/global.css";
import Container from "./components/Container";

// kakao map 객체 타입 검사 제외
declare global {
  interface Window {
    kakao: any;
    kakaoMap: {
      map: any;
      currentPos: any;
    };
  }
}

function App() {
  return (
    <>
      <Header />
      <Container />
      <Footer />
    </>
  );
}

export default App;
