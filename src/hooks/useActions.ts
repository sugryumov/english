import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { allActions } from "../store/reducers";

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(allActions, dispatch);
};
