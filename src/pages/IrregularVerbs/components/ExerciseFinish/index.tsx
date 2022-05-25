import { Button } from "antd";
import { FC } from "react";
import { useActions } from "../../../../hooks/useActions";
import { EXERCISE_STEPS } from "../../../../constants/exerciseSteps";

export const ExerciseFinish: FC = () => {
  const { setChangeStep } = useActions();

  const onClickHandler = () => {
    setChangeStep(EXERCISE_STEPS.SETTINGS);
  };

  return (
    <div>
      ExerciseFinish
      <Button onClick={onClickHandler}>Exercise again!</Button>
    </div>
  );
};
