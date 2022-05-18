import { FC } from "react";
import { Button } from "antd";

export const EndVerbs: FC<any> = ({ result, countVerbs }) => {
  const restartVerbs = () => {
    document.location.reload();
  };

  const correctAnswers = result.filter(Boolean).length;
  const percentCorrectAnswers = Math.round((correctAnswers / countVerbs) * 100);

  return (
    <div>
      <h1>Results</h1>
      <p>
        You have answered {correctAnswers} questions correctly out of{" "}
        {countVerbs}.
      </p>

      <p>Your score is {percentCorrectAnswers}%</p>

      <Button size="large" type="primary" onClick={restartVerbs}>
        Exercise again!
      </Button>
    </div>
  );
};
