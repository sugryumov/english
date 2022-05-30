import { createSlice } from "@reduxjs/toolkit";
import { EXERCISE_STEPS } from "../../constants/exerciseSteps";

type TIrregularVerbsList = "cambridgeEnglish" | "otherSource" | "random";
type TIrregularVerbsForm = "simplePast" | "pastParticiple" | "random";

interface ISettings {
  count: number;
  list: TIrregularVerbsList;
  form: TIrregularVerbsForm;
}

interface IResult {
  id: number;
  verb: string;
  correctAnswer: string;
  yourAnswer: string;
}

interface IrregularVerbsState {
  step: string;
  settings: ISettings;
  result: IResult[];
}

const initialState: IrregularVerbsState = {
  step: EXERCISE_STEPS.SETTINGS,
  settings: {
    count: 0,
    list: "cambridgeEnglish",
    form: "simplePast",
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
