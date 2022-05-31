import { createSlice } from "@reduxjs/toolkit";
import { EXERCISE_STEPS } from "../../constants/exerciseSteps";
import {
  IRREGULAR_VERBS_FORM_TYPE,
  IRREGULAR_VERBS_LIST_TYPE,
} from "../../enums/irregularVerbs";
import {
  IrregularVerbsResult,
  IrregularVerbsSettings,
} from "../../types/irregularVerbs";

interface IrregularVerbsState {
  step: string;
  settings: IrregularVerbsSettings;
  result: IrregularVerbsResult[];
}

const initialState: IrregularVerbsState = {
  step: EXERCISE_STEPS.SETTINGS,
  settings: {
    count: 0,
    list: IRREGULAR_VERBS_LIST_TYPE.CAMBRIDGE_ENGLISH,
    form: IRREGULAR_VERBS_FORM_TYPE.SIMPLE_PAST,
  },
  result: [],
};

const irregularVerbsSlice = createSlice({
  name: "irregularVerbs",
  initialState,
  reducers: {
    setChangeStep(state, { payload }) {
      state.step = payload;
    },
    setIrregularVerbsSettings(state, { payload }) {
      state.settings = payload;
    },
    setIrregularVerbsResult(state, { payload }) {
      state.result = payload;
    },
  },
});

export const irregularVerbsActions = irregularVerbsSlice.actions;
export default irregularVerbsSlice.reducer;
