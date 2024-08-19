import { Component } from "@angular/core";
import { DropdownModule } from "primeng/dropdown";
import { FormsModule } from "@angular/forms";
import { CreateQuestionService } from "../services/create-question.service";
import { ISelectItem } from "./utils";

@Component({
  selector: "PenaltyPointSelect",
  standalone: true,
  imports: [FormsModule, DropdownModule],
  template: `
    <div class="font-semibold mb-1 w-fit">Điểm phạt</div>
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
      placeholder="Chọn điểm phạt..."
    />
  `,
})
export class PenaltyPointSelect {
  constructor(public service: CreateQuestionService) {}

  datas: ISelectItem[] = [];
  selected_record: ISelectItem | undefined = undefined;

  ngOnInit(): void {
    this.service.questionMetadata$.subscribe((response) => {
      if (response) {
        this.datas = response.penaltyPoints.map((ele) => ({
          code: ele.pointId,
          name: ele.value,
        }));
      }
    });
  }
}
