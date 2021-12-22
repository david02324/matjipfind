import * as React from "react";
import {
  ToastsContainer,
  ToastsContainerPosition,
  ToastsStore,
} from "react-toasts";
import { getCurrentPosByUserInput, getMyPos } from "../utils/mapUtils";
import Button from "./Button";
import InputBox from "./InputBox";
import { STEP } from "./SideBar";

export interface IPosSearchProps {
  setStep: (step: STEP) => void;
}

export default function PosSearch({ setStep }: IPosSearchProps) {
  const style: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
  };

  const nextStep = () => setStep(STEP.FOOD);

  const getMyPosBtnClickHandler = () => {
    ToastsStore.info("불러오는 중...");

    getMyPos().then(nextStep, () => {
      ToastsStore.error(
        "위치 조회에 실패했습니다! 잠시 후 다시 시도하거나 위치를 직접입력해주세요!"
      );
    });
  };

  const getMyPosByUserInputHandler = (userInput: string) => {
    getCurrentPosByUserInput(userInput).then(nextStep, () => {
      ToastsStore.error("알 수 없는 지역입니다!");
    });
  };

  return (
    <div style={style}>
      <Button
        width={220}
        text="내 위치 가져오기"
        onClick={getMyPosBtnClickHandler}
      />
      혹은
      <InputBox
        width={220}
        type={1}
        placeHolder="직접입력(도로명주소)"
        imgBtnOnClick={getMyPosByUserInputHandler}
      />
      <ToastsContainer
        position={ToastsContainerPosition.TOP_CENTER}
        store={ToastsStore}
        lightBackground
      />
    </div>
  );
}
