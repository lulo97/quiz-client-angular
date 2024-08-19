//Because of backend (entityframework) convert column name of table into camelCase so interface must the same
export interface IQuestionType {
  questionTypeId: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export const empty_record: IQuestionType = {
  questionTypeId: "",
  name: "",
  description: "",
  createdAt: "",
  updatedAt: "",
};
