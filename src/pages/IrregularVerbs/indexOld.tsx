import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Button, Form, Input, Tooltip } from "antd";
import { ANSWER_STATUSES } from "../../constants/answerStatuses";
import { VERBS } from "../../constants/verbs";
import { useFocus } from "../../hooks/useFocus";
// import { AnswerInfo } from "./components/AnswerInfo/index.";
import { EndVerbs } from "./components/EndVerbs";
import "./index.css";

const newArray = (length: number = Infinity) =>
  VERBS.sort(() => Math.random() - 0.5).slice(0, length);

export const IrregularVerbs: FC = () => {
  const array = useMemo(() => newArray(), []);

  const [inputRef, setInputFocus] = useFocus();
  const [form] = Form.useForm();

  const [currentWord, setCurrentWord] = useState<number>(0);
  const [answerStatus, setAnswerStatus] = useState<string>(ANSWER_STATUSES.initial);
  const [result, setResult] = useState<any>([]);

  const [infinitive, pastSimple, , translation] = array[currentWord] || [];
  const endVerbs = array.length === currentWord;

  useEffect(() => {
    setInputFocus();
  }, [setInputFocus]);

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
    <div className="container irregular-verbs">
      {endVerbs ? (
        <EndVerbs
          result={result}
          countVerbs={array.length}
          setResult={setResult}
        />
      ) : (
        <>
          <div className="irregular-verbs__header">
            <p className="irregular-verbs__question">
              What is the simple past of{" "}
              <Tooltip title={translation}>
                <span className="irregular-verbs__word">{infinitive}</span>
              </Tooltip>
              ?
            </p>

            <p className="irregular-verbs__number">
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

          {/* <AnswerInfo
            answerStatus={answerStatus}
            pastSimple={pastSimple}
            nextVerb={nextVerb}
          /> */}
        </>
      )}
    </div>
  );
};
