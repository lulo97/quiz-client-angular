import { Component } from "@angular/core";
import { InputTextareaModule } from "primeng/inputtextarea";
import { FormsModule } from "@angular/forms";
import { CreateQuestionService } from "../services/create-question.service";
import { ActionEnum } from "../utils/utils";

@Component({
  selector: "QuestionContent",
  standalone: true,
  imports: [FormsModule, InputTextareaModule],
  template: `
    <div class="w-full">
      <div class="font-semibold mb-1">Câu hỏi</div>
      <textarea
        class="w-full"
        rows="2"
        pInputTextarea
        placeholder="Nhập nội dung câu hỏi..."
        (change)="handleChange($event)"
      ></textarea>
    </div>
  `,
})
export class QuestionContent {
  constructor(public service: CreateQuestionService) {}

  handleChange(event: Event) {
    const event_html_input = event.target as HTMLInputElement;
    const NewQuestionContent = event_html_input.value;
    this.service.handleAction(
      ActionEnum.ChangeQuestionContent,
      NewQuestionContent
    );
  }
}
