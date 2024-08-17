import { v4 as uuidv4 } from 'uuid';

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
  return { Id: uuidv4(), Content: '', IsCorrect: IsCorrect };
}

export function getInitilizedData(): ICreateQuestionData {
  return {
    QuestionContent: '',
    Answers: [
      getNewAnswer(true),
      getNewAnswer(),
      getNewAnswer(),
      getNewAnswer(),
    ],
    Explanation: null,
    ExplanationAllow: false,
    ImageFile: null,
    AudioFile: null,
    DifficultLevelId: '',
    EducationLevelId: '',
    LanguageId: '',
    QuestionType: '',
    SubjectId: '',
    SubSubjectId: '',
    PointId: '',
    PenaltyPointId: '',
    UserId: '',
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
