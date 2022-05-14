import { FC, useMemo, useState } from "react";
import { VERBS } from "../../constants/verbs";
import "./index.css";

export const IrregularVerbs: FC = () => {
  const array = useMemo(() => VERBS.sort(() => Math.random() - 0.5), []);

  const [answer, setAnswer] = useState<string>("");
  const [currentWord, setCurrentWord] = useState<number>(0);
  const [result, setResult] = useState<any>([]);
  const [message, setMessage] = useState<string>("");
  const [finishGame, setFinishGame] = useState<boolean>(false);

  const [checkFlag, setCheckFlag] = useState<boolean>(false);

  const [infinitive, pastSimple] = array[currentWord];

  const onChangeHandler = (e: any) => {
    setAnswer(e.target.value);
  };

  const checkAnswer = () => {
    if (array.length - 1 === currentWord) {
      setFinishGame(true);
    }

    if (answer === pastSimple) {
      setMessage("YES!");
      setResult([...result, true]);
      setCheckFlag(true);
    } else {
      setMessage(`ERROR! Correct answer ${pastSimple}`);
      setResult([...result, false]);
      setCheckFlag(true);
      setAnswer("");
    }
  };

  const nextHandler = () => {
    setCurrentWord((prev) => (prev += 1));
    setCheckFlag(false);
    setAnswer("");
    setMessage("");
  };

  const endWords = array.length - 1 === currentWord;

  return (
    <div className="irregular-verbs">
      <div className="irregular-verbs__header">
        <p className="irregular-verbs__question">
          What is the simple past of{" "}
          <span className="irregular-verbs__word">{infinitive}</span>?
        </p>

        <p className="irregular-verbs__number">
          {currentWord + 1} of {array.length}
        </p>
      </div>

      <input
        type="text"
        value={answer}
        onChange={onChangeHandler}
        className="irregular-verbs__input"
        placeholder="type your answer here"
        disabled={finishGame || checkFlag}
      />

      <div className="irregular-verbs__controls">
        <button
          onClick={checkAnswer}
          className="irregular-verbs__button"
          disabled={finishGame || checkFlag}
        >
          Check
        </button>
        <button
          onClick={nextHandler}
          className="irregular-verbs__button"
          disabled={endWords || !checkFlag}
        >
          Next
        </button>
      </div>

      <p className="irregular-verbs__message">{message}</p>

      {finishGame && (
        <p>
          Result : {result.filter(Boolean).length} / {array.length}
        </p>
      )}
    </div>
  );
};
