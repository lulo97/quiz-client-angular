import { Component } from "@angular/core";
import { DropdownModule } from "primeng/dropdown";
import { FormsModule } from "@angular/forms";
import { CreateQuestionService } from "../services/create-question.service";
import { DEFAULT_METADATA, ISelectItem } from "./utils";
import { ActionEnum } from "../utils/enums";
import { CommonModule } from "@angular/common";
import { compareIgnore } from "../../../utils/utils";

@Component({
  selector: "QuestionTypeSelect",
  standalone: true,
  imports: [FormsModule, DropdownModule, CommonModule],
  template: `
    <div *ngIf="false">
      <div class="font-semibold mb-1 w-fit">Loại trắc nghiệm</div>
      <p-dropdown
        appendTo="body"
        [options]="datas"
        [(ngModel)]="service.data.value.questionType"
        [showClear]="true"
        [editable]="false"
        [filter]="true"
        [virtualScroll]="true"
        [virtualScrollItemSize]="40"
        [style]="{ 'min-width': '20rem', width: '100%' }"
        optionLabel="name"
        placeholder="Chọn loại câu hỏi..."
      />
    </div>
  `,
})
export class QuestionTypeSelect {
  constructor(public service: CreateQuestionService) {}

  datas: ISelectItem[] = [];

  ngOnInit(): void {
    this.service.metadata$.subscribe((response) => {
      if (response) {
        this.datas = response.questionTypes.map((ele) => ({
          id: ele.questionTypeId,
          name: ele.name,
          value: 0,
        }));
        const find_record = this.datas.find((ele) =>
          compareIgnore(ele.name, DEFAULT_METADATA.QUESTION_TYPE.SINGLE_NAME)
        );
        if (find_record) {
          this.service.handleAction(
            ActionEnum.ChangeSelectQuestionType,
            find_record
          );
        }
      }
    });
  }
}
