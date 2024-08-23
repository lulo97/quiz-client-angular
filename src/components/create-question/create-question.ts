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
<<<<<<< HEAD
import { ActionEnum } from "./utils/enums";
import { IMetadata } from "./utils/interfaces";
import { AuthenticationService } from "../../services/authentication.service";
=======
import { ActionEnum, IMetadata } from "./utils/utils";
>>>>>>> a425177170afafb3bcb78b5f75eba04580c4e3af

@Component({
  selector: "CreateQuestion",
  standalone: true,
  imports: [Answers, QuestionContent, Explanation, ButtonsBar],
  template: `
    <div
      class="px-6 pt-4 pb-8 h-fit flex flex-column justify-content-start gap-4"
    >
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
<<<<<<< HEAD
    private toast: MyToastService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.handleGetMetadata();
    this.handleSetUserId();
  }

  public handleSetUserId() {
    this.service.handleAction(ActionEnum.ChangeUserId, null);
  }

=======
    private toast: MyToastService
  ) {
    this.handleGetMetadata();
  }

>>>>>>> a425177170afafb3bcb78b5f75eba04580c4e3af
  public handleGetMetadata() {
    const url = BACKEND_URL + CREATE_QUESTION_CONTROLLER;
    const result = this.http.get(url, { withCredentials: true });
    result.subscribe({
      next: (response: any) => {
        const old_question_metadata = this.service.metadata.value;
        const new_question_metadata: IMetadata = response;
        this.service.metadata.next({
          ...old_question_metadata,
          ...new_question_metadata,
        });
        this.service.handleAction(ActionEnum.ChangeSelectQuestionType, false);
      },
      error: (response: HttpErrorResponse) => {
        this.toast.showError(response.error.detail);
        console.error(response);
      },
    });
  }
}
