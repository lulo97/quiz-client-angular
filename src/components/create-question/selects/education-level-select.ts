import { Component } from "@angular/core";
import { DropdownModule } from "primeng/dropdown";
import { FormsModule } from "@angular/forms";
import { CreateQuestionService } from "../services/create-question.service";
import { DEFAULT_METADATA, ISelectItem } from "./utils";

@Component({
  selector: "EducationLevelSelect",
  standalone: true,
  imports: [FormsModule, DropdownModule],
  template: `
    <div class="font-semibold mb-1 w-fit">Trình độ</div>
    <p-dropdown
      appendTo="body"
      [options]="datas"
      [(ngModel)]="selected_record"
      [showClear]="true"
      [editable]="false"
      [filter]="true"
      [virtualScroll]="true"
      [virtualScrollItemSize]="40"
      [style]="{ 'min-width': '20rem', width: '100%' }"
      optionLabel="name"
      placeholder="Chọn trình độ..."
    />
  `,
})
export class EducationLevelSelect {
  constructor(public service: CreateQuestionService) {}

  datas: ISelectItem[] = [];
  selected_record: ISelectItem | undefined = undefined;

  ngOnInit(): void {
    this.service.questionMetadata$.subscribe((response) => {
      if (response) {
        this.datas = response.educationLevels.map((ele) => ({
          code: ele.educationLevelId,
          name: ele.name,
        }));
        const find_record = this.datas.find(
          (ele) =>
            ele.name.toString().toLowerCase() ==
            DEFAULT_METADATA.EDUCATION_LEVEL
        );
        if (find_record) {
          this.selected_record = find_record;
        }
      }
    });
  }
}
