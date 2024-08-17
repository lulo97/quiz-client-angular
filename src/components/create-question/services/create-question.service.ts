import { Injectable } from '@angular/core';
import { getNewAnswer, getInitilizedData, ActionEnum } from '../utils/utils';
import { BehaviorSubject } from 'rxjs';
import { MyToastService } from '../../../services/my-toast.service';

//Available in application, don't have to import in any component
//Only have one instance in application
// @Injectable({
//     providedIn: 'root',
// })

//Have to import to use in a component
//Each component imported it have own instance of this service
//@Injectable()

const MC: string = 'MutipleChoice';
const SC: string = 'SingleChoice';
const QuestionType: string = 'SingleChoice';

@Injectable({ providedIn: 'root' })
export class CreateQuestionService {
  constructor(public toast: MyToastService) {}
  public data = new BehaviorSubject(getInitilizedData());

  public changeData(action: ActionEnum, payload: any) {
    const old_data = this.data.value;
    switch (action) {
      case ActionEnum.AddAnswer: {
        if (old_data.Answers.length >= 8) {
          this.toast.showWarning('Tối đa 8 lựa chọn!');
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
        const NewAnswers = old_data.Answers.map((ele) => {
          if (ele.Id == Id) return { ...ele, IsCorrect: !ele.IsCorrect };
          return { ...ele, IsCorrect: false };
        });
        this.data.next({
          ...old_data,
          Answers: NewAnswers,
        });
        break;
      }
      case ActionEnum.DeleteAnswer: {
        if (old_data.Answers.length <= 2) {
          this.toast.showWarning('Cần ít nhất 2 lựa chọn!');
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
