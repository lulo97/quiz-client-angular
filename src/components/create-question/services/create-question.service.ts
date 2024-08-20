import { Injectable } from "@angular/core";
import {
  getNewAnswer,
  getRawData,
  ActionEnum,
  getRawMetadata,
  IAnswer,
  getRawSelectedMetadata,
} from "../utils/utils";
import { BehaviorSubject } from "rxjs";
import { MyToastService } from "../../../services/my-toast.service";
import { DEFAULT_METADATA, ISelectItem } from "../selects/utils";
import { compareIgnore } from "../../../utils/utils";

//Available in application, don't have to import in any component
//Only have one instance in application
// @Injectable({
//     providedIn: 'root',
// })

//Have to import to use in a component
//Each component imported it have own instance of this service
//@Injectable()

/*
Angular component can rerender if new object is detected:
- New object = every object recursive inside that object is created
- Example for doing wrong:
  + const obj = old_obj //Reference the original object
  + const obj = old_obj.map(ele => ele) //New parent object (obj) but child object (ele) inside parent object still reference 
*/

const MC: string = "MutipleChoice";
const SC: string = "SingleChoice";
const QuestionType: string = MC;
export const CREATE_QUESTION_CONTROLLER = "CreateQuestion";

@Injectable({ providedIn: "root" })
export class CreateQuestionService {
  constructor(public toast: MyToastService) {}

  public data = new BehaviorSubject(getRawData());
  public data$ = this.data.asObservable();

  public metadata = new BehaviorSubject(getRawMetadata());
  public metadata$ = this.metadata.asObservable();

  public selectedMetadata = new BehaviorSubject(getRawSelectedMetadata());
  public selectedMetadata$ = this.selectedMetadata.asObservable();

