import { Component } from "@angular/core";
import { OrderListModule } from "primeng/orderlist";
import { Answer } from "./answer";
import { FormsModule } from "@angular/forms";
import { CreateQuestionService } from "../services/create-question.service";
import {
  ToggleButtonChangeEvent,
  ToggleButtonModule,
} from "primeng/togglebutton";
import { ActionEnum } from "../utils/enums";
import { DEFAULT_METADATA } from "../selects/utils";
import { capitalizeFirstWord } from "../../../utils/utils";

@Component({
  selector: "Answers",
  standalone: true,
  imports: [OrderListModule, Answer, FormsModule, ToggleButtonModule],
  template: `
    <div class="mb-1 flex justify-content-between align-items-end">
      <div class="font-semibold h-fit w-fit">Các lựa chọn</div>
      <div class="flex gap-2">
        <p-toggleButton
          [ngModel]="checked"
          (onChange)="handleChangeToggle($event)"
          [onLabel]="onLabel"
          [offLabel]="onLabel"
          styleClass="min-w-9rem w-fit"
        />
        <p-toggleButton
          [ngModel]="!checked"
          (onChange)="handleChangeToggle($event)"
          [onLabel]="offLabel"
          [offLabel]="offLabel"
          styleClass="min-w-9rem w-fit"
        />
      </div>
    </div>
    <div class="bg-white p-2 border-round border-1 border-gray-300">
      <p-orderList
        [value]="service.data.value.Answers"
        [listStyle]="{ height: '14rem', 'max-height': '20rem' }"
      >
        <ng-template let-answer pTemplate="answer">
          <Answer [Id]="answer.Id" [IsSingleChoice]="checked"></Answer>
        </ng-template>
      </p-orderList>
    </div>
  `,
})
export class Answers {
  constructor(public service: CreateQuestionService) {}

  onLabel = capitalizeFirstWord(DEFAULT_METADATA.QUESTION_TYPE.SINGLE_NAME);
  offLabel = capitalizeFirstWord(DEFAULT_METADATA.QUESTION_TYPE.MUTIPLE_NAME);

  checked = DEFAULT_METADATA.QUESTION_TYPE.MUTIPLE_VALUE;

  handleChangeToggle(event: ToggleButtonChangeEvent) {
    this.service.handleAction(
      ActionEnum.ChangeSelectQuestionType,
      event.checked
    );
    this.checked = !this.checked;
  }
}
