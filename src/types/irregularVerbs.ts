import {
  IRREGULAR_VERBS_FORM_TYPE,
  IRREGULAR_VERBS_LIST_TYPE,
} from "../enums/irregularVerbs";

export interface IrregularVerbsSettings {
  count: number;
  list: IRREGULAR_VERBS_LIST_TYPE;
  form: IRREGULAR_VERBS_FORM_TYPE;
}

export interface IrregularVerbsResult {
  id: number;
  verb: string;
  correctAnswer: string;
  yourAnswer: string;
}
