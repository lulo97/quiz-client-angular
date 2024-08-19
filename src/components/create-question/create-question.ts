import { Component } from "@angular/core";
import { QuestionContent } from "./components/question-content";
import { Answers } from "./components/answers";
import { Explanation } from "./components/explanation";
import { ButtonsBar } from "./components/buttons-bar";
import {
  CREATE_QUESTION_CONTROLLER,
  CreateQuestionService,
} from "./services/create-question.service";
import { BACKEND_URL } from "../../utils/utils";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { MyToastService } from "../../services/my-toast.service";
import { IQuestionMetadata } from "./utils/utils";

@Component({
  selector: "CreateQuestion",
  standalone: true,
  imports: [Answers, QuestionContent, Explanation, ButtonsBar],
  template: `
    <div class="px-4 py-2 h-fit flex flex-column justify-content-start gap-4">
      <QuestionContent></QuestionContent>
      <Answers></Answers>
      <Explanation></Explanation>
      <ButtonsBar></ButtonsBar>
    </div>
  `,
})
export class CreateQuestion {
  constructor(
    public service: CreateQuestionService,
    private http: HttpClient,
    private toast: MyToastService
  ) {
    this.handleGetQuestionMetadata();
  }

  public handleGetQuestionMetadata() {
    const url = BACKEND_URL + CREATE_QUESTION_CONTROLLER;
    const result = this.http.get(url);
    result.subscribe({
      next: (response: any) => {
        const old_question_metadata = this.service.questionMetadata.value;
        const new_question_metadata: IQuestionMetadata = response;
        this.service.questionMetadata.next({
          ...old_question_metadata,
          ...new_question_metadata,
        });
        console.log(response);
      },
      error: (response: HttpErrorResponse) => {
        this.toast.showError(response.error.detail);
        console.error(response);
      },
    });
  }
}
