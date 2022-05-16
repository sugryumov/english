import { FC, useEffect, useMemo, useState } from "react";
import { VERBS } from "../../constants/verbs";
import { useFocus } from "../../hooks/useFocus";
import "./index.css";

export const IrregularVerbs: FC = () => {
  const array = useMemo(() => VERBS.sort(() => Math.random() - 0.5), []);
  const [inputRef, setInputFocus] = useFocus();

  const [answer, setAnswer] = useState<string>("");
  const [currentWord, setCurrentWord] = useState<number>(0);
  const [result, setResult] = useState<Array<boolean>>([]);
  const [message, setMessage] = useState<string>("");
  const [finishGame, setFinishGame] = useState<boolean>(false);
  const [checkFlag, setCheckFlag] = useState<boolean>(false);

  const [infinitive, pastSimple] = array[currentWord];
  const endWords = array.length - 1 === currentWord;

  useEffect(() => {
    setInputFocus();
  }, [setInputFocus]);

  useEffect(() => {
    if (message === "YES!" && !endWords) {
      const timerId = setTimeout(() => nextHandler(), 1000);

      return () => clearTimeout(timerId);
    }
  }, [endWords, message]);

  const onChangeHandler = (e: any) => {
    setAnswer(e.target.value);
  };

  const checkAnswer = () => {
    if (array.length - 1 === currentWord) {
      setFinishGame(true);
    }

    if (answer.trim().toLowerCase() === pastSimple) {
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

  const onKeyPressHandler = (event: any) => {
    if (event.charCode === 13) {
      checkAnswer();
    }
  };

  const nextHandler = () => {
    setCurrentWord((prev) => (prev += 1));
    setCheckFlag(false);
    setAnswer("");
    setMessage("");
  };

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
        ref={inputRef}
        autoComplete="off"
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        className="irregular-verbs__input"
        placeholder="Type your answer here"
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
