import React, { FC, useState } from "react";

export const Test: FC<any> = React.memo(({ array }) => {
  const [answer, setAnswer] = useState<string>("");
  const [currentWord, setCurrentWord] = useState<number>(0);
  const [result, setResult] = useState<any>([]);
  const [message, setMessage] = useState<string>("");
  const [finishGame, setFinishGame] = useState<boolean>(false);

  const [checkFlag, setCheckFlag] = useState<boolean>(false);

  const [infinitive, pastSimple, _, translate] = array[currentWord];

  const onChangeHandler = (e: any) => {
    setAnswer(e.target.value);
  };

  const checkAnswer = () => {
    if (array.length - 1 === currentWord) {
      setFinishGame(true);
    }

    if (answer === pastSimple) {
      setMessage("Correct answer");
      setResult([...result, true]);
      setCheckFlag(true);
    } else {
      setMessage(`Wrong! Correct answer ${pastSimple}`);
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
    <div>
      <p>
        {`${currentWord + 1}/${array.length} ${infinitive} (${translate})`}
        {/* {currentWord + 1}. {infinitive} */}
      </p>
      <input
        type="text"
        value={answer}
        onChange={onChangeHandler}
        disabled={finishGame}
      />
      <button onClick={checkAnswer} disabled={finishGame || checkFlag}>
        Check
      </button>
      <button onClick={nextHandler} disabled={endWords || !checkFlag}>
        Next
      </button>

      <p>{message}</p>
      {finishGame && (
        <p>
          End words. Result : {result.filter(Boolean).length} / {array.length}
        </p>
      )}
    </div>
  );
});
