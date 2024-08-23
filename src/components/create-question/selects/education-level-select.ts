import { Component } from "@angular/core";
import { DropdownModule } from "primeng/dropdown";
import { FormsModule } from "@angular/forms";
import { CreateQuestionService } from "../services/create-question.service";
import { DEFAULT_METADATA, ISelectItem } from "./utils";
<<<<<<< HEAD
import { ActionEnum } from "../utils/enums";
=======
import { ActionEnum } from "../utils/utils";
>>>>>>> a425177170afafb3bcb78b5f75eba04580c4e3af
import { compareIgnore } from "../../../utils/utils";

@Component({
  selector: "EducationLevelSelect",
  standalone: true,
  imports: [FormsModule, DropdownModule],
  template: `
    <div class="font-semibold mb-1 w-fit">Trình độ</div>
    <p-dropdown
      appendTo="body"
      [options]="datas"
<<<<<<< HEAD
      [(ngModel)]="service.data.value.educationLevel"
=======
      [(ngModel)]="service.selectedMetadata.value.educationLevel"
>>>>>>> a425177170afafb3bcb78b5f75eba04580c4e3af
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

  ngOnInit(): void {
    this.service.metadata$.subscribe((response) => {
      if (response) {
        this.datas = response.educationLevels.map((ele) => ({
          id: ele.educationLevelId,
          name: ele.name,
          value: 0,
        }));
        const find_record = this.datas.find((ele) =>
          compareIgnore(ele.name, DEFAULT_METADATA.EDUCATION_LEVEL)
        );
        if (find_record) {
          this.service.handleAction(
            ActionEnum.ChangeSelectEducationLevel,
            find_record
          );
        }
      }
    });
  }
}
