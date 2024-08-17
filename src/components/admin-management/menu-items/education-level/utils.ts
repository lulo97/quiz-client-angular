//Because of backend (entityframework) convert column name of table into camelCase so interface must the same
export interface IEducationLevel {
  educationLevelId: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  subSubjects: string[];
}

export const empty_record: IEducationLevel = {
  educationLevelId: "",
  name: "",
  description: "",
  createdAt: "",
  updatedAt: "",
  subSubjects: [],
};
