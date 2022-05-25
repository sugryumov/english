import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Button, Form, Input, Tooltip } from "antd";
import { useActions } from "../../../../hooks/useActions";
import { useFocus } from "../../../../hooks/useFocus";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { VERBS } from "../../../../constants/verbs";
import { EXERCISE_STEPS } from "../../../../constants/exerciseSteps";
import { ANSWER_STATUSES } from "../../../../constants/answerStatuses";
import "./index.css";
import { AnswerInfo } from "./AnswerInfo";

const newArray = (length: number = Infinity) =>
  VERBS.sort(() => Math.random() - 0.5).slice(0, length);

export const Exercise: FC = () => {
  const [form] = Form.useForm();

  const { setChangeStep } = useActions();
  const { settings } = useTypedSelector((state) => state.irregularVerbsReducer);
  const [inputRef, setInputFocus] = useFocus();

  const array = useMemo(() => newArray(settings?.count), [settings]);

  const [currentWord, setCurrentWord] = useState<number>(0);
  const [answerStatus, setAnswerStatus] = useState<string>(
    ANSWER_STATUSES.initial
  );
  const [result, setResult] = useState<any>([]);

  const [infinitive, pastSimple, , translation] = array[currentWord] || [];
  const endVerbs = array.length === currentWord;

  useEffect(() => {
    setInputFocus();
  }, [setInputFocus]);

  useEffect(() => {
    if (endVerbs) {
      setChangeStep(EXERCISE_STEPS.FINISH);
    }
  }, [endVerbs, setChangeStep]);

  const nextVerb = useCallback(() => {
    setCurrentWord((prev) => (prev += 1));
    setAnswerStatus(ANSWER_STATUSES.initial);
    form.resetFields();
  }, [form]);

  useEffect(() => {
    if (answerStatus === ANSWER_STATUSES.success) {
      const timerId = setTimeout(() => nextVerb(), 500);

      return () => clearTimeout(timerId);
    }
  }, [answerStatus, form, nextVerb]);

  const checkAnswer = ({ answer }: { answer: string }) => {
    const prepareAnswer = answer.trim().toLowerCase();

    if (prepareAnswer === pastSimple) {
      setAnswerStatus(ANSWER_STATUSES.success);
    } else {
      setAnswerStatus(ANSWER_STATUSES.failure);
      setResult([
        ...result,
        {
          id: currentWord,
          verb: infinitive,
          correctAnswer: pastSimple,
          yourAnswer: prepareAnswer,
        },
      ]);
    }
  };

  return (
    <div>
      <div className="exercise__header">
        <p className="exercise__question">
          What is the simple past of{" "}
          <Tooltip title={translation}>
            <span className="exercise__word">{infinitive}</span>
          </Tooltip>
          ?
        </p>

        <p className="exercise__number">
          {currentWord + 1} of {array.length}
        </p>
      </div>

      <Form form={form} onFinish={checkAnswer} autoComplete="off">
        <Form.Item
          name="answer"
          rules={[{ required: true, message: "Please input your answer!" }]}
        >
          <Input
            size="large"
            ref={inputRef}
            placeholder="Type your answer here"
          />
        </Form.Item>

        <Form.Item>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="irregular-verbs__button"
          >
            Check
          </Button>
        </Form.Item>
      </Form>

      <AnswerInfo
        answerStatus={answerStatus}
        pastSimple={pastSimple}
        nextVerb={nextVerb}
      />
    </div>
  );
};
