import { v4 as uuidv4 } from "uuid";
import { empty_select_item, ISelectItem } from "../selects/utils";
import { IAnswer, ICreateQuestionData, IMetadata } from "./interfaces";

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
