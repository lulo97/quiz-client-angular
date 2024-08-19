import { Component } from "@angular/core";
import { DifficultLevelSelect } from "../selects/difficult-level-select";
import { EducationLevelSelect } from "../selects/education-level-select";
import { PenaltyPointSelect } from "../selects/penalty-point-select";
import { PointSelect } from "../selects/point-select";
import { SubSubjectSelect } from "../selects/subsubject-select";
import { SubjectSelect } from "../selects/subject-select";
import { LanguageSelect } from "../selects/language-select";
import { QuestionTypeSelect } from "../selects/question-type-select";
import { BookSelect } from "../selects/book-select";

@Component({
  selector: "TabSelectMetadata",
  standalone: true,
  imports: [
    DifficultLevelSelect,
    EducationLevelSelect,
    PenaltyPointSelect,
    PointSelect,
    SubSubjectSelect,
    SubjectSelect,
    LanguageSelect,
    QuestionTypeSelect,
    BookSelect,
  ],
  template: `
    <div class="grid row-gap-4 col-gap-4 mt-2">
      <div class="col flex flex-column gap-4">
        <DifficultLevelSelect></DifficultLevelSelect>
        <EducationLevelSelect></EducationLevelSelect>
        <QuestionTypeSelect></QuestionTypeSelect>
        <LanguageSelect></LanguageSelect>
        <BookSelect></BookSelect>
      </div>
      <div class="col flex flex-column gap-4">
        <PenaltyPointSelect></PenaltyPointSelect>
        <PointSelect></PointSelect>
        <SubjectSelect></SubjectSelect>
        <SubSubjectSelect></SubSubjectSelect>
      </div>
    </div>
  `,
})
export class TabSelectMetadata {}
