import { FC } from "react";
import { Button, Table, Typography } from "antd";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { EXERCISE_STEPS } from "../../../../constants/exerciseSteps";
import { columns } from "./columns";

export const ExerciseFinish: FC = () => {
  const { setChangeStep, setIrregularVerbsResult } = useActions();

  const { result, settings } = useTypedSelector(
    (state) => state.irregularVerbsReducer
  );

  const onClickHandler = () => {
    setChangeStep(EXERCISE_STEPS.SETTINGS);
    setIrregularVerbsResult([]);
  };

  const correctAnswers = settings.count - result.length;
  const percentCorrectAnswers = Math.round(
    (correctAnswers / settings.count) * 100
  );

  return (
    <div className="exercise-finish">
      <Typography.Title level={2} className="exercise-finish__title">
        Results
      </Typography.Title>

      <Typography.Paragraph className="exercise-finish__text">
        You have answered {correctAnswers} questions correctly out of{" "}
        {settings.count}. Your score is {percentCorrectAnswers}%.
      </Typography.Paragraph>

      {result.length > 0 && (
        <>
          <Typography.Title level={3} className="exercise-finish__subtitle">
            Incorrect answers:
          </Typography.Title>

          <Table
            rowKey="id"
            dataSource={result}
            columns={columns}
            pagination={false}
          />
        </>
      )}

      <Button
        size="large"
        type="primary"
        onClick={onClickHandler}
        style={{ marginTop: "20px", width: "100%" }}
      >
        Exercise again!
      </Button>
    </div>
  );
};
