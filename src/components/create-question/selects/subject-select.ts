import { Component } from "@angular/core";
import { DropdownModule } from "primeng/dropdown";
import { FormsModule } from "@angular/forms";
import { CreateQuestionService } from "../services/create-question.service";
import { DEFAULT_METADATA, ISelectItem } from "./utils";
import { ActionEnum } from "../utils/utils";
import { compareIgnore } from "../../../utils/utils";

@Component({
  selector: "SubjectSelect",
  standalone: true,
  imports: [FormsModule, DropdownModule],
  template: `
    <div class="font-semibold mb-1 w-fit">Môn học</div>
    <p-dropdown
      appendTo="body"
      [options]="datas"
      [(ngModel)]="service.selectedMetadata.value.subject"
      [showClear]="true"
      [editable]="false"
      [filter]="true"
      [virtualScroll]="true"
      [virtualScrollItemSize]="40"
      [style]="{ 'min-width': '20rem', width: '100%' }"
      optionLabel="name"
      placeholder="Chọn chủ đề..."
    />
  `,
})
export class SubjectSelect {
  constructor(public service: CreateQuestionService) {}

  datas: ISelectItem[] = [];

  ngOnInit(): void {
    this.service.metadata$.subscribe((response) => {
      if (response) {
        this.datas = response.subjects.map((ele) => ({
          id: ele.subjectId,
          name: ele.name,
          value: 0,
        }));
      }
      const find_record = this.datas.find((ele) =>
        compareIgnore(ele.name, DEFAULT_METADATA.SUBJECT)
      );
      if (find_record) {
        this.service.handleAction(ActionEnum.ChangeSelectSubject, find_record);
      }
    });
  }
}
