import { FC } from "react";
import { Button } from "antd";

export const EndVerbs: FC<any> = ({ result, countVerbs }) => {
  const restartVerbs = () => {
    document.location.reload();
  };

  return (
    <div>
      <p>
        Result : {result.filter(Boolean).length} / {countVerbs}
      </p>
      <Button onClick={restartVerbs}>Restart</Button>
    </div>
  );
};
