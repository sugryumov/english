import { FC } from "react";
import { Progress, Tooltip } from "antd";
import { useTypedSelector } from "../../../../../hooks/useTypedSelector";
import { addSpaceBeforeCapitalLetter } from "../../../../../utils";
import "./index.css";

interface IHeaderProps {
  infinitive: string;
  translation: string;
  currentWord: number;
}

export const Header: FC<IHeaderProps> = ({
  infinitive,
  translation,
  currentWord,
}) => {
  const { settings } = useTypedSelector((state) => state.irregularVerbsReducer);

  const progressPercent = (currentWord / Number(settings.count)) * 100;

  return (
    <div className="exercise__header">
      <Progress strokeWidth={25} percent={progressPercent} showInfo={false} />

      <p className="exercise__question">
        What is the{" "}
        <span className="exercise__word">
          {addSpaceBeforeCapitalLetter(settings.form)}{" "}
        </span>
        of{" "}
        <Tooltip title={translation}>
          <span className="exercise__word">{infinitive}</span>
        </Tooltip>
        ?
      </p>
    </div>
  );
};
