import { FC } from "react";
import { EXERCISE_STEPS } from "../../constants/exerciseSteps";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Exercise } from "./components/Exercise";
import { ExerciseFinish } from "./components/ExerciseFinish";
import { ExerciseSettings } from "./components/ExerciseSettings";

export const IrregularVerbs: FC = () => {
  const { step } = useTypedSelector((state) => state.irregularVerbsReducer);

  return (
    <div className="container">
      {step === EXERCISE_STEPS.SETTINGS && <ExerciseSettings />}
      {step === EXERCISE_STEPS.EXERCISE && <Exercise />}
      {step === EXERCISE_STEPS.FINISH && <ExerciseFinish />}
    </div>
  );
};
