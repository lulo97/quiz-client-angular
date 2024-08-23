import { Injectable } from "@angular/core";
import { getNewAnswer, getRawData, getRawMetadata } from "../utils/utils";
import { BehaviorSubject } from "rxjs";
import { MyToastService } from "../../../services/my-toast.service";
import { DEFAULT_METADATA, ISelectItem } from "../selects/utils";
import {
  BACKEND_URL,
  compareIgnore,
  isNullOrEmpty,
} from "../../../utils/utils";
import { AuthenticationService } from "../../../services/authentication.service";
import { ActionEnum } from "../utils/enums";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ICreateQuestionPOST } from "../utils/interfaces";

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

export const CREATE_QUESTION_CONTROLLER = "CreateQuestion";

@Injectable({ providedIn: "root" })
export class CreateQuestionService {
  constructor(
    private toast: MyToastService,
    private authService: AuthenticationService,
    private http: HttpClient
  ) {}

  public data = new BehaviorSubject(getRawData());
  public data$ = this.data.asObservable();

  public metadata = new BehaviorSubject(getRawMetadata());
  public metadata$ = this.metadata.asObservable();

  public handleAction(action: ActionEnum, payload: any) {
    const old_data = this.data.value;
    switch (action) {
      case ActionEnum.ConfirmCreate: {
        let isError = false;
        if (!old_data.QuestionContent) {
          this.toast.showWarning("Nội dung câu hỏi trống!");
          isError = true;
        }
        if (old_data.Answers.some((ele) => isNullOrEmpty(ele.Content))) {
          this.toast.showWarning("Nội dung lựa chọn trống!");
          isError = true;
        }
        //Don't allow 2 answer have the same content
        if (
          old_data.Answers.some(
            (currentEle, index, array) =>
              array.filter(
                (ele) =>
                  ele.Content.trim().toLowerCase() ===
                  currentEle.Content.trim().toLowerCase()
              ).length > 1
          )
        ) {
          this.toast.showWarning("Có hai lựa chọn giống nhau!");
          isError = true;
        }
        if (old_data.Answers.every((ele) => ele.IsCorrect == false)) {
          this.toast.showWarning("Phải có ít nhất 1 đáp án đúng!");
          isError = true;
        }
        if (old_data.ExplanationAllow == true && !old_data.Explanation) {
          this.toast.showWarning("Nội dung giải thích trống");
          isError = true;
        }
        if (!old_data.difficultLevel.id) {
          this.toast.showWarning("Hãy chọn độ khó!");
          isError = true;
        }
        if (!old_data.educationLevel.id) {
          this.toast.showWarning("Hãy chọn trình độ học vấn!");
          isError = true;
        }
        if (!old_data.subject.id) {
          this.toast.showWarning("Hãy chọn môn học!");
          isError = true;
        }
        if (!old_data.subSubject.id) {
          this.toast.showWarning("Hãy chọn chương!");
          isError = true;
        }
        if (!old_data.language.id) {
          this.toast.showWarning("Hãy chọn ngôn ngữ");
          isError = true;
        }
        if (!old_data.book.id) {
          this.toast.showWarning("Hãy chọn nguồn sách!");
          isError = true;
        }
        if (!old_data.questionType.id) {
          this.toast.showWarning("Hãy chọn loại câu hỏi!");
          isError = true;
        }
        if (!old_data.point.id) {
          this.toast.showWarning("Hãy chọn điểm!");
          isError = true;
        }
        if (!old_data.UserId) {
          this.toast.showWarning("Mã người dùng trống!");
          isError = true;
        }
        if (isError) break;
        const url = BACKEND_URL + CREATE_QUESTION_CONTROLLER;

        const formData = new FormData();
        formData.append("QuestionContent", old_data.QuestionContent);
        if (old_data.Explanation) {
          formData.append("Explanation", old_data.Explanation);
        }
        formData.append("UserId", old_data.UserId);
        formData.append("difficultLevelId", old_data.difficultLevel.id);
        formData.append("subSubjectId", old_data.subSubject.id);
        formData.append("questionTypeId", old_data.questionType.id);
        formData.append("languageId", old_data.language.id);
        formData.append("pointId", old_data.point.id);
        if (old_data.penaltyPoint.id) {
          formData.append("penaltyPointId", old_data.penaltyPoint.id ?? null);
        }
        formData.append("bookId", old_data.book.id);

        // Append file fields
        if (old_data.ImageFile) {
          formData.append("ImageFile", old_data.ImageFile);
        }
        if (old_data.AudioFile) {
          formData.append("AudioFile", old_data.AudioFile);
        }

        // Convert answers to JSON and append
        formData.append("Answers", JSON.stringify(old_data.Answers));

        const result = this.http.post(url, formData);
        result.subscribe({
          complete: () => {},
          next: (response) => {},
          error: (response: HttpErrorResponse) => {
            this.toast.showError(response.error.detail);
            console.error(response);
          },
        });
        break;
      }
      case ActionEnum.ChangeUserId: {
        const UserId: string = this.authService.currentUser.id;
        if (isNullOrEmpty(UserId)) {
          this.toast.showWarning("Mã người dùng rỗng!");
          break;
        }
        this.data.next({ ...old_data, UserId: UserId });
        break;
      }
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
        this.data.next({ ...old_data, book: book });
        break;
      }
      case ActionEnum.ChangeSelectDifficultLevel: {
        const difficultLevel: ISelectItem = payload;
        this.data.next({
          ...old_data,
          difficultLevel: difficultLevel,
        });
        break;
      }
      case ActionEnum.ChangeSelectEducationLevel: {
        const educationLevel: ISelectItem = payload;
        this.data.next({
          ...old_data,
          educationLevel: educationLevel,
        });
        break;
      }
      case ActionEnum.ChangeSelectLanguage: {
        const language: ISelectItem = payload;
        this.data.next({
          ...old_data,
          language: language,
        });
        break;
      }
      case ActionEnum.ChangeSelectPenaltyPoint: {
        const penaltyPoint: ISelectItem = payload;
        this.data.next({
          ...old_data,
          penaltyPoint: penaltyPoint,
        });
        break;
      }
      case ActionEnum.ChangeSelectPoint: {
        const point: ISelectItem = payload;
        this.data.next({ ...old_data, point: point });
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

        this.data.next({
          ...old_data,
          Answers: NewAnswers,
          questionType: questionType,
        });
        break;
      }
      case ActionEnum.ChangeSelectSubSubject: {
        const subSubject: ISelectItem = payload;
        this.data.next({
          ...old_data,
          subSubject: subSubject,
        });
        break;
      }
      case ActionEnum.ChangeSelectSubject: {
        const subject: ISelectItem = payload;
        this.data.next({
          ...old_data,
          subject: subject,
        });
        break;
      }
      case ActionEnum.AddAnswer: {
        if (old_data.Answers.length >= 8) {
          this.toast.showWarning("Tối đa 8 lựa chọn!");
          break;
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
        const CurrentQuestionType = this.data.value.questionType.name;
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
          break;
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
        break;
      }
    }
  }
}
