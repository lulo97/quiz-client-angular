import { Component, Input, OnInit } from "@angular/core";
import { InputTextModule } from "primeng/inputtext";
import { FormsModule } from "@angular/forms";
import { CheckboxModule } from "primeng/checkbox";
import { CreateQuestionService } from "../services/create-question.service";
import { getNewAnswer, IAnswer } from "../utils/utils";
import { MyToastService } from "../../../services/my-toast.service";
import { ActionEnum } from "../utils/utils";

/*
p-radioButton
- If [(ngModel)] = [value] then p-radioButton is checked

In current answer:
- [value] = IsCorrect of current answer
- radio button is checked if: 
  + current answer IsCorrect is equal true
  + or [value] is equal true

*/

@Component({
  selector: "Answer",
  standalone: true,
  imports: [FormsModule, CheckboxModule, InputTextModule],
  template: `
    <div class="flex justify-content-between align-content-center gap-3">
      <p-checkbox
        (click)="
          service.handleAction(
            ActionEnum.ChangeAnswerIsCorrect,
            current_answer.Id
          )
        "
        [ngModel]="current_answer.IsCorrect"
        binary="true"
      />
      <input
        placeholder="Nhập nội dung lựa chọn..."
        class="w-full"
        type="text"
        pInputText
        (change)="handleChange($event)"
      />
      <i
        (click)="
          service.handleAction(ActionEnum.DeleteAnswer, current_answer.Id)
        "
        class="cursor-pointer hover:text-red-500 pi pi-trash text-xl text-red-300 h-fit my-auto"
      ></i>
    </div>
  `,
})
export class Answer implements OnInit {
  ActionEnum = ActionEnum;
  @Input() Id: string = "";
  current_answer: IAnswer = getNewAnswer();

  //Constructor is mainly using for Dependency Injection
  //Constructor is not for complex logic of state management
  constructor(
    public service: CreateQuestionService,
    private toast: MyToastService
  ) {}

  ngOnInit() {
    if (!this.Id) {
      this.toast.showWarning("Id trống!");
    }
    const find_answer = this.service.data.value.Answers.find(
      (ele) => ele.Id == this.Id
    );
    if (find_answer) {
      this.current_answer = find_answer;
    } else {
      this.toast.showError(`Không tìm thấy lựa chọn bằng Id!`);
    }
  }

  handleChange(event: Event) {
    const event_html_input = event.target as HTMLInputElement;
    this.current_answer.Content = event_html_input.value;
    this.service.handleAction(ActionEnum.ChangeAnswerContent, {
      Id: this.current_answer.Id,
      NewContent: event_html_input.value,
    });
  }
}
