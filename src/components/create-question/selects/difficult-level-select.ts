import { Component } from "@angular/core";
import { DropdownModule } from "primeng/dropdown";
import { FormsModule } from "@angular/forms";
import { CreateQuestionService } from "../services/create-question.service";
import { DEFAULT_METADATA, ISelectItem } from "./utils";
import { CommonModule } from "@angular/common";
import { Subscription } from "rxjs";

@Component({
  selector: "DifficultLevelSelect",
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownModule],
  template: `
    <div class="font-semibold mb-1 w-fit">Độ khó</div>
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
      placeholder="Chọn độ khó..."
    />
  `,
})
export class DifficultLevelSelect {
  constructor(public service: CreateQuestionService) {}

  datas: ISelectItem[] = [];
  selected_record: ISelectItem | undefined = undefined;

  ngOnInit(): void {
    this.service.questionMetadata$.subscribe((response) => {
      if (response) {
        this.datas = response.difficultLevels.map((ele) => ({
          code: ele.difficultLevelId,
          name: ele.name,
        }));
        const find_record = this.datas.find(
          (ele) =>
            ele.name.toString().toLowerCase() ==
            DEFAULT_METADATA.DIFFICULT_LEVEL
        );
        if (find_record) {
          this.selected_record = find_record;
        }
      }
    });
  }
}
