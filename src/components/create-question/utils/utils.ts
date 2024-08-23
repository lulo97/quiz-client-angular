import { v4 as uuidv4 } from "uuid";
<<<<<<< HEAD
import { empty_select_item } from "../selects/utils";
import { IAnswer, ICreateQuestionData, IMetadata } from "./interfaces";
=======
import { IDifficultLevel } from "../../admin-management/menu-items/difficult-level/utils";
import { IEducationLevel } from "../../admin-management/menu-items/education-level/utils";
import { ISubject } from "../../admin-management/menu-items/subject/utils";
import { ISubSubject } from "../../admin-management/menu-items/sub-subject/utils";
import { IQuestionType } from "../../admin-management/menu-items/question-type/utils";
import { ILanguage } from "../../admin-management/menu-items/language/utils";
import { IPoint } from "../../admin-management/menu-items/point/utils";
import { IBook } from "../../admin-management/menu-items/book/utils";
import { empty_select_item, ISelectItem } from "../selects/utils";

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
>>>>>>> a425177170afafb3bcb78b5f75eba04580c4e3af

export function getNewAnswer(IsCorrect = false): IAnswer {
  return { Id: uuidv4(), Content: "", IsCorrect: IsCorrect };
}

export function getRawData(): ICreateQuestionData {
  return {
    QuestionContent: "",
    Answers: [
      getNewAnswer(true),
      getNewAnswer(),
      getNewAnswer(),
      getNewAnswer(),
    ],
    Explanation: "",
    ExplanationAllow: true,
    ImageFile: null,
    AudioFile: null,
    UserId: "",
    difficultLevel: empty_select_item,
    educationLevel: empty_select_item,
    subject: empty_select_item,
    subSubject: empty_select_item,
    questionType: empty_select_item,
    language: empty_select_item,
    point: empty_select_item,
    penaltyPoint: empty_select_item,
    book: empty_select_item,
  };
}

<<<<<<< HEAD
=======
export enum ActionEnum {
  AddAnswer,
  DeleteAnswer,
  ChangeAnswerIsCorrect,
  ChangeAnswerContent,
  ChangeExplanationAllow,
  ChangeQuestionContent,
  ChangeExplanation,
  ChangeSelectBook,
  ChangeSelectDifficultLevel,
  ChangeSelectEducationLevel,
  ChangeSelectQuestionType,
  ChangeSelectLanguage,
  ChangeSelectSubject,
  ChangeSelectSubSubject,
  ChangeSelectPoint,
  ChangeSelectPenaltyPoint,
  ChangeFileImage,
  ChangeFileAudio,
}

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

>>>>>>> a425177170afafb3bcb78b5f75eba04580c4e3af
export function getRawMetadata(): IMetadata {
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

export interface ISelectedMetadata {
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

export function getRawSelectedMetadata(): ISelectedMetadata {
  return {
    difficultLevel: empty_select_item,
    educationLevel: empty_select_item,
    subject: empty_select_item,
    subSubject: empty_select_item,
    questionType: empty_select_item,
    language: empty_select_item,
    point: empty_select_item,
    penaltyPoint: empty_select_item,
    book: empty_select_item,
  };
}
