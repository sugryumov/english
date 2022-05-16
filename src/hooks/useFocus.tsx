import { RefObject, useRef } from "react";

export const useFocus = () => {
  const htmlElRef: RefObject<HTMLInputElement> = useRef(null);

  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus] as const;
};
