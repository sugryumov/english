import { InputRef } from "antd";
import { Ref, useRef } from "react";

export const useFocus = () => {
  const htmlElRef: Ref<InputRef> = useRef(null);

  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus] as const;
};
