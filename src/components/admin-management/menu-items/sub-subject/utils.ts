import { IEducationLevel } from "../education-level/utils";
import { ISubject } from "../subject/utils";
import { empty_record as empty_subject } from "../subject/utils";
import { empty_record as empty_educationLevel } from "../education-level/utils";

//Because of backend (entityframework) convert column name of table into camelCase so interface must the same
export interface ISubSubject {
  subSubjectId: string;
  subjectId: string;
  educationLevelId: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  educationLevelName: string;
  subjectName: string;
}

export const empty_record: ISubSubject = {
  subSubjectId: "",
  subjectId: "",
  educationLevelId: "",
  name: "",
  description: "",
  createdAt: "",
  updatedAt: "",
  educationLevelName: "",
  subjectName: "",
};
