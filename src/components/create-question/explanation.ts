import { Component } from '@angular/core';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateQuestionService } from './services/create-question.service';
import { ActionEnum } from './utils/utils';

@Component({
  selector: 'Explanation',
  standalone: true,
  imports: [FormsModule, CommonModule, InputTextareaModule],
  template: `
    <div *ngIf="service.data.value.ExplanationAllow" class="w-full mb-6">
      <div class="font-semibold mb-1">Giải thích</div>
      <textarea
        class="w-full"
        rows="2"
        pInputTextarea
        placeholder="Nhập lời giải thích..."
        (change)="handleChange($event)"
      ></textarea>
    </div>
  `,
})
export class Explanation {
  constructor(public service: CreateQuestionService) {}
  handleChange(event: Event) {
    const event_html_input = event.target as HTMLInputElement;
    const NewExplanation = event_html_input.value;
    this.service.changeData(ActionEnum.ChangeExplanation, NewExplanation);
  }
}
