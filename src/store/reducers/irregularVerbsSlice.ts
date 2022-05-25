import { createSlice } from "@reduxjs/toolkit";
import { EXERCISE_STEPS } from "../../constants/exerciseSteps";

interface IrregularVerbsState {
  step: string;
  settings: any;
}

const initialState: IrregularVerbsState = {
  step: EXERCISE_STEPS.SETTINGS,
  settings: null,
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
  },
});

export const irregularVerbsActions = irregularVerbsSlice.actions;
export default irregularVerbsSlice.reducer;
