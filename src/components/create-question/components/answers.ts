import { Component } from "@angular/core";
import { OrderListModule } from "primeng/orderlist";
import { Answer } from "./answer";
import { FormsModule } from "@angular/forms";
import { RadioButtonModule } from "primeng/radiobutton";
import { CreateQuestionService } from "../services/create-question.service";

@Component({
  selector: "Answers",
  standalone: true,
  imports: [OrderListModule, Answer, FormsModule, RadioButtonModule],
  template: `
    <div class="font-semibold mb-1 w-fit">Các lựa chọn</div>
    <div class="bg-white p-2 border-round border-1 border-gray-300">
      <p-orderList
        [value]="service.data.value.Answers"
        [listStyle]="{ height: '14rem', 'max-height': '20rem' }"
      >
        <ng-template let-answer pTemplate="answer">
          <Answer [Id]="answer.Id"></Answer>
        </ng-template>
      </p-orderList>
    </div>
  `,
})
export class Answers {
  constructor(public service: CreateQuestionService) {}
}
