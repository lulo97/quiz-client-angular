import { Component } from "@angular/core";
import { DropdownModule } from "primeng/dropdown";
import { FormsModule } from "@angular/forms";
import { CreateQuestionService } from "../services/create-question.service";
import { DEFAULT_METADATA, ISelectItem } from "./utils";
import { ActionEnum } from "../utils/utils";
import { compareIgnore } from "../../../utils/utils";

@Component({
  selector: "PointSelect",
  standalone: true,
  imports: [FormsModule, DropdownModule],
  template: `
    <div class="font-semibold mb-1 w-fit">Điểm</div>
    <p-dropdown
      appendTo="body"
      [options]="datas"
      [(ngModel)]="service.selectedMetadata.value.point"
      [showClear]="true"
      [editable]="false"
      [filter]="true"
      [virtualScroll]="true"
      [virtualScrollItemSize]="40"
      [style]="{ 'min-width': '20rem', width: '100%' }"
      optionLabel="value"
      placeholder="Chọn điểm thưởng..."
    />
  `,
})
export class PointSelect {
  constructor(public service: CreateQuestionService) {}

  datas: ISelectItem[] = [];

  ngOnInit(): void {
    this.service.metadata$.subscribe((response) => {
      if (response) {
        this.datas = response.points.map((ele) => ({
          id: ele.pointId,
          name: "",
          value: ele.value,
        }));
      }
      const find_record = this.datas.find((ele) =>
        compareIgnore(ele.value, DEFAULT_METADATA.POINT)
      );
      if (find_record) {
        this.service.handleAction(ActionEnum.ChangeSelectPoint, find_record);
      }
    });
  }
}
