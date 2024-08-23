import { IDifficultLevel } from "../../admin-management/menu-items/difficult-level/utils";
import { IEducationLevel } from "../../admin-management/menu-items/education-level/utils";
import { ISubject } from "../../admin-management/menu-items/subject/utils";
import { ISubSubject } from "../../admin-management/menu-items/sub-subject/utils";
import { IQuestionType } from "../../admin-management/menu-items/question-type/utils";
import { ILanguage } from "../../admin-management/menu-items/language/utils";
import { IPoint } from "../../admin-management/menu-items/point/utils";
import { IBook } from "../../admin-management/menu-items/book/utils";
import { ISelectItem } from "../selects/utils";

export interface IMetadata {
  difficultLevels: IDifficultLevel[];
  educationLevels: IEducationLevel[];
  subjects: ISubject[];
  subSubjects: ISubSubject[];
  questionTypes: IQuestionType[];
  languages: ILanguage[];
  points: IPoint[];
  penaltyPoints: IPoint[];
  books: IBook[];
}

export interface IAnswer {
  Content: string;
  IsCorrect: boolean;
  Id: string;
}

export interface ICreateQuestionData {
  QuestionContent: string;
  Answers: IAnswer[];
  Explanation: string;
  ExplanationAllow: boolean;
  ImageFile: File | null;
  AudioFile: File | null;
  UserId: string;
  difficultLevel: ISelectItem;
  educationLevel: ISelectItem;
  subject: ISelectItem;
  subSubject: ISelectItem;
  questionType: ISelectItem;
  language: ISelectItem;
  point: ISelectItem;
  penaltyPoint: ISelectItem;
  book: ISelectItem;
}

export interface ICreateQuestionPOST {
  QuestionContent: string;
  Answers: IAnswer[];
  Explanation: string;
  ImageFile: File | null;
  AudioFile: File | null;
  UserId: string;
  difficultLevelId: string;
  subSubjectId: string;
  questionTypeId: string;
  languageId: string;
  pointId: string;
  penaltyPointId: string;
  bookId: string;
}
