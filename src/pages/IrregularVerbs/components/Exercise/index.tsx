import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Button, Form, Input } from "antd";
import { useActions } from "../../../../hooks/useActions";
import { useFocus } from "../../../../hooks/useFocus";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { VERBS } from "../../../../constants/verbs";
import { EXERCISE_STEPS } from "../../../../constants/exerciseSteps";
import { ANSWER_STATUSES } from "../../../../constants/answerStatuses";
import { IRREGULAR_VERBS_FORM_TYPE } from "../../../../enums/irregularVerbs";
import { IrregularVerbsSettings } from "../../../../types/irregularVerbs";
import { AnswerInfo } from "./AnswerInfo";
import { Header } from "./Header";
import "./index.css";

const newArray = (settings: IrregularVerbsSettings) => {
  const { count, list } = settings;

  return VERBS[list].sort(() => Math.random() - 0.5).slice(0, count);
};

export const Exercise: FC = () => {
  const [form] = Form.useForm();

  const { setChangeStep, setIrregularVerbsResult } = useActions();
  const { settings, result } = useTypedSelector(
    (state) => state.irregularVerbsReducer
  );
  const [inputRef, setInputFocus] = useFocus();

  const array = useMemo(() => newArray(settings), [settings]);

  const [currentWord, setCurrentWord] = useState<number>(0);
  const [correctAnswer, setSetCorrectAnswer] = useState<number>(0);
  const [answerStatus, setAnswerStatus] = useState<string>(
    ANSWER_STATUSES.initial
  );

  const [infinitive, pastSimple, pastParticiple, translation] =
    array[currentWord] || [];
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
    const correctAnswer =
      settings.form === IRREGULAR_VERBS_FORM_TYPE.SIMPLE_PAST
        ? pastSimple
        : pastParticiple;

    setSetCorrectAnswer(correctAnswer);

    const prepareAnswer = answer.trim().toLowerCase();
    if (prepareAnswer === correctAnswer) {
      setAnswerStatus(ANSWER_STATUSES.success);
    } else {
      setAnswerStatus(ANSWER_STATUSES.failure);
      setIrregularVerbsResult([
        ...result,
        {
          id: currentWord,
          verb: infinitive,
          correctAnswer: correctAnswer,
          yourAnswer: prepareAnswer,
        },
      ]);
    }
  };

  return (
    <div>
      <Header
        infinitive={infinitive}
        currentWord={currentWord}
        translation={translation}
      />

      <Form form={form} onFinish={checkAnswer} autoComplete="off">
        <Form.Item
          name="answer"
          rules={[{ required: true, message: "Please input your answer!" }]}
        >
          <Input
            size="large"
            ref={inputRef}
            placeholder="Type your answer here"
            disabled={answerStatus !== ANSWER_STATUSES.initial}
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
        correctAnswer={correctAnswer}
        nextVerb={nextVerb}
      />
    </div>
  );
};
