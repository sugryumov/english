import { FC } from "react";
import { Tooltip } from "antd";
import { useTypedSelector } from "../../../../../hooks/useTypedSelector";
import { addSpaceBeforeCapitalLetter } from "../../../../../utils";
import "./index.css";

interface IHeaderProps {
  infinitive: string;
  translation: string;
}

export const Header: FC<IHeaderProps> = ({ infinitive, translation }) => {
  const { settings } = useTypedSelector((state) => state.irregularVerbsReducer);

  return (
    <div className="exercise__header">
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
