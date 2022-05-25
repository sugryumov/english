import { FC } from "react";
import { Button } from "antd";
import { CloseCircleTwoTone, LikeTwoTone } from "@ant-design/icons";
import { ANSWER_STATUSES } from "../../../../../constants/answerStatuses";
import "./index.css";

export const AnswerInfo: FC<any> = ({ answerStatus, pastSimple, nextVerb }) => {
  if (answerStatus === ANSWER_STATUSES.failure) {
    return (
      <div className="answer-info__wrapper">
        <div className="answer-info__inner">
          <CloseCircleTwoTone
            twoToneColor="#ee5253"
            className="answer-info__icon"
          />

          <p className="answer-info__message">
            Wrong! Correct answer{" "}
            <span className="answer-info__word">{pastSimple}</span>
          </p>

          <Button size="large" onClick={nextVerb}>
            Next verb
          </Button>
        </div>
      </div>
    );
  }

  if (answerStatus === ANSWER_STATUSES.success) {
    return (
      <div className="answer-info__wrapper">
        <div className="answer-info__inner">
          <LikeTwoTone className="answer-info__icon" twoToneColor="#52c41a" />

          <p className="answer-info__message">Great! Correct answer</p>
        </div>
      </div>
    );
  }

  return <></>;
};
