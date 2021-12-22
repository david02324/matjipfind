import * as React from "react";
import FoodSearch from "./FoodSearch";
import PosSearch from "./PosSearch";
import UpperBar from "./upperBar";

export enum STEP {
  POSITION,
  FOOD,
  RESULT,
}

const SideBar: React.VoidFunctionComponent = () => {
  const [step, setStep] = React.useState<STEP>(STEP.POSITION);

  const style: React.CSSProperties = {
    borderRadius: "0 10px 10px 0",
    borderLeft: "2px solid gray",
    width: "280px",
    height: "720px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  };

  switch (step) {
    case STEP.POSITION:
      return (
        <div style={style}>
          <PosSearch setStep={setStep} />
        </div>
      );
    case STEP.FOOD:
      return (
        <div style={style}>
          <UpperBar
            text="<< 위치선택"
            setStep={() => {
              setStep(STEP.POSITION);
            }}
          />
          <FoodSearch setStep={setStep} />
        </div>
      );
    case STEP.RESULT:
      return <div style={style}></div>;
  }
};

export default SideBar;