  public handleAction(action: ActionEnum, payload: any) {
    const old_data = this.data.value;
    const old_selectedMetadata = this.selectedMetadata.value;
    switch (action) {
      case ActionEnum.ChangeFileImage: {
        const file = payload;
        this.data.next({ ...old_data, ImageFile: file });
        break;
      }
      case ActionEnum.ChangeFileAudio: {
        const file = payload;
        this.data.next({ ...old_data, AudioFile: file });
        break;
      }
      case ActionEnum.ChangeSelectBook: {
        const book: ISelectItem = payload;
        this.selectedMetadata.next({ ...old_selectedMetadata, book: book });
        break;
      }
      case ActionEnum.ChangeSelectDifficultLevel: {
        const difficultLevel: ISelectItem = payload;
        this.selectedMetadata.next({
          ...old_selectedMetadata,
          difficultLevel: difficultLevel,
        });
        break;
      }
      case ActionEnum.ChangeSelectEducationLevel: {
        const educationLevel: ISelectItem = payload;
        this.selectedMetadata.next({
          ...old_selectedMetadata,
          educationLevel: educationLevel,
        });
        break;
      }
      case ActionEnum.ChangeSelectLanguage: {
        const language: ISelectItem = payload;
        this.selectedMetadata.next({
          ...old_selectedMetadata,
          language: language,
        });
        break;
      }
      case ActionEnum.ChangeSelectPenaltyPoint: {
        const penaltyPoint: ISelectItem = payload;
        this.selectedMetadata.next({
          ...old_selectedMetadata,
          penaltyPoint: penaltyPoint,
        });
        break;
      }
      case ActionEnum.ChangeSelectPoint: {
        const point: ISelectItem = payload;
        this.selectedMetadata.next({ ...old_selectedMetadata, point: point });
        break;
      }
      case ActionEnum.ChangeSelectQuestionType: {
        //False = Single
        //True = Mutiple
        const checked: boolean = payload;
        const QUESTION_TYPE = checked
          ? DEFAULT_METADATA.QUESTION_TYPE.SINGLE_NAME
          : DEFAULT_METADATA.QUESTION_TYPE.MUTIPLE_NAME;
        let find_record = this.metadata.value.questionTypes.find((ele) =>
          compareIgnore(ele.name, QUESTION_TYPE)
        );
        if (!find_record) {
          this.toast.showError("Không tìm thấy loại câu hỏi mặc định!");
          break;
        }
        const questionType = {
          id: find_record.questionTypeId,
          name: find_record.name,
          value: 0,
        };

        let NewAnswers = old_data.Answers;
        let isEncounterFirstCorrectAnswer = false;
        if (QUESTION_TYPE == DEFAULT_METADATA.QUESTION_TYPE.SINGLE_NAME) {
          NewAnswers = NewAnswers.map((ele) => {
            //If encounter not correct answer
            //  then skip
            if (!ele.IsCorrect) return { ...ele, IsCorrect: ele.IsCorrect };

            //If encounter a correct answer and isEncounterFirstCorrectAnswer=false
            //  then skip and set isEncounterFirstCorrectAnswer=true
            if (ele.IsCorrect && !isEncounterFirstCorrectAnswer) {
              isEncounterFirstCorrectAnswer = true;
              return { ...ele, IsCorrect: ele.IsCorrect };
            }

            //If encounter a correct answer and isEncounterFirstCorrectAnswer=true
            //  then set IsCorrect = false
            if (ele.IsCorrect && isEncounterFirstCorrectAnswer) {
              return { ...ele, IsCorrect: false };
            }

            return { ...ele, IsCorrect: ele.IsCorrect };
          });
        }

        this.selectedMetadata.next({
          ...old_selectedMetadata,
          questionType: questionType,
        });
        this.data.next({
          ...old_data,
          Answers: NewAnswers,
        });
        break;
      }
      case ActionEnum.ChangeSelectSubSubject: {
        const subSubject: ISelectItem = payload;
        this.selectedMetadata.next({
          ...old_selectedMetadata,
          subSubject: subSubject,
        });
        break;
      }
      case ActionEnum.ChangeSelectSubject: {
        const subject: ISelectItem = payload;
        this.selectedMetadata.next({
          ...old_selectedMetadata,
          subject: subject,
        });
        break;
      }
      case ActionEnum.AddAnswer: {
        if (old_data.Answers.length >= 8) {
          this.toast.showWarning("Tối đa 8 lựa chọn!");
          return;
        }
        //Ensure to create new array, directly assign will only reference
        const NewAnswers = [...old_data.Answers, getNewAnswer()];
        this.data.next({
          ...old_data,
          Answers: NewAnswers,
        });
        break;
      }
      case ActionEnum.ChangeAnswerIsCorrect: {
        const Id: string = payload;
        const CurrentQuestionType =
          this.selectedMetadata.value.questionType.name;
        const IsSingleChoice = compareIgnore(
          CurrentQuestionType,
          DEFAULT_METADATA.QUESTION_TYPE.SINGLE_NAME
        );
        const IsMutipleChoice = !IsSingleChoice;
        let NewAnwers = old_data.Answers.map((ele) => ({
          ...ele,
          IsCorrect: ele.IsCorrect,
        }));
        const IsOnlyCorrectAnswer = old_data.Answers.some(
          (ele) => ele.IsCorrect == true && ele.Id == Id
        );

        // Remain Answers
        if (IsSingleChoice && IsOnlyCorrectAnswer) {
          this.toast.showWarning("Phải có ít nhất một đáp án!");
        }

        // Modify Answers by SC
        else if (IsSingleChoice && !IsOnlyCorrectAnswer) {
          NewAnwers = old_data.Answers.map((ele) => {
            if (ele.Id == Id) return { ...ele, IsCorrect: !ele.IsCorrect };
            return { ...ele, IsCorrect: false };
          });
        }

        // Modify Answers by MC
        else if (IsMutipleChoice) {
          NewAnwers = old_data.Answers.map((ele) => {
            if (ele.Id == Id) return { ...ele, IsCorrect: !ele.IsCorrect };
            return { ...ele, IsCorrect: ele.IsCorrect };
          });
        }

        //Replace old Answers by "NEW" Answers
        this.data.next({
          ...old_data,
          Answers: NewAnwers,
        });
        break;
      }
      case ActionEnum.DeleteAnswer: {
        if (old_data.Answers.length <= 2) {
          this.toast.showWarning("Cần ít nhất 2 lựa chọn!");
          return;
        }
        const Id: string = payload;
        const NewAnswers = old_data.Answers.filter((ele) => ele.Id != Id);
        this.data.next({
          ...old_data,
          Answers: NewAnswers,
        });
        break;
      }
      case ActionEnum.ChangeAnswerContent: {
        const { Id, NewContent } = payload;
        const NewAnswers = old_data.Answers.map((ele) => {
          if (ele.Id == Id) return { ...ele, Content: NewContent };
          return ele;
        });
        this.data.next({
          ...old_data,
          Answers: NewAnswers,
        });
        break;
      }
      case ActionEnum.ChangeExplanationAllow: {
        this.data.next({
          ...old_data,
          ExplanationAllow: !old_data.ExplanationAllow,
        });
        break;
      }
      case ActionEnum.ChangeQuestionContent: {
        const NewQuestionContent = payload;
        this.data.next({
          ...old_data,
          QuestionContent: NewQuestionContent,
        });
        break;
      }
      case ActionEnum.ChangeExplanation: {
        const NewExplanation = payload;
        this.data.next({
          ...old_data,
          Explanation: NewExplanation,
        });
        break;
      }
      default: {
        return;
      }
    }
  }
}
