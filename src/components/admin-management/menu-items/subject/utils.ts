//Because of backend (entityframework) convert column name of table into camelCase so interface must the same
export interface ISubject {
  subjectId: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  subSubjects: string[];
}

export const empty_record: ISubject = {
  subjectId: "",
  name: "",
  description: "",
  createdAt: "",
  updatedAt: "",
  subSubjects: [],
};
