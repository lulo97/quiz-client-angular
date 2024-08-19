import { v4 as uuidv4 } from "uuid";
import { IDifficultLevel } from "../../admin-management/menu-items/difficult-level/utils";
import { IEducationLevel } from "../../admin-management/menu-items/education-level/utils";
import { ISubject } from "../../admin-management/menu-items/subject/utils";
import { ISubSubject } from "../../admin-management/menu-items/sub-subject/utils";
import { IQuestionType } from "../../admin-management/menu-items/question-type/utils";
import { ILanguage } from "../../admin-management/menu-items/language/utils";
import { IPoint } from "../../admin-management/menu-items/point/utils";
import { IBook } from "../../admin-management/menu-items/book/utils";

export interface IAnswer {
  Content: string;
  IsCorrect: boolean;
  Id: string;
}

export interface ICreateQuestionData {
  QuestionContent: string;
  Answers: IAnswer[];
  Explanation: string | null;
  ExplanationAllow: boolean;
  ImageFile: File | null;
  AudioFile: File | null;
  DifficultLevelId: string;
  EducationLevelId: string;
  LanguageId: string;
  QuestionType: string;
  SubjectId: string;
  SubSubjectId: string;
  PointId: string;
  PenaltyPointId: string;
  UserId: string;
}

export function getNewAnswer(IsCorrect = false): IAnswer {
  return { Id: uuidv4(), Content: "", IsCorrect: IsCorrect };
}

export function getInitilizedData(): ICreateQuestionData {
  return {
    QuestionContent: "",
    Answers: [
      getNewAnswer(true),
      getNewAnswer(),
      getNewAnswer(),
      getNewAnswer(),
    ],
    Explanation: null,
    ExplanationAllow: true,
    ImageFile: null,
    AudioFile: null,
    DifficultLevelId: "",
    EducationLevelId: "",
    LanguageId: "",
    QuestionType: "",
    SubjectId: "",
    SubSubjectId: "",
    PointId: "",
    PenaltyPointId: "",
    UserId: "",
  };
}

export enum ActionEnum {
  AddAnswer,
  DeleteAnswer,
  ChangeAnswerIsCorrect,
  ChangeAnswerContent,
  ChangeExplanationAllow,
  ChangeQuestionContent,
  ChangeExplanation,
}

export interface IQuestionMetadata {
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

export function getInitilizedQuestionMetadata(): IQuestionMetadata {
  return {
    difficultLevels: [],
    educationLevels: [],
    subjects: [],
    subSubjects: [],
    questionTypes: [],
    languages: [],
    points: [],
    penaltyPoints: [],
    books: [],
  };
}
