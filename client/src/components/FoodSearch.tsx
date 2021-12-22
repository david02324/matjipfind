import * as React from "react";
import {
  ToastsContainer,
  ToastsContainerPosition,
  ToastsStore,
} from "react-toasts";
import Button from "./Button";
import InputBox from "./InputBox";
import { STEP } from "./SideBar";

export interface IFoodSearchProps {
  setStep: (step: STEP) => void;
}

export default function FoodSearch({ setStep }: IFoodSearchProps) {
  const style: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
  };

  return (
    <div style={style}>
      <InputBox
        width={220}
        type={2}
        placeHolder="먹을 음식"
        imgBtnOnClick={() => {}}
      />
      혹은
      <Button width={220} text="아무거나!" onClick={() => {}} />
      <ToastsContainer
        position={ToastsContainerPosition.TOP_CENTER}
        store={ToastsStore}
        lightBackground
      />
    </div>
  );
}
