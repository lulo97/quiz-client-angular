import { Component } from '@angular/core';
import { QuestionContent } from './question-content';
import { Answers } from './answers';
import { Explanation } from './explanation';
import { ButtonsBar } from './buttons-bar';

@Component({
  selector: 'CreateQuestion',
  standalone: true,
  imports: [Answers, QuestionContent, Explanation, ButtonsBar],
  template: `
    <div class="p-2 h-fit flex flex-column justify-content-start gap-4">
      <QuestionContent></QuestionContent>
      <Answers></Answers>
      <Explanation></Explanation>
      <ButtonsBar></ButtonsBar>
    </div>
  `,
})
export class CreateQuestion {}
