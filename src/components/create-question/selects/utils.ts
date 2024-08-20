export interface ISelectItem {
  name: string;
  value: number;
  id: string;
}

export const empty_select_item: ISelectItem = { name: "", value: 0, id: "" };

export const DEFAULT_METADATA = {
  DIFFICULT_LEVEL: "nhận biết",
  EDUCATION_LEVEL: "tổng hợp",
  LANGUAGE: "tiếng việt",
  POINT: "10",
  QUESTION_TYPE: {
    SINGLE_NAME: "một đáp án",
    SINGLE_VALUE: false,
    MUTIPLE_NAME: "nhiều đáp án",
    MUTIPLE_VALUE: true,
  },
  SUBJECT: "tổng hợp",
  SUB_SUBJECT: "tổng hợp",
  BOOK: "tổng hợp",
};
