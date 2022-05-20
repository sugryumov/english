import { FC } from "react";
import { Button, Table } from "antd";

const columns = [
  {
    title: "№",
    render: (text: any, record: any, idx: number) => <p>{idx + 1}</p>,
  },
  {
    title: "Verb",
    dataIndex: "verb",
    key: "verb",
  },
  {
    title: "Correct answer",
    dataIndex: "correctAnswer",
    key: "correctAnswer",
  },
  {
    title: "Your answer",
    dataIndex: "yourAnswer",
    key: "id",
  },
];

export const EndVerbs: FC<any> = ({ result, countVerbs, setResult }) => {
  const restartVerbs = () => {
    document.location.reload();
    setResult([]);
  };

  const correctAnswers = countVerbs - result.length;
  const percentCorrectAnswers = Math.round((correctAnswers / countVerbs) * 100);

  return (
    <div>
      <h1>Results</h1>
      <p>
        You have answered {correctAnswers} questions correctly out of{" "}
        {countVerbs}.
      </p>

      <p>Your score is {percentCorrectAnswers}%</p>

      <h2>Incorrect answers:</h2>

      <Table
        rowKey="id"
        dataSource={result}
        columns={columns}
        pagination={false}
      />

      <Button
        size="large"
        onClick={restartVerbs}
        style={{ marginTop: "20px", width: "100%" }}
      >
        Exercise again!
      </Button>
    </div>
  );
};
